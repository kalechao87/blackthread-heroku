import HTMLControl from '../HTMLControl.js';
import TextCell from './HTML/TextCell.js';
import DeleteButtonCell from './HTML/DeleteButtonCell.js';
import LoopInputCell from './HTML/LoopInputCell.js';
import animationControl from '../animation/animationControl.js';

export default class Dance {

  constructor( groups ) {

    this.groups = groups;
    this.frames = groups.frames;
    this.robot = this.frames.robot;

    this.valid = false;

    this.lastAddedType = null;
    this.table = HTMLControl.controls.dance.table;

    this.initAdvancedControlsToggle();
    this.initAddSelectedFrameButton();
    this.initAddSelectedGroupButton();
    this.initDanceButton();
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

    const row = document.createElement( 'tr' );
    row.dataset.type = elem.type;
    row.dataset.loops = loopAmount;
    row.dataset.number = elem.num;

    this.table.appendChild( row );

    new TextCell( row, elem.num );
    new TextCell( row, elem.type );

    if ( elem.type === 'group' ) {

      const loopInput = new LoopInputCell( row, loop );

      loopInput.onInput = ( value ) => {

        row.dataset.loops = value;
        this.checkDanceIsValid();

      };

    } else {

      row.appendChild( document.createElement( 'td' ) );

    }

    const deleteButton = new DeleteButtonCell( row );

    deleteButton.onClick = () => {

      if ( this.table.contains( row ) ) this.table.removeChild( row );

      if ( elem.type === 'group' && elem.num === this.lastAddedGroupNum ) this.lastAddedGroupNum = -1;
      if ( elem.type === 'frame' && elem.num === this.lastAddedFrameNum ) this.lastAddedFrameNum = -1;

      this.checkDanceIsValid();

    };

    this.checkDanceIsValid();
    HTMLControl.controls.dance.resetButton.disabled = false;

  }

  initAddSelectedFrameButton() {

    this.lastAddedFrameNum = null;

    HTMLControl.controls.dance.addFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const frame = this.frames.frames[ this.frames.selectedFrameNum ];
      this.groups.deselectAll();
      animationControl.reset();

      if ( frame === null || ( frame.num === this.lastAddedFrameNum && this.lastAddedType === 'frame' ) ) return;

      this.add( frame );

      this.lastAddedFrameNum = frame.num;
      this.lastAddedType = 'frame';


    } );

  }

  initAddSelectedGroupButton() {

    this.lastAddedGroupNum = null;

    HTMLControl.controls.dance.addGroupButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const group = this.groups.selectedGroup;
      this.groups.deselectAll();
      animationControl.reset();

      if ( group === null || ( group.num === this.lastAddedGroupNum && this.lastAddedType === 'group' ) ) return;

      this.add( group );

      this.lastAddedGroupNum = group.num;
      this.lastAddedType = 'group';

    } );

  }

  initFramerateInput() {

    HTMLControl.controls.dance.framerate.addEventListener( 'input', ( e ) => {

      this.groups.deselectAll();
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

  initDanceButton() {

    HTMLControl.controls.dance.playButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      this.groups.deselectAll();
      animationControl.reset();
      this.createAnimation();
      animationControl.play();

      if ( HTMLControl.controls.music.play.innerHTML === 'Play' ) {

        HTMLControl.controls.music.play.click();

      }

    } );

  }

  initResetButton() {

    HTMLControl.controls.dance.resetButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      this.groups.deselectAll();
      animationControl.reset();
      this.reset();

    } );

  }

  createAnimation() {

    let frames = [];

    this.table.childNodes.forEach( ( node ) => {

      if ( node.nodeName === 'TR' ) {

        const num = node.dataset.number;

        if ( node.dataset.type === 'group' ) {

          for ( let i = 0; i < node.dataset.loops; i++ ) {

            frames = frames.concat( this.groups.groups[ num ].getFrames() );

          }

        } else {

          frames.push( this.frames.frames[ num ] );

        }

      }

    } );

    this.actions = animationControl.createAnimation( frames );

  }

  checkDanceIsValid() {

    let containedFramesNum = 0;
    let containsGroups = false;

    this.table.childNodes.forEach( ( node ) => {

      if ( node.nodeName === 'TR' ) {

        if ( node.dataset.type === 'frame' ) {

          containedFramesNum++;

        } else if ( node.dataset.loops > 0 ) {

          // note: this doesn't actually check if the group is valid as that
          // requires setting up a change listener on the group. This simpler
          // method just checks that there is a group and assume it is valid
          containsGroups = true;

        }

      }

    } );


    this.valid = ( containedFramesNum > 1 || containsGroups );

    HTMLControl.controls.dance.playButton.disabled = !this.valid;

  }

  reset() {

    while ( this.table.firstChild ) {

      this.table.removeChild( this.table.firstChild );

    }

    this.valid = false;
    HTMLControl.controls.dance.playButton.disabled = true;
    HTMLControl.controls.dance.resetButton.disabled = true;

  }

  fromJSON( object ) {

    this.reset();

    this.setFramerate( object.framerate || 1 );

    for ( const key in object ) {

      const value = object[ key ];

      if ( value.type === 'frame' ) {

        this.add( this.frames.frames[ value.num ] );

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

    let i = 0;

    this.table.childNodes.forEach( ( node ) => {

      if ( node.nodeName === 'TR' ) {

        output[ i ] = {

          type: node.dataset.type,
          num: node.dataset.number,
          loopAmount: node.dataset.loops,

        };

        i++;

      }

    } );

    return output;

  }

}
