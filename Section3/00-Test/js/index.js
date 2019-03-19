//Global variables
var scene, camera, renderer;
var geometry, material, mesh;
var texture = new THREE.TextureLoader().load('textures/1.jpg');
var material1 = new THREE.MeshBasicMaterial( { map: texture } );
var texture = new THREE.TextureLoader().load('textures/5.jpg');
var material2 = new THREE.MeshBasicMaterial( { map: texture } );
var texture = new THREE.TextureLoader().load('textures/6.jpg');
var material3 = new THREE.MeshBasicMaterial( { map: texture } );
var texture = new THREE.TextureLoader().load('textures/2.jpg');
var material4 = new THREE.MeshBasicMaterial( { map: texture } );

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#CDC673");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry = new THREE.CircleGeometry( 120, 32 );
  material = new THREE.MeshBasicMaterial( { color: "#FFC125" } );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -600;

  // Add mesh to scene
  scene.add( mesh );

  geometry = new THREE.SphereBufferGeometry( 30, 24, 32 );
  material = new THREE.MeshBasicMaterial( { wireframe:true,color: "#8B6914" } );
  mesh1 = new THREE.Mesh( geometry, material );
  mesh1.position.z = -400;


  // Add mesh to scene
  scene.add( mesh1 );
  geometry = new THREE.SphereBufferGeometry( 20, 16, 32 );
  //  material = new THREE.MeshBasicMaterial( { color: "#8B6914" } );
  sphere = new THREE.Mesh( geometry, material1 );
  scene.add( sphere );
  sphere.position.z = -400;

  geometry = new THREE.ConeGeometry( 50, 300, 32 );
  //material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  cone = new THREE.Mesh( geometry, material3 );
 scene.add( cone );
 cone.position.z = -400;
 cone.position.y = -60;

 geometry = new THREE.SphereBufferGeometry( 13, 8, 32 );
 material = new THREE.MeshBasicMaterial( { color: "#EEEED1" } );
 sphere1 = new THREE.Mesh( geometry, material );
 scene.add( sphere1 );
 sphere1.position.z = -400;
  sphere1.position.x = 120;
  sphere1.position.y = 90;

  geometry = new THREE.SphereBufferGeometry( 13, 8, 32 );
  material = new THREE.MeshBasicMaterial( {color: "#EEEED1" } );
  sphere1 = new THREE.Mesh( geometry, material );
  scene.add( sphere1 );
  sphere1.position.z = -400;
  sphere1.position.x = 132;
  sphere1.position.y = 90;

  geometry = new THREE.SphereBufferGeometry( 13, 8, 32 );
  material = new THREE.MeshBasicMaterial( { color: "#EEEED1" } );
  sphere1 = new THREE.Mesh( geometry, material );
  scene.add( sphere1 );
  sphere1.position.z = -400;
  sphere1.position.x = 144;
  sphere1.position.y = 90;

  geometry = new THREE.SphereBufferGeometry( 13, 8, 32 );
  material = new THREE.MeshBasicMaterial( { color: "#EEEED1" } );
  sphere1 = new THREE.Mesh( geometry, material );
  scene.add( sphere1 );
  sphere1.position.z = -400;
  sphere1.position.x = 130;
  sphere1.position.y = 100;

  geometry = new THREE.SphereBufferGeometry( 15,16, 32 );
  material = new THREE.MeshBasicMaterial( { color: "#EEEED1" } );
  sphere1 = new THREE.Mesh( geometry, material );
  scene.add( sphere1 );
  sphere1.position.z = -400;
   sphere1.position.x = -115;
   sphere1.position.y = 65;

   geometry = new THREE.SphereBufferGeometry( 15, 16, 32 );
   material = new THREE.MeshBasicMaterial( { color: "#EEEED1" } );
   sphere1 = new THREE.Mesh( geometry, material );
   scene.add( sphere1 );
   sphere1.position.z = -400;
   sphere1.position.x = -125;
   sphere1.position.y = 65;

   geometry = new THREE.SphereBufferGeometry(15, 16, 32 );
   material = new THREE.MeshBasicMaterial( { color: "#EEEED1" } );
   sphere1 = new THREE.Mesh( geometry, material );
   scene.add( sphere1 );
   sphere1.position.z = -400;
   sphere1.position.x = -140;
   sphere1.position.y = 65;

   geometry = new THREE.SphereBufferGeometry(15, 16, 32 );
   material = new THREE.MeshBasicMaterial( {color: "#EEEED1" } );
   sphere1 = new THREE.Mesh( geometry, material );
   scene.add( sphere1 );
   sphere1.position.z = -400;
   sphere1.position.x = -155;
   sphere1.position.y = 65;

   geometry = new THREE.SphereBufferGeometry( 15, 16, 32 );
   material = new THREE.MeshBasicMaterial( { color: "#EEEED1" } );
   sphere1 = new THREE.Mesh( geometry, material );
   scene.add( sphere1 );
   sphere1.position.z = -400;
   sphere1.position.x = -135;
   sphere1.position.y = 80;

   geometry = new THREE.SphereBufferGeometry( 15, 16, 32 );
   material = new THREE.MeshBasicMaterial( { color: "#EEEED1" } );
   sphere1 = new THREE.Mesh( geometry, material );
   scene.add( sphere1 );
   sphere1.position.z = -400;
   sphere1.position.x = -150;
   sphere1.position.y = 80;

   geometry = new THREE.ConeGeometry( 150, 130, 32 );
   material = new THREE.MeshBasicMaterial( {color: '#8B8B00'} );
   cone1 = new THREE.Mesh( geometry, material );
  scene.add( cone1 );
  cone1.position.z = -600;
  cone1.position.x = 120;
  cone1.position.y = -100;

  geometry = new THREE.ConeGeometry( 180, 170, 32 );
  material = new THREE.MeshBasicMaterial( {color: '#8B8B00'} );
  cone2 = new THREE.Mesh( geometry, material );
 scene.add( cone2 );
 cone2.position.z = -600;
 cone2.position.x = -150;
 cone2.position.y = -90;

 geometry = new THREE.ConeGeometry( 160, 180, 32 );
 material = new THREE.MeshBasicMaterial( {color: '#8B814C'} );
 cone2 = new THREE.Mesh( geometry, material );
scene.add( cone2 );
cone2.position.z = -800;
cone2.position.x = -400;
cone2.position.y = -140;

geometry = new THREE.ConeGeometry( 170, 150, 32 );
material = new THREE.MeshBasicMaterial( {color: '#8B814C'} );
cone2 = new THREE.Mesh( geometry, material );
scene.add( cone2 );
cone2.position.z = -800;
cone2.position.x = 370;
cone2.position.y = -140;
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.z += 0.01; //Continuously rotate the mesh
  mesh1.rotation.z += 0.01; //Continuously rotate the mesh
  mesh1.rotation.y += 0.01; //Continuously rotate the mesh
  mesh1.rotation.x += 0.01; //Continuously rotate the mesh
  renderer.setClearColor("#CDC673");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
