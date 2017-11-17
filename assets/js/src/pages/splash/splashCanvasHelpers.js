import * as THREE from 'three';

import createBufferAttribute from './utilities/createBufferAttribute.js';

const v = new THREE.Vector3();

export const randomPointInDisk = ( radius ) => {
  const r = THREE.Math.randFloat( 0, 1 );
  const t = THREE.Math.randFloat( 0, Math.PI * 2 );

  v.x = Math.sqrt( r ) * Math.cos( t ) * radius;
  v.y = Math.sqrt( r ) * Math.sin( t ) * radius;

  return v;
};

export const randomPointInSphere = ( radius ) => {
  const x = THREE.Math.randFloat( -1, 1 );
  const y = THREE.Math.randFloat( -1, 1 );
  const z = THREE.Math.randFloat( -1, 1 );
  const normalizationFactor = 1 / Math.sqrt( x * x + y * y + z * z );

  v.x = x * normalizationFactor * radius;
  v.y = y * normalizationFactor * radius;
  v.z = z * normalizationFactor * radius;

  return v;
};


// computed using least squares fit from a few tests
export const cameraZPos = ( aspect ) => {
  if ( aspect <= 0.9 ) return -960 * aspect + 1350;
  else if ( aspect <= 1.2 ) return -430 * aspect + 900;
  else if ( aspect <= 3 ) return -110 * aspect + 500;
  else if ( aspect <= 4.5 ) return -40 * aspect + 300;
  return 100;
};

// saving function taken from three.js editor
const link = document.createElement( 'a' );
link.style.display = 'none';
document.body.appendChild( link ); // Firefox workaround, see #6594

const save = ( blob, filename ) => {

  link.href = URL.createObjectURL( blob );
  link.download = filename || 'data.json';
  link.click();

};

const saveString = ( text, filename ) => {

  save( new Blob( [ text ], { type: 'text/plain' } ), filename );

};

const exportAsJSON = ( object ) => {

  console.log( object );
  let output = object.toJSON();

  output = JSON.stringify( output, null, '\t' );

  saveString( output, 'blackThreadJSONConversion.json' );

};


function initBufferAnimation( bufferGeometry ) {

  const vertexCount = bufferGeometry.attributes.position.count;
  const faceCount = vertexCount / 3;

  const aAnimation = createBufferAttribute( bufferGeometry, 'aAnimation', 2, vertexCount );
  const aEndPosition = createBufferAttribute( bufferGeometry, 'aEndPosition', 3, vertexCount );

  const positions = bufferGeometry.attributes.position.array;

  let i;
  let i2;
  let i3;

  const minDuration = 1.0;
  const maxDuration = 100.0;

  const lengthFactor = 0.0005;

  const maxLength = 316; // initially calculated from boundingBox.max.length(), hardcoded for speed

  for ( i = 0, i2 = 0, i3 = 0; i < faceCount; i++, i2 += 6, i3 += 9 ) {

    const l = -Math.abs( positions[ i3 ] - positions[ i3 + 5 ] );

    // animation
    const delay = ( maxLength - l ) * lengthFactor;
    const duration = THREE.Math.randFloat( minDuration, maxDuration );

    for ( let k = 0; k < 6; k += 2 ) {

      aAnimation.array[ i2 + k ] = delay;
      aAnimation.array[ i2 + k + 1 ] = duration;

    }


    // end position
    const point = randomPointInSphere( 1200 );

    for ( let j = 0; j < 9; j += 3 ) {

      aEndPosition.array[i3 + j] = point.x;
      aEndPosition.array[i3 + j + 1] = point.y;
      aEndPosition.array[i3 + j + 2] = point.z;

    }

  }
}

export const createTextGeometry = ( font, text = 'Black Thread Design' ) => {

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

  initBufferAnimation( bufferGeometry );

  // exportAsJSON( bufferGeometry );
  return bufferGeometry;

};
