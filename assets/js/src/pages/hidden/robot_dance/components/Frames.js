import HTMLControl from '../HTMLControl.js';
import Frame from './Frame.js';

import animationControl from '../animation/animationControl.js';

export default class Frames {

  constructor( robot ) {

    this.robot = robot;

    // used as the base standing pose for the robot, all dances start here
    this.defaultFrame = new Frame( 999999, this.robot, true );

    this.currentFrameNum = 0;
    this.selectedFrame = null;
    this.frames = [];

    this.framesTable = HTMLControl.controls.frames.table;
    this.newFrameButton = HTMLControl.controls.frames.createButton;
    this.initNewFrameButton();

  }

  removeFrame ( frame ) {

    HTMLControl.controls.frames.table.removeChild( frame.row );

    frame.removeEventListeners();

    this.frames[ frame.num ] = null;

    if ( this.selectedFrame === frame ) {

      this.selectedFrame = null;

    }

  }

  createFrame( num, detail ) {

    const frame = new Frame( num, this.robot );

    if ( detail !== undefined ) frame.fromJSON( detail );

    this.frames[ frame.num ] = frame;

    this.framesTable.appendChild( frame.row );

    this.select( frame );

    frame.row.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      this.select( frame );

    } );

    // frame.deleteButton.onClick = this.removeFrame;

    // frame.deleteButton.disabled = true;


    return frame;

  }

  initNewFrameButton() {

    this.newFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      this.createFrame( this.currentFrameNum ++ );

      if ( this.currentFrameNum >= 30 ) {

        this.newFrameButton.innerHTML = 'Limit Reached!';

        this.newFrameButton.disabled = true;

      }

    } );

    // create the first frame
    this.newFrameButton.click();

  }

  select( frame ) {

    animationControl.pauseAllAnimation();

    frame.selected = true;

    this.selectedFrame = frame;

    this.frames.forEach( ( f ) => {

      if ( f !== null && f.num !== frame.num ) f.selected = false;

    } );

  }

  reset() {

    this.frames.forEach( ( frame ) => {

      if ( frame !== null ) this.removeFrame( frame );

    } );

    this.selectedFrame = null;
    this.currentFrameNum = 0;
    this.frames = [];

  }

  fromJSON( object ) {

    this.reset();

    for ( const key in object ) {

      const detail = object[ key ];

      if( detail.type === 'frame' ) {

        console.log( detail )

          if ( detail === null ) {

            this.frames[ key ] = null;

          } else {

            const num = parseInt( key, 10 );

            this.createFrame( num, detail );
            if ( this.currentFrameNum < num ) this.currentFrameNum = num;

          }
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

