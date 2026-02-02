import * as THREE from 'three';

function utility(){}

utility.setupCanvasWindow = function(canvasId, clearColor, alpha)
{
  //Create scene
  const scene = new THREE.Scene();
  scene.background = clearColor;

  //Fetch Canvas
  const canvas = document.querySelector(canvasId);

  // Create a renderer
  const renderer = new THREE.WebGLRenderer(
      {
          canvas: canvas,
          antialias: true,
          alpha: alpha < 1.0
      });
    renderer.setClearColor( clearColor, alpha );

  return {
    scene: scene,
    renderer: renderer
  };
}

utility.resizeCanvasToDisplaySize = function(renderer, camera)
{
    const width = renderer.domElement.clientWidth;
    const height = renderer.domElement.clientHeight;
    if (renderer.width !== width || renderer.height !== height) {
        
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}

export default utility;