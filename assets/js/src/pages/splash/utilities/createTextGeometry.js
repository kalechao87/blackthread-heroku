import * as THREE from 'three';

import createBufferAnimation from './createBufferAnimation.js';

export default function createTextGeometry( font, mat, text = 'Black Thread Design' ) {

  const bufferGeometry = new THREE.TextBufferGeometry( text, {

    size: 40,
    height: 0,
    font,
    curveSegments: 12,
    // bevelSize: 1,
    // bevelThickness: 2,
    // bevelSegments: 1,
    // bevelEnabled: true,
  } );

  bufferGeometry.translate( -316, 0, 0 );

  createBufferAnimation( bufferGeometry );

  return new THREE.Mesh( bufferGeometry, mat );

}
