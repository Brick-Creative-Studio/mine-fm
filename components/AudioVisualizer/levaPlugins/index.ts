import { createPlugin } from 'leva/plugin'
import { AudioFileInputComponent } from './audioFileInput/AudioFileInput'
import { normalize, sanitize } from './plugin'

export const audioFileInput = createPlugin({
    normalize,
    sanitize,
    component: AudioFileInputComponent,
})