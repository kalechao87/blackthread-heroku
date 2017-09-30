import * as THREE from 'three';

import OrbitControls from 'modules/OrbitControls.module.js';

import appManager from './appManager.js';
import loaders from './loaders.js';
// import animationControls from './animationControls.js';

import invertMirroredFBX from '../utilities/invertMirroredFBX.js';

import RobotManualControl from '../classes/RobotManualControl.js';

class Simulation {

  constructor() {

    this.preLoad();

    this.load();

    this.postLoad();

  }

  preLoad() {

    this.animations = {};

    this.loadingPromises = [];

  }

  load() {

    const stagePromise = loaders.fbxLoader( '/assets/models/robot_dance/stage_camera_lights.fbx' ).then( ( object ) => {

      // console.log( object );
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

        appManager.scene.add( this.stage );
        appManager.scene.add( this.nao );

        this.initBackground();
        this.initLighting();
        this.initCamera();
        this.initControls();

        this.robotManualControl = new RobotManualControl( this.nao );

        appManager.play();

      } );

  }

  initLighting() {

    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.3 );
    appManager.scene.add( ambientLight );

    this.spotlightStageRightLow.distance = 200;
    this.spotlightStageLeftLow.distance = 200;
    this.spotlightStageCenterHigh.distance = 200;

    // this.spotlightStageRightLow.intensity = 2;
    // this.spotlightStageLeftLow.intensity = 2;
    // this.spotlightStageCenterHigh.intensity = 2;

    this.spotlightStageRightLow.penumbra = 0.25;
    this.spotlightStageLeftLow.penumbra = 0.25;
    this.spotlightStageCenterHigh.penumbra = 0.25;

    // console.log( this.spotlightStageRightLow, this.spotlightStageLeftLow, this.spotlightStageCenterHigh );
    appManager.scene.add( this.spotlightStageRightLow, this.spotlightStageLeftLow, this.spotlightStageCenterHigh );

  }

  initCamera() {

    // console.log( this.camera )

    // appManager.camera = this.camera;
    appManager.camera.far = 800;
    appManager.camera.fov = 35;
    appManager.camera.position.set( 0, 0, 200 );
    appManager.camera.updateProjectionMatrix();

  }

  initControls() {

    appManager.controls = new OrbitControls( appManager.camera, appManager.canvas );

    // appManager.controls.object = this.camera;

    // vertical rotation limits
    appManager.controls.minPolarAngle = Math.PI * 0.1; // upper
    appManager.controls.maxPolarAngle = Math.PI * 0.45; // lower

    appManager.controls.minDistance = 100;
    appManager.controls.maxDistance = 400;

    // horizontal rotation limits
    appManager.controls.minAzimuthAngle = -Math.PI * 0.5;
    appManager.controls.maxAzimuthAngle = Math.PI * 0.5;

    appManager.controls.enableDamping = true;
    appManager.controls.dampingFactor = 0.2;

    // console.log( this.sceneCentre )
    appManager.controls.target.copy( this.sceneCentre );
    appManager.controls.update();

  }


  initBackground() {

    appManager.scene.fog = new THREE.Fog( 0xf7f7f7, 600, appManager.camera.far );

    const geometry = new THREE.PlaneBufferGeometry( 20000, 20000 );
    const material = new THREE.MeshPhongMaterial( { color: 0xb0b0b0, shininess: 0.1 } );
    const ground = new THREE.Mesh( geometry, material );
    ground.position.set( 0, -25, 0 );
    ground.rotation.x = -Math.PI / 2;

    appManager.scene.add( ground );

  }

}

export default new Simulation();
