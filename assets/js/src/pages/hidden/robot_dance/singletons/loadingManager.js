import * as THREE from 'three';

import HTMLControl from '../classes/HTMLControl.js';

const loadingManager = new THREE.LoadingManager();

let percentComplete = 0;

let timerID = null;

// hide the upload form when loading starts so that the progress bar can be shown
loadingManager.onStart = () => {

  // prevent onStart being called multiple times
  if ( timerID !== null ) return;

  HTMLControl.setOnLoadStartState();

  timerID = setInterval( () => {

    percentComplete += 5;

    if ( percentComplete >= 100 ) {
      clearInterval( timerID );

    } else {

      HTMLControl.loading.progress.style.width = percentComplete + '%';

    }

  }, 100 );

};

loadingManager.onLoad = function ( ) {

  HTMLControl.setOnLoadEndState();
  clearInterval( timerID );

};

loadingManager.onProgress = () => {

  if ( percentComplete >= 100 ) return;

  percentComplete += 5;

  HTMLControl.loading.progress.style.width = percentComplete + '%';

};

loadingManager.onError = ( msg ) => {

  if ( msg instanceof String && msg === '' ) return;

  console.error( 'THREE.LoadingManager error: ' + msg );

};

export default loadingManager;
