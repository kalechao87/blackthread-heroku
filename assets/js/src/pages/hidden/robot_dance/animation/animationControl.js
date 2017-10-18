import * as THREE from 'three';
import HTMLControl from '../HTMLControl.js';

let framerate = 1;

class AnimationControl {

  constructor() {

    this.defaultFrame = null;

    this.frames = null;
    this.groups = null;
    this.dance = null;

    HTMLControl.controls.dance.framerate.addEventListener( 'input', ( e ) => {

      e.preventDefault();

      this.framerate = e.target.value;

    } );

  }

  set framerate( value ) {

    console.log( 'AnimationControl.framerate not yet implemented! ' );

    // TODO - probably best to store all actions, then use timeScale to set the speed

  }

  setDance( dance ) {

    this.dance = dance;
    this.frames = dance.frames;
    this.groups = dance.groups;

    return this;

  }

  pauseAllAnimation() {

    this.groups.deselectAll();

  }

  initMixer( object ) {

    this.mixer = new THREE.AnimationMixer( object );

  }

  onUpdate( delta ) {

    if ( this.mixer ) this.mixer.update( delta );

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
      // THREE.InterpolateSmooth,
    );

  }

  // a Clip consists of several keyframe tracks
  // - for example the movement of an arm over the duration of a group
  // an Action controls playback of the clip
  createAction( name, tracks ) {

    const clip = new THREE.AnimationClip( name, -1, tracks );

    const action = this.mixer.clipAction( clip );

    action.name = clip.name;

    return action;

  }

  uncache( action ) {

    const clip = action.getClip();

    this.mixer.uncacheClip( clip );
    this.mixer.uncacheAction( clip );

  }

}

export default new AnimationControl();