import { Destination, loaded, Sampler, Synth } from 'tone'
import { Objects } from '../object/Objects'
import { SoundSetupSpec } from './setupSound'
import { SoundCtx } from './type/SoundCtx'

export const MAX_SYNTHS = 32
export const MAX_SAMPLERS = 32

export const createSoundCtx = async (spec: Partial<SoundSetupSpec> = {}): Promise<SoundCtx> => {
    const { sampleMap } = spec

    const synths = {
        normal: new Synth().toDestination()
    }

    const samplers = Objects.fromEntries(
        Objects.entries(sampleMap).map(([key, url]) => {
            const sampler = new Sampler({
                urls: {
                    C4: url
                },
                onload: () => {
                    // console.log("LOADED SAMPLES", sampleMap);
                },
                onerror: (error) => {
                    console.error(error)
                    console.error('ERROR LOADING SAMPLES', sampleMap)
                }
            }).toDestination()
            return [key, sampler]
        })
    )

    // const samplers = Array.from({ length: MAX_SAMPLERS }).map(() => {
    //   const sampler = new Sampler({
    //     urls: sampleMap,
    //     onload: () => {
    //       console.log("LOADED SAMPLES", sampleMap);
    //     },
    //     onerror: (error) => {
    //       console.error(error);
    //       console.error("ERROR LOADING SAMPLES", sampleMap);
    //     },
    //   }).toDestination();
    //   return sampler;
    // });
    const ctx: SoundCtx = {
        synths,
        samplers
    }
    Destination.volume.rampTo(-20)
    await loaded()
    return ctx
}
