// import HTMLControl from './HTMLControl.js';

const cachedMessages = {};

const errorHandler = ( msg ) => {

  // bug in Chrome returns this error intermittently
  if ( msg.indexOf( 'gl.getProgramInfoLog()' ) !== -1 ) return;


  // cache the message to prevent it being displayed multiple times
  if ( cachedMessages[ msg ] === true ) return;
  cachedMessages[ msg ] = true;

  console.log( msg );

  // HTMLControl.error.overlay.classList.remove( 'hide' );
  // const p = document.createElement( 'p' );
  // p.innerHTML = msg;

  // console.log( p )

  // HTMLControl.error.messages.appendChild( p );

};

export default errorHandler;
