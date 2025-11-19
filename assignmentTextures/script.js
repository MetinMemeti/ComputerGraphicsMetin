import * as THREE from 'three';

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 3

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('textures/brazuca11121.png')

texture.warpS = THREE.RepeatWrapping
texture.wrapT= THREE.RepeatWrapping
texture.repeat.set(1,4)

const material = new THREE.MeshBasicMaterial({
    map: texture
})
const ball = new THREE.Mesh(
    new THREE.SphereGeometry(1,16,16),
    material
)
scene.add(ball)

function animate(){
    requestAnimationFrame(animate)
    ball.rotation.x += 0.01
    renderer.render(scene,camera)
}

animate()