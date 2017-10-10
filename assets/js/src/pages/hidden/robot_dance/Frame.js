import * as THREE from 'three';

import HTMLControl from './HTMLControl.js';

const frames = HTMLControl.controls.frames.table;

export default class Frame {

  constructor( num, robot ) {

    this.robot = robot;

    this.num = num;

    this.initConstraints();

    this.initTableEntry();

    this.initControlFunctions();

    this.initDeleteButton();

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

  initConstraints() {

    this.headPitchMin = -60;
    this.headPitchMax = 60;
    this.headYawMin = -30;
    this.headYawMax = 30;

    this.leftShoulderPitchMin = -40;
    this.leftShoulderPitchMax = 60;
    this.leftShoulderYawMin = 0;
    this.leftShoulderYawMax = 60;

    this.rightShoulderPitchMin = -40;
    this.rightShoulderPitchMax = 60;
    this.rightShoulderYawMin = 0;
    this.rightShoulderYawMax = 60;

    this.leftElbowPitchMin = 0;
    this.leftElbowPitchMax = 60;
    this.leftElbowYawMin = -60;
    this.leftElbowYawMax = 60;

    this.rightElbowPitchMin = 0;
    this.rightElbowPitchMax = 60;
    this.rightElbowYawMin = -60;
    this.rightElbowYawMax = 60;

  }

  initTableEntry() {

    this.row = document.createElement( 'tr' );
    this.row.id = 'fr-' + this.num;

    const nameCell = document.createElement( 'td' );
    this.row.appendChild( nameCell );
    nameCell.innerHTML = this.num;

    const headCell = document.createElement( 'td' );
    this.row.appendChild( headCell );
    this.headPitch = this.createInput( headCell, this.headPitchMin, this.headPitchMax, 'head', 'pitch' );
    this.headYaw = this.createInput( headCell, this.headYawMin, this.headYawMax, 'head', 'yaw' );

    const leftShoulderCell = document.createElement( 'td' );
    this.row.appendChild( leftShoulderCell );
    this.leftShoulderPitch = this.createInput( leftShoulderCell, this.leftShoulderPitchMin, this.headPitchMax, 'leftShoulder', 'pitch' );
    this.leftShoulderYaw = this.createInput( leftShoulderCell, this.leftShoulderYawMin, this.headYawMax, 'leftShoulder', 'yaw' );

    const rightShoulderCell = document.createElement( 'td' );
    this.row.appendChild( rightShoulderCell );
    this.rightShoulderPitch = this.createInput( rightShoulderCell, this.rightShoulderPitchMin, this.headPitchMax, 'rightShoulder', 'pitch' );
    this.rightShoulderYaw = this.createInput( rightShoulderCell, this.rightShoulderYawMin, this.headYawMax, 'rightShoulder', 'yaw' );

    const leftElbowCell = document.createElement( 'td' );
    this.row.appendChild( leftElbowCell );
    this.leftElbowPitch = this.createInput( leftElbowCell, this.leftElbowPitchMin, this.headPitchMax, 'leftElbow', 'pitch' );
    this.leftElbowYaw = this.createInput( leftElbowCell, this.leftElbowYawMin, this.headYawMax, 'leftElbow', 'yaw' );

    const rightElbowCell = document.createElement( 'td' );
    this.row.appendChild( rightElbowCell );
    this.rightElbowPitch = this.createInput( rightElbowCell, this.rightElbowPitchMin, this.headPitchMax, 'rightElbow', 'pitch' );
    this.rightElbowYaw = this.createInput( rightElbowCell, this.rightElbowYawMin, this.headYawMax, 'rightElbow', 'yaw' );

  }

  createInput( cell, min, max, name, type ) {

    const span = document.createElement( 'span' );
    span.innerHTML = type[0].toUpperCase() + type.substr( 1, type.length ) + ': ';

    const input = document.createElement( 'input' );
    input.id = 'fr-' + this.num + '-' + name + '-' + type;
    input.type = 'number';
    input.min = min;
    input.max = max;
    input.value = 0;

    span.appendChild( input );
    cell.appendChild( span );

    input.addEventListener( 'mousedown', () => {

      this.row.click();

    } );

    return input;

  }

  initDeleteButton() {

    const deleteButtonCell = document.createElement( 'td' );
    this.deleteButton = document.createElement( 'button' );
    this.deleteButton.innerHTML = '<span class="fa fa-lg fa-trash-o" aria-hidden="true"></span>';
    deleteButtonCell.appendChild( this.deleteButton );
    this.row.appendChild( deleteButtonCell );

    const removeFrame = ( e ) => {

      e.preventDefault();
      frames.removeChild( this.row );

      this.removeEventListeners();
      this.deleteButton.removeEventListener( 'click', removeFrame );

    };

    this.deleteButton.addEventListener( 'click', removeFrame );

  }

  addEventListeners() {

    this.headPitch.addEventListener( 'input', this.controlFunctions.headPitch );
    this.headYaw.addEventListener( 'input', this.controlFunctions.headYaw );

    this.leftShoulderPitch.addEventListener( 'input', this.controlFunctions.leftShoulderPitch );
    this.leftShoulderYaw.addEventListener( 'input', this.controlFunctions.leftShoulderYaw );

    this.rightShoulderPitch.addEventListener( 'input', this.controlFunctions.rightShoulderPitch );
    this.rightShoulderYaw.addEventListener( 'input', this.controlFunctions.rightShoulderYaw );

    this.leftElbowPitch.addEventListener( 'input', this.controlFunctions.leftElbowPitch );
    this.leftElbowYaw.addEventListener( 'input', this.controlFunctions.leftElbowYaw );

    this.rightElbowPitch.addEventListener( 'input', this.controlFunctions.rightElbowPitch );
    this.rightElbowYaw.addEventListener( 'input', this.controlFunctions.rightElbowYaw );

  }

  removeEventListeners() {

    this.headPitch.removeEventListener( 'input', this.controlFunctions.headPitch );
    this.headYaw.removeEventListener( 'input', this.controlFunctions.headYaw );

    this.leftShoulderPitch.removeEventListener( 'input', this.controlFunctions.leftShoulderPitch );
    this.leftShoulderYaw.removeEventListener( 'input', this.controlFunctions.leftShoulderYaw );

    this.rightShoulderPitch.removeEventListener( 'input', this.controlFunctions.rightShoulderPitch );
    this.rightShoulderYaw.removeEventListener( 'input', this.controlFunctions.rightShoulderYaw );

    this.leftElbowPitch.removeEventListener( 'input', this.controlFunctions.leftElbowPitch );
    this.leftElbowYaw.removeEventListener( 'input', this.controlFunctions.leftElbowYaw );

    this.rightElbowPitch.removeEventListener( 'input', this.controlFunctions.rightElbowPitch );
    this.rightElbowYaw.removeEventListener( 'input', this.controlFunctions.rightElbowYaw );

  }

  initControlFunctions() {

    this.headPitchValue = 0;
    this.headYawValue = 0;

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

    // const xAxis = new THREE.Vector3( 1, 0, 0 );
    const yAxis = new THREE.Vector3( 0, 1, 0 );
    const zAxis = new THREE.Vector3( 0, 0, 1 );

    this.controlFunctions = {
      headPitch: ( e ) => {

        e.preventDefault();


        this.headPitchValue = THREE.Math.degToRad( -e.target.value );

        this.robot.head.rotation.z = this.headPitchValue;

      },
      headYaw: ( e ) => {

        e.preventDefault();


        this.headYawValue = THREE.Math.degToRad( e.target.value );

        this.robot.head.rotation.x = this.headYawValue;

      },
      leftShoulderPitch: ( e ) => {

        e.preventDefault();


        const value = THREE.Math.degToRad( -e.target.value );

        this.robot.leftShoulder.rotateOnAxis( zAxis, this.leftShoulderPitchValue - value );

        this.leftShoulderPitchValue = value;

        this.leftShoulderQuaternion.copy( this.robot.leftShoulder.quaternion );

      },
      leftShoulderYaw: ( e ) => {

        e.preventDefault();


        const value = THREE.Math.degToRad( -e.target.value );

        this.robot.leftShoulder.rotateOnAxis( yAxis, this.leftShoulderYawValue - value );

        this.leftShoulderYawValue = value;

        this.leftShoulderQuaternion.copy( this.robot.leftShoulder.quaternion );

      },
      rightShoulderPitch: ( e ) => {

        e.preventDefault();


        const value = THREE.Math.degToRad( -e.target.value );

        this.robot.rightShoulder.rotateOnAxis( zAxis, this.rightShoulderPitchValue - value );

        this.rightShoulderPitchValue = value;

        this.rightShoulderQuaternion.copy( this.robot.rightShoulder.quaternion );
      },
      rightShoulderYaw: ( e ) => {

        e.preventDefault();


        const value = THREE.Math.degToRad( e.target.value );

        this.robot.rightShoulder.rotateOnAxis( yAxis, this.rightShoulderYawValue - value );

        this.rightShoulderYawValue = value;

        this.rightShoulderQuaternion.copy( this.robot.rightShoulder.quaternion );

      },
      leftElbowPitch: ( e ) => {

        e.preventDefault();


        const value = THREE.Math.degToRad( e.target.value );

        this.robot.leftElbow.rotateOnAxis( yAxis, this.leftElbowPitchValue - value );

        this.leftElbowPitchValue = value;

        this.leftElbowQuaternion.copy( this.robot.leftElbow.quaternion );

      },
      leftElbowYaw: ( e ) => {

        e.preventDefault();


        const value = THREE.Math.degToRad( -e.target.value );

        this.robot.leftElbow.rotateOnAxis( zAxis, this.leftElbowYawValue - value );

        this.leftElbowYawValue = value;

        this.leftElbowQuaternion.copy( this.robot.leftElbow.quaternion );

      },
      rightElbowPitch: ( e ) => {

        e.preventDefault();


        const value = THREE.Math.degToRad( -e.target.value );

        this.robot.rightElbow.rotateOnAxis( yAxis, this.rightElbowPitchValue - value );

        this.rightElbowPitchValue = value;

        this.rightElbowQuaternion.copy( this.robot.rightElbow.quaternion );

      },
      rightElbowYaw: ( e ) => {

        e.preventDefault();

        const value = THREE.Math.degToRad( -e.target.value );

        this.robot.rightElbow.rotateOnAxis( zAxis, this.rightElbowYawValue - value );

        this.rightElbowYawValue = value;

        this.rightElbowQuaternion.copy( this.robot.rightElbow.quaternion );

      },
    };
  }

  setRotations() {

    this.robot.head.rotation.set( this.headYawValue, 0, this.headPitchValue );
    this.robot.leftShoulder.quaternion.copy( this.leftShoulderQuaternion );
    this.robot.rightShoulder.quaternion.copy( this.rightShoulderQuaternion );
    this.robot.leftElbow.quaternion.copy( this.leftElbowQuaternion );
    this.robot.rightElbow.quaternion.copy( this.rightElbowQuaternion );

  }

  toJSON() {

    return {

      num: this.num,
      headPitchValue: this.headPitchValue,
      headYawValue: this.headYawValue,
      leftShoulderPitchValue: this.leftShoulderPitchValue,
      leftShoulderYawValue: this.leftShoulderYawValue,
      leftElbowPitchValue: this.leftElbowPitchValue,
      leftElbowYawValue: this.leftElbowYawValue,
      rightShoulderPitchValue: this.rightShoulderPitchValue,
      rightShoulderYawValue: this.rightShoulderYawValue,
      rightElbowPitchValue: this.rightElbowPitchValue,
      rightElbowYawValue: this.rightElbowYawValue,
    };

  }

}
