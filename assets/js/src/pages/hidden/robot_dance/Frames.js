import HTMLControl from './HTMLControl.js';
import Frame from './Frame.js';
import RobotManualControl from './RobotManualControl.js';

export default class Frames {

  constructor( robot ) {

    this.robotManualControl = new RobotManualControl( robot );

    this.currentFrameNum = 0;
    this.frames = [];

    this.framesTable = HTMLControl.controls.frames.table;
    this.newFrameButton = HTMLControl.controls.frames.createButton;
    this.initNewFrameButton();

  }

  initNewFrameButton() {

    this.newFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const frame = new Frame( this.currentFrameNum ++  );

      this.frames.push( frame );

      this.framesTable.appendChild( frame.row );

      frame.row.addEventListener( 'click', ( evt ) => {

        evt.preventDefault();

        frame.selected = true;

        this.robotManualControl.setFrame( frame );

        this.frames.forEach( ( f ) => {

          if ( f.num !== frame.num ) f.selected = false;

        } );

      } );

    } );

  }

}

