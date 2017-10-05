import HTMLControl from './HTMLControl.js';
import Group from './Group.js';

export default class Groups {

  constructor() {

    this.currentGroupNum = 0;
    this.groups = [];

    this.groupsTable = HTMLControl.controls.groups.table;
    this.newGroupButton = HTMLControl.controls.groups.createButton;
    this.initNewGroupButton();

  }

  initNewGroupButton() {

    this.newGroupButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const group = new Group( this.currentGroupNum ++  );

      this.groups.push( group );

      this.groupsTable.appendChild( group.row );

      group.row.addEventListener( 'click', ( evt ) => {

        evt.preventDefault();

        group.selected = true;

        this.groups.forEach( ( f ) => {

          if ( f.num !== group.num ) f.selected = false;

        } );

      } );

    } );

  }

}
