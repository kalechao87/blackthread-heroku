import * as THREE from 'three';

import TextCell from './HTML/TextCell.js';
import FrameInputCell from './HTML/FrameInputCell.js';

const constraints = {

  headPitchMin: -60,
  headPitchMax: 60,
  headYawMin: -30,
  headYawMax: 30,

  leftShoulderPitchMin: -40,
  leftShoulderPitchMax: 60,
  leftShoulderYawMin: 0,
  leftShoulderYawMax: 60,

  rightShoulderPitchMin: -40,
  rightShoulderPitchMax: 60,
  rightShoulderYawMin: 0,
  rightShoulderYawMax: 60,

  leftElbowPitchMin: 0,
  leftElbowPitchMax: 60,
  leftElbowYawMin: -60,
  leftElbowYawMax: 60,

  rightElbowPitchMin: 0,
  rightElbowPitchMax: 60,
  rightElbowYawMin: -60,
  rightElbowYawMax: 60,

};

export default class Frame {

  constructor( num, robot, isBaseFrame = false ) {

    this.type = 'frame';

    this.robot = robot;

    this.num = num;

    if ( !isBaseFrame ) {

      this.createTableEntry();
      this.initControlFunctions();
      this.initDefaultValues();
      this.initSetFlags( false );

    } else {

      this.initDefaultValues();
      this.initSetFlags( true );

    }

  }

  set selected( bool ) {

    if ( bool === true ) {

      this.row.style.backgroundColor = 'aliceBlue';
      this.setRotations();
      this.addEventListeners();

    } else {

      this.row.style.backgroundColor = 'initial';
      this.removeEventListeners();

    }

  }

  createTableEntry() {

    this.row = document.createElement( 'tr' );

    new TextCell( this.row, this.num );

    const headCell = document.createElement( 'td' );
    this.row.appendChild( headCell );
    this.headPitchInput = new FrameInputCell( this.row, headCell, constraints.headPitchMin, constraints.headPitchMax, 'pitch' );
    this.headYawInput = new FrameInputCell( this.row, headCell, constraints.headYawMin, constraints.headYawMax, 'yaw' );

    const leftShoulderCell = document.createElement( 'td' );
    this.row.appendChild( leftShoulderCell );
    this.leftShoulderPitchInput = new FrameInputCell( this.row, leftShoulderCell, constraints.leftShoulderPitchMin, constraints.headPitchMax, 'pitch' );
    this.leftShoulderYawInput = new FrameInputCell( this.row, leftShoulderCell, constraints.leftShoulderYawMin, constraints.headYawMax, 'yaw' );

    const rightShoulderCell = document.createElement( 'td' );
    this.row.appendChild( rightShoulderCell );
    this.rightShoulderPitchInput = new FrameInputCell( this.row, rightShoulderCell, constraints.rightShoulderPitchMin, constraints.headPitchMax, 'pitch' );
    this.rightShoulderYawInput = new FrameInputCell( this.row, rightShoulderCell, constraints.rightShoulderYawMin, constraints.headYawMax, 'yaw' );

    const leftElbowCell = document.createElement( 'td' );
    this.row.appendChild( leftElbowCell );
    this.leftElbowPitchInput = new FrameInputCell( this.row, leftElbowCell, constraints.leftElbowPitchMin, constraints.headPitchMax, 'pitch' );
    this.leftElbowYawInput = new FrameInputCell( this.row, leftElbowCell, constraints.leftElbowYawMin, constraints.headYawMax, 'yaw' );

    const rightElbowCell = document.createElement( 'td' );
    this.row.appendChild( rightElbowCell );
    this.rightElbowPitchInput = new FrameInputCell( this.row, rightElbowCell, constraints.rightElbowPitchMin, constraints.headPitchMax, 'pitch' );
    this.rightElbowYawInput = new FrameInputCell( this.row, rightElbowCell, constraints.rightElbowYawMin, constraints.headYawMax, 'yaw' );

    this.row.appendChild( document.createElement( 'td' ) );

  }

  addEventListeners() {

    this.headPitchInput.addEventListener( 'input', this.controlFunctions.headPitch );
    this.headYawInput.addEventListener( 'input', this.controlFunctions.headYaw );

    this.leftShoulderPitchInput.addEventListener( 'input', this.controlFunctions.leftShoulderPitch );
    this.leftShoulderYawInput.addEventListener( 'input', this.controlFunctions.leftShoulderYaw );

    this.rightShoulderPitchInput.addEventListener( 'input', this.controlFunctions.rightShoulderPitch );
    this.rightShoulderYawInput.addEventListener( 'input', this.controlFunctions.rightShoulderYaw );

    this.leftElbowPitchInput.addEventListener( 'input', this.controlFunctions.leftElbowPitch );
    this.leftElbowYawInput.addEventListener( 'input', this.controlFunctions.leftElbowYaw );

    this.rightElbowPitchInput.addEventListener( 'input', this.controlFunctions.rightElbowPitch );
    this.rightElbowYawInput.addEventListener( 'input', this.controlFunctions.rightElbowYaw );

  }

  removeEventListeners() {

    this.headPitchInput.removeEventListener( 'input', this.controlFunctions.headPitch );
    this.headYawInput.removeEventListener( 'input', this.controlFunctions.headYaw );

    this.leftShoulderPitchInput.removeEventListener( 'input', this.controlFunctions.leftShoulderPitch );
    this.leftShoulderYawInput.removeEventListener( 'input', this.controlFunctions.leftShoulderYaw );

    this.rightShoulderPitchInput.removeEventListener( 'input', this.controlFunctions.rightShoulderPitch );
    this.rightShoulderYawInput.removeEventListener( 'input', this.controlFunctions.rightShoulderYaw );

    this.leftElbowPitchInput.removeEventListener( 'input', this.controlFunctions.leftElbowPitch );
    this.leftElbowYawInput.removeEventListener( 'input', this.controlFunctions.leftElbowYaw );

    this.rightElbowPitchInput.removeEventListener( 'input', this.controlFunctions.rightElbowPitch );
    this.rightElbowYawInput.removeEventListener( 'input', this.controlFunctions.rightElbowYaw );

  }

  initSetFlags( value ) {

    this.headPitchSet = value;
    this.headYawSet = value;
    this.leftShoulderPitchSet = value;
    this.leftShoulderYawSet = value;
    this.rightShoulderPitchSet = value;
    this.rightShoulderYawSet = value;
    this.leftElbowPitchSet = value;
    this.leftElbowYawSet = value;
    this.rightElbowPitchSet = value;
    this.rightElbowYawSet = value;

  }

  initDefaultValues() {

    this.headPitchValue = 0;
    this.headYawValue = 0;

    this.headQuaternion = this.robot.headInitialQuaternion.clone();

    this.leftShoulderPitchValue = 0;
    this.leftShoulderYawValue = 0;

    this.leftShoulderQuaternion = this.robot.leftShoulderInitialQuaternion.clone();

    this.rightShoulderPitchValue = 0;
    this.rightShoulderYawValue = 0;

    this.rightShoulderQuaternion = this.robot.rightShoulderInitialQuaternion.clone();

    this.leftElbowPitchValue = 0;
    this.leftElbowYawValue = 0;

    this.leftElbowQuaternion = this.robot.leftElbowInitialQuaternion.clone();

    this.rightElbowPitchValue = 0;
    this.rightElbowYawValue = 0;

    this.rightElbowQuaternion = this.robot.rightElbowInitialQuaternion.clone();

  }

  initControlFunctions() {

    const xAxis = new THREE.Vector3( 1, 0, 0 );
    const yAxis = new THREE.Vector3( 0, 1, 0 );
    const zAxis = new THREE.Vector3( 0, 0, 1 );

    const control = ( e, name, sign, direction, axis ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( sign * e.target.value );

      // e.g.  this.robot[ 'head' ].rotateOnAxis( zAxis, this[ 'headPitchValue' ] - value );
      this.robot[name].rotateOnAxis( axis, this[ name + direction + 'Value'] - value );

      // e.g. this.headPitchValue = value;
      this[ name + direction + 'Value'] = value;

      // e.g. this.headPitchSet = true;
      this[ name + direction + 'Set'] = true;

      // e.g. this.headQuaternion.copy(this.robot[ 'head' ].quaternion);
      this[ name + 'Quaternion' ].copy( this.robot[ name ].quaternion );

    };

    this.controlFunctions = {

      headPitch: e => control( e, 'head', 1, 'Pitch', zAxis ),
      headYaw: e => control( e, 'head', 1, 'Yaw', xAxis ),

      leftShoulderPitch: e => control( e, 'leftShoulder', -1, 'Pitch', zAxis ),
      leftShoulderYaw: e => control( e, 'leftShoulder', -1, 'Yaw', yAxis ),

      rightShoulderPitch: e => control( e, 'rightShoulder', -1, 'Pitch', zAxis ),
      rightShoulderYaw: e => control( e, 'rightShoulder', 1, 'Yaw', yAxis ),

      leftElbowPitch: e => control( e, 'leftElbow', 1, 'Pitch', yAxis ),
      leftElbowYaw: e => control( e, 'leftElbow', -1, 'Yaw', zAxis ),

      rightElbowPitch: e => control( e, 'rightElbow', -1, 'Pitch', yAxis ),
      rightElbowYaw: e => control( e, 'rightElbow', -1, 'Yaw', zAxis ),

    };

  }

  setRotations() {

    this.robot.head.quaternion.copy( this.headQuaternion );
    this.robot.leftShoulder.quaternion.copy( this.leftShoulderQuaternion );
    this.robot.rightShoulder.quaternion.copy( this.rightShoulderQuaternion );
    this.robot.leftElbow.quaternion.copy( this.leftElbowQuaternion );
    this.robot.rightElbow.quaternion.copy( this.rightElbowQuaternion );

  }

  fromJSON( object ) {

    // this.headQuaternion.fromArray( object.headQuaternion );
    // this.leftShoulderQuaternion.fromArray( object.leftShoulderQuaternion );
    // this.rightShoulderQuaternion.fromArray( object.rightShoulderQuaternion );
    // this.leftElbowQuaternion.fromArray( object.leftElbowQuaternion );
    // this.rightElbowQuaternion.fromArray( object.rightElbowQuaternion );

    this.num = object.number;

    this.headPitchInput.value = object.headPitch;
    this.headYawInput.value = object.headYaw;
    this.leftShoulderPitchInput.value = object.leftShoulderPitch;
    this.leftShoulderYawInput.value = object.leftShoulderYaw;
    this.rightShoulderPitchInput.value = object.rightShoulderPitch;
    this.rightShoulderYawInput.value = object.rightShoulderYaw;
    this.leftElbowPitchInput.value = object.leftElbowPitch;
    this.leftElbowYawInput.value = object.leftElbowYaw;
    this.rightElbowPitchInput.value = object.rightElbowPitch;
    this.rightElbowYawInput.value = object.rightElbowYaw;

    this.headPitchSet = this.headPitchInput.value !== '';
    this.headYawSet = this.headYawInput.value !== '';
    this.leftShoulderPitchSet = this.leftShoulderPitchInput.value !== '';
    this.leftShoulderYawSet = this.leftShoulderYawInput.value !== '';
    this.rightShoulderPitchSet = this.rightShoulderPitchInput.value !== '';
    this.rightShoulderYawSet = this.rightShoulderYawInput.value !== '';
    this.leftElbowPitchSet = this.leftElbowPitchInput.value !== '';
    this.leftElbowYawSet = this.leftElbowYawInput.value !== '';
    this.rightElbowPitchSet = this.rightElbowPitchInput.value !== '';
    this.rightElbowYawSet = this.headPitchInput.value !== '';

    this.setRotations();

  }

  toJSON() {

    return {

      type: 'frame',
      number: this.num,

      // headQuaternion: this.headQuaternion.toArray(),
      // leftShoulderQuaternion: this.leftShoulderQuaternion.toArray(),
      // rightShoulderQuaternion: this.rightShoulderQuaternion.toArray(),
      // leftElbowQuaternion: this.leftElbowQuaternion.toArray(),
      // rightElbowQuaternion: this.rightElbowQuaternion.toArray(),

      headPitch: this.headPitchInput.value,
      headYaw: this.headYawInput.value,
      leftShoulderPitch: this.leftShoulderPitchInput.value,
      leftShoulderYaw: this.leftShoulderYawInput.value,
      rightShoulderPitch: this.rightShoulderPitchInput.value,
      rightShoulderYaw: this.rightShoulderYawInput.value,
      leftElbowPitch: this.leftElbowPitchInput.value,
      leftElbowYaw: this.leftElbowYawInput.value,
      rightElbowPitch: this.rightElbowPitchInput.value,
      rightElbowYaw: this.rightElbowYawInput.value,

      // headPitchSet: this.headPitchSet,
      // headYawSet: this.headYawSet,
      // leftShoulderPitchSet: this.leftShoulderPitchSet,
      // leftShoulderYawSet: this.leftShoulderYawSet,
      // rightShoulderPitchSet: this.rightShoulderPitchSet,
      // rightShoulderYawSet: this.rightShoulderYawSet,
      // leftElbowPitchSet: this.leftElbowPitchSet,
      // leftElbowYawSet: this.leftElbowYawSet,
      // rightElbowPitchSet: this.rightElbowPitchSet,
      // rightElbowYawSet: this.rightElbowYawSet,

    };

  }

}
