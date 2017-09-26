

let _canvas = null;

export default class Canvas {

  constructor( canvas ) {

    if ( canvas !== undefined ) {

      _canvas = canvas;

    } else {

      _canvas = document.body.appendChild( document.createElement( 'canvas' ) );
      _canvas.style.position = 'absolute';
      _canvas.style.width = _canvas.style.height = '100%';

    }

    return _canvas;

  }

}
