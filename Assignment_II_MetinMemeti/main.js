import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa9d0a3);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
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
controls.maxPolarAngle = Math.PI / 2.1;
controls.update();


const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
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


const textureLoader = new THREE.TextureLoader();


const grassTexture = textureLoader.load('./assets/textures/grass.jpg');
grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(10, 10);


const roadTexture = textureLoader.load('./assets/textures/road.jfif');
roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
roadTexture.repeat.set(4, 1);


const buildingTexture = textureLoader.load('./assets/textures/building.jpg');
buildingTexture.wrapS = buildingTexture.wrapT = THREE.RepeatWrapping;
buildingTexture.repeat.set(1, 1);

const buildingTexture1 = textureLoader.load('./assets/textures/building1.jpg');
buildingTexture1.wrapS = buildingTexture1.wrapT = THREE.RepeatWrapping;
buildingTexture1.repeat.set(1, 1);


const groundGeo = new THREE.PlaneGeometry(100, 100);
const groundMat = new THREE.MeshLambertMaterial({ map: grassTexture });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);


function createBuilding(x, z, w, h, d, options = {}) {
  const { color = 0xb0b0b0, rotationY = 0, texture = null, name = "Building" } = options;
  const matOptions = { color, shininess: 80, specular: 0x999999 };
  if (texture) matOptions.map = texture;

  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = new THREE.MeshPhongMaterial(matOptions);
  const mesh = new THREE.Mesh(geo, mat);

  mesh.position.set(x, h / 2, z);
  mesh.rotation.y = rotationY;
  mesh.castShadow = true;
  mesh.name = name; 
  scene.add(mesh);

  return mesh;
}


function addGlassFacade(buildingMesh, widthRatio = 0.9, heightRatio = 0.9) {
  const size = new THREE.Vector3();
  buildingMesh.geometry.computeBoundingBox();
  buildingMesh.geometry.boundingBox.getSize(size);

  const w = size.x * widthRatio;
  const h = size.y * heightRatio;
  const d = 0.05; // thin glass panel

  const material = new THREE.MeshPhongMaterial({
    color: 0x88ccee,
    transparent: true,
    opacity: 0.4,
    shininess: 100,
  });

  const buildingPos = buildingMesh.position.clone();

  // Front and back
  for (let dir of [1, -1]) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    panel.position.copy(buildingPos);
    panel.position.z += dir * (size.z / 2 + d / 2 + 0.01);
    panel.castShadow = true;
    scene.add(panel);
  }

  // Left and right
  for (let dir of [1, -1]) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(d, h, size.z * widthRatio), material);
    panel.position.copy(buildingPos);
    panel.position.x += dir * (size.x / 2 + d / 2 + 0.01);
    panel.castShadow = true;
    scene.add(panel);
  }
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
    new THREE.MeshStandardMaterial({ map: roadTexture })
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


const buildingA = createBuilding(-22, -3, 10, 8, 9, { texture: buildingTexture, name: "804" });
addGlassFacade(buildingA);

const buildingB = createBuilding(11, -12, 10, 8, 9, { texture: buildingTexture, name: "805" });
addGlassFacade(buildingB);

const buildingC = createBuilding(10, 20, 8, 5, 25, { texture: buildingTexture1, name: "814" });
addGlassFacade(buildingC, 0.8, 0.8);

createBuilding(-8, -20, 15, 8, 9, { color: 0xc0c0c0, rotationY: Math.PI / 2, name: "IT Support" });
createBuilding(23, 0, 2, 3, 100, { color: 0xdedede, name: "Other Building" });


createTree(-15, 10);
createTree(15, 3);
createTree(20, -15);
createTree(-8, 20);
createTree(-35, 3);


const loader = new GLTFLoader();
let student;
const checkpoints = [
  new THREE.Vector3(-10, 0, -5),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(10, 0, 5),
  new THREE.Vector3(5, 0, 15),
];
let currentCheckpoint = 0;

loader.load(
  './assets/models/student.glb',
  (gltf) => {
    student = gltf.scene;
    student.scale.set(3, 3, 3); 
    student.position.copy(checkpoints[0]);
    scene.add(student);
  },
  undefined,
  (error) => console.error('Error loading student model:', error)
);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    if (clickedObject.name) {
      alert("You clicked on: " + clickedObject.name);
    }
  }
});


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


function animate() {
  requestAnimationFrame(animate);

  if (student) {
    const target = checkpoints[currentCheckpoint];
    const direction = new THREE.Vector3().subVectors(target, student.position);
    const distance = direction.length();
    direction.normalize();

    if (distance > 0.1) {
      student.position.add(direction.multiplyScalar(0.1));
      student.lookAt(target);
    } else {
      currentCheckpoint = (currentCheckpoint + 1) % checkpoints.length;
    }
  }

  controls.update();
  renderer.render(scene, camera);
}
animate();
