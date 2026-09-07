import * as THREE from 'three/webgpu';
import {
    Fn,
    sin
} from 'three/tsl'

export const hash = /*@__PURE__*/ Fn( ( { seed } ) => {
    return seed.mul(21.3456).sin().mul(47453.5453).fract();
} );