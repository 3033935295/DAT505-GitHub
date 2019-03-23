var renderer, scene, camera;
var cubes = [];
var rot = 0;

var randomSpeedX = [];

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);


  //spotLight.castShadow = true;
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);

  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0, 1000, 0);
  ambLight.add(spotLight);
  scene.add(ambLight);


  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <= 10; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -10; y <= 10; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: 0x808080});

if (x==-5&&y==-5) {
  boxMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});

} else if (x==5 && y==5) {
  boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFF00});
} else {
    boxMaterial = new THREE.MeshLambertMaterial({color: 0x808080});
}

      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;
      //Math.random() *

      mesh.position.x = x;
      mesh.position.z = y;

      mesh.rotation.x = Math.random()*2*Math.PI;
      mesh.rotation.y = Math.random()*2*Math.PI;
      mesh.rotation.z = Math.random()*2*Math.PI;

      var randomValueX = (Math.random()*0.5-0.25);
      randomSpeedX.push(randomValueX);
      // scaleX.push(randomValueX);
      scene.add(mesh);
      cubes.push(mesh);
    }
  }

  document.body.appendChild(renderer.domElement);
}
var scaleCube =5;

function drawFrame(){
  requestAnimationFrame(drawFrame);

  //rot += 0.05;
  //rot += 0.01*Math.random();
  scaleCube += 0.02;
  if (scaleCube>10) scaleCube=-10;
  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
    c.rotation.x = 0.2; //Rotate the object that is referenced in c
    c.rotation.y = 0.1;
    c.scale.x = scaleCube;
    //c.speed.z = rot;
  });


//cubes[6].rotation.x += randomSpeedX[6];

//cubes[6].c.rotation.y = 0.1;
//cubes[6].rotation.y = 0.1;
//cubes[6].scale.x = scaleCube;
//cubes[18].rotation.x += randomSpeedX[18];

  renderer.render(scene, camera);
}

init();
drawFrame();
