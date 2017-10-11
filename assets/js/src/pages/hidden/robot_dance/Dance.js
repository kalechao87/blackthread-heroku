import HTMLControl from './HTMLControl.js';

export default class Dance {

  constructor( groups, frames ) {

    this.groups = groups;
    this.frames = frames;
    this.lastAddedType = null;
    this.table = HTMLControl.controls.dance.table;

    this.details = [];

    this.initAdvancedControlsToggle();
    this.initAddSelectedFrameButton();
    this.initAddSelectedGroupButton();
    this.initPlayButton();
    this.initResetButton();

  }

  initAdvancedControlsToggle() {

    HTMLControl.controls.dance.advancedControlToggle.addEventListener( 'change', ( e ) => {

      e.preventDefault();

      HTMLControl.controls.dance.advancedControlSection.classList.toggle( 'hide' );


    } );
  }
  /*
  <tr>
    <td>1</td>
    <td>Frame</td>
    <td>Loop <input type="number"> times</td>
  </tr>
  */

  addTableRow( elem, type ) {

    const detail = {
      elem,
      loopAmount: 1,
    };

    this.details.push( detail );

    const pos = this.details.length - 1;

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
    loopInput.value = '1';
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

      this.details[ pos ] = null;

    } );

  }

  initAddSelectedFrameButton() {

    this.lastAddedFrameNum = null;

    HTMLControl.controls.dance.addFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const frame = this.frames.selectedFrame;

      if ( frame === null || ( frame.num === this.lastAddedFrameNum && this.lastAddedType === 'frame' ) ) return;

      this.addTableRow( frame, 'Frame' );

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

      this.addTableRow( group, 'Group' );

      this.lastAddedGroupNum = group.num;
      this.lastAddedType = 'group';

    } );

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

  setDetail( details ) {

    // TODO

  }

  getDetails() {

    return { };

  }

}
