import { createSoundCtx } from "./createSoundCtx";
import { SoundSampleMap } from "./type/SoundSampleMap";
import { SoundSetup } from "./type/SoundSetup";

export type SoundSetupSpec = {
  sampleMap: SoundSampleMap;
};

export const setupSound = async (
  spec: Partial<SoundSetupSpec> = {}
): Promise<SoundSetup> => {
  // const clock = new Clock()
  return {
    ctx: await createSoundCtx(spec),

    // clock
  };
};
