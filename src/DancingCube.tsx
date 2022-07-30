import {
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from "babylonjs";
import React, { useEffect, useRef } from "react";
import { createEngine } from "./engine/createEngine";

export const DancingCube = () => {
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const engine = createEngine();

    const canvas = engine.getRenderingCanvas();

    const {
      alpha = 0,
      beta = 0,
      radius = 2,
      target = new Vector3(0, 0, 0),
    } = {};

    const scene = new Scene(engine);

    const camera = new ArcRotateCamera(
      "camera",
      alpha,
      beta,
      radius,
      target,
      scene
    );

    const light = new HemisphericLight("light", new Vector3(1, 1, 1), scene);
    // Meshes.getSphere(scene, "sphere", {
    //   radius: 0.5,
    // });
    const { width = 1, height = 1, depth = 1, colors = "red" } = {};
    const mesh = MeshBuilder.CreateBox(
      "box",
      {
        width,
        height,
        depth,
        // faceColors: isDefined(colors) ? colors.map(c4) : undefined,
      },
      scene
    );

    // hide/show the Inspector
    canvas.addEventListener("keydown", (ev) => {
      // Shift+Ctrl+Alt+I
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    });

    // run the main render loop
    engine.runRenderLoop(() => {
      mesh.rotate(new Vector3(1, 1, 1), 0.01);
      scene.render();
    });

    // const camera = Cameras.getArcRotateCamera(scene, "Camera", {});

    ref.current.append(canvas);
  }, []);

  return <div ref={ref}></div>;
};
