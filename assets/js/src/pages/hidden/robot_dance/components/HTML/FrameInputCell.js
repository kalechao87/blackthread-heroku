// create an input cell in a table

export default class FrameInputCell {

  constructor( row, cell, min, max, text ) {

    const span = document.createElement( 'span' );
    span.innerHTML = text[0].toUpperCase() + text.substr( 1, text.length ) + ': ';

    const input = document.createElement( 'input' );

    input.type = 'number';
    input.min = min;
    input.max = max;
    input.step = 1;
    input.value = '';

    span.appendChild( input );
    cell.appendChild( span );

    input.addEventListener( 'mousedown', () => {

      row.click();

    } );

    return input;

  }

}
