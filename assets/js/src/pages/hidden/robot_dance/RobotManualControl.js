import * as THREE from 'three';

export default class RobotManualControl {

  constructor( robot ) {

    this.robot = robot;
    this.frame = null;

    this.initMoveableParts();
    this.initControlFunctions();

  }

  setFrame( frame ) {

    if ( this.frame !== null ) this.removeEventListeners( this.frame );

    this.frame = frame;
    this.setupEventListeners( this.frame );

  }

  setupEventListeners( frame ) {

    frame.headPitch.addEventListener( 'input', this.controlFunctions.headPitch );
    frame.headYaw.addEventListener( 'input', this.controlFunctions.headYaw );

    frame.leftShoulderPitch.addEventListener( 'input', this.controlFunctions.leftShoulderPitch );
    frame.leftShoulderYaw.addEventListener( 'input', this.controlFunctions.leftShoulderYaw );

    frame.rightShoulderPitch.addEventListener( 'input', this.controlFunctions.rightShoulderPitch );
    frame.rightShoulderYaw.addEventListener( 'input', this.controlFunctions.rightShoulderYaw );

    frame.leftElbowPitch.addEventListener( 'input', this.controlFunctions.leftElbowPitch );
    frame.leftElbowYaw.addEventListener( 'input', this.controlFunctions.leftElbowYaw );

    frame.rightElbowPitch.addEventListener( 'input', this.controlFunctions.rightElbowPitch );
    frame.rightElbowYaw.addEventListener( 'input', this.controlFunctions.rightElbowYaw );

  }

  removeEventListeners( frame ) {

    frame.headPitch.removeEventListener( 'input', this.controlFunctions.headPitch );
    frame.headYaw.removeEventListener( 'input', this.controlFunctions.headYaw );

    frame.leftShoulderPitch.removeEventListener( 'input', this.controlFunctions.leftShoulderPitch );
    frame.leftShoulderYaw.removeEventListener( 'input', this.controlFunctions.leftShoulderYaw );

    frame.rightShoulderPitch.removeEventListener( 'input', this.controlFunctions.rightShoulderPitch );
    frame.rightShoulderYaw.removeEventListener( 'input', this.controlFunctions.rightShoulderYaw );

    frame.leftElbowPitch.removeEventListener( 'input', this.controlFunctions.leftElbowPitch );
    frame.leftElbowYaw.removeEventListener( 'input', this.controlFunctions.leftElbowYaw );

    frame.rightElbowPitch.removeEventListener( 'input', this.controlFunctions.rightElbowPitch );
    frame.rightElbowYaw.removeEventListener( 'input', this.controlFunctions.rightElbowYaw );

  }

  initControlFunctions() {

    const headPitchOffset = this.head.rotation.z;
    const headYawOffset = this.head.rotation.x;

    let leftShoulderPitchPrevVal = 0;
    let leftShoulderYawPrevVal = 0;

    let rightShoulderPitchPrevVal = 0;
    let rightShoulderYawPrevVal = 0;

    let leftElbowPitchPrevVal = 0;
    let leftElbowYawPrevVal = 0;

    let rightElbowPitchPrevVal = 0;
    let rightElbowYawPrevVal = 0;

    const xAxis = new THREE.Vector3( 1, 0, 0 );
    const yAxis = new THREE.Vector3( 0, 1, 0 );
    const zAxis = new THREE.Vector3( 0, 0, 1 );

    this.controlFunctions = {
      headPitch: ( e ) => {

        e.preventDefault();

        this.frame.row.click();

        const value = THREE.Math.degToRad( -e.target.value );

        this.head.rotation.z = headPitchOffset + value;

      },
      headYaw: ( e ) => {

        e.preventDefault();

        this.frame.row.click();

        const value = THREE.Math.degToRad( e.target.value );

        this.head.rotation.x = headYawOffset + value;

      },
      leftShoulderPitch: ( e ) => {

        e.preventDefault();

        this.frame.row.click();

        const value = THREE.Math.degToRad( -e.target.value );

        this.leftShoulder.rotateOnAxis( zAxis, leftShoulderPitchPrevVal - value );

        leftShoulderPitchPrevVal = value;

      },
      leftShoulderYaw: ( e ) => {

        e.preventDefault();

        this.frame.row.click();

        const value = THREE.Math.degToRad( -e.target.value );

        this.leftShoulder.rotateOnAxis( yAxis, leftShoulderYawPrevVal - value );

        leftShoulderYawPrevVal = value;

      },
      rightShoulderPitch: ( e ) => {

        e.preventDefault();

        this.frame.row.click();

        const value = THREE.Math.degToRad( -e.target.value );

        this.rightShoulder.rotateOnAxis( zAxis, rightShoulderPitchPrevVal - value );

        rightShoulderPitchPrevVal = value;
      },
      rightShoulderYaw: ( e ) => {

        e.preventDefault();

        this.frame.row.click();

        const value = THREE.Math.degToRad( e.target.value );

        this.rightShoulder.rotateOnAxis( yAxis, rightShoulderYawPrevVal - value );

        rightShoulderYawPrevVal = value;

      },
      leftElbowPitch: ( e ) => {

        e.preventDefault();

        this.frame.row.click();

        const value = THREE.Math.degToRad( -e.target.value );

        this.leftElbow.rotateOnAxis( zAxis, leftElbowPitchPrevVal - value );

        leftElbowPitchPrevVal = value;

      },
      leftElbowYaw: ( e ) => {

        e.preventDefault();

        this.frame.row.click();

        const value = THREE.Math.degToRad( e.target.value );

        this.leftElbow.rotateOnAxis( xAxis, leftElbowYawPrevVal - value );

        leftElbowYawPrevVal = value;

      },
      rightElbowPitch: ( e ) => {

        e.preventDefault();

        this.frame.row.click();

        const value = THREE.Math.degToRad( -e.target.value );

        this.rightElbow.rotateOnAxis( yAxis, rightElbowPitchPrevVal - value );

        rightElbowPitchPrevVal = value;

      },
      rightElbowYaw: ( e ) => {
        e.preventDefault();

        this.frame.row.click();

        const value = THREE.Math.degToRad( e.target.value );

        this.rightElbow.rotateOnAxis( xAxis, rightElbowYawPrevVal - value );

        rightElbowYawPrevVal = value;

      },
    };
  }

  initMoveableParts() {

    this.head = this.robot.getObjectByName( 'headControl' ); // or 'neck'

    this.leftShoulder = this.robot.getObjectByName( 'shoulderControlLeft' ); // or Lshoulder_joint
    this.rightShoulder = this.robot.getObjectByName( 'shoulderControlRight' ); // or Rshoulder_joint

    this.leftElbow = this.robot.getObjectByName( 'elbowControlLeft' );
    this.rightElbow = this.robot.getObjectByName( 'elbowControlRight' );

  }

}
