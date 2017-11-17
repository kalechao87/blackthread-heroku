import * as THREE from 'three';

import pointerPosToCanvasCentre from 'utilities/three/pointerPosToCanvasCentre.js';

import loaders from './loaders.js';

import pointerPos from 'utilities/pointerPos.js';

import App from 'App/App.js';
import OrbitControls from 'modules/OrbitControls.module.js';

import backgroundVert from './shaders/background.vert';
import backgroundFrag from './shaders/background.frag';
import textVert from './shaders/text.vert';
import textFrag from './shaders/text.frag';

import cameraZPos from './utilities/cameraZPos.js';

import createTextGeometry from './utilities/createTextGeometry.js';
import createShapeGeometries from './utilities/createShapeGeometries.js';

THREE.Cache.enabled = true;

class Main {

  constructor() {

    this.preLoad();

    this.load();

    this.postLoad();

  }

  preLoad() {

    const self = this;

    this.app = new App( document.querySelector( '#splash-canvas' ) );

    this.app.camera.fov = 75;
    this.app.camera.position.set( 0, 0, cameraZPos( this.app.camera.aspect ) );
    this.app.camera.updateProjectionMatrix();

    this.initMaterials();

    this.addBackground();

    // this.initControls();

    this.app.onWindowResize = function () {

      self.app.camera.position.set( 0, 0, cameraZPos( self.app.camera.aspect ) );

    };

  }

  load() {

    this.loadingPromises = [];

    const fontPromise = loaders.fontLoader( '/assets/fonts/json/droid_sans_mono_regular.typeface.json' )
      .then( ( font ) => { this.font = font; } );

    this.loadingPromises.push( fontPromise );

    // const noisePromise = loaders.textureLoader
  }

  postLoad() {

    Promise.all( this.loadingPromises ).then(
      () => {

        const textGeo = createTextGeometry( this.font );
        const textMesh = new THREE.Mesh( textGeo, this.textMat );
        this.app.scene.add( textMesh );

        const shapeGeo = createShapeGeometries();
        this.shapeMesh = new THREE.Mesh( shapeGeo, this.textMat );
        this.shapeMesh.position.set( -150, 150, 0 );

        this.app.scene.add( this.shapeMesh );

        this.initAnimation();

        this.app.play();

      } );

  }

  initAnimation() {

    const self = this;

    let uTime = 1.0;
    const minTime = 0.0;
    let animSpeed = 8000;

    const updateMaterials = function () {

      // Pan events on mobile sometimes register as ( 0, 0 ); ignore these
      if ( pointerPos.x !== 0 && pointerPos.y !== 0 ) {

        const offsetX = pointerPos.x / self.app.canvas.clientWidth;
        let offsetY = 1 - pointerPos.y / self.app.canvas.clientHeight;

        // make the line well defined when moving the pointer off the top of the canvas
        offsetY = ( offsetY > 0.99 ) ? 0.999 : offsetY;

        self.offset.set( offsetX, offsetY );
        self.smooth.set( 1.0, offsetY );

        const pointer = pointerPosToCanvasCentre( self.app.camera, self.app.canvas );
        self.pointer.set( pointer.x, pointer.y );

      }

    };

    const updateAnimation = function () {

    // set on repeat (for testing)
    // if ( uTime <= minTime ) uTime = 1.0;

    // Ignore large values of delta (caused by window not be being focused for a while)
      if ( uTime >= minTime ) {

        uTime -= self.app.delta / animSpeed;

      }

      self.textMat.uniforms.uTime.value = uTime;

    // speed up the animation as it progresses
      animSpeed -= 5;

    };

    this.app.onUpdate = function () {

      updateMaterials();

      updateAnimation();

      self.shapeMesh.rotation.x += 0.005;
      self.shapeMesh.rotation.y += 0.005;

      //   if ( self.controls && self.controls.enableDamping === true ) self.controls.update();
    };

  }


  addBackground() {

    const geometry = new THREE.PlaneBufferGeometry( 2, 2, 1 );
    this.bgMesh = new THREE.Mesh( geometry, this.backgroundMat );
    this.app.scene.add( this.bgMesh );

  }

  initMaterials() {

    const loader = new THREE.TextureLoader();
    const noiseTexture = loader.load( '/assets/images/textures/noise-1024.jpg' );
    noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;

    this.offset = new THREE.Vector2( 0, 0 );
    this.smooth = new THREE.Vector2( 1.0, 1.0 );
    this.pointer = new THREE.Vector2( 100, 100 );

    const colA = new THREE.Color( 0xffffff );
    const colB = new THREE.Color( 0x283844 );

    const uniforms = {
      noiseTexture: { value: noiseTexture },
      offset: { value: this.offset },
      smooth: { value: this.smooth },
    };

    this.textMat = new THREE.ShaderMaterial( {
      uniforms: Object.assign( {
        color1: { value: colB },
        color2: { value: colA },
        uTime: { value: 0.0 },
        pointer: { value: this.pointer },
      }, uniforms ),
      vertexShader: textVert,
      fragmentShader: textFrag,
      side: THREE.DoubleSide,
    } );

    this.backgroundMat = new THREE.RawShaderMaterial( {

      uniforms: Object.assign( {
        color1: { value: colA },
        color2: { value: colB },
      }, uniforms ),
      vertexShader: backgroundVert,
      fragmentShader: backgroundFrag,

    } );

  }


  initControls() {

    const controls = new OrbitControls( this.app.camera, this.canvas );

    controls.enableZoom = false;
    controls.enablePan = false;

    // controls.autoRotate = true;
    // controls.autoRotateSpeed = -1.0;

    // How far you can orbit horizontally, upper and lower limits.
    // If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
    controls.minAzimuthAngle = -Math.PI / 12; // radians
    controls.maxAzimuthAngle = Math.PI / 12; // radians

    // How far you can orbit vertically, upper and lower limits.
    // Range is 0 to Math.PI radians.
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.5;

    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    controls.enableKeys = false;

    controls.rotateSpeed = 0.01;

    this.controls = controls;

  }

}

export default new Main();
