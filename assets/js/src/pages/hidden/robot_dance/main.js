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
      this.camera = object.getObjectByName( 'Camera' );
      this.spotlightStageRightLow = object.getObjectByName( 'Spotstage_right_low' );
      this.spotlightStageLeftLow = object.getObjectByName( 'Spotstage_right_low' );
      this.spotlightStageCenterHigh = object.getObjectByName( 'Spotstage_center_high' );

      this.soundSourceLeft = object.getObjectByName( 'Stage Left Sound' );
      this.soundSourceRight = object.getObjectByName( 'Stage Right Sound' );

      this.sceneCentre = new THREE.Box3().setFromObject( object ).getCenter();
      // this.sceneCentre = object.getObjectByName( 'sceneCenter' ).position.clone();

    } );

    const naoPromise = loaders.fbxLoader( '/assets/models/robot_dance/nao.fbx' ).then( ( object ) => {

      this.nao = object;

      invertMirroredFBX( this.nao );

    } );

    this.loadingPromises.push( naoPromise, stagePromise );

  }


  postLoad() {

    Promise.all( this.loadingPromises ).then(
      () => {

        this.app.scene.add( this.stage );
        this.app.scene.add( this.nao );

        this.initBackground();
        this.initLighting();
        this.initCamera();
        this.initCameraControl();

        this.initRobot( this.nao );

        animationControl.initMixer( this.nao );

        const frames = new Frames( this.robot );
        const groups = new Groups( frames );
        const dance = new Dance( groups, frames );

        animationControl.setDance( dance );


        new Audio( [ this.soundSourceLeft, this.soundSourceRight ], this.app.camera );

        new FileControl( frames, groups, dance );

        this.app.play();

      } );

  }

  // set up the robots moveable parts
  initRobot( robot ) {

    console.log( robot )

    this.robot = {

      head: robot.getObjectByName( 'head' ),

      leftShoulder: robot.getObjectByName( 'leftShoulder' ),
      rightShoulder: robot.getObjectByName( 'rightShoulder' ),

      leftElbow: robot.getObjectByName( 'leftElbow' ),
      rightElbow: robot.getObjectByName( 'rightElbow' ),

    };

    // slight hack since the model's head is very slightly rotated at the start
    // so reset that here
    // this.robot.head.rotation.set( 0, 0, 0 );

    this.robot.headInitialQuaternion = this.robot.head.quaternion.clone();
    this.robot.leftShoulderInitialQuaternion = this.robot.leftShoulder.quaternion.clone();
    this.robot.rightShoulderInitialQuaternion = this.robot.rightShoulder.quaternion.clone();
    this.robot.leftElbowInitialQuaternion = this.robot.leftElbow.quaternion.clone();
    this.robot.rightElbowInitialQuaternion = this.robot.rightElbow.quaternion.clone();

  }

  initLighting() {

    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.3 );
    this.app.scene.add( ambientLight );

    this.spotlightStageRightLow.distance = 200;
    this.spotlightStageLeftLow.distance = 200;
    this.spotlightStageCenterHigh.distance = 400;

    // this.spotlightStageRightLow.position.y = 0;
    // this.spotlightStageLeftLow.position.y = 0;
    // this.spotlightStageCenterHigh.position.y = 200;

    // this.spotlightStageRightLow.intensity = 2;
    // this.spotlightStageLeftLow.intensity = 2;
    // this.spotlightStageCenterHigh.intensity = 2;

    this.spotlightStageRightLow.penumbra = 0.25;
    this.spotlightStageLeftLow.penumbra = 0.25;
    this.spotlightStageCenterHigh.penumbra = 0.25;

    // console.log( this.spotlightStageRightLow, this.spotlightStageLeftLow, this.spotlightStageCenterHigh );
    this.app.scene.add( this.spotlightStageRightLow, this.spotlightStageLeftLow, this.spotlightStageCenterHigh );

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

    // console.log( this.sceneCentre )
    this.app.controls.target.copy( this.sceneCentre );
    this.app.controls.update();

  }


  initBackground() {

    this.app.scene.fog = new THREE.Fog( 0xf7f7f7, 600, this.app.camera.far );

    const geometry = new THREE.PlaneBufferGeometry( 20000, 20000 );
    const material = new THREE.MeshPhongMaterial( { color: 0xb0b0b0, shininess: 0.1 } );
    const ground = new THREE.Mesh( geometry, material );
    ground.position.set( 0, -25, 0 );
    ground.rotation.x = -Math.PI / 2;

    this.app.scene.add( ground );

  }

}

export default new Main();
