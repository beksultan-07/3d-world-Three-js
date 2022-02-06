const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 25
camera.position.y = 30

const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 5, 5, 5 );
scene.add( light );



// const size = 100;
// const divisions = 20;
// const gridHelper = new THREE.GridHelper( size, divisions );
// scene.add( gridHelper );

const bgScene = new THREE.TextureLoader().load("./images/space.jpg")
scene.background = bgScene


const moonTexture = new THREE.TextureLoader().load("./images/moon.jpg")
const moon = new THREE.Mesh(
    new THREE.SphereGeometry( 3, 32, 16 ),
    new THREE.MeshBasicMaterial( {
        map: moonTexture
    } )
)
moon.position.set(-20, 0 ,0)
scene.add(moon)


const earthTexture = new THREE.TextureLoader().load("./images/Earth.jpg")
const earth = new THREE.Mesh(
    new THREE.SphereGeometry( 5, 32, 16 ),
    new THREE.MeshBasicMaterial( {
        map: earthTexture
    } )
)
scene.add(earth)


const controls = new THREE.OrbitControls(camera, renderer.domElement )
controls.update();

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  }


function addStars(num){
    for (let i = 0; i < num; i++) {
        const geometry = new THREE.SphereGeometry( .5, 32, 16 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00FFFFFF } );
        const sphere = new THREE.Mesh( geometry, material );
        
        sphere.position.set(getRandomNum(-100, 100), getRandomNum(-100, 100), getRandomNum(-100, 100))

        scene.add( sphere );   
    }
}
addStars(200)


var t = 0;
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera )
    controls.update();
    
    t += 0.01;   
    
    moon.position.x = 20 * Math.cos(t) + 0;
    moon.position.z = 20 * Math.sin(t) + 0; 

    moon.rotation.y += 0.03;
    moon.rotation.x += 0.03;

    earth.rotation.y += 0.005
    moon.rotation.x += 0.005
}

animate();