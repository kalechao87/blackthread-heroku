import * as THREE from 'three';

import baseApp from './baseApp.js';
import loaders from './loaders.js';
// import animationControls from './animationControls.js';

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

    const naoPromise = loaders.fbxLoader( '/assets/models/robot_dance/base.fbx' ).then( ( object ) => {

      this.nao = object;

      console.log( object )

    } );

    const stagePromise = Promise.resolve();

    this.loadingPromises.push( naoPromise, stagePromise );

  }


  postLoad() {

    Promise.all( this.loadingPromises ).then(
      () => {

        baseApp.add( this.nao );

        baseApp.play();

      },
    );

  }

}

export default new Simulation();
