import * as THREE from 'three/webgpu';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export async function loadAssetFromFile(filepath){
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync( filepath );
    return gltf;
}

export async function setupRenderer(container){
    const renderer = new THREE.WebGPURenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    await renderer.init();
    return renderer;
}