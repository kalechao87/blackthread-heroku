// The App  object is setup  here and then returned
// - all per frame and resize call backs are also defined here ONLY
import * as THREE from 'three';

import App from 'App/App.js';
import HTMLControl from '../classes/HTMLControl.js';
// import Lighting from '../classes/Lighting.js';

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

    return this.app;

  }

}

export default new AppManager();
