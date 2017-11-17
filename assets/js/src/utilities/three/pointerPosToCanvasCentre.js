import * as THREE from 'three';

import pointerPos from '../pointerPos.js';

const vector = new THREE.Vector3();

const pointerPosToCanvasCentre = ( camera, canvas ) => {

  vector.set(
    ( pointerPos.x / canvas.clientWidth ) * 2 - 1,
    - ( pointerPos.y / canvas.clientHeight ) * 2 + 1,
    0.5 );

  vector.unproject( camera );

  const dir = vector.sub( camera.position ).normalize();

  const distance = - camera.position.z / dir.z;

  const pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

  return pos;

};

export default pointerPosToCanvasCentre;
