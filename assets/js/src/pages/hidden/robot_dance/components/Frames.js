import HTMLControl from '../HTMLControl.js';
import Frame from './Frame.js';

let lastCreatedFrame = null;

export default class Frames {

  constructor( robot ) {

    this.initRobot( robot );

    this.currentFrameNum = 0;
    this.selectedFrame = null;
    this.frames = [];

    // this holds the base pose for the robot - if values are undefined in other frames they
    // will fallback to this frame
    this.defaultFrame = new Frame( 999999, this.robot, true );

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

    // slight hack since the model's head is very slightly rotated at the start
    // so reset that here
    this.robot.head.rotation.set( 0, 0, 0 );

    this.robot.headInitialQuaternion = this.robot.leftShoulder.quaternion.clone();
    this.robot.leftShoulderInitialQuaternion = this.robot.leftShoulder.quaternion.clone();
    this.robot.rightShoulderInitialQuaternion = this.robot.rightShoulder.quaternion.clone();
    this.robot.leftElbowInitialQuaternion = this.robot.leftElbow.quaternion.clone();
    this.robot.rightElbowInitialQuaternion = this.robot.rightElbow.quaternion.clone();

  }

  createFrame( num, detail ) {

    const frame = new Frame( num, this.robot );

    if ( detail !== undefined ) frame.fromJSON( detail );

    this.frames[ frame.num ] = frame;

    this.framesTable.appendChild( frame.row );

    this.select( frame );

    frame.row.addEventListener( 'click', ( evt ) => {

      evt.preventDefault();

      this.select( frame );

    } );

    frame.deleteButton.onClick = () => {

      HTMLControl.controls.frames.table.removeChild( frame.row );

      frame.removeEventListeners();

      this.frames[ frame.num ] = null;

    };

    return frame;

  }

  initNewFrameButton() {

    this.newFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      lastCreatedFrame = this.createFrame( this.currentFrameNum ++ );

    } );

  }

  select( frame ) {

    frame.selected = true;

    this.selectedFrame = frame;

    this.frames.forEach( ( f ) => {

      if ( f !== null && f.num !== frame.num ) f.selected = false;

    } );

  }

  reset() {

    this.frames.forEach( ( frame ) => {

      if ( frame !== null ) frame.deleteButton.click();

    } );

    this.frames = [];

  }

  fromJSON( object ) {

    this.reset();

    for ( const key in object ) {

      const detail = object[ key ];

      if ( detail === null ) {

        this.frames[ key ] = null;

      } else {

        this.createFrame( key, detail );
        this.currentFrameNum = key;

      }

    }

  }

  toJSON() {

    const output = {};

    for ( let i = 0; i < this.frames.length; i++ ) {

      const frame = this.frames[ i ];

      if ( frame !== null ) {

        output[ i ] = frame.toJSON();

      } else {

        output[ i ] = null;

      }

    }

    return output;

  }

}

