import * as THREE from './three.module.js';
import { TextGeometry } from './jsm/geometries/TextGeometry.js';

//setup scena e camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#background-canvas")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//setup eventi
window.addEventListener( 'resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}, false);

document.body.addEventListener('wheel', (e) => {
    camera.position.z += e.deltaY * -0.01;
});

//setup luce
const light = new THREE.AmbientLight(0xFFFFFF);
scene.add(light);

const textureLoader = new THREE.TextureLoader();

//sfondo
const texture_sfondo = textureLoader.load("./Assets/Textures/background.jpg");
scene.background = texture_sfondo;

//ciambella
const texture_ciambella = textureLoader.load("./Assets/Textures/ciambella.jpg");
const geometry_ciambella = new THREE.TorusGeometry(10, 3, 16, 100);
const material_ciambella = new THREE.MeshStandardMaterial({map: texture_ciambella});
const ciambella = new THREE.Mesh(geometry_ciambella, material_ciambella);

ciambella.position.x -= 15;

scene.add(ciambella);

//cubo logo
const texture_dressme = textureLoader.load("./Assets/Textures/dressme.png");
const geometry_logo = new THREE.BoxGeometry(10, 10, 10);
const material_logo = new THREE.MeshStandardMaterial({map: texture_dressme});
const logo = new THREE.Mesh(geometry_logo, material_logo);

logo.position.x += 15;

scene.add(logo);



function creaTesto3d(testo) {
    const material = new THREE.MeshPhongMaterial({
        color: 0xff0000, 
        specular: 0xffffff
    });

    const geometry = new THREE.TextGeometry(testo, {
        size: 50,
        height: 10,
        curveSegments: 12,
    
        bevelThickness: 1,
        bevelSize: 1,
        bevelEnabled: true
    });

    return new THREE.Mesh(geometry, material)
}


const testo1 = creaTesto3d("testo1");
testo1.setZ(40);
scene.add(testo1);

function animate() {
    requestAnimationFrame(animate);
    
    ciambella.rotation.x += 0.01;
    ciambella.rotation.y += 0.005;
    ciambella.rotation.z += 0.01;

    logo.rotation.x += 0.01;
    logo.rotation.y += 0.01;
    logo.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate();
