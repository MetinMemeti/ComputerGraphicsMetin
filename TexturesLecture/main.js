// import * as THREE from 'three';
// import { lightPosition } from 'three/src/nodes/TSL.js';
// import { color } from 'three/tsl';
// import { AmbientLight } from 'three/webgpu';

// const scene = new THREE.Scene()

// const material1 = new THREE.MeshStandardMaterial(
//     {color: 0xff23ff}
// )
// const material2 = new THREE.MeshLambertMaterial(
//     {color: 0xffffff, transparent: true, opacity:0.1}
// )

// const cube = new THREE.BoxGeometry(4,2,5)
// const sphere = new THREE.SphereGeometry(2,32,32)

// const cubeMesh = new THREE.Mesh(cube,material1)
// scene.add(cubeMesh)

// const sphereMesh = new THREE.Mesh(sphere, material2)
// scene.add(sphereMesh)


// cubeMesh.position.x = 5

// sphereMesh.position.y = 8
// //-__-----------
// cubeMesh.rotation.y= 0.7

// //sphereMesh.scale.y=5

// const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
// camera.position.z = 15

// scene.add(camera)

// const light = new THREE.AmbientLight(0xffffff,1)
// scene.add(light)

// const renderer = new THREE.WebGLRenderer({antialias: true})
// renderer.setSize(window.innerWidth,window.innerHeight)
// document.body.appendChild(renderer.domElement)

// function animate(){
//     requestAnimationFrame(animate)
//     renderer.render(scene,camera)
// }
// animate()


