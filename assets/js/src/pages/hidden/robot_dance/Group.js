import HTMLControl from './HTMLControl.js';

const groups = HTMLControl.controls.groups.table;

export default class Group {

  constructor( num ) {

    this.num = num;

    this.initTableRow();

    this.initDeleteButton();

  }

  set selected( bool ) {
    console.log( bool )
    if ( bool === true ) this.row.style.backgroundColor = 'aliceBlue';
    else this.row.style.backgroundColor = 'initial';

  }


  initTableRow() {

    this.row = document.createElement( 'tr' );
    this.row.id = 'fr-' + this.num;

    const nameCell = document.createElement( 'td' );
    this.row.appendChild( nameCell );
    nameCell.innerHTML = this.num;

    const framesCell = document.createElement( 'td' );
    this.row.appendChild( framesCell );
    framesCell.innerHTML = 'Frames in Group';

    const loopCell = document.createElement( 'td' );
    this.row.appendChild( loopCell );
    loopCell.innerHTML = 'Loop Amount';

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
