import animationControl from './animationControl.js';

export default class DanceAnimation {

  constructor( robot ) {

    this.robot = robot;

    this.actions = [];

  }

  // take the details array and flatten it to an array of frames
  flattenDetails( details ) {

    let frames = [];

    details.forEach( ( detail ) => {

      const elem = detail.elem;

      if ( elem.type === 'frame' ) frames.push( elem );

      else if ( elem.type === 'group' ) {

        frames = frames.concat( this.flattenGroup( elem, detail.loopAmount ) );

      }

    } );

    return frames;

  }

  flattenGroup( group, loopAmount ) {

    let frames = [];

    for ( let i = 0; i < loopAmount; i++ ) {

      frames = frames.concat( group.containedFrames.map( ( detail => detail.frame ) ) );

    }

    return frames;

  }

  createAnimation( details ) {

    this.reset();

    const frames = this.flattenDetails( details );

    // we need at least two frames to create the animation
    if ( frames.length < 2 ) return;

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
            animationControl.createKeyFrameTrack( 'head.quaternion', initialFrame.headQuaternion, finalFrame.headQuaternion, frameStartTime ),
          );

      leftShoulderTracks.push(
            animationControl.createKeyFrameTrack( 'leftShoulder.quaternion', initialFrame.leftShoulderQuaternion, finalFrame.leftShoulderQuaternion, frameStartTime ),
          );

      rightShoulderTracks.push(
            animationControl.createKeyFrameTrack( 'rightShoulder.quaternion', initialFrame.rightShoulderQuaternion, finalFrame.rightShoulderQuaternion, frameStartTime ),
          );

      leftElbowTracks.push(
            animationControl.createKeyFrameTrack( 'leftElbow.quaternion', initialFrame.leftElbowQuaternion, finalFrame.leftElbowQuaternion, frameStartTime ),
          );

      rightElbowTracks.push(
            animationControl.createKeyFrameTrack( 'rightElbow.quaternion', initialFrame.rightElbowQuaternion, finalFrame.rightElbowQuaternion, frameStartTime ),
          );

    }

    const headAction = animationControl.createAction( 'headControl.quaternion', headTracks );
    const leftShoulderAction = animationControl.createAction( 'shoulderControlLeft.quaternion', leftShoulderTracks );
    const rightShoulderAction = animationControl.createAction( 'shoulderControlRight.quaternion', rightShoulderTracks );
    const leftElbowAction = animationControl.createAction( 'elbowControlLeft.quaternion', leftElbowTracks );
    const rightElbowAction = animationControl.createAction( 'elbowControlRight.quaternion', rightElbowTracks );

    this.actions = [
      headAction,
      leftShoulderAction,
      rightShoulderAction,
      leftElbowAction,
      rightElbowAction,
    ];

  }

  play() {

    this.actions.forEach( ( action ) => {

      action.play();

    } );

  }

  stop() {

    this.actions.forEach( ( action ) => {

      action.stop();

    } );

  }

  reset() {

    this.actions.forEach( ( action ) => {

      action.reset();

    } );

  }
}
