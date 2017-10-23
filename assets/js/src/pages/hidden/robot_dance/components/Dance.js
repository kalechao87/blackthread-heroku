import HTMLControl from '../HTMLControl.js';
import TextCell from './HTML/TextCell.js';
import DeleteButtonCell from './HTML/DeleteButtonCell.js';
import LoopInputCell from './HTML/LoopInputCell.js';
import animationControl from '../animation/animationControl.js';

import DanceAnimation from '../animation/DanceAnimation.js';


export default class Dance {

  constructor( groups ) {

    this.groups = groups;
    this.frames = groups.frames;
    this.robot = this.frames.robot;

    this.animation = new DanceAnimation( this.robot );

    this.lastAddedType = null;
    this.table = HTMLControl.controls.dance.table;

    this.containedElems = [];

    this.initAdvancedControlsToggle();
    this.initAddSelectedFrameButton();
    this.initAddSelectedGroupButton();
    this.initPlayButton();
    this.initResetButton();
    this.initFramerateInput();

  }

  set framerate( value ) {

    animationControl.framerate = value;

  }

  initAdvancedControlsToggle() {

    HTMLControl.controls.dance.advancedControlToggle.addEventListener( 'change', ( e ) => {

      e.preventDefault();

      HTMLControl.controls.dance.advancedControlSection.classList.toggle( 'hide' );


    } );
  }

  add( elem, loop ) {

    const loopAmount = loop || 1;

    const detail = {
      elem,
      loopAmount,
      deleteButton: null,
    };

    this.containedElems.push( detail );

    const pos = this.containedElems.length - 1;

    const row = document.createElement( 'tr' );
    this.table.appendChild( row );

    new TextCell( row, elem.num );
    new TextCell( row, elem.type );

    if( elem.type === 'group' ) {

      const loopInput = new LoopInputCell( row );

      loopInput.onInput = ( value ) => {

        detail.loopAmount = value;

      };

    } else {

      row.appendChild( document.createElement( 'td' ) );

    }

    detail.deleteButton = new DeleteButtonCell( row );

    detail.deleteButton.onClick = () => {

      this.table.removeChild( row );

      this.containedElems.splice( pos, 1 );

    };

    this.animation.createAnimation( this.containedElems );

  }

  initAddSelectedFrameButton() {

    this.lastAddedFrameNum = null;

    HTMLControl.controls.dance.addFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const frame = this.frames.frames[ this.frames.selectedFrameNum ];

      if ( frame === null || ( frame.num === this.lastAddedFrameNum && this.lastAddedType === 'frame' ) ) return;

      this.add( frame, 'Frame' );

      this.lastAddedFrameNum = frame.num;
      this.lastAddedType = 'frame';


    } );

  }

  initAddSelectedGroupButton() {

    this.lastAddedGroupNum = null;

    HTMLControl.controls.dance.addGroupButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const group = this.groups.selectedGroup;

      if ( group === null || ( group.num === this.lastAddedGroupNum && this.lastAddedType === 'group' ) ) return;

      this.add( group, 'Group' );

      this.lastAddedGroupNum = group.num;
      this.lastAddedType = 'group';

    } );

  }

  initFramerateInput() {

    HTMLControl.controls.dance.framerate.addEventListener( 'input', ( e ) => {

      this.framerate = e.target.value;

    } );

  }

  setFramerate( rate ) {

    if ( rate < 0.1 || rate > 10 ) {

      console.warn( 'Attempting to set frame rate outside of allowed range [0.1, 10]!' );
      rate = 1;

    }

    HTMLControl.controls.dance.framerate.value = rate;
    this.framerate = rate;


  }

  initPlayButton() {

    HTMLControl.controls.dance.playButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      this.animation.createAnimation( this.containedElems );
      this.animation.play();

      if ( HTMLControl.controls.music.play.innerHTML === 'Play' ) {

        HTMLControl.controls.music.play.click();

      }

    } );

  }

  initResetButton() {

    HTMLControl.controls.dance.resetButton.addEventListener( 'click', ( e ) => {

      console.log( 'TODO: reset dance button last elem not removed ' );

      e.preventDefault();

      this.reset();

    } );

  }

  reset() {

    this.containedElems.forEach( ( elem ) => {

      if ( elem !== null && elem.deleteButton ) elem.deleteButton.click();

    } );

    this.containedElems = [];

  }

  fromJSON( object ) {

    this.reset();

    this.setFramerate( object.framerate || 1 );

    for ( const key in object ) {

      const value = object[ key ];

      if ( value.type === 'frame' ) {

        this.add( this.frames.frames[ value.num ], value.loopAmount );

      } else if ( value.type === 'group' ) {

        this.add( this.groups.groups[ value.num ], value.loopAmount );

      } else if ( key === 'framerate' ) {

        HTMLControl.controls.dance.framerate.value = value;

      }

    }

  }

  toJSON() {

    const output = {

      framerate: this.framerate,

    };

    for ( let i = 0; i < this.containedElems.length; i++ ) {

      const detail = this.containedElems[ i ];

      if ( detail !== null ) {

        output[ i ] = {

          type: detail.elem.type,
          num: detail.elem.num,
          loopAmount: detail.loopAmount,

        };

      } else {

        output[ i ] = null;

      }

    }

    return output;

  }

}
