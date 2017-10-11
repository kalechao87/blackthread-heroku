import HTMLControl from './HTMLControl.js';

export default class Dance {

  constructor( groups, frames ) {

    this.groups = groups;
    this.frames = frames;
    this.lastAddedType = null;
    this.table = HTMLControl.controls.dance.table;

    this.framerate = 1;

    this.containedElems = [];

    this.initAdvancedControlsToggle();
    this.initAddSelectedFrameButton();
    this.initAddSelectedGroupButton();
    this.initPlayButton();
    this.initResetButton();
    this.initFramerateInput();

  }

  initAdvancedControlsToggle() {

    HTMLControl.controls.dance.advancedControlToggle.addEventListener( 'change', ( e ) => {

      e.preventDefault();

      HTMLControl.controls.dance.advancedControlSection.classList.toggle( 'hide' );


    } );
  }

  add( elem, type, loop ) {

    const loopAmount = loop || 1;

    const detail = {
      type,
      elem,
      loopAmount,
    };

    this.containedElems.push( detail );

    const pos = this.containedElems.length - 1;

    const row = document.createElement( 'tr' );
    this.table.appendChild( row );

    const nameCell = document.createElement( 'td' );
    row.appendChild( nameCell );
    nameCell.innerHTML = elem.num;

    const typeCell = document.createElement( 'td' );
    row.appendChild( typeCell );
    typeCell.innerHTML = type;

    const loopCell = document.createElement( 'td' );
    loopCell.innerHTML = 'Loop ';
    row.appendChild( loopCell );

    const loopInput = document.createElement( 'input' );
    loopCell.appendChild( loopInput );
    loopInput.type = 'number';
    loopInput.min = '0';
    loopInput.value = loopAmount;
    loopInput.step = '1';

    const text = document.createElement( 'span' );
    text.style.width = '8em';
    text.style.textAlign = 'left';
    text.style.marginLeft = '0.25em';
    text.innerHTML = ' time';
    loopCell.appendChild( text );

    loopInput.addEventListener( 'input', ( evt ) => {

      evt.preventDefault();
      const value = parseInt( evt.target.value, 10 );

      if ( value === 0 ) row.style.backgroundColor = 'darkgrey';
      else row.style.backgroundColor = 'initial';

      if ( value !== 1 ) text.innerHTML = ' times';
      else text.nodeValue = text.innerHTML = ' time';

      detail.loopAmount = value;

    } );

    const deleteCell = document.createElement( 'td' );
    row.appendChild( deleteCell );

    const deleteButton = document.createElement( 'button' );
    deleteCell.appendChild( deleteButton );
    deleteButton.innerHTML = '<span class="fa fa-lg fa-trash-o" aria-hidden="true"></span>';

    deleteButton.addEventListener( 'click', ( evt ) => {

      evt.preventDefault();

      this.table.removeChild( row );

      // if ( this.lastAddedGroupNum === )

      this.containedElems[ pos ] = null;

    } );

  }

  initAddSelectedFrameButton() {

    this.lastAddedFrameNum = null;

    HTMLControl.controls.dance.addFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const frame = this.frames.selectedFrame;

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

      console.log( 'p ' );


    } );

  }

  initResetButton() {

    HTMLControl.controls.dance.resetButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      console.log( 'r ' );


    } );

  }

  reset() {

    console.log( 'TODO: dance.reset ' );

  }

  fromJSON( object ) {

    this.reset();

    this.setFramerate( object.framerate || 1 );

    for ( const key in object ) {

      const detail = object[ key ];

      if ( detail.type === 'frame' ) {

        this.add( this.frames.frames[ detail.num ], 'frame', detail.loopAmount );

      } else {

        this.add( this.groups.groups[ detail.num ], 'frame', detail.loopAmount );

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

          type: detail.type,
          num: detail.num,
          loopAmount: detail.loopAmount,

        }

      } else {

        output[ i ] = null;

      }

    }

    return output;

  }

}
