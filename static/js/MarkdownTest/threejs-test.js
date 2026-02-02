import * as THREE from 'three';
import utility from "/js/threejs/threejs-window-canvas.js";

let {scene, renderer} = utility.setupCanvasWindow("#threejs-window-canvas-test", 0xEEEEEE, 1.0);

// Create a camera
const camera = new THREE.PerspectiveCamera(20, 4/3, 0.1, 1000);
camera.position.z = 5;

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function animation(time)
{
    utility.resizeCanvasToDisplaySize(renderer, camera);

    // Rotate the cube
    const speed = 0.001;
    cube.rotation.x = speed * time;
    cube.rotation.y = speed * time;

    renderer.render(scene, camera);
    requestAnimationFrame(animation);
}

requestAnimationFrame(animation);