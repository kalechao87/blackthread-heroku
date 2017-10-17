import HTMLControl from '../HTMLControl.js';
import Frame from './Frame.js';

export default class Frames {

  constructor( robot ) {

    this.robot = robot;

    this.currentFrameNum = 0;
    this.selectedFrame = null;
    this.frames = [];

    this.framesTable = HTMLControl.controls.frames.table;
    this.newFrameButton = HTMLControl.controls.frames.createButton;
    this.initNewFrameButton();

  }

  setDefaultFrame( frame ) {

    this.defaultFrame = frame;

  }

  createFrame( num ) {

    const frame = new Frame( num, this.robot );

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

      this.createFrame( this.currentFrameNum ++ );

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

