import * as THREE from 'three';

import Time from './classes/Time.js';
import Canvas from './class/Canvas.js';
// import Scene from './class/Scene.js';
import Camera from './class/Camera.js';
import Renderer from './class/Renderer.js';

let _scene;
let _camera;
let _renderer;

let _currentAnimationFrameID;


export default class App {

  constructor( canvas ) {

    this.time = new Time();
    this.canvas = new Canvas( canvas );
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();

    this.autoRender = true;

    this.autoResize = true;

    this.frameCount = 0;

    this.delta = 0;

    this.isPlaying = false;
    this.isPaused = false;



    this.setUpResize();

  }

  setRendererSize() {

    _renderer.setSize( _canvas.clientWidth, _canvas.clientHeight, false );

  }

  setCameraAspect() {

    _camera.aspect = _canvas.clientWidth / _canvas.clientHeight;
    _camera.updateProjectionMatrix();

  }

  setUpResize() {

    const self = this;

    if( self.onWindowResize === undefined ) self.onWindowResize = function () {};

    const onWindowResize = function () {

      if ( !self.autoResize ) return;

      if ( _camera.type !== 'PerspectiveCamera' ) {

        console.warn( 'THREE.APP: AutoResize only works with PerspectiveCamera' );
        return;

      }

      self.setCameraAspect();

      self.setRendererSize();

      self.onWindowResize();

    };

    window.addEventListener( 'resize', onWindowResize, false );

  }

}
