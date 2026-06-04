---
name: threejs-model-preview
description: >-
  Add browser-side 3D preview for .3mf, .step, and .stp files to a three.js
  viewer. Use when a three.js app can render .stl/.obj but fails on .3mf
  (especially slicer "project" files from Bambu Studio, OrcaSlicer, PrusaSlicer)
  or has no STEP/STP support at all. Covers the production-extension 3MF gap and
  the OpenCASCADE WASM path for STEP. Assumes TypeScript.
---

# three.js model preview: .3mf, .step, .stp

## What you're solving

three.js renders **meshes** (triangles). Some formats are meshes already and
some are not:

| Format | Native three.js loader | Works out of the box? |
| ------ | ---------------------- | --------------------- |
| `.stl` | `STLLoader`            | ✅ yes |
| `.obj` | `OBJLoader`            | ✅ yes |
| `.3mf` | `ThreeMFLoader`        | ⚠️ only for simple files — **breaks on slicer project files** |
| `.amf` | `AMFLoader`            | ✅ yes |
| `.step` / `.stp` | none         | ❌ B-rep CAD, needs a geometry kernel |

Two real gaps to close:

1. **`.3mf` production extension.** A `.3mf` is a ZIP. Bambu Studio, OrcaSlicer
   and PrusaSlicer write the *production extension* (`requiredextensions="p"`):
   the root part `3D/3dmodel.model` only holds `<build>` items and
   `<components>` that point — via a `p:path` attribute — at external parts like
   `3D/Objects/object_1.model` where the real `<mesh>` lives. The stock
   `ThreeMFLoader` reads every `.model` part into one flat objectid-keyed map and
   resolves build items only from the root part, so it never follows `p:path` and
   produces empty geometry (and usually throws). Since slicer project files are
   the dominant `.3mf` flavor for 3D printing, the stock loader is effectively
   unusable for this traffic — you need a production-extension-aware loader.

2. **`.step` / `.stp` are not meshes.** STEP/IGES are parametric boundary
   representations (NURBS surfaces). three.js has no STEP loader by design. You
   must tessellate them with a CAD kernel — `occt-import-js` (an OpenCASCADE
   WASM build) does this in the browser and returns position/normal/index
   buffers that drop straight into a `BufferGeometry`.

## Implementation steps

### 1. Install dependencies

```bash
npm install three three-stdlib jszip occt-import-js
```

`three-stdlib` provides the loaders and `mergeBufferGeometries`. `jszip` reads
the `.3mf` container. `occt-import-js` ships a JS file plus a ~7.6MB `.wasm`.

### 2. Host the OpenCASCADE WASM

The WASM must be served as a static asset. Copy it from the package into your
public/static dir (do this on `postinstall` so it tracks the package version):

```jsonc
// package.json
"scripts": {
  "copy:wasm": "node -e \"require('fs').mkdirSync('public/wasm',{recursive:true});require('fs').copyFileSync('node_modules/occt-import-js/dist/occt-import-js.wasm','public/wasm/occt-import-js.wasm')\"",
  "postinstall": "npm run copy:wasm"
}
```

Reference it via `locateFile` (see step 4). Gitignore the generated copy.

### 3. Production-extension-aware `.3mf` loader

Create `load3mfGeometry.ts`. It parses **every** `*.model` part, then resolves
each build item by walking components across parts (selecting the part via
`p:path`) and accumulating transforms.

```ts
import * as THREE from "three";
import { mergeBufferGeometries } from "three-stdlib";
import JSZip from "jszip";

const PRODUCTION_NS =
  "http://schemas.microsoft.com/3dmanufacturing/production/2015/06";
const MODEL_REL_TYPE =
  "http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel";

interface MeshData { positions: Float32Array; indices: number[]; }
interface ComponentRef { path: string | null; objectId: string; transform: THREE.Matrix4 | null; }
interface ObjectDef { mesh?: MeshData; components?: ComponentRef[]; }
interface BuildItem { path: string | null; objectId: string; transform: THREE.Matrix4 | null; }
interface ParsedModel { objects: Map<string, ObjectDef>; build: BuildItem[]; }

const normalizePartPath = (p: string): string => p.replace(/^\/+/, "");

// 3MF stores a 4x3 row-vector affine as 12 numbers. This mapping makes
// three.js's column-vector applyMatrix4 produce the same result as the
// 3MF spec's row-vector v*M, so dimensions stay correct.
function parseTransform(transform: string): THREE.Matrix4 {
  const t = transform.trim().split(/\s+/).map(Number);
  const m = new THREE.Matrix4();
  m.set(
    t[0], t[3], t[6], t[9],
    t[1], t[4], t[7], t[10],
    t[2], t[5], t[8], t[11],
    0, 0, 0, 1,
  );
  return m;
}

function getProductionPath(el: Element): string | null {
  return el.getAttribute("p:path") ?? el.getAttributeNS(PRODUCTION_NS, "path");
}

function parseMesh(meshNode: Element): MeshData {
  const positions: number[] = [];
  const vertexNodes = meshNode.querySelectorAll("vertices vertex");
  for (let i = 0; i < vertexNodes.length; i++) {
    const v = vertexNodes[i];
    positions.push(
      parseFloat(v.getAttribute("x") ?? "0"),
      parseFloat(v.getAttribute("y") ?? "0"),
      parseFloat(v.getAttribute("z") ?? "0"),
    );
  }
  const indices: number[] = [];
  const triangleNodes = meshNode.querySelectorAll("triangles triangle");
  for (let i = 0; i < triangleNodes.length; i++) {
    const tri = triangleNodes[i];
    indices.push(
      parseInt(tri.getAttribute("v1") ?? "0", 10),
      parseInt(tri.getAttribute("v2") ?? "0", 10),
      parseInt(tri.getAttribute("v3") ?? "0", 10),
    );
  }
  return { positions: new Float32Array(positions), indices };
}

function parseModelXml(text: string): ParsedModel {
  const doc = new DOMParser().parseFromString(text, "application/xml");
  const objects = new Map<string, ObjectDef>();

  const objectNodes = doc.querySelectorAll("resources object");
  for (let i = 0; i < objectNodes.length; i++) {
    const node = objectNodes[i];
    const id = node.getAttribute("id");
    if (!id) continue;

    const meshNode = node.querySelector("mesh");
    if (meshNode) { objects.set(id, { mesh: parseMesh(meshNode) }); continue; }

    const componentNodes = node.querySelectorAll("components component");
    if (componentNodes.length > 0) {
      const components: ComponentRef[] = [];
      for (let j = 0; j < componentNodes.length; j++) {
        const c = componentNodes[j];
        const objectId = c.getAttribute("objectid");
        if (!objectId) continue;
        const transform = c.getAttribute("transform");
        components.push({
          path: getProductionPath(c),
          objectId,
          transform: transform ? parseTransform(transform) : null,
        });
      }
      objects.set(id, { components });
    }
  }

  const build: BuildItem[] = [];
  const itemNodes = doc.querySelectorAll("build item");
  for (let i = 0; i < itemNodes.length; i++) {
    const item = itemNodes[i];
    const objectId = item.getAttribute("objectid");
    if (!objectId) continue;
    const transform = item.getAttribute("transform");
    build.push({
      path: getProductionPath(item),
      objectId,
      transform: transform ? parseTransform(transform) : null,
    });
  }

  return { objects, build };
}

function resolveObject(
  models: Map<string, ParsedModel>,
  partPath: string,
  objectId: string,
  worldMatrix: THREE.Matrix4,
  out: THREE.BufferGeometry[],
  depth: number,
): void {
  if (depth > 32) return; // cyclic-reference guard
  const obj = models.get(partPath)?.objects.get(objectId);
  if (!obj) return;

  if (obj.mesh) {
    if (obj.mesh.positions.length === 0) return;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(obj.mesh.positions, 3));
    if (obj.mesh.indices.length > 0) g.setIndex(obj.mesh.indices);
    g.applyMatrix4(worldMatrix);
    out.push(g.index ? g.toNonIndexed() : g); // uniform layout for merge
    return;
  }

  for (const comp of obj.components ?? []) {
    const childPath = comp.path ? normalizePartPath(comp.path) : partPath;
    const childMatrix = worldMatrix.clone();
    if (comp.transform) childMatrix.multiply(comp.transform);
    resolveObject(models, childPath, comp.objectId, childMatrix, out, depth + 1);
  }
}

export async function load3mfGeometry(buffer: ArrayBuffer): Promise<THREE.BufferGeometry> {
  const zip = await JSZip.loadAsync(buffer);

  // Resolve the root model part from _rels/.rels, fall back to convention.
  let rootPath = "3D/3dmodel.model";
  const relsFile = zip.file("_rels/.rels");
  if (relsFile) {
    const relsDoc = new DOMParser().parseFromString(await relsFile.async("string"), "application/xml");
    const rels = relsDoc.querySelectorAll("Relationship");
    for (let i = 0; i < rels.length; i++) {
      const target = rels[i].getAttribute("Target");
      if (target && rels[i].getAttribute("Type") === MODEL_REL_TYPE) {
        rootPath = normalizePartPath(target);
        break;
      }
    }
  }

  // Parse every model part, keyed by normalized path.
  const models = new Map<string, ParsedModel>();
  const modelPaths = Object.keys(zip.files).filter((n) => /\.model$/i.test(n));
  await Promise.all(modelPaths.map(async (name) => {
    models.set(normalizePartPath(name), parseModelXml(await zip.files[name].async("string")));
  }));

  const root = models.get(rootPath);
  if (!root) throw new Error("3MF: root model part not found");

  const geometries: THREE.BufferGeometry[] = [];
  for (const item of root.build) {
    const itemPath = item.path ? normalizePartPath(item.path) : rootPath;
    const matrix = item.transform ? item.transform.clone() : new THREE.Matrix4();
    resolveObject(models, itemPath, item.objectId, matrix, geometries, 0);
  }
  if (geometries.length === 0) throw new Error("3MF file contained no renderable geometry");

  const merged = geometries.length > 1 ? mergeBufferGeometries(geometries, false) : geometries[0];
  const finalGeometry = merged ?? geometries[0];
  finalGeometry.computeVertexNormals();
  return finalGeometry;
}
```

### 4. STEP/STP loader via OpenCASCADE WASM

Create `loadStepGeometry.ts`. Lazy-load the WASM so it stays out of the main
bundle and only downloads when a STEP file is opened.

```ts
import * as THREE from "three";
import { mergeBufferGeometries } from "three-stdlib";

interface OcctAttr { array: number[]; }
interface OcctMesh { attributes: { position: OcctAttr; normal?: OcctAttr }; index?: OcctAttr; }
interface OcctResult { success: boolean; meshes: OcctMesh[]; }
interface OcctModule { ReadStepFile(buf: Uint8Array, params: Record<string, unknown> | null): OcctResult; }
type OcctFactory = (arg?: { locateFile?: (p: string) => string }) => Promise<OcctModule>;

const WASM_URL = "/wasm/occt-import-js.wasm";
let occtPromise: Promise<OcctModule> | null = null;

function getOcct(): Promise<OcctModule> {
  if (!occtPromise) {
    occtPromise = import("occt-import-js").then((mod) => {
      const factory = ((mod as { default?: OcctFactory }).default ?? (mod as unknown)) as OcctFactory;
      return factory({ locateFile: () => WASM_URL });
    });
  }
  return occtPromise;
}

// occt reads the unit declared in the STEP file and emits true millimeters
// (its default linearUnit), so no scaling heuristic is needed or wanted.
export async function loadStepGeometry(bytes: Uint8Array): Promise<THREE.BufferGeometry> {
  const occt = await getOcct();
  const result = occt.ReadStepFile(bytes, null);
  if (!result?.success || !result.meshes?.length) throw new Error("Failed to parse STEP file");

  const geometries: THREE.BufferGeometry[] = [];
  for (const mesh of result.meshes) {
    const positions = mesh.attributes?.position?.array;
    if (!positions?.length) continue;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const normals = mesh.attributes.normal?.array;
    if (normals?.length) g.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
    if (mesh.index?.array?.length) g.setIndex(mesh.index.array);
    geometries.push(g);
  }
  if (geometries.length === 0) throw new Error("STEP file contained no renderable geometry");

  const merged = geometries.length > 1 ? mergeBufferGeometries(geometries, false) : geometries[0];
  const finalGeometry = merged ?? geometries[0];
  if (!finalGeometry.getAttribute("normal")) finalGeometry.computeVertexNormals();
  return finalGeometry;
}
```

`occt-import-js` ships no types — add an ambient declaration so TypeScript is
happy with the dynamic import:

```ts
// occt-import-js.d.ts
declare module "occt-import-js" {
  const occtimportjs: (arg?: { locateFile?: (p: string) => string }) => Promise<unknown>;
  export default occtimportjs;
}
```

### 5. Wire into the viewer's format dispatch

Branch on the file extension. STL/OBJ/AMF use the stock loaders; 3MF and
STEP/STP use the helpers above. `fileBuffer` is the uploaded file as an
`ArrayBuffer` (e.g. from `await file.arrayBuffer()`).

```ts
import { STLLoader, OBJLoader, AMFLoader } from "three-stdlib";
import { load3mfGeometry } from "./load3mfGeometry";
import { loadStepGeometry } from "./loadStepGeometry";

async function loadGeometry(file: File): Promise<THREE.BufferGeometry> {
  const ext = file.name.split(".").pop()?.toLowerCase();
  const buffer = await file.arrayBuffer();

  if (ext === "stl") return new STLLoader().parse(buffer);
  if (ext === "obj") {
    const obj = new OBJLoader().parse(new TextDecoder().decode(buffer));
    return mergeMeshes(obj); // traverse children, merge mesh geometries
  }
  if (ext === "amf") return mergeMeshes(new AMFLoader().parse(buffer));
  if (ext === "3mf") return load3mfGeometry(buffer);
  if (ext === "step" || ext === "stp") return loadStepGeometry(new Uint8Array(buffer));
  throw new Error("Unsupported file type");
}
```

`OBJLoader`/`AMFLoader` return an `Object3D`/`Group`; flatten it by traversing
for `isMesh` children, cloning each `geometry`, applying `mesh.matrixWorld`, and
merging with `mergeBufferGeometries`.

## Gotchas

- **DOMParser + querySelector** in the 3MF loader run in the browser only. For
  SSR frameworks, ensure this code path executes client-side (e.g. a client
  component / dynamic import with SSR disabled).
- **3MF transforms matter for dimensions.** If you read bounding-box size off
  the geometry, apply the build-item and component transforms (the loader above
  does). Flips/translations don't change extents, but rotation/scale do.
- **Don't "normalize" STEP units with a size heuristic.** occt already emits
  millimeters. Scaling small parts by a guessed factor corrupts their real size.
- **Keep the WASM lazy.** Importing `occt-import-js` statically pulls ~7.6MB into
  your main bundle. The dynamic `import()` above loads it only on first STEP open.
- **Mesh shading.** Slicer meshes are dense; flat per-face normals
  (`toNonIndexed()` + `computeVertexNormals()`) look fine and keep merges simple.

## Verify

1. Open one file of each type: `.stl`, `.obj`, `.3mf` (use a **Bambu/Orca/Prusa
   exported** project file, not just a hand-authored one), `.amf`, `.step`,
   `.stp`. Each should render.
2. Confirm reported dimensions are sane (e.g. a known part's mm size).
3. In DevTools → Network, confirm `occt-import-js.wasm` is fetched only when a
   STEP/STP file is opened, not on initial page load.
