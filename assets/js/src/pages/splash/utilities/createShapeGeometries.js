import * as THREE from 'three';

import createBufferAnimation from './createBufferAnimation.js';

export default function createShapeGeometries() {

  const bufferGeometry = new THREE.TetrahedronBufferGeometry( 50, 1 );
  bufferGeometry.translate( -20, 10, 0 );

  createBufferAnimation( bufferGeometry );

  return bufferGeometry;

}
