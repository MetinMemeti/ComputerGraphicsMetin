import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { lightPosition } from 'three/src/nodes/TSL.js';
import { color, metalness, shininess } from 'three/tsl';
import { AmbientLight } from 'three/webgpu';
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x303030);

    
    const camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.set(4, 4, 6);
    camera.lookAt(0, 0, 0);

    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff8800, 0.6);
    pointLight.position.set(-4, 3, -2);
    scene.add(pointLight);

    
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x9FB62C,
      roughness: 0.8
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // make it horizontal
    scene.add(plane);

//     const material = new THREE.MeshStandardMaterial({
    
//     color:0x8844ff, // purple diffuse bar
//     metalness:0.4, // Controls how reflective the surface is
//     roughness:0.3,  // Controls smoothness, lower more mirror like
//     emissive: 0x220044, //Adds a faint glow
//     //specular: 0x000000
//     shininess: 100

// });
  
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff3333,
      metalness: 0.85
    });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-2, 0.5, 0);
    scene.add(cube);

    
    const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
   
   
    const sphereMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x33ff33,
      shininess: 100,
      emissive: 0x220044
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0.7, 0);
    scene.add(sphere);

  
    const coneGeometry = new THREE.ConeGeometry(0.6, 1.5, 32);
    
    const coneMaterial = new THREE.MeshLambertMaterial({ color: 0x3333ff });
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    
    cone.position.set(2, 0.75, 0);
    scene.add(cone);

    
    function animate() {
      requestAnimationFrame(animate);

      
      cube.rotation.y += 0.01;
      sphere.rotation.y += 0.01;
      cone.rotation.y += 0.01;

      renderer.render(scene, camera);
    }
    animate();

   
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });