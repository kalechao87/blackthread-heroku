import TextCell from './HTML/TextCell.js';
import DeleteButtonCell from './HTML/DeleteButtonCell.js';
import ResetButtonCell from './HTML/ResetButtonCell.js';

import animationControl from '../animation/animationControl.js';

export default class Group {

  constructor( num, frames ) {

    this.type = 'group';

    this.frames = frames;
    this.robot = frames.robot;

    this.valid = false;

    this.num = num;

    this.initTableRow();

    this.initAddFrameButton();

    this._selected = false;

  }

  set selected( bool ) {

    if ( this._selected === bool ) return;

    if ( bool === true ) {

      this.row.style.backgroundColor = 'aliceBlue';

      animationControl.play();
      this._selected = true;

    } else {

      this.row.style.backgroundColor = 'initial';
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
    this.resetButton.onClick = () => this.reset();

  }

  addFrame( frame ) {

    // const detail = {
    //   frame,
    //   deleteButton: null,
    // };

    const row = document.createElement( 'tr' );
    row.dataset.frameNumber = frame.num;

    this.framesInGroup.appendChild( row );

    new TextCell( row, 'Frame #' + frame.num );

    row.appendChild( document.createElement( 'td' ) );

    const deleteButton = new DeleteButtonCell( row );

    deleteButton.onClick = () => {

      if ( this.framesInGroup.contains( row ) ) {

        this.framesInGroup.removeChild( row );

      }

      if ( this.lastAddedFrameNum === frame.num ) {

        this.lastAddedFrameNum = null;

      }

      this.createAnimation();

    };

    this.selected = true;

  }

  initAddFrameButton() {

    this.lastAddedFrameNum = null;

    this.addFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const frame = this.frames.frames[ this.frames.selectedFrameNum ];

      if ( frame === undefined || frame === null ) return;

      this.lastAddedFrameNum = frame;

      this.addFrame( frame );

      this.createAnimation();
      animationControl.play();

    } );

  }

  getFrames() {

    const frames = [];

    this.framesInGroup.childNodes.forEach( ( node ) => {

      frames.push( this.frames.frames[ node.dataset.frameNumber ] );

    } );

    return frames;

  }

  createAnimation() {

    animationControl.createAnimation( this.getFrames() );

  }

  reset() {

    while ( this.framesInGroup.firstChild ) {

      this.framesInGroup.removeChild( this.framesInGroup.firstChild );

    }

    animationControl.reset();
    this.selected = false;

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
