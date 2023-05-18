var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(WIDTH, HEIGHT);
renderer.setClearColor(0xDDDDDD, 1);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT);//camara

camera.position.x = 50;
camera.position.y = 50;
camera.position.z = 50;

camera.rotation.set(0, 0, 0);
scene.add(camera);

var controls = new THREE.OrbitControls(camera, renderer.domElement);//orbitcontrols
// Función para crear una pirámide recortada de base poligonal
function crearPiramide(baseInferior, baseSuperior, altura, numLados,color) {
  // Crear el objeto de la geometría de la pirámide
  const geometry = new THREE.CylinderGeometry(baseInferior, baseSuperior, altura, numLados,color);

  // Crear un material para la pirámide (puedes cambiar el color según tus necesidades)
  const material = new THREE.MeshBasicMaterial({ color:color });

  // Crear el objeto de la malla (pirámide) utilizando la geometría y el material
  const piramide = new THREE.Mesh(geometry, material);

  // Devolver la pirámide creada
  return piramide;
}

// Variables para las medidas de las pirámides
const medidasPiramide = [
  { baseInferior: 10, baseSuperior: 20, altura: 8, numLados: 4,color: 0xCC0000 },  // Pirámide 1
  { baseInferior: 10, baseSuperior: 20, altura: 8, numLados: 4,color: 0xCC6600 },  // Pirámide 2
  { baseInferior: 10, baseSuperior: 20, altura: 8, numLados: 4,color: 0x66CC00 },  // Pirámide 3
  { baseInferior: 10, baseSuperior: 20, altura: 8, numLados: 4,color: 0x00FF80 },  // Pirámide 4
  { baseInferior: 10, baseSuperior: 20, altura: 8, numLados: 4,color: 0x0066CC },  // Pirámide 5
  { baseInferior: 10, baseSuperior: 20, altura: 8, numLados: 4,color: 0x0000CC },  // Pirámide 6
  { baseInferior: 10, baseSuperior: 20, altura: 8, numLados: 4,color: 0x4C0099 },  // Pirámide 7
  { baseInferior: 10, baseSuperior: 20, altura: 8, numLados: 4,color: 0xFF007F },  // Pirámide 8
  
];


// Posiciones de las pirámides
const posicionesPiramides = [
  { x: 0, y: 0, z: 5 },  // Pirámide 1
  { x: 2, y: 0, z: 5 },  // Pirámide 2
  { x: 4, y: 0, z: 5 },  // Pirámide 3
  { x: 6, y: 0, z: 5 },  // Pirámide 4
  { x: 0, y: 0, z: 3 },  // Pirámide 5
  { x: 2, y: 0, z: 3 },  // Pirámide 6
  { x: 4, y: 0, z: 3 },  // Pirámide 7
  { x: 6, y: 0, z: 3 },  // Pirámide 8
];

// Crear y colocar las pirámides en el escenario
for (let i = 0; i < medidasPiramide.length; i++) {
  const piramideParams = medidasPiramide[i];
  const posicion = posicionesPiramides[i];

  const piramide = crearPiramide(piramideParams.baseInferior, piramideParams.baseSuperior, piramideParams.altura, piramideParams.numLados,piramideParams.color);
  piramide.position.set(posicion.x, posicion.y, posicion.z);

  scene.add(piramide);
}

const light = new THREE.DirectionalLight(0xCC99FF, 1); //furnte de luz
light.position.set(-1, 2, 4);
scene.add(light);

const size = 150; //tamaño cuadricula
const divisions = 160; //cuadrados cuadricula
const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(size, divisions); // lineas de eje
scene.add(gridHelper);

function render() { // render
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();




