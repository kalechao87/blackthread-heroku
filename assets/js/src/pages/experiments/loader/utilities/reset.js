import * as THREE from 'three';

import HTMLControl from './HTMLControl.js';

const textureDispose = ( mat ) => {

  Object.keys( mat ).forEach( ( key ) => {

    const value = mat[key];

    if ( value instanceof THREE.Texture ) value.dispose();

  } );

};

const clearChildren = ( object ) => {

  for ( let i = 0; i < object.children.length; i++ ) {

    let child = object.children[ i ];

    object.remove( child );
    child = null;

  }

};

export default ( loadedModels ) => {

  HTMLControl.setInitialState();

  clearChildren( loadedModels );

};
