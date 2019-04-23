// create a scene
var scene = new THREE.Scene();
// Create a group object to store the map line model for each province and the grid model Mesh for each province
var group = new THREE.Group()
//a variable for storing province Mesh and Ray detection
var rayMesh = []
var loader = new THREE.FileLoader();
loader.setResponseType('json')
var mixer = null;
//  Load the GDP data of each province in the JS directory, chinaGDP.json.
loader.load('./js/chinaGDP.json', function(dataGDP) {
  // Load vertex data of provincial boundaries in China under JS directory
  loader.load('./js/china.json', function(data) {

    data.features.forEach(country => {
      // The province type is Polygon.
      if (country.geometry.type === "Polygon") {
        // "shapesArr" represents the outline of each province. The outline of each province is represented by a Shape object.
        let shapesArr = []

        let vector3Arr = []
        let vector2Arr = []
        country.geometry.coordinates[0].forEach(elem => {
          vector3Arr.push(new THREE.Vector3(elem[0], elem[1], 0))
          vector2Arr.push(new THREE.Vector2(elem[0], elem[1]))
        });
        let geometry = new THREE.Geometry()
        geometry.vertices = vector3Arr;
        geometry.verticesNeedUpdate = true
        let material = new THREE.LineBasicMaterial({
          color: 0x666666,
        })
        let line = new THREE.LineLoop(geometry, material);
        line.position.z = 0.01
        // Create border lines for each province through a line model line
        group.add(line)
        // Clone translation of provincial boundaries
        group.add(line.clone().translateZ(-0.8))

        shapesArr.push(new THREE.Shape(vector2Arr))

        // Thick the outlines of the provinces on the map of China by stretching Extrude Geometry
        var meshGeometory = new THREE.ExtrudeGeometry(
          shapesArr,

          {
            amount: -0.8,
            curveSegments: 2,
            bevelEnabled: false
          }
        );

        let meshMaterial = new THREE.MeshPhongMaterial({

          color: 0x111111,
        })
        let mesh = new THREE.Mesh(meshGeometory, meshMaterial)
        //  Assign the name of the province to the corresponding province
        mesh.name = country.properties.name

        // Extract the GDP data corresponding to each province from the GDP data and assign it to the.
        dataGDP.forEach((elem, index) => {
          if (elem.name === mesh.name) {
            mesh.gdp = elem.gdp[0]
          }
        })
        group.add(mesh)
        rayMesh.push(mesh)
      }
      // Provincial type is MultiPologon situation
      if (country.geometry.type === "MultiPolygon") {

        let shapesArr = []
        country.geometry.coordinates.forEach(area => {

          let vector3Arr = []
          let vector2Arr = []

          area[0].forEach(elem => {
            vector3Arr.push(new THREE.Vector3(elem[0], elem[1], 0))
            vector2Arr.push(new THREE.Vector2(elem[0], elem[1]))

          });
          let geometry = new THREE.Geometry()
          geometry.vertices = vector3Arr;
          geometry.verticesNeedUpdate = true
          let material = new THREE.LineBasicMaterial({
            color: 0x666666,
          })
          let line = new THREE.LineLoop(geometry, material);
          line.position.z = 0.01
          group.add(line)
          group.add(line.clone().translateZ(-0.8))
          shapesArr.push(new THREE.Shape(vector2Arr))
        });


        var meshGeometory = new THREE.ExtrudeGeometry(
          shapesArr,

          {
            amount: -0.8,
            curveSegments: 2,
            bevelEnabled: false
          }
        );
        let meshMaterial = new THREE.MeshPhongMaterial({
          color: 0x111111,
        })
        let mesh = new THREE.Mesh(meshGeometory, meshMaterial)
        group.add(mesh)
        rayMesh.push(mesh)
      }
    });
    scene.add(group)
    // Translate the entire Chinese map as far as possible and center it.
    group.position.set(-105, -30, 0);
    var textureLoader = new THREE.TextureLoader();

    //  Load two texture to create a highlighted column effect, indicating the data size of each province, such as GDP, such as population, etc..
    var texture = textureLoader.load('js/img/4.png');
    var texture2 = textureLoader.load('js/img/sprite2.png');


    // load GDP data
    loader.load('./js/chinaGDP.json', function(dataGDP) {

      var clip = new THREE.AnimationClip("default", 20, []);
      dataGDP.forEach((elem, index) => {
        if (index % 1 === 0) {
          // The bigger the GDP data, the higher the highlighted column display.
          var h = elem.gdp[0] / 600 + 4
          // Create a boxgeometry to represent the column, then add texture
          var geometry = new THREE.PlaneGeometry(0.6, h);
          var material = new THREE.MeshBasicMaterial({
            map: texture,


            transparent: true,
            side: THREE.DoubleSide,
          });
          var mesh = new THREE.Mesh(geometry, material);
          mesh.rotateX(-Math.PI / 2)
          mesh.position.z = h / 2

          var groupMesh = new THREE.Group()
          //The intersection of two rectangles produces a more three-dimensional effect
          groupMesh.add(mesh, mesh.clone().rotateY(Math.PI / 2))

          var material2 = new THREE.MeshBasicMaterial({
            map: texture2,
            transparent: true,

          })
          var geometry2 = new THREE.PlaneGeometry(1, 1)
          var cirMesh = new THREE.Mesh(geometry2, material2)
          cirMesh.position.z = 0.01;
          groupMesh.add(cirMesh)
          groupMesh.name = mesh.uuid
          group.add(groupMesh);
          data.features.forEach(province => {
            if (province.properties.name === elem.name) {
              // Locate the provinces and find the central point
              groupMesh.position.x = province.properties.cp[0]
              groupMesh.position.y = province.properties.cp[1]
            }
          });
        }
      })
    });
  });
})

// add the PointLight
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300);
scene.add(point);
var ambient = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambient);
// create a camera
var width = window.innerWidth;
var height = window.innerHeight;
var k = width / height;
var s = 20;
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// Set the camera position to find the scene
camera.position.set(-0.81, -58, 84);
camera.lookAt(scene.position);

// create a renderer used in scene and camera
var renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();
// Create a camera control that rotates and scales the scene.
var controls = new THREE.OrbitControls(camera);

// Create a vue to control GDP.
var vm = new Vue({
  el: '#app',
  data: {
    //X and Y represent the location of Provincial Information
    x: 500,
    y: 500,
    bool: false,
    chooseMesh: null,
    // Province name
    name: '',
    // GDP data
    gdp: null,
  },
});






var lastMesh = null
// Click the mouse to execute the choose function
function choose(e) {
  // When you select the new province of Mesh, the last selected province of Mesh returns to its original color
  if (lastMesh) {
    lastMesh.material.color.set(0x111111);
    vm.bool = false
  }
  // Get the coordinates of the mouse on the screen
  var Sx = e.clientX;
  var Sy = e.clientY;
  // Set the location of the provincial information label
  vm.x = Sx + 20;
  vm.y = Sy + 20;
  var x = (Sx / window.innerWidth) * 2 - 1;
  var y = -(Sy / window.innerHeight) * 2 + 1;
  // Through Raycaster object implementation, the mouse clicks the function of selecting a province Mesh
  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  var intersects = raycaster.intersectObjects(rayMesh);
  // If you select Mesh from a province, the color deepens.
  if (intersects.length > 0) {
    vm.bool = true
    lastMesh = intersects[0].object
    intersects[0].object.material.color.set(0x000000);
    // Update name and GDP data in VM
    vm.name = intersects[0].object.name
    vm.gdp = intersects[0].object.gdp
  }
}

addEventListener('click', choose);
