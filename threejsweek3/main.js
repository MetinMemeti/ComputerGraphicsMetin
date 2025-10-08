import * as THREE from 'three';
import { lightPosition } from 'three/src/nodes/TSL.js';
import { color } from 'three/tsl';
import { AmbientLight } from 'three/webgpu';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z=7;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,innerHeight);
document.body.appendChild(renderer.domElement);

const geometry =new THREE.CylinderGeometry(1,1,2,10);
const material = new THREE.MeshStandardMaterial({
    
    color:0x8844ff, // purple diffuse bar
    metalness:0.4, // Controls how reflective the surface is
    roughness:0.3,  // Controls smoothness, lower more mirror like
    emissive: 0x220044, //Adds a faint glow
    //specular: 0x000000
    shininess: 100

});

const cubeMesh = new THREE.Mesh(geometry,material);

scene.add(cubeMesh);
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);


const lighthelper = new THREE.DirectionalLightHelper(light, 0.5);
scene.add(lighthelper)

ambientLight.intensity = 0.4;
light.intensity = 1.2;

function animate(){
    requestAnimationFrame(animate);
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.y += 0.01;
    renderer.render(scene,camera);

}
animate();