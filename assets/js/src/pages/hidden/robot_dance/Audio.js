import * as THREE from 'three';
import throttle from 'lodash.throttle';

import loaders from './loaders.js';
import HTMLControl from './HTMLControl.js';

export default class Audio {


  constructor( emitters, camera ) {

    this.isPlaying = false;
    this.isPaused = false;

    this.audioDirectory = '/assets/audio/robot_dance/';

    this.playButton = HTMLControl.controls.music.play;
    this.positionSlider = HTMLControl.controls.music.positionSlider;

    this.listener = new THREE.AudioListener();
    this.listener.setMasterVolume( 10 );
    camera.add( this.listener );

    this.soundsEmitters = [];
    this.buffers = {};

    emitters.forEach( ( emitter ) => {

      const sound = new THREE.PositionalAudio( this.listener );
      sound.setRefDistance( 30 );
      sound.setRolloffFactor( 1.5 );
      sound.setDistanceModel( 'inverse' );

      this.soundsEmitters.push( sound );
      emitter.add( sound );

    } );

    this.initPlayButton();
    this.initUploadButton();
    this.initSelectionMenu();
    // this.initSlider();

    this.loadExamples();

  }

  load( file ) {

    loaders.audioLoader( this.audioDirectory + file ).then( ( buffer ) => {

      this.buffers[ file ] = buffer;

      const optionElem = document.createElement( 'option' );
      optionElem.value = file;
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

    // if ( this.isPlaying && !this.isPaused ) return;

    if ( this.soundsEmitters[0].source === undefined ) {

      const option = HTMLControl.controls.music.tracks.options[HTMLControl.controls.music.tracks.selectedIndex];

      if ( option !== undefined ) this.setTrack( option.value );

    }

    this.soundsEmitters.forEach( ( sound ) => {

      sound.play();

    } );

    this.playButton.innerHTML = 'Pause';

    this.isPlaying = true;
    this.isPaused = false;

  }

  pause() {

    if ( !this.isPlaying ) return;

    this.soundsEmitters.forEach( ( sound ) => {

      sound.pause();

    } );

    this.playButton.innerHTML = 'Play';


    this.isPaused = true;

  }

  reset() {

    this.playButton.innerHTML = 'Play';

    this.soundsEmitters.forEach( ( sound ) => {

      if ( sound.source !== undefined ) sound.stop();

    } );

    this.isPlaying = false;
    this.isPaused = false;

  }

  setTrack( name ) {

    this.reset();

    const buffer = this.buffers[ name ];

    this.positionSlider.value = 0;
    this.positionSlider.max = Math.ceil( buffer.duration );

    this.soundsEmitters.forEach( ( sound ) => {

      sound.setBuffer( buffer );

    } );
  }

  initPlayButton() {

    this.playButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      if ( !this.isPaused && this.isPlaying ) {

        this.pause();

      } else {

        this.play();

      }

    } );

  }

  initUploadButton() {

    HTMLControl.controls.music.uploadMP3Button.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      HTMLControl.controls.music.uploadMP3Input.click();

    } );

    HTMLControl.controls.music.uploadMP3Input.addEventListener( 'change', ( e ) => {

      const file = e.target.files[0];

      const name = file.name;

      const optionElem = document.createElement( 'option' );
      optionElem.value = name;
      optionElem.disabled = true;
      optionElem.innerHTML = name.replace( '.mp3', '' );
      HTMLControl.controls.music.tracks.appendChild( optionElem );

      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer( file );

      fileReader.onload = ( evt ) => {

        const context = THREE.AudioContext.getContext();

        context.decodeAudioData( evt.target.result, ( buffer ) => {

          this.buffers[ name ] = buffer;

          optionElem.disabled = false;

        } );

      };

    } );

  }

  initSelectionMenu() {

    HTMLControl.controls.music.tracks.addEventListener( 'input', ( e ) => {

      e.preventDefault();

      const track = e.target.options[e.target.selectedIndex].value;

      this.setTrack( track );

    } );

  }

  initSlider() {

    // const sliderMouseDownEvent = ( e ) => {

    //   if ( this.isPlaying ) this.pause();

    // };

    // const sliderMouseupEvent = () => {

    //   if ( this.isPaused ) {

    //     this.play();

    //   }

    // };

    // this.positionSlider.addEventListener( 'mouseup', sliderMouseupEvent, false );

    // this.positionSlider.addEventListener( 'mousedown', sliderMouseDownEvent, false );

    // this.sliderInputEvent = throttle( ( e ) => {

    //   // const oldTime = this.buffer.time;
    //   // const newTime = this.sliderInputEvent.value;
    //   console.log( this.sliderInputEvent.value )
    //   // this.currentMixer.update( newTime - oldTime );

    // }, 250 );

    // this.positionSlider.addEventListener( 'input', this.sliderInputEvent, false ); // throttling at ~17 ms will give approx 60fps while sliding the controls


  }

}