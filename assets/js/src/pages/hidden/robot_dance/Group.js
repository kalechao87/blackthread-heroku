import HTMLControl from './HTMLControl.js';

const groups = HTMLControl.controls.groups.table;

export default class Group {

  constructor( num, frames ) {

    this.frames = frames;

    this.containedFrames = [];

    this.num = num;

    this.initTableRow();

    this.initDeleteButton();
    this.initAddFrameButton();

  }

  set selected( bool ) {

    if ( bool === true ) this.row.style.backgroundColor = 'aliceBlue';
    else this.row.style.backgroundColor = 'initial';

  }


  initTableRow() {

    this.row = document.createElement( 'tr' );
    this.row.id = 'gr-' + this.num;

    const nameCell = document.createElement( 'td' );
    this.row.appendChild( nameCell );
    nameCell.innerHTML = this.num;

    const framesCell = document.createElement( 'td' );
    this.row.appendChild( framesCell );
    framesCell.innerHTML = '<h4>Frames</h4>';

    this.addFrameButton = document.createElement( 'button' );
    this.addFrameButton.classList.add( 'add-selected-frame-button' );
    this.addFrameButton.innerHTML = 'Add Selected Frame';

    framesCell.appendChild( this.addFrameButton );

    const frameTable = document.createElement( 'table' );
    this.framesInGroup = document.createElement( 'tbody' );
    this.framesInGroup.classList.add( 'frames-in-group' );

    frameTable.appendChild( this.framesInGroup );
    framesCell.appendChild( frameTable );


  }

  initAddFrameButton() {

    let lastAddedFrameNum = null;

    this.addFrameButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const frameNum = this.frames.selectedFrame;

      if ( frameNum === undefined ) return;

      // don't add the same frame consecutively (use loop instead)
      if ( lastAddedFrameNum === frameNum ) return;

      lastAddedFrameNum = frameNum;

      const frameDetails = {
        frame: this.frames.frames[ frameNum ],
        loopAmount: 1,
      };

      this.containedFrames.push( frameDetails );
      const framePos = this.containedFrames.length - 1;

      const frameRow = document.createElement( 'tr' );

      this.framesInGroup.appendChild( frameRow );
      const nameCell = document.createElement( 'td' );
      nameCell.innerHTML = 'Frame #' + frameNum;
      frameRow.appendChild( nameCell );

      const loopCell = document.createElement( 'td' );
      loopCell.innerHTML = 'Loop ';
      frameRow.appendChild( loopCell );

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

        if ( value === 0 ) frameRow.style.backgroundColor = 'darkgrey';
        else frameRow.style.backgroundColor = 'initial';

        if ( value !== 1 ) text.innerHTML = ' times';
        else text.nodeValue = text.innerHTML = ' time';

        frameDetails.loopAmount = value;

      } );

      const deleteCell = document.createElement( 'td' );
      frameRow.appendChild( deleteCell );

      const deleteButton = document.createElement( 'button' );
      deleteCell.appendChild( deleteButton );
      deleteButton.innerHTML = '<span class="fa fa-lg fa-trash-o" aria-hidden="true"></span>';

      deleteButton.addEventListener( 'click', ( evt ) => {

        evt.preventDefault();

        this.framesInGroup.removeChild( frameRow );

        if ( lastAddedFrameNum === frameNum ) lastAddedFrameNum = null;

        this.containedFrames[ framePos ] = null;

      } );

      // console.log( this.containedFrames )

    } );

  }

  initDeleteButton() {

    const deleteButtonCell = document.createElement( 'td' );
    this.deleteButton = document.createElement( 'button' );
    this.deleteButton.innerHTML = '<span class="fa fa-lg fa-trash-o" aria-hidden="true"></span>';
    deleteButtonCell.appendChild( this.deleteButton );
    this.row.appendChild( deleteButtonCell );

    const removeRow = ( e ) => {

      e.preventDefault();
      groups.removeChild( this.row );

      this.deleteButton.removeEventListener( 'click', removeRow );

    };

    this.deleteButton.addEventListener( 'click', removeRow );

  }

}
