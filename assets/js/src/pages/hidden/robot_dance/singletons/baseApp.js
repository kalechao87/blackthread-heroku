// The App is instantiated here - all per frame and resize call backs are also defined here ONLY
import * as THREE from 'three';

import App from 'App/App.js';
import HTMLControl from '../classes/HTMLControl.js';
import Lighting from '../classes/Lighting.js';

// Set up THREE caching
THREE.Cache.enabled = true;

const baseApp = new App( HTMLControl.canvas );
baseApp.renderer.setClearColor( 0xf7f7f7, 1.0 );

// Put any per frame calculations here
baseApp.onUpdate = function () {

  // use this.delta for timings here

};

// put any per resize calculations here
baseApp.onWindowResize = function () {

};

baseApp.add = ( object ) => {

  baseApp.scene.add( object );

};

baseApp.scene.fog = new THREE.Fog( 0xf7f7f7, 1500, 10000 );

baseApp.initControls();

const lighting = new Lighting( baseApp );

// const addGround = () => {

//   const geometry = new THREE.PlaneBufferGeometry( 20000, 20000 );
//   const material = new THREE.MeshPhongMaterial( { color: 0xb0b0b0, shininess: 0.1 } );
//   const ground = new THREE.Mesh( geometry, material );
//   ground.position.set( 0, -25, 0 );
//   ground.rotation.x = -Math.PI / 2;

//   baseApp.scene.add( ground );

// };

// perhaps this should go after loadingPromises?
// baseApp.play();

export default baseApp;
