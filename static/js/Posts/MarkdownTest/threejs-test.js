import * as THREE from 'three/webgpu'
import {
    Fn, uniform, varying, pass,
    cameraProjectionMatrix, modelViewMatrix, cameraViewMatrix,
    positionLocal, positionView, positionWorld, normalWorld,    
    vec3,
    normalize, saturate
} from 'three/tsl'
import * as SETUP from "/js/threejs/setup.js";
import { hash } from "/js/threejs/tsl/noise.js";
import { dotScreen } from "three/addons/tsl/display/DotScreenNode.js";

const ASSET_PATH = "/models/m_teapot.glb";
const TARGET_FRAME_TIME = 1/60;

let isInView = false;

// Fetch canvas container
const container = document.querySelector("#threejs-content-test");

// Create a clock for set FPS
const timer = new THREE.Timer();
let dt = 0;

// Scene objects
let renderer, renderPipeline, scene, camera, scenePass, postPass, directionalLight;

// Setup element resize
function onResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function createMaterial(){
    const lightDirWS = uniform(normalize(directionalLight.position).mul(-1));

    const varHashColor = varying(vec3(0));

    const vertexFn = Fn(() => {
        //Same result
        //const positionCS = cameraProjectionMatrix.mul( modelViewMatrix ).mul( positionLocal );
        //const positionCS = cameraProjectionMatrix.mul( cameraViewMatrix ).mul( positionWorld );
        const positionCS = cameraProjectionMatrix.mul( positionView );
        
        varHashColor.assign(hash(positionWorld));

        return positionCS;
    });

    const fragmentFn = Fn(() => {
        const normalWS = normalWorld;
        const diffuse = saturate(normalWS.dot(lightDirWS.mul(-1)).mul(0.5).add(0.5)).mul(varHashColor);
        return diffuse;
    });

    const material = new THREE.MeshBasicNodeMaterial();

    material.vertexNode = vertexFn();
    material.colorNode = fragmentFn();

    return material;
}

// Create scene
async function init(){
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#002211");
    renderer = await SETUP.setupRenderer(container);
    renderPipeline = new THREE.RenderPipeline(renderer);

    const asset = await SETUP.loadAssetFromFile(ASSET_PATH);

    // Fetch camera 
    camera = (asset.cameras && asset.cameras.length > 0) ? 
        asset.cameras[0] :
        new THREE.PerspectiveCamera(45, getAspect(container), 0.1, 10 );

    // Create Light
    directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Generate material
    const material = createMaterial();

    // Compile meshes
    let assetObjects = asset.scene.children;
    for(let i = 0; i < assetObjects.length; i++){
        let obj = assetObjects[i];
        if(obj.isMesh){
            let geometry = obj.geometry;
            let mesh = new THREE.Mesh(geometry, material);
            await renderer.compileAsync( mesh, camera, scene );
            scene.add( mesh );
        }
    }

    // Setup passes
    scenePass = pass(scene, camera);

    renderPipeline.outputNode = dotScreen(scenePass);
    renderPipeline.needsUpdate = true;

    // Add observers
    const intersectionObserver = new IntersectionObserver((entries) => {
        isInView = entries.some((element, index, array) => {
            return element.isIntersecting;
        });
    })
    const resizeObserver = new ResizeObserver(onResize);
    intersectionObserver.observe(container);
    resizeObserver.observe(container);

    // Set render loop
    renderer.setAnimationLoop(render);
}
await init();

function render() {
    if(!isInView) return;

    timer.update();
    dt += timer.getDelta();

    if(dt > TARGET_FRAME_TIME){
        dt = dt % TARGET_FRAME_TIME;
        renderPipeline.render();
    }
}