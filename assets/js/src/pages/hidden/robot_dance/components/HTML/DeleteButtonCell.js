// Append a cell containing a delete button to a table row

export default class DeleteButtonCell {

  constructor( row ) {

    const deleteButtonCell = document.createElement( 'td' );
    const deleteButton = document.createElement( 'button' );
    deleteButton.innerHTML = '<span class="fa fa-lg fa-trash-o" aria-hidden="true"></span>';
    deleteButtonCell.appendChild( deleteButton );
    row.appendChild( deleteButtonCell );

    this.onClick = () => {};

    const click = ( e ) => {

      e.preventDefault();

      this.onClick();

      deleteButton.removeEventListener( 'click', click );

    };

    deleteButton.addEventListener( 'click', click );

  }

}
