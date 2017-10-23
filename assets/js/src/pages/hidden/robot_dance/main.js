import 'babel-polyfill';
import * as THREE from 'three';

import App from 'App/App.js';
import OrbitControls from 'modules/OrbitControls.module.js';

import loaders from './loaders.js';
// import animationControls from './animationControls.js';

import HTMLControl from './HTMLControl.js';

import invertMirroredFBX from './utilities/invertMirroredFBX.js';

import Frames from './components/Frames.js';
import Groups from './components/Groups.js';
import Dance from './components/Dance.js';

import Robot from './Robot.js';
import FileControl from './FileControl.js';
import Audio from './Audio.js';

import animationControl from './animation/animationControl.js';

// Set up THREE caching
THREE.Cache.enabled = true;


class Main {

  constructor() {

    this.init();

    this.preLoad();

    this.load();

    this.postLoad();

    // For testing
    // HTMLControl.loading.overlay.classList.add( 'hide' );

  }

  init() {

    this.app = new App( HTMLControl.canvas );
    this.app.renderer.setClearColor( 0xf7f7f7, 1.0 );
    this.app.renderer.shadowMap.enabled = true;
    this.app.renderer.shadowMap.renderReverseSided = false;
    this.app.renderer.shadowMap.renderSingleSided = false;
    this.app.renderer.shadowMap.type = THREE.PCFShadowMap; // THREE.BasicShadowMap // THREE.; // default THREE.PCFShadowMap

    // Put any per frame calculations here
    this.app.onUpdate = function () {

      // use this.delta for timings here
      const delta = this.delta / 1000;

      animationControl.onUpdate( delta );


    };

    // put any per resize calculations here
    this.app.onWindowResize = function () {

    };

  }

  preLoad() {

    this.animations = {};

    this.loadingPromises = [];

  }

  load() {

    const stagePromise = loaders.fbxLoader( '/assets/models/robot_dance/stage_camera_lights.fbx' ).then( ( object ) => {

      this.stage = object.getObjectByName( 'Stage' );

      object.getObjectByName( 'scene' ).receiveShadow = true;
      object.getObjectByName( 'curtains top' ).receiveShadow = true;

      this.camera = object.getObjectByName( 'Camera' );
      this.spotLight = object.getObjectByName( 'Spotstage_center_high' );

      this.soundSourceLeft = object.getObjectByName( 'Stage Left Sound' );
      this.soundSourceRight = object.getObjectByName( 'Stage Right Sound' );

      this.sceneCentre = new THREE.Box3().setFromObject( object ).getCenter();

    } );

    const naoPromise = loaders.fbxLoader( '/assets/models/robot_dance/nao.fbx' ).then( ( object ) => {

      invertMirroredFBX( object );

      this.robot = new Robot( object );

      object.position.z += 10;

      object.traverse( ( child ) => {

        if ( child instanceof THREE.Mesh ) child.castShadow = true;

      } );

    } );

    this.loadingPromises.push( naoPromise, stagePromise );

  }


  postLoad() {

    Promise.all( this.loadingPromises ).then(
      () => {

        this.app.scene.add( this.stage );
        this.app.scene.add( this.robot.model );

        this.initBackground();
        this.initLighting();
        this.initCamera();
        this.initCameraControl();

        animationControl.initMixer( this.robot.model );

        const frames = new Frames( this.robot );
        const groups = new Groups( frames );
        const dance = new Dance( groups );

        animationControl.setDance( dance );


        new Audio( [ this.soundSourceLeft, this.soundSourceRight ], this.app.camera );

        new FileControl( frames, groups, dance );

        this.app.play();

      } );

  }

  initLighting() {

    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
    this.app.scene.add( ambientLight );

    this.spotLight.castShadow = true;
    // Set up shadow properties for the light
    this.spotLight.shadow.mapSize.width = 2048;
    this.spotLight.shadow.mapSize.height = 2048;
    this.spotLight.shadow.camera.near = 100;
    this.spotLight.shadow.camera.far = 300;

    this.spotLight.penumbra = 0.4;
    this.spotLight.angle = 0.5;
    this.spotLight.distance = 300;

    const left = this.spotLight.clone();
    left.intensity = 0.75;
    left.position.x -= 100;
    left.position.y += 20;
    left.shadow.radius = 2;

    const center = this.spotLight.clone();
    center.intensity = 1.5;
    center.position.x += 25;
    center.shadow.radius = 1.25;

    this.app.scene.add( left, center );


  }

  initCamera() {

    this.app.camera.far = 800;
    this.app.camera.fov = 35;
    this.app.camera.position.set( 0, 0, 200 );
    this.app.camera.updateProjectionMatrix();

  }

  initCameraControl() {

    this.app.controls = new OrbitControls( this.app.camera, this.app.canvas );

    // vertical rotation limits
    this.app.controls.minPolarAngle = Math.PI * 0.1; // upper
    this.app.controls.maxPolarAngle = Math.PI * 0.45; // lower

    this.app.controls.minDistance = 60;
    this.app.controls.maxDistance = 400;

    // horizontal rotation limits
    this.app.controls.minAzimuthAngle = -Math.PI * 0.5;
    this.app.controls.maxAzimuthAngle = Math.PI * 0.5;

    this.app.controls.enableDamping = true;
    this.app.controls.dampingFactor = 0.2;

    this.app.controls.target.copy( this.sceneCentre );
    this.app.controls.update();

  }


  initBackground() {

    this.app.scene.fog = new THREE.Fog( 0xf7f7f7, 400, 700 );

    const geometry = new THREE.PlaneBufferGeometry( 20000, 20000 );
    const material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
    const ground = new THREE.Mesh( geometry, material );
    ground.position.set( 0, -5, 0 );
    ground.rotation.x = -Math.PI / 2;

    this.app.scene.add( ground );

  }

}

export default new Main();
