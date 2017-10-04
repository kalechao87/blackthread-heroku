import HTMLControl from './HTMLControl.js';

const frames = HTMLControl.controls.frames.table;

export default class Frame {

  constructor( num ) {

    this.num = num;

    this.initConstraints();

    this.initTableRow();


    this.initDeleteButton();

  }

  initConstraints() {

    this.headPitchMin = -30;
    this.headPitchMax = 30;
    this.headYawMin = -30;
    this.headYawMax = 30;

    this.leftShoulderPitchMin = -30;
    this.leftShoulderPitchMax = 30;
    this.leftShoulderYawMin = -30;
    this.leftShoulderYawMax = 30;

    this.rightShoulderPitchMin = -30;
    this.rightShoulderPitchMax = 30;
    this.rightShoulderYawMin = -30;
    this.rightShoulderYawMax = 30;

    this.leftElbowPitchMin = -30;
    this.leftElbowPitchMax = 30;
    this.leftElbowYawMin = -30;
    this.leftElbowYawMax = 30;

    this.rightElbowPitchMin = -30;
    this.rightElbowPitchMax = 30;
    this.rightElbowYawMin = -30;
    this.rightElbowYawMax = 30;

  }

  initTableRow() {

    this.row = document.createElement( 'tr' );
    this.row.id = 'fr-' + this.num;

    const nameCell = document.createElement( 'td' );
    this.row.appendChild( nameCell );
    nameCell.innerHTML = this.num;

    const headCell = document.createElement( 'td' );
    this.row.appendChild( headCell );
    this.headPitch = this.createInput( headCell, this.headPitchMin, this.headPitchMax, 'head', 'pitch'  );
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
    span.innerHTML = type[0].toUpperCase() + type.substr(1, type.length) + ': ';

    const input = document.createElement( 'input' );
    input.id = 'fr-' + this.num + '-' + name + '-' + type;
    input.type = 'number';
    input.min = min;
    input.max = max;
    input.value = 0;

    span.appendChild( input );
    cell.appendChild( span );

    return input;

  }

  initDeleteButton() {

    const deleteButtonCell = document.createElement( 'td' );
    this.deleteButton = document.createElement( 'button' );
    this.deleteButton.innerHTML = '<span class="fa fa-lg fa-trash-o" aria-hidden="true"></span>';
    deleteButtonCell.appendChild( this.deleteButton );
    this.row.appendChild( deleteButtonCell );

    const removeRow = ( e ) => {

      e.preventDefault();
      frames.removeChild( this.row );

      this.deleteButton.removeEventListener( 'click', removeRow );

    };

    this.deleteButton.addEventListener( 'click', removeRow );

  }

}

/*
<td id="fr-1">1</td>
<td>
  <span style="display: inline-block;">appendChild <input id="fr-1-head-pitch" type="number"></span>
  <span style="display: inline-block;">Yaw: <input id="fr-1-head-yaw" type="number"></span>
</td>
<td>
  <span style="display: inline-block;">Pitch: <input type="number"></span>
  <span style="display: inline-block;">Yaw: <input type="number"></span>
</td>
<td>
  <span style="display: inline-block;">Pitch: <input type="number"></span>
  <span style="display: inline-block;">Yaw: <input type="number"></span>
</td>
<td>
  <span style="display: inline-block;">Pitch: <input type="number"></span>
  <span style="display: inline-block;">Yaw: <input type="number"></span>
</td>
<td>
  <span style="display: inline-block;">Pitch: <input type="number"></span>
  <span style="display: inline-block;">Yaw: <input type="number"></span>
</td>
<td><button><span class="fa fa-lg fa-trash-o" aria-hidden="true"></span></button></td>

*/
