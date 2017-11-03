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

    console.log( frames )

    this.reset();

    if ( frames.length < 2 ) return [];

    const headTracks = [];
    const leftShoulderTracks = [];
    const rightShoulderTracks = [];
    const leftElbowTracks = [];
    const rightElbowTracks = [];

    for ( let i = 1; i < frames.length; i++ ) {

      const initialFrame = frames[ i - 1 ];
      const finalFrame = frames[ i ];

      const frameStartTime = i - 1;

      headTracks.push(
        this.createKeyFrameTrack( 'head.quaternion', initialFrame.headQuaternion, finalFrame.headQuaternion, frameStartTime ),
      );

      leftShoulderTracks.push(
        this.createKeyFrameTrack( 'leftShoulder.quaternion', initialFrame.leftShoulderQuaternion, finalFrame.leftShoulderQuaternion, frameStartTime ),
      );

      rightShoulderTracks.push(
        this.createKeyFrameTrack( 'rightShoulder.quaternion', initialFrame.rightShoulderQuaternion, finalFrame.rightShoulderQuaternion, frameStartTime ),
      );

      leftElbowTracks.push(
        this.createKeyFrameTrack( 'leftElbow.quaternion', initialFrame.leftElbowQuaternion, finalFrame.leftElbowQuaternion, frameStartTime ),
      );

      rightElbowTracks.push(
        this.createKeyFrameTrack( 'rightElbow.quaternion', initialFrame.rightElbowQuaternion, finalFrame.rightElbowQuaternion, frameStartTime ),
      );

    }

    this.actions = [
      this.createAction( 'headControl.quaternion', headTracks ),
      this.createAction( 'shoulderControlLeft.quaternion', leftShoulderTracks ),
      this.createAction( 'shoulderControlRight.quaternion', rightShoulderTracks ),
      this.createAction( 'elbowControlLeft.quaternion', leftElbowTracks ),
      this.createAction( 'elbowControlRight.quaternion', rightElbowTracks ),
    ];

  }

  // create a keyframe track consisting of two keyframes, representing the time span of one frame
  createKeyFrameTrack( part, initialPos, finalPos, startTime ) {

    return new THREE.QuaternionKeyframeTrack( part,
      [
        startTime,
        startTime + 1, // framerate is fixed a 1 fps, we'll use the action.timescale to convert to other framerates
      ],
      [
        initialPos.x,
        initialPos.y,
        initialPos.z,
        initialPos.w,
        finalPos.x,
        finalPos.y,
        finalPos.z,
        finalPos.w,
      ],
    );

  }

  // A Clip consists of several keyframe tracks
  // - for example the movement of an arm over the duration of a group.
  // An Action controls playback of the clip
  createAction( name, tracks ) {

    const clip = new THREE.AnimationClip( name, tracks.length, tracks );

    const action = this.mixer.clipAction( clip );

    action.zeroSlopeAtStart = false;
    action.zeroSlopeAtEnd = false;


    action.name = clip.name;

    return action;

  }

  play() {

    console.log( 'animationControl.play' )

    this.actions.forEach( ( action ) => {

      action.play();

    } );

  }

  reset() {

    console.log( 'animationControl.reset' );

    this.actions.forEach( ( action ) => {

      action.stop();

    } );

    this.actions = [];

    if ( this.groups ) this.groups.deselectAll();


  }

}

export default new AnimationControl();
