import animationControl from './animationControl.js';

export default class GroupAnimation {

  constructor( robot ) {

    this.robot = robot;

    this.actions = [];

  }

  createAnimation( framesDetails ) {

    this.reset();

    // we need at least two frames to create the animation
    if ( framesDetails.length < 2 ) return;

    const headTracks = [];
    const leftShoulderTracks = [];
    const rightShoulderTracks = [];
    const leftElbowTracks = [];
    const rightElbowTracks = [];

    for ( let i = 1; i < framesDetails.length; i++ ) {

      const initialFrame = framesDetails[ i - 1 ].frame;
      const finalFrame = framesDetails[ i ].frame;

      headTracks.push(
        animationControl.createKeyFrameTrack( 'headControl.quaternion', initialFrame.headQuaternion, finalFrame.headQuaternion )
      );

      leftShoulderTracks.push(
        animationControl.createKeyFrameTrack( 'shoulderControlLeft.quaternion', initialFrame.leftShoulderQuaternion, finalFrame.leftShoulderQuaternion )
      );

      rightShoulderTracks.push(
        animationControl.createKeyFrameTrack( 'shoulderControlRight.quaternion', initialFrame.rightShoulderQuaternion, finalFrame.rightShoulderQuaternion )
      );

      leftElbowTracks.push(
        animationControl.createKeyFrameTrack( 'elbowControlLeft.quaternion', initialFrame.leftElbowQuaternion, finalFrame.leftElbowQuaternion )
      );

      rightElbowTracks.push(
        animationControl.createKeyFrameTrack( 'elbowControlRight.quaternion', initialFrame.rightElbowQuaternion, finalFrame.rightElbowQuaternion, this.framerate )
      );

    }

    const headAction = animationControl.createAction( 'headControl.quaternion', headTracks );
    headAction.play();

    const leftShoulderAction = animationControl.createAction( 'shoulderControlLeft.quaternion', leftShoulderTracks );
    leftShoulderAction.play();

    const rightShoulderAction = animationControl.createAction( 'shoulderControlRight.quaternion', rightShoulderTracks );
    rightShoulderAction.play();

    const leftElbowAction = animationControl.createAction( 'elbowControlLeft.quaternion', leftElbowTracks );
    leftElbowAction.play();

    const rightElbowAction = animationControl.createAction( 'elbowControlRight.quaternion', rightElbowTracks );
    rightElbowAction.play();

    this.actions = [
      headAction,
      leftShoulderAction,
      rightShoulderAction,
      leftElbowAction,
      rightElbowAction,
    ]

  }

  play() {

    this.actions.forEach( ( action ) => {

      action.play();

    } );

  }

  pause() {

    this.actions.forEach( ( action ) => {

      action.play();

    } );

  }

  reset() {

    this.actions.forEach( ( action ) => {

      animationControl.uncache( action );

    } );

  }

}