import * as THREE from 'three';
import HTMLControl from '../HTMLControl.js';

let framerate = 1;

class AnimationControl {

  constructor() {

    this.defaultFrame = null;

    this.frames = null;
    this.groups = null;
    this.dance = null;

    this.actions = [];

    HTMLControl.controls.dance.framerate.addEventListener( 'input', ( e ) => {

      e.preventDefault();

      this.framerate = e.target.value;

    } );

  }

  set framerate( value ) {

    framerate = value;

  }

  setDance( dance ) {

    this.dance = dance;
    this.frames = dance.frames;
    this.groups = dance.groups;

    return this;

  }

  // pauseAllAnimation() {

  //   if ( this.groups ) this.groups.deselectAll();

  // }

  initMixer( object ) {

    this.mixer = new THREE.AnimationMixer( object );

  }

  onUpdate( delta ) {

    if ( this.mixer ) this.mixer.update( delta * framerate );

  }

  createAnimation( frames ) {

    this.reset();

    if ( frames.length < 2 ) return;

    const headValues = [

      frames[ 0 ].headQuaternion.x,
      frames[ 0 ].headQuaternion.y,
      frames[ 0 ].headQuaternion.z,
      frames[ 0 ].headQuaternion.w,

    ];

    const leftShoulderValues = [

      frames[ 0 ].leftShoulderQuaternion.x,
      frames[ 0 ].leftShoulderQuaternion.y,
      frames[ 0 ].leftShoulderQuaternion.z,
      frames[ 0 ].leftShoulderQuaternion.w,

    ];

    const rightShoulderValues = [

      frames[ 0 ].rightShoulderQuaternion.x,
      frames[ 0 ].rightShoulderQuaternion.y,
      frames[ 0 ].rightShoulderQuaternion.z,
      frames[ 0 ].rightShoulderQuaternion.w,

    ];

    const leftElbowValues = [

      frames[ 0 ].leftElbowQuaternion.x,
      frames[ 0 ].leftElbowQuaternion.y,
      frames[ 0 ].leftElbowQuaternion.z,
      frames[ 0 ].leftElbowQuaternion.w,

    ];

    const rightElbowValues = [

      frames[ 0 ].rightElbowQuaternion.x,
      frames[ 0 ].rightElbowQuaternion.y,
      frames[ 0 ].rightElbowQuaternion.z,
      frames[ 0 ].rightElbowQuaternion.w,

    ];

    const times = [ 0 ];

    for ( let i = 1; i < frames.length; i++ ) {

      times.push( i );

      headValues.push(

        frames[ i ].headQuaternion.x,
        frames[ i ].headQuaternion.y,
        frames[ i ].headQuaternion.z,
        frames[ i ].headQuaternion.w,

      );

      leftShoulderValues.push(

        frames[ i ].leftShoulderQuaternion.x,
        frames[ i ].leftShoulderQuaternion.y,
        frames[ i ].leftShoulderQuaternion.z,
        frames[ i ].leftShoulderQuaternion.w,

      );


      rightShoulderValues.push(

        frames[ i ].rightShoulderQuaternion.x,
        frames[ i ].rightShoulderQuaternion.y,
        frames[ i ].rightShoulderQuaternion.z,
        frames[ i ].rightShoulderQuaternion.w,

      );

      leftElbowValues.push(

        frames[ i ].leftElbowQuaternion.x,
        frames[ i ].leftElbowQuaternion.y,
        frames[ i ].leftElbowQuaternion.z,
        frames[ i ].leftElbowQuaternion.w,

      );

      rightElbowValues.push(

        frames[ i ].rightElbowQuaternion.x,
        frames[ i ].rightElbowQuaternion.y,
        frames[ i ].rightElbowQuaternion.z,
        frames[ i ].rightElbowQuaternion.w,

      );

    }

    const headTrack = [ new THREE.QuaternionKeyframeTrack( 'head.quaternion', times, headValues ) ];
    const leftShoulderTrack = [ new THREE.QuaternionKeyframeTrack( 'leftShoulder.quaternion', times, leftShoulderValues ) ];
    const rightShoulderTrack = [ new THREE.QuaternionKeyframeTrack( 'rightShoulder.quaternion', times, rightShoulderValues ) ];
    const leftElbowTrack = [ new THREE.QuaternionKeyframeTrack( 'leftElbow.quaternion', times, leftElbowValues ) ];
    const rightElbowTrack = [ new THREE.QuaternionKeyframeTrack( 'rightElbow.quaternion', times, rightElbowValues ) ];

    this.actions = [

      this.createAction( 'headControl.quaternion', headTrack ),
      this.createAction( 'shoulderControlLeft.quaternion', leftShoulderTrack ),
      this.createAction( 'shoulderControlRight.quaternion', rightShoulderTrack ),
      this.createAction( 'elbowControlLeft.quaternion', leftElbowTrack ),
      this.createAction( 'elbowControlRight.quaternion', rightElbowTrack ),

    ];

  }

  // A Clip consists of one or more keyframe tracks
  // - for example the movement of an arm over the duration of a group.
  // An Action controls playback of the clip
  createAction( name, tracks ) {

    const clip = new THREE.AnimationClip( name, -1, tracks );

    const action = this.mixer.clipAction( clip );

    action.zeroSlopeAtStart = false;
    action.zeroSlopeAtEnd = false;

    action.name = clip.name;

    return action;

  }

  play() {

    this.actions.forEach( ( action ) => {

      action.play();

    } );

  }

  reset() {

    this.actions.forEach( ( action ) => {

      action.stop();

    } );

    this.actions = [];

    if ( this.groups ) this.groups.deselectAll();


  }

}

export default new AnimationControl();
