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

function animate() {
    requestAnimationFrame(animate);
    
    ciambella.rotation.x += 0.01;
    ciambella.rotation.y += 0.005;
    ciambella.rotation.z += 0.01;

    logo.rotation.x += 0.01;
    logo.rotation.y += 0.01;
    logo.rotation.z += 0.01;

    camera.position.z = getScrollPercent() * 0.7 + 30;

    renderer.render(scene, camera);
}

function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

animate();
