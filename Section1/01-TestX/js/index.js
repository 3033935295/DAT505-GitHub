//Global variables
var scene, camera, renderer;
var geometry1,geometry2,geometry3, material,material2,material3, mesh1,mesh2,mesh3,border,i,j,k;

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry1 = new THREE.ConeBufferGeometry( 40, 160, 32 );
  material = new THREE.MeshNormalMaterial({color:"#ff00ff"} );
  mesh1 = new THREE.Mesh( geometry1, material );
  mesh1.position.set(0,0,0);
  mesh1.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh1 );


  geometry2= new THREE.ConeBufferGeometry( 80, 320, 32 );
  material2 = new THREE.MeshBasicMaterial( { wireframe:true,
    color: "#ADFF2F" } );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.set(1,1,1);
  mesh2.position.z = -800;


  scene.add( mesh2 );

  geometry3= new THREE.ConeBufferGeometry( 160, 160, 640, 32 );
  material3 = new THREE.MeshBasicMaterial( { wireframe:true,
    color: "#8E8E38" } );
  mesh3 = new THREE.Mesh( geometry2, material2 );
  mesh3.position.set(1,1,1);
  mesh3.position.z = -600;


  scene.add( mesh3 );
}


// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh1.rotation.x += 0.01; //Continuously rotate the mesh
  mesh1.rotation.y += 0.01;
  mesh2.rotation.x += 0.01; //Continuously rotate the mesh
  mesh2.rotation.y += 0.01;
  mesh3.rotation.x += 0.01; //Continuously rotate the mesh
  mesh3.rotation.y += 0.01;



  renderer.setClearColor("#2A3867");

  // Render the scene
  renderer.render(scene, camera);
};


init();
geometry();
render();
