export default class Robot {

  constructor( model ) {

    this.model = model;

    this.initParts();
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

  resetPose() {

    this.head.quaternion.copy( this.headInitialQuaternion );

    this.leftShoulder.quaternion.copy( this.leftShoulderInitialQuaternion );
    this.rightShoulder.quaternion.copy( this.rightShoulderInitialQuaternion );

    this.leftElbow.quaternion.copy( this.leftElbowInitialQuaternion );
    this.rightElbow.quaternion.copy( this.rightElbowInitialQuaternion );

  }

}
