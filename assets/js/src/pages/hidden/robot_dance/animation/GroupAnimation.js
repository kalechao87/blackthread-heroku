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

      const frameStartTime = i - 1;

      headTracks.push(
        animationControl.createKeyFrameTrack( 'headControl.quaternion', initialFrame.headQuaternion, finalFrame.headQuaternion, frameStartTime )
      );

      leftShoulderTracks.push(
        animationControl.createKeyFrameTrack( 'shoulderControlLeft.quaternion', initialFrame.leftShoulderQuaternion, finalFrame.leftShoulderQuaternion, frameStartTime )
      );

      rightShoulderTracks.push(
        animationControl.createKeyFrameTrack( 'shoulderControlRight.quaternion', initialFrame.rightShoulderQuaternion, finalFrame.rightShoulderQuaternion, frameStartTime )
      );

      leftElbowTracks.push(
        animationControl.createKeyFrameTrack( 'elbowControlLeft.quaternion', initialFrame.leftElbowQuaternion, finalFrame.leftElbowQuaternion, frameStartTime )
      );

      rightElbowTracks.push(
        animationControl.createKeyFrameTrack( 'elbowControlRight.quaternion', initialFrame.rightElbowQuaternion, finalFrame.rightElbowQuaternion, frameStartTime )
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

      animationControl.uncache( action );

    } );

  }

}
