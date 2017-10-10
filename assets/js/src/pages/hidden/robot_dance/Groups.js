import HTMLControl from './HTMLControl.js';
import Group from './Group.js';

export default class Groups {

  constructor( frames ) {

    this.frames = frames;

    this.currentGroupNum = 0;
    this.groups = [];

    this.groupsTable = HTMLControl.controls.groups.table;
    this.newGroupButton = HTMLControl.controls.groups.createButton;
    this.initNewGroupButton();

  }

  initNewGroupButton() {

    this.newGroupButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      const group = new Group( this.currentGroupNum ++ );

      this.groups.push( group );

      this.groupsTable.appendChild( group.row );

      this.select( group );

      group.row.addEventListener( 'click', ( evt ) => {

        evt.preventDefault();

        this.select( group );

      } );

    } );

  }

  select( group ) {

    group.selected = true;

    this.groups.forEach( ( g ) => {

      if ( g.num !== group.num ) {

        g.selected = false;

      }

    } );

  }

}
