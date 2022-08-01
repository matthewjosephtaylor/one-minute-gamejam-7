import { iff } from "@mjtdev/object";
import { Body } from "matter-js";
import { BodySpec } from "./type/BodySpec";

export const updateBody = (body: Body, options: BodySpec) => {
  const { isStatic, label, frictionAir, mass, density } = options;
  iff(isStatic, (value) => {
    body.isStatic = value;
  });
  iff(label, (value) => {
    body.label = value;
  });
  iff(frictionAir, (value) => {
    body.frictionAir = frictionAir;
  });
  iff(mass, (value) => {
    Body.setMass(body, value);
  });
  iff(density, (value) => {
    Body.setDensity(body, value);
  });
};
