import TextCell from './HTML/TextCell.js';
import DeleteButtonCell from './HTML/DeleteButtonCell.js';
import ResetButtonCell from './HTML/ResetButtonCell.js';

import GroupAnimation from '../animation/GroupAnimation.js';

export default class Group {

  constructor( num, frames ) {

    this.type = 'group';

    this.frames = frames;
    this.robot = frames.robot;

    this.containedFrames = [];

    this.num = num;

    this.animation = new GroupAnimation( this.robot );

    this.initTableRow();

    this.initAddFrameButton();

    this._selected = false;

  }

  set selected( bool ) {

    if ( this._selected === bool ) return;

    if ( bool === true ) {

      this.row.style.backgroundColor = 'aliceBlue';
      this.animation.createAnimation( this.containedFrames );
      this.animation.play();
      this._selected = true;

    } else {

      this.row.style.backgroundColor = 'initial';
      this.animation.stop();
      this._selected = false;

    }

  }


  initTableRow() {

    this.row = document.createElement( 'tr' );

    new TextCell( this.row, this.num );
    const framesCell = new TextCell( this.row, '<h4>Frames in Group</h4>' );

    this.addFrameButton = document.createElement( 'button' );
    this.addFrameButton.classList.add( 'add-selected-frame-button' );
    this.addFrameButton.innerHTML = 'Add Selected Frame';

    framesCell.appendChild( this.addFrameButton );

    const frameTable = document.createElement( 'table' );
    this.framesInGroup = document.createElement( 'tbody' );
    this.framesInGroup.classList.add( 'frames-in-group' );

    frameTable.appendChild( this.framesInGroup );
    framesCell.appendChild( frameTable );

    this.resetButton = new ResetButtonCell( this.row );

    const click = () => {

      this.reset();

    };
    this.resetButton.onClick = click;

  }

  addFrame( frame ) {

    const detail = {
      frame,
      deleteButton: null,
    };

    this.containedFrames.push( detail );
    const framePos = this.containedFrames.length - 1;

    const row = document.createElement( 'tr' );

    this.framesInGroup.appendChild( row );

    new TextCell( row, 'Frame #' + frame.num );

    row.appendChild( document.createElement( 'td' ) );

    detail.deleteButton = new DeleteButtonCell( row );

    detail.deleteButton.onClick = () => {

      if ( this.framesInGroup.contains( row ) ) this.framesInGroup.removeChild( row );

      if ( this.lastAddedFrameNum === frame.num ) this.lastAddedFrameNum = null;

      this.containedFrames.splice( framePos, 1 );

      this.animation.createAnimation( this.containedFrames );

    };

    this.selected = true;


  }

  initAddFrameButton() {

    this.lastAddedFrameNum = null;

    this.addFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const frame = this.frames.frames[ this.frames.selectedFrameNum ];

      if ( frame === undefined || frame === null ) return;

      // don't add the same frame consecutively (use loop instead)
      if ( this.lastAddedFrame === frame ) return;

      this.lastAddedFrameNum = frame;

      this.addFrame( frame );

    } );

  }

  reset() {

    this.containedFrames.forEach( ( frame ) => {

      if ( frame !== null && frame.deleteButton ) frame.deleteButton.click();

    } );

    this.containedFrames = [];
    this.animation.stop();
    this.animation.reset();

  }

  fromJSON( object ) {

    this.reset();

    for ( const key in object ) {

      const detail = object[ key ];

      this.addFrame( this.frames.frames[ detail.frameNum] );

    }

  }

  toJSON() {

    const output = {};

    for ( let i = 0; i < this.containedFrames.length; i++ ) {

      const detail = this.containedFrames[ i ];

      output[ i ] = {

        frameNum: detail.frame.num,

      };

    }

    return output;

  }

}