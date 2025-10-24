import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa9d0a3);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-30, 50, -50);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05; 
controls.target.set(0, 0, 0);

controls.minDistance = 10;         
controls.maxDistance = 150;        
controls.maxPolarAngle = Math.PI / 2.1; // prevent flipping under the ground

controls.update();


// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.10);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(60, 100, 40);
dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 250;
dirLight.shadow.camera.left = -100;
dirLight.shadow.camera.right = 100;
dirLight.shadow.camera.top = 100;
dirLight.shadow.camera.bottom = -100;



scene.add(dirLight);

// Ground
const groundGeo = new THREE.PlaneGeometry(100, 100);
const groundMat = new THREE.MeshLambertMaterial({ color: 0x8ecf73 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Helpers

function createBuilding(x, z, w, h, d, color = 0xb0b0b0, rotationY = 0) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshPhongMaterial({ 
    color,
    shininess: 80,       
    specular: 0x999999,
});
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, h / 2, z);
  mesh.rotation.y = rotationY; 
  mesh.castShadow = true;
  scene.add(mesh);
}

function createTree(x, z) {
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 2),
    new THREE.MeshLambertMaterial({ color: 0x8b5a2b })
  );
  trunk.position.set(x, 1, z);
  const leaves = new THREE.Mesh(
    new THREE.ConeGeometry(1.5, 3, 8),
    new THREE.MeshLambertMaterial({ color: 0x2e8b57 })
  );
  leaves.position.set(x, 3, z);
  scene.add(trunk, leaves);
}


function createRoad(x, z, w, d, rotationY = 0) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.8,
        metalness: 0.2, 


    })
  );
  mesh.rotation.x = -Math.PI / 2; 
  mesh.rotation.z = rotationY;     
  mesh.position.set(x, 0.01, z);
  scene.add(mesh);
}


createRoad(0, 5, 85, 6, Math.PI / 2);   
createRoad(-10, 3, 65, 6, -Math.PI / 1.1);  
createRoad(-7, -7, 30, 3, -Math.PI / 5.3);
createRoad(-20, -20, 12, 3, -Math.PI / 2);


const circle = new THREE.Mesh(
  new THREE.CircleGeometry(5, 32),
  new THREE.MeshLambertMaterial({ color: 0x555555 })
);
circle.rotation.x = -Math.PI / 2;
circle.position.y = 0.02;
scene.add(circle);

// Buildings
createBuilding(-22, -3, 10, 8, 9, 0xffffff,Math.PI / 0.92); // fakulteti CSS maybe ?
createBuilding(10, 20, 8, 5, 25, 0xdedede); //815
createBuilding(-8, -20, 15, 8, 9, 0xc0c0c0,Math.PI / 2); // IT support
createBuilding(11, -12, 10, 8, 9, 0xe0e0e0,Math.PI / 9.3); // Faculteti CST

createBuilding(23, 0, 2, 3, 100, 0xdedede); // Murri

// Trees
createTree(-15, 10);
createTree(15, 3);

createTree(20, -15);
createTree(-8, 20);
createTree(-35, 3);

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
