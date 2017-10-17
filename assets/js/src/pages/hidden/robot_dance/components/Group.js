// import HTMLControl from '../HTMLControl.js';
import TextCell from './HTML/TextCell.js';
import DeleteButtonCell from './HTML/DeleteButtonCell.js';
import LoopInputCell from './HTML/LoopInputCell.js';


export default class Group {

  constructor( num, frames ) {

    this.frames = frames;

    this.containedFrames = [];

    this.num = num;

    this.initTableRow();

    this.initAddFrameButton();

  }

  set selected( bool ) {

    if ( bool === true ) this.row.style.backgroundColor = 'aliceBlue';
    else this.row.style.backgroundColor = 'initial';

  }


  initTableRow() {

    this.row = document.createElement( 'tr' );

    new TextCell( this.row, this.num );
    const framesCell = new TextCell( this.row, '<h4>Frames</h4>' );

    this.addFrameButton = document.createElement( 'button' );
    this.addFrameButton.classList.add( 'add-selected-frame-button' );
    this.addFrameButton.innerHTML = 'Add Selected Frame';

    framesCell.appendChild( this.addFrameButton );

    const frameTable = document.createElement( 'table' );
    this.framesInGroup = document.createElement( 'tbody' );
    this.framesInGroup.classList.add( 'frames-in-group' );

    frameTable.appendChild( this.framesInGroup );
    framesCell.appendChild( frameTable );

    this.deleteButton = new DeleteButtonCell( this.row );


  }

  addFrame( frame ) {

    const detail = {
      frame,
      loopAmount: 1,
      deleteButton: null,
    };

    this.containedFrames.push( detail );
    const framePos = this.containedFrames.length - 1;

    const row = document.createElement( 'tr' );

    this.framesInGroup.appendChild( row );

    new TextCell( row, 'Frame #' + frame.num );

    const loopInput = new LoopInputCell( row );

    loopInput.onInput = ( value ) => {

      detail.loopAmount = value;

    };

    detail.deleteButton = new DeleteButtonCell( row );

    // const self = this;

    detail.deleteButton.onClick = () => {

      this.framesInGroup.removeChild( row );

      if ( this.lastAddedFrameNum === frame.num ) this.lastAddedFrameNum = null;

      this.containedFrames[ framePos ] = null;

    };

  }

  initAddFrameButton() {

    this.lastAddedFrameNum = null;

    this.addFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const frame = this.frames.selectedFrame;

      if ( frame === undefined ) return;

      // don't add the same frame consecutively (use loop instead)
      if ( this.lastAddedFrameNum === frame.num ) return;

      this.lastAddedFrameNum = frame.num;

      this.addFrame( frame );

    } );

  }

  // initDeleteButton() {

  //   const deleteButtonCell = document.createElement( 'td' );
  //   this.deleteButton = document.createElement( 'button' );
  //   this.deleteButton.innerHTML = '<span class="fa fa-lg fa-trash-o" aria-hidden="true"></span>';
  //   deleteButtonCell.appendChild( this.deleteButton );
  //   this.row.appendChild( deleteButtonCell );

  // }

  reset() {

    this.containedFrames.forEach( ( frame ) => {

      if ( frame !== null ) frame.deleteButton.click();

    } );

    this.containedFrames = [];

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
        loopAmount: detail.loopAmount,

      };

    }

    return output;

  }

}
