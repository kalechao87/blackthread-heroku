import * as THREE from 'three';

import TextCell from './HTML/TextCell.js';
import FrameInputCell from './HTML/FrameInputCell.js';
import DeleteButtonCell from './HTML/DeleteButtonCell.js';

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

    this.robot = robot;

    console.log( robot )

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

    this.deleteButton = new DeleteButtonCell( this.row );

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

      this.robot[name].rotateOnAxis( axis, this[ name + direction + 'Value'] - value );

      this[ name + direction + 'Value'] = value;
      this[ name + direction + 'Set'] = true;

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

  fromJSON( object, number = this.num ) {

    this.headQuaternion = object.headQuaternion;
    this.leftShoulderQuaternion = object.leftShoulderQuaternion;
    this.rightShoulderQuaternion = object.rightShoulderQuaternion;
    this.leftElbowQuaternion = object.leftElbowQuaternion;
    this.rightElbowQuaternion = object.rightElbowQuaternion;

    this.num = number;

    this.headPitchValue = object.headPitchValue;
    this.headPitchSet = object.headPitchSet;
    // if ( this.headPitchSet ) this.headPitchInput.value = -Math.floor( THREE.Math.radToDeg( object.headPitchValue ) );

    this.headYawValue = object.headYawValue;
    this.headYawSet = object.headYawSet;
    // this.headYawInput.value =  Math.floor( THREE.Math.radToDeg( object.headYawValue ) );

    this.leftShoulderPitchValue = object.leftShoulderPitchValue;
    this.leftShoulderPitchSet = object.leftShoulderPitchSet;
    // this.leftShoulderPitchInput.value = -Math.floor( THREE.Math.radToDeg( object.leftShoulderPitchValue ) );

    this.leftShoulderYawValue = object.leftShoulderYawValue;
    this.leftShoulderYawSet = object.leftShoulderYawSet;
    // this.leftShoulderYawInput.value -Math.floor( THREE.Math.radToDeg( object.leftShoulderYawValue ) );

    this.rightShoulderPitchValue = object.rightShoulderPitchValue;
    this.rightShoulderPitchSet = object.rightShoulderPitchSet;
    // this.rightShoulderPitchInput.value -Math.floor( THREE.Math.radToDeg( object.rightShoulderPitchValue ) );

    this.rightShoulderYawValue = object.rightShoulderYawValue;
    this.rightShoulderYawSet = object.rightShoulderYawSet;
    // this.rightShoulderYawInput.value = Math.floor( THREE.Math.radToDeg( object.rightShoulderYawValue ) );

    this.leftElbowPitchValue = object.leftElbowPitchValue;
    this.leftElbowPitchSet = object.leftElbowPitchSet;
     // this.leftElbowPitchInput.value Math.floor( THREE.Math.radToDeg( object.leftElbowPitchValue ) );

    this.leftElbowYawValue = object.leftElbowYawValue;
    this.leftElbowYawSet = object.leftElbowYawSet;
    // this.leftElbowYawInput.value = -Math.floor( THREE.Math.radToDeg( object.leftElbowYawValue ) );

    this.rightElbowPitchValue = object.rightElbowPitchValue;
    this.rightElbowPitchSet = object.rightElbowPitchSet;
    // this.rightElbowPitchInput.value = -Math.floor( THREE.Math.radToDeg( object.rightElbowPitchValue ) );

    this.rightElbowYawValue = object.rightElbowYawValue;
    this.rightElbowYawSet = object.rightElbowYawSet;
    // this.rightElbowYawInput.value = -Math.floor( THREE.Math.radToDeg( object.rightElbowYawValue ) );

    this.setRotations();

  }

  toJSON() {

    return {

      type: 'frame',
      num: this.num,

      headQuaternion: this.headQuaternion,
      leftShoulderQuaternion: this.leftShoulderQuaternion,
      rightShoulderQuaternion: this.rightShoulderQuaternion,
      leftElbowQuaternion: this.leftElbowQuaternion,
      rightElbowQuaternion: this.rightElbowQuaternion,

      headPitchValue: this.headPitchValue,
      headPitchSet: this.headPitchSet,
      headYawValue: this.headYawValue,
      headYawSet: this.headYawSet,

      leftShoulderPitchValue: this.leftShoulderPitchValue,
      leftShoulderPitchSet: this.leftShoulderPitchSet,
      leftShoulderYawValue: this.leftShoulderYawValue,
      leftShoulderYawSet: this.leftShoulderYawSet,

      rightShoulderPitchValue: this.rightShoulderPitchValue,
      rightShoulderPitchSet: this.rightShoulderPitchSet,
      rightShoulderYawValue: this.rightShoulderYawValue,
      rightShoulderYawSet: this.rightShoulderYawSet,

      leftElbowPitchValue: this.leftElbowPitchValue,
      leftElbowPitchSet: this.leftElbowPitchSet,
      leftElbowYawValue: this.leftElbowYawValue,
      leftElbowYawSet: this.leftElbowYawSet,

      rightElbowPitchValue: this.rightElbowPitchValue,
      rightElbowPitchSet: this.rightElbowPitchSet,
      rightElbowYawValue: this.rightElbowYawValue,
      rightElbowYawSet: this.rightElbowYawSet,

    };

  }

}
