export default class LoopInputCell {

  constructor( row ) {

    const cell = document.createElement( 'td' );
    cell.innerHTML = 'Loop ';
    row.appendChild( cell );

    const input = document.createElement( 'input' );
    cell.appendChild( input );
    input.type = 'number';
    input.min = '0';
    input.value = '1';
    input.step = '1';

    const text = document.createElement( 'span' );
    text.style.width = '8em';
    text.style.textAlign = 'left';
    text.style.marginLeft = '0.25em';
    text.innerHTML = ' time';
    cell.appendChild( text );

    this.onInput = () => {};

    input.addEventListener( 'input', ( evt ) => {

      evt.preventDefault();

      const value = parseInt( evt.target.value, 10 );

      if ( value === 0 ) row.style.backgroundColor = 'darkgrey';
      else row.style.backgroundColor = 'initial';

      if ( value !== 1 ) text.innerHTML = ' times';
      else text.nodeValue = text.innerHTML = ' time';

      this.onInput( value );

    } );

  }

}
