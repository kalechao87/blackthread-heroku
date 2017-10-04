import * as THREE from 'three';
import throttle from 'lodash.throttle';

import HTMLControl from './HTMLControl.js';

export default class RobotManualControl {

  constructor( robot ) {

    this.enabled = true;

    this.robot = robot;

    this.initMoveableParts();
    this.initEventListeners();

  }

  setFrame( frame ) {

    console.log( frame )

  }

  initMoveableParts() {

    this.head = this.robot.getObjectByName( 'headControl' ); // or 'neck'

    this.leftShoulder = this.robot.getObjectByName( 'shoulderControlLeft' ); // or Lshoulder_joint
    this.rightShoulder = this.robot.getObjectByName( 'shoulderControlRight' ); // or Rshoulder_joint

    this.leftElbow = this.robot.getObjectByName( 'elbowControlLeft' );
    this.rightElbow = this.robot.getObjectByName( 'elbowControlRight' );

  }

  initEventListeners() {

    const headPitchOffset = this.head.rotation.z;
    const headYawOffset = this.head.rotation.x;

    const xAxis = new THREE.Vector3( 1, 0, 0 );
    const yAxis = new THREE.Vector3( 0, 1, 0 );
    const zAxis = new THREE.Vector3( 0, 0, 1 );

    HTMLControl.controls.movement.head.pitch.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( -e.target.value );

      this.head.rotation.z = headPitchOffset + value;

    }, false ), 250 );

    HTMLControl.controls.movement.head.yaw.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( e.target.value );

      this.head.rotation.x = headYawOffset + value;

    }, false ), 250 );

    let leftShoulderPitchPrevVal = 0;
    let leftShoulderYawPrevVal = 0;

    HTMLControl.controls.movement.leftShoulder.pitch.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( -e.target.value );

      this.leftShoulder.rotateOnAxis( zAxis, leftShoulderPitchPrevVal - value );

      leftShoulderPitchPrevVal = value;

    }, false ), 250 );

    HTMLControl.controls.movement.leftShoulder.yaw.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( -e.target.value );

      this.leftShoulder.rotateOnAxis( yAxis, leftShoulderYawPrevVal - value );

      leftShoulderYawPrevVal = value;

    }, false ), 250 );

    let rightShoulderPitchPrevVal = 0;
    let rightShoulderYawPrevVal = 0;

    HTMLControl.controls.movement.rightShoulder.pitch.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( -e.target.value );

      this.rightShoulder.rotateOnAxis( zAxis, rightShoulderPitchPrevVal - value );

      rightShoulderPitchPrevVal = value;

    }, false ), 250 );

    HTMLControl.controls.movement.rightShoulder.yaw.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( e.target.value );

      this.rightShoulder.rotateOnAxis( yAxis, rightShoulderYawPrevVal - value );

      rightShoulderYawPrevVal = value;

    }, false ), 250 );

    HTMLControl.controls.movement.leftElbow.pitch.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( -e.target.value );

      this.leftElbow.rotation.y = value;

    }, false ), 250 );

    let leftElbowPitchPrevVal = 0;
    let leftElbowYawPrevVal = 0;

    HTMLControl.controls.movement.leftElbow.pitch.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( -e.target.value );

      this.leftElbow.rotateOnAxis( zAxis, leftElbowPitchPrevVal - value );

      leftElbowPitchPrevVal = value;

    }, false ), 250 );

    HTMLControl.controls.movement.leftElbow.yaw.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( e.target.value );

      this.leftElbow.rotateOnAxis( xAxis, leftElbowYawPrevVal - value );

      leftElbowYawPrevVal = value;

    }, false ), 250 );

    let rightElbowPitchPrevVal = 0;
    let rightElbowYawPrevVal = 0;

    HTMLControl.controls.movement.rightElbow.pitch.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( -e.target.value );

      this.rightElbow.rotateOnAxis( yAxis, rightElbowPitchPrevVal - value );

      rightElbowPitchPrevVal = value;

    }, false ), 250 );

    HTMLControl.controls.movement.rightElbow.yaw.addEventListener( 'input', throttle( ( e ) => {

      e.preventDefault();

      const value = THREE.Math.degToRad( e.target.value );

      this.rightElbow.rotateOnAxis( xAxis, rightElbowYawPrevVal - value );

      rightElbowYawPrevVal = value;

    }, false ), 250 );

  }

  static set enabled( bool ) {

    HTMLControl.setMovementControlsDisabledState( bool );

  }

}
