export default class Robot {

  constructor( model ) {

    this.model = model;

    this.initParts();
    this.initConstraints();
    this.initDefaultPose();

  }

  initDefaultPose() {

    this.headInitialQuaternion = this.head.quaternion.clone();
    this.leftShoulderInitialQuaternion = this.leftShoulder.quaternion.clone();
    this.rightShoulderInitialQuaternion = this.rightShoulder.quaternion.clone();
    this.leftElbowInitialQuaternion = this.leftElbow.quaternion.clone();
    this.rightElbowInitialQuaternion = this.rightElbow.quaternion.clone();

  }

  initParts() {

    this.head = this.model.getObjectByName( 'head' );

    this.leftShoulder = this.model.getObjectByName( 'leftShoulder' );
    this.rightShoulder = this.model.getObjectByName( 'rightShoulder' );

    this.leftElbow = this.model.getObjectByName( 'leftElbow' );
    this.rightElbow = this.model.getObjectByName( 'rightElbow' );

  }

  initConstraints() {

    this.constraints = {

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

  }

}
