import * as THREE from 'three';
import { lightPosition } from 'three/src/nodes/TSL.js';
import { OrbitControls, ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js';
import { color } from 'three/tsl';
import { AmbientLight, PointLightHelper } from 'three/webgpu';
import GUI from 'lil-gui';

const sizes = {
    width: 800,
    height: 600
}

const cursor = {x:0, y:0}

window.addEventListener('mousemove', (event)=>{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -(event.clientY / sizes.height - 0.5)
})

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x202020)

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1,5,5,5),
    new THREE.MeshBasicMaterial({color:0xff0000, wireframe: true})
)
scene.add(mesh)

// const camera = new THREE.PerspectiveCamera(
//    75, // Field of view in degrees
//     sizes.width/sizes.height, // aspect ratio
//    0.1, // near clipping plane
//    100 // far clipping plane

// )

//Orthographic camera

const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(
    -1*aspectRatio, // left
    1*aspectRatio, //right
    1,//top
    -1, //bottom
)


camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(sizes.width,sizes.height)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true






const animate = () =>{
    controls.update()
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}

animate()

window.addEventListener('resize', ()=>{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect= sizes.width / sizes.height 
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
})


