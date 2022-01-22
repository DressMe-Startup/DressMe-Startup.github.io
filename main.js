const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#background-canvas")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const light = new THREE.AmbientLight(0xFFFFFF);
light.position.set(5, 5, 5);
scene.add(light);

const textureLoader = new THREE.TextureLoader();
const texture_ciambella1 = textureLoader.load("./ciambella.jpg");
const texture_sfondo = textureLoader.load("./background.jpg");
const texture_dressme = textureLoader.load("./dressme.png");

scene.background = texture_sfondo;

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

const ciambella1_material = new THREE.MeshStandardMaterial({
    map: texture_ciambella1
});

const verde_material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: false
})

const ciambella1 = new THREE.Mesh(geometry, ciambella1_material);

scene.add(ciambella1);

ciambella1.position.x -= 15;

const dm_geometry = new THREE.BoxGeometry(10, 10, 10);
const dm_material = new THREE.MeshStandardMaterial( {map: texture_dressme} );
const cube = new THREE.Mesh( dm_geometry, dm_material );
scene.add( cube );


function animate() {
    requestAnimationFrame(animate);
    
    ciambella1.rotation.x += 0.01;
    ciambella1.rotation.y += 0.005;
    ciambella1.rotation.z += 0.01;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    
    renderer.render(scene, camera);
}

animate();
