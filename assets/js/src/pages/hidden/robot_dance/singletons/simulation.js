import * as THREE from 'three';

import appManager from './appManager.js';
import loaders from './loaders.js';
// import animationControls from './animationControls.js';

import invertMirroredFBX from '../utilities/invertMirroredFBX.js';

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

    const naoPromise = loaders.fbxLoader( '/assets/models/robot_dance/nao_on_stage.fbx' ).then( ( object ) => {

      this.stage = object.children[0];
      this.nao = object.children[1];

      invertMirroredFBX( this.nao );

      this.sceneCentre = new THREE.Box3().setFromObject( object ).getCenter();

    } );

    const stagePromise = Promise.resolve();

    this.loadingPromises.push( naoPromise, stagePromise );

  }


  postLoad() {

    Promise.all( this.loadingPromises ).then(
      () => {

        // console.log( this.stage, this.nao );

        appManager.scene.add( this.stage );
        appManager.scene.add( this.nao );

        appManager.controls.target.copy( this.sceneCentre );
        appManager.controls.update();

        appManager.play();

      },
    );

  }

}

export default new Simulation();
