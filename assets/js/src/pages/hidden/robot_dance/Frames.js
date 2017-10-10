import HTMLControl from './HTMLControl.js';
import Frame from './Frame.js';

export default class Frames {

  constructor( robot ) {

    this.initRobot( robot );

    this.currentFrameNum = 0;
    this.frames = [];

    this.framesTable = HTMLControl.controls.frames.table;
    this.newFrameButton = HTMLControl.controls.frames.createButton;
    this.initNewFrameButton();

  }


  initRobot( robot ) {

    this.robot = {

      head: robot.getObjectByName( 'headControl' ),

      leftShoulder: robot.getObjectByName( 'shoulderControlLeft' ),
      rightShoulder: robot.getObjectByName( 'shoulderControlRight' ),

      leftElbow: robot.getObjectByName( 'elbowControlLeft' ),
      rightElbow: robot.getObjectByName( 'elbowControlRight' ),

    };

    this.robot.leftShoulderInitialQuaternion = this.robot.leftShoulder.quaternion.clone();
    this.robot.rightShoulderInitialQuaternion = this.robot.rightShoulder.quaternion.clone();
    this.robot.leftElbowInitialQuaternion = this.robot.leftElbow.quaternion.clone();
    this.robot.rightElbowInitialQuaternion = this.robot.rightElbow.quaternion.clone();

    // slight hack since the model's head is very slightly rotated at the start
    // so reset that here
    this.robot.head.rotation.set( 0, 0, 0 );

  }

  initNewFrameButton() {

    this.newFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const frame = new Frame( this.currentFrameNum ++, this.robot );

      this.frames.push( frame );

      this.framesTable.appendChild( frame.row );

      this.selectFrame( frame );

      frame.row.addEventListener( 'click', ( evt ) => {

        evt.preventDefault();

        this.selectFrame( frame );

      } );

    } );

  }

  selectFrame( frame ) {

    frame.selected = true;

    this.frames.forEach( ( f ) => {

      if ( f.num !== frame.num ) f.selected = false;

    } );

  }

}

