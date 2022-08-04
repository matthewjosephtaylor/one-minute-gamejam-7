import { Synth, Sampler } from "tone";

export type SoundCtx = {
  synths: { [k in string]: Synth };
  samplers: { [k in string]: Sampler };
};
