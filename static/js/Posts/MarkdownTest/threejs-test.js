import * as THREE from 'three';
import utility from "/js/threejs/threejs-canvas-utility.js";

const canvas = document.querySelector("#threejs-window-canvas-test");
let {scene, renderer} = utility.setupCanvasWindow(canvas, 0xEEEEEE, 1.0);

// Create a camera
const camera = new THREE.PerspectiveCamera(20, 4/3, 0.1, 1000);
camera.position.z = 5;

// Create a clock for set FPS
const clock = new THREE.Clock();
const TARGET_FRAME_TIME = 1/60;
let dt = 0;

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function update(time)
{
    utility.resizeCanvasToDisplaySize(renderer, camera);
    requestAnimationFrame(update);

    dt += clock.getDelta();
    if(dt > TARGET_FRAME_TIME){
        // Rotate the cube
        const speed = 0.5;
        cube.rotation.x += speed * dt;
        cube.rotation.y += speed * dt;

        dt = dt % TARGET_FRAME_TIME;
        renderer.render(scene, camera);
    }
}

requestAnimationFrame(update);