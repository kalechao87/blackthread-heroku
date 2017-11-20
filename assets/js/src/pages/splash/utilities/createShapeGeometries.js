import * as THREE from 'three';

import createBufferAnimation from './createBufferAnimation.js';

export default function createShapeGeometries( mat ) {

  const tetraGeo = new THREE.TetrahedronBufferGeometry( 50, 1 );

  createBufferAnimation( tetraGeo );

  tetraGeo.translate( -150, 150, 0 );
  tetraGeo.rotateY( -1.5 );

  // const tetraGeo2 = new THREE.OctahedronBufferGeometry( 30, 0 );
  // createBufferAnimation( tetraGeo2 );

  // tetraGeo2.translate( 150, 150, 0 );
  // tetraGeo2.rotateY( 0.5 );

  const tetraMesh = new THREE.Mesh( tetraGeo, mat );
  // const tetraMesh2 = new THREE.Mesh( tetraGeo2, mat );

  return [
    tetraMesh,
    // tetraMesh2,
  ];

}
