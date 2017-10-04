import HTMLControl from './HTMLControl.js';
import Frame from './Frame.js';

let num = 0;

const framesTable = HTMLControl.controls.frames.table;
const newFrameButton = HTMLControl.controls.frames.createButton;

const frames = {};


newFrameButton.addEventListener( 'click', () => {

  frames[ num ] = new Frame( num );

  framesTable.appendChild( frames[ num ].row );

  num ++;

} );
