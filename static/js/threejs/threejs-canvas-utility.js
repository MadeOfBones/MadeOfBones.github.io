import * as THREE from 'three';

function utility(){}

utility.setupCanvasWindow = function(canvas, clearColor, alpha)
{
  //Create scene
  const scene = new THREE.Scene();
  scene.background = clearColor;

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

utility.addFullscreenThreejsCanvas = function() {
  const CANVAS_ID = "#threejs-fullscreen-canvas";
  var canvas = document.querySelector(CANVAS_ID);
  if(canvas !== null)
  {
    return canvas;
  }

  const container = document.querySelector("#threejs-fullscreen-container");
  canvas = document.createElement("canvas");
  canvas.id = CANVAS_ID;
  canvas.type = "canvas";
  canvas.innerText = "";
  canvas.style = "width:100%;height:100%";
  container.appendChild(canvas);

  return canvas;
}

export default utility;