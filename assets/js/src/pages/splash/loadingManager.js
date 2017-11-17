import * as THREE from 'three';

import loadingOverlay from 'utilities/init/initLoadingOverlay.js';

const loadingManager = new THREE.LoadingManager();

// hide the upload form when loading starts so that the progress bar can be shown
loadingManager.onStart = () => {

};

loadingManager.onLoad = function ( ) {

  loadingOverlay.fadeOut();

};

loadingManager.onProgress = () => {

};

loadingManager.onError = ( msg ) => {

  if ( msg instanceof String && msg === '' ) return;

  console.error( 'THREE.LoadingManager error: ' + msg );

};

export default loadingManager;
