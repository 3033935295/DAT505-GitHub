//Global variables
var scene, camera, renderer;
var geometry, material, mesh;
var texture = new THREE.TextureLoader().load('textures/1.jpg');
var material1 = new THREE.MeshBasicMaterial( { map: texture } );

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#8B6914");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry = new THREE.CircleGeometry( 120, 32 );
  mesh = new THREE.Mesh( geometry, material8 );
  mesh.position.z = -600;

  // Add mesh to scene
  scene.add( mesh );

  geometry = new THREE.BoxGeometry(100, 100, 100);
  material = new THREE.MeshBasicMaterial( { wireframe:true,color: "#8B6914" } );
  mesh1 = new THREE.Mesh( geometry, material );
  mesh1.position.z = -400;

  // Add mesh to scene
  scene.add( mesh1 );
  geometry = new THREE.SphereBufferGeometry( 40, 32, 32 );
    material = new THREE.MeshBasicMaterial( { color: "#8B6914" } );
  sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );
  sphere.position.z = -400;
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.z += 0.01; //Continuously rotate the mesh


  renderer.setClearColor("#8B6914");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
