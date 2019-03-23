// MatCap-style image rendered on a sphere
// modify sphere UVs instead of using a ShaderMaterial

var camera, scene, renderer;
var image;
var mouseX = 0, mouseY = 0;
var container, stats;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var group = [];
var rotX = [];//随机速度
var rotY = [];//随机速度

init();
animate();

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 150 );
  scene.add( camera ); // since light is child of camera

	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
	var light = new THREE.PointLight( 0xffffff, 1 );
	camera.add( light );

for(a=0;a<15;a++){
	var material = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		map: THREE.ImageUtils.loadTexture('images/eye.png'),
	});

	var geometry = new THREE.SphereGeometry( 30, 32, 16 );


  // modify UVs to accommodate MatCap texture
	var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
	for ( i = 0; i < faceVertexUvs.length; i ++ ) {
		var uvs = faceVertexUvs[ i ];
		var face = geometry.faces[ i ];
		for ( var j = 0; j < 3; j ++ ) {
			uvs[ j ].x = face.vertexNormals[ j ].x * 0.5 + 0.5;
			uvs[ j ].y = face.vertexNormals[ j ].y * 0.5 + 0.5;
		}
	}
	var groupscale = (Math.random() * -2) +1;
  mesh = new THREE.Mesh( geometry, material );
	var mesh = new THREE.Mesh( geometry, material );
							mesh.position.x = (Math.random() * -200)+30;
							mesh.position.y = (Math.random() * -50)+50;
							//mesh.position.z = (Math.random() * 100);
							mesh.scale.x = groupscale;
							mesh.scale.y = groupscale;
							mesh.scale.z = groupscale;
							//rotValue = Math.random() * 2 * Math.PI;//随机旋转方向
							var rotValX = (Math.random() * 0.1) - 0.25;
							var rotValY = (Math.random() * 0.1) - 0.25;
							//var rotValZ = (Math.random() * 0.1) - 0.25;
						rotX.push(rotValX);
							rotY.push(rotValY);
	scene.add( mesh );
	group.push( mesh );
					}

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	group.forEach(function(c, i) {
	    group[i].rotation.x += rotX;
	    group[i].rotation.y += rotY;
			//group[i].rotation.z += rotZ;
		group[i].rotation.x = mouseY/window.innerHeight*2;
		group[i].rotation.y = mouseX/window.innerWidth*2;});

		renderer.render( scene, camera );
	}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
