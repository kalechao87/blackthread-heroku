import * as THREE from 'three';

import loaders from './loaders.js';
import HTMLControl from './HTMLControl.js';

export default class Audio {


  constructor( emitters, camera ) {

    const listener = new THREE.AudioListener();
    this.audioDirectory = '/assets/audio/robot_dance/';

    camera.add( listener );

    this.sounds = [];
    this.buffers = {};

    emitters.forEach( ( emitter ) => {

      const sound = new THREE.PositionalAudio( listener );
      this.sounds.push( sound );
      emitter.add( sound );

    } );

    this.initPlayButton();

    this.loadExamples();

  }

  load( file ) {

    loaders.audioLoader( this.audioDirectory + file ).then( ( buffer ) => {

      this.buffers.file = buffer;

      const optionElem = document.createElement( 'option' );
      optionElem.innerHTML = file.replace( /_/g, ' ' ).replace( '.mp3', '' );
      HTMLControl.controls.music.tracks.appendChild( optionElem );

    } );

  }

  loadExamples() {
    const exampleTrackNames = [
      'Chinese_Man_Miss_Chang',
      'DJ_Kormac_Rainstorm',
      'Gramatik_Day_Of_The_So_Called_Glory',
      'Lindsey_Stirling_Crystalize',
    ];

    exampleTrackNames.forEach( ( name ) => {

      this.load( name + '.mp3' );

    } );

  }

  play() {

    this.sounds.forEach( ( sound ) => {

      sound.play();

    } );

  }

  pause() {

    this.sounds.forEach( ( sound ) => {

      sound.pause();

    } );

  }

  initPlayButton() {

    HTMLControl.controls.music.play.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      this.play();

    } );

  }

  initUploadButton() {

    HTMLControl.controls.music.play.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      console.log( 'click' );

    } );

  }

}
