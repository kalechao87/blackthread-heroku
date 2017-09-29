// The App  object is setup  here and then returned
// - all per frame and resize call backs are also defined here ONLY
import * as THREE from 'three';

import App from 'App/App.js';
import HTMLControl from '../classes/HTMLControl.js';
import Lighting from '../classes/Lighting.js';

// Set up THREE caching
THREE.Cache.enabled = true;

class AppManager {

  constructor() {

    this.app = new App( HTMLControl.canvas );
    this.app.renderer.setClearColor( 0xf7f7f7, 1.0 );

    // Put any per frame calculations here
    this.app.onUpdate = function () {

      // use this.delta for timings here

    };

    // put any per resize calculations here
    this.app.onWindowResize = function () {

    };

    this.addGround();

    this.lighting = new Lighting( this.app );

    this.initCamera();
    this.initControls();

    this.app.scene.fog = new THREE.Fog( 0xf7f7f7, 600, this.app.camera.far );

    return this.app;

  }

  addGround() {

    const geometry = new THREE.PlaneBufferGeometry( 20000, 20000 );
    const material = new THREE.MeshPhongMaterial( { color: 0xb0b0b0, shininess: 0.1 } );
    const ground = new THREE.Mesh( geometry, material );
    ground.position.set( 0, -25, 0 );
    ground.rotation.x = -Math.PI / 2;

    this.app.scene.add( ground );

  }

  initCamera() {

    this.app.camera.far = 800;
    this.app.camera.fov = 30;
    this.app.camera.position.set( 0, -100, 200 );
    this.app.camera.updateProjectionMatrix();

  }

  initControls() {

    this.app.initControls();

    // vertical rotation limits
    this.app.controls.minPolarAngle = Math.PI * 0.1; // upper
    this.app.controls.maxPolarAngle = Math.PI * 0.45; // lower

    this.app.controls.minDistance = 100;
    this.app.controls.maxDistance = 400;

    // horizontal rotation limits
    this.app.controls.minAzimuthAngle = -Math.PI * 0.5;
    this.app.controls.maxAzimuthAngle = Math.PI * 0.5;

  }

}

export default new AppManager();
