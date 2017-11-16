import HTMLControl from '../HTMLControl.js';
import Frame from './Frame.js';

import animationControl from '../animation/animationControl.js';

export default class Frames {

  constructor( robot ) {

    this.robot = robot;

    // used as the default standing pose for the robot, all dances start here
    this.defaultFrame = new Frame( this.robot, true );

    this.currentFrameNum = 0;
    this.selectedFrameNum = -1;
    this.frames = [];

    this.framesTable = HTMLControl.controls.frames.table;
    this.newFrameButton = HTMLControl.controls.frames.createButton;
    this.initNewFrameButton();

  }

  removeFrame( frame ) {

    HTMLControl.controls.frames.table.removeChild( frame.row );

    frame.reset();

    frame.removeEventListeners();

  }

  createFrame( detail ) {

    const frame = new Frame( this.robot, this.currentFrameNum );

    if ( detail !== undefined ) frame.fromJSON( detail );

    this.frames[ this.currentFrameNum ] = frame;

    this.framesTable.appendChild( frame.row );

    this.select( this.currentFrameNum );

    frame.row.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      this.select( frame.num );

    } );

    this.currentFrameNum ++;

    return frame;

  }

  initNewFrameButton() {

    this.newFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      this.createFrame();

      if ( this.currentFrameNum >= 30 ) {

        this.newFrameButton.innerHTML = 'Limit Reached!';

        this.newFrameButton.disabled = true;

      }

    } );

    // create the first frame
    this.newFrameButton.click();

  }

  select( num ) {

    // if ( this.selectedFrameNum === num ) return;

    animationControl.reset();

    const frame = this.frames[ num ];

    if ( frame !== undefined ) {

      frame.selected = true;

    }

    this.selectedFrameNum = num;

    for ( let i = 0; i < this.frames.length; i++ ) {

      if ( i !== num ) this.frames[ i ].selected = false;

    }

    HTMLControl.controls.groups.selectFrameMessage.innerHTML = num;

  }

  deselectAll() {

    this.select( -1 );
    this.defaultFrame.selected = true;

  }

  reset() {

    this.frames.forEach( ( frame ) => {

      this.removeFrame( frame );

    } );

    this.selectedFrameNum = -1;
    this.currentFrameNum = 0;
    this.frames = [];

  }

  fromJSON( object ) {

    this.reset();

    for ( const key in object ) {

      this.createFrame( object[ key ] );

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

