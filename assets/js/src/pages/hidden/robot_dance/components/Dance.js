import HTMLControl from '../HTMLControl.js';
import TextCell from './HTML/TextCell.js';
import DeleteButtonCell from './HTML/DeleteButtonCell.js';
import LoopInputCell from './HTML/LoopInputCell.js';
import animationControl from '../animation/animationControl.js';

const flattenGroup = ( group, loopAmount ) => {

  let frames = [];

  for ( let i = 0; i < loopAmount; i++ ) {

    frames = frames.concat( group.getFrames() );

  }

  return frames;

};

// take the details array and flatten it to an array of frames
const flattenDetails = ( details ) => {

  let frames = [];

  details.forEach( ( detail ) => {

    const elem = detail.elem;

    if ( elem.type === 'frame' ) frames.push( elem );

    else if ( elem.type === 'group' ) {

      frames = frames.concat( flattenGroup( elem, detail.loopAmount ) );

    }

  } );

  return frames;

};

export default class Dance {

  constructor( groups ) {

    this.groups = groups;
    this.frames = groups.frames;
    this.robot = this.frames.robot;

    this.valid = false;

    this.lastAddedType = null;
    this.table = HTMLControl.controls.dance.table;

    this.containedElems = [];

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

    if ( elem.type === 'group' ) {

      const loopInput = new LoopInputCell( row );

      loopInput.onInput = ( value ) => {

        detail.loopAmount = value;
        this.checkDanceIsValid();

      };

    } else {

      row.appendChild( document.createElement( 'td' ) );

    }

    detail.deleteButton = new DeleteButtonCell( row );

    detail.deleteButton.onClick = () => {

      if ( this.table.contains( row ) ) this.table.removeChild( row );

      this.containedElems.splice( pos, 1 );

      if ( detail.elem.type === 'group' && detail.elem.num === this.lastAddedGroupNum ) this.lastAddedGroupNum = -1;
      if ( detail.elem.type === 'frame' && detail.elem.num === this.lastAddedFrameNum ) this.lastAddedFrameNum = -1;

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

    const frames = flattenDetails( this.containedElems );

    this.actions = animationControl.createAnimation( frames );

  }

  checkDanceIsValid() {

    let containedFramesNum = 0;
    let containsValidGroups = false;

    this.containedElems.forEach( ( detail ) => {

      if ( detail.elem.type === 'frame' ) containedFramesNum++;

      else if ( detail.elem.type === 'group' ) {

        // this would require a 'change' event added to the group so that the dance can listen
        // when frames are added or removed to check whether the group becomes valid
        // if ( detail.elem.checkGroupIsValid() && detail.loopAmount > 0 ) containsValidGroups = true;

        // instead use simpler but not totally accurate method
        if ( detail.loopAmount > 0 ) containsValidGroups = true;

      }

    } );

    this.valid = ( containedFramesNum > 1 || containsValidGroups );

    HTMLControl.controls.dance.playButton.disabled = !this.valid;

  }

  reset() {

    for ( let i = this.containedElems.length - 1; i >= 0; i-- ) {

      this.containedElems[i].deleteButton.click();

    }

    this.containedElems = [];

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
