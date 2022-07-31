// import { createEngine } from "./createEngine";
// import { createScene } from "./createScene";
// import { createVisual } from "./createVisual";
import { getBox } from './getBox'
// import { getBoxInstance } from "./getBoxInstance";
// import { getSphere } from "./getSphere";
import { pickMesh } from './pickMesh'
// import { setupSceneBasics } from "./setupSceneBasics";
// import { calcTopOfMeshWorldPosition } from "./calcTopOfMeshWorldPosition";
// import { walkMeshes } from "./walkMeshes";

// BS babylonjs 'magic'
// import "@babylonjs/core/Debug/debugLayer";
// import "@babylonjs/inspector";
// import 'babylonjs-inspector'
// import "babylonjs/Debug/debugLayer";

import { destroyMesh } from './destroyMesh'
import { findClosestPick } from './findClosestPick'
import { getMesh } from './getMesh'
import { getPlane } from './getPlane'
import { lookAt } from './lookAt'
import { pickMeshes } from './pickMeshes'
export const Meshes = {
    lookAt,
    getBox,
    getPlane,
    pickMesh,
    getMesh,
    findClosestPick,
    destroyMesh,
    pickMeshes
}
