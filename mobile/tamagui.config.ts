
import { createTamagui } from 'tamagui'
import * as themes from './src/themes/theme'
import tamaguiThemes from '@tamagui/config/v3'

export const tamaguiConfig = createTamagui({ ...tamaguiThemes, themes })

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
    interface TamaguiCustomConfig extends Conf { }
}
