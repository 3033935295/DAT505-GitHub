
  if ( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
  }
  var stats;
  var camera, scene, renderer, controls;
  var settings = {
    metalness: 1.0,
    roughness: 0.4,
    ambientIntensity: 0.2,
    aoMapIntensity: 1.0,
    envMapIntensity: 1.0,
    displacementScale: 2.436143, // from original model
    normalScale: 1.0
  };
  var mesh, material;
  var pointLight, ambientLight;
  var height = 500; // of camera frustum
  var r = 0.0;
  init();
  animate();
  initGui();
  // Init gui
  function initGui() {
    var gui = new dat.GUI();
    //var gui = gui.addFolder( "Material" );
    gui.add( settings, "metalness" ).min( 0 ).max( 1 ).onChange( function ( value ) {
      material.metalness = value;
    } );
    gui.add( settings, "roughness" ).min( 0 ).max( 1 ).onChange( function ( value ) {
      material.roughness = value;
    } );
    gui.add( settings, "aoMapIntensity" ).min( 0 ).max( 1 ).onChange( function ( value ) {
      material.aoMapIntensity = value;
    } );
    gui.add( settings, "ambientIntensity" ).min( 0 ).max( 1 ).onChange( function ( value ) {
      ambientLight.intensity = value;
    } );
    gui.add( settings, "envMapIntensity" ).min( 0 ).max( 3 ).onChange( function ( value ) {
      material.envMapIntensity = value;
    } );
    gui.add( settings, "displacementScale" ).min( 0 ).max( 3.0 ).onChange( function ( value ) {
      material.displacementScale = value;
    } );
    gui.add( settings, "normalScale" ).min( - 1 ).max( 1 ).onChange( function ( value ) {
      material.normalScale.set( 1, - 1 ).multiplyScalar( value );
    } );
  }
  function init() {
    var container = document.createElement( 'div' );
    document.body.appendChild( container );
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    //
    scene = new THREE.Scene();
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera( - height * aspect, height * aspect, height, - height, 1, 10000 );
    camera.position.z = 1500;
    scene.add( camera );
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableZoom = false;
    controls.enableDamping = true;
    // lights
    ambientLight = new THREE.AmbientLight( 0xffffff, settings.ambientIntensity );
    scene.add( ambientLight );
    pointLight = new THREE.PointLight( 0xff0000, 0.5 );
    pointLight.position.z = 2500;
    scene.add( pointLight );
    var pointLight2 = new THREE.PointLight( 0xff6666, 1 );
    camera.add( pointLight2 );
    var pointLight3 = new THREE.PointLight( 0x0000ff, 0.5 );
    pointLight3.position.x = - 1000;
    pointLight3.position.z = 1000;
    scene.add( pointLight3 );
    // env map
    var path = "textures/cube/SwedishRoyalCastle/";
    var format = '.jpg';
    var urls = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
    ];
    var reflectionCube = new THREE.CubeTextureLoader().load( urls );
    // textures
    var textureLoader = new THREE.TextureLoader();
    var normalMap = textureLoader.load( "models/obj/ninja/normal.jpg" );
    var aoMap = textureLoader.load( "models/obj/ninja/ao.jpg" );
    var displacementMap = textureLoader.load( "models/obj/ninja/displacement.jpg" );
    // material
    material = new THREE.MeshStandardMaterial( {
      color: 0x888888,
      roughness: settings.roughness,
      metalness: settings.metalness,
      normalMap: normalMap,
      normalScale: new THREE.Vector2( 1, - 1 ), // why does the normal map require negation in this case?
      aoMap: aoMap,
      aoMapIntensity: 1,
      displacementMap: displacementMap,
      displacementScale: settings.displacementScale,
      displacementBias: - 0.428408, // from original model
      envMap: reflectionCube,
      envMapIntensity: settings.envMapIntensity,
      side: THREE.DoubleSide
    } );
    //
    var loader = new THREE.OBJLoader();
    loader.load( "models/obj/ninja/ninjaHead_Low.obj", function ( group ) {
      var geometry = group.children[ 0 ].geometry;
      geometry.attributes.uv2 = geometry.attributes.uv;
      geometry.center();
      mesh = new THREE.Mesh( geometry, material );
      mesh.scale.multiplyScalar( 25 );
      scene.add( mesh );
    } );
    //
    var description = "normal + ao" + ( renderer.capabilities.vertexTextures ? " + displacement + environment" : " + <strike>displacement</strike>" );
    document.getElementById( "description" ).innerHTML = description;
    document.getElementById( "vt" ).style.display = renderer.capabilities.vertexTextures ? "none" : "block";
    //
    stats = new Stats();
    container.appendChild( stats.dom );
    //
    window.addEventListener( 'resize', onWindowResize, false );
  }
  function onWindowResize() {
    var aspect = window.innerWidth / window.innerHeight;
    camera.left = - height * aspect;
    camera.right = height * aspect;
    camera.top = height;
    camera.bottom = - height;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  //
  function animate() {
    requestAnimationFrame( animate );
    stats.begin();
    render();
    stats.end();
  }
  function render() {
    pointLight.position.x = 2500 * Math.cos( r );
    pointLight.position.z = 2500 * Math.sin( r );
    r += 0.01;
    renderer.render( scene, camera );
  }
