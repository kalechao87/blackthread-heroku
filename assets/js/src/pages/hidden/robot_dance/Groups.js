import HTMLControl from './HTMLControl.js';
import Group from './Group.js';

export default class Groups {

  constructor( frames ) {

    this.frames = frames;

    this.currentGroupNum = 0;
    this.selectedGroup = null;
    this.groups = [];

    this.groupsTable = HTMLControl.controls.groups.table;
    this.newGroupButton = HTMLControl.controls.groups.createButton;
    this.initNewGroupButton();

  }

  createGroup( num, details ) {

    const group = new Group( num, this.frames );

    if ( details !== undefined ) group.fromJSON( details );

    this.groups.push( group );

    this.groupsTable.appendChild( group.row );

    this.select( group );

    group.row.addEventListener( 'click', ( evt ) => {

      evt.preventDefault();

      this.select( group );

    } );

    const remove = ( evt ) => {

      evt.preventDefault();
      HTMLControl.controls.groups.table.removeChild( group.row );

      group.deleteButton.removeEventListener( 'click', remove );

      this.groups[ group.num ] = null;

    };

    group.deleteButton.addEventListener( 'click', remove );


  }

  initNewGroupButton() {

    this.newGroupButton.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      this.createGroup( this.currentGroupNum ++ );

    } );

  }

  select( group ) {

    group.selected = true;

    this.selectedGroup = group;

    this.groups.forEach( ( g ) => {

      if ( g !== null && g.num !== group.num ) {

        g.selected = false;

      }

    } );

  }

  reset() {

    this.groups.forEach( ( group ) => {

      if ( group !== null ) group.deleteButton.click();

    } );

    this.groups = [];

  }

  fromJSON( object ) {

    this.reset();

    for ( const key in object ) {

      const detail = object[ key ];

      if ( detail === null ) {

        this.frames[ key ] = null;

      } else {

        this.createGroup( key, detail );
        this.currentFrameNum = key;

      }

      console.log( object[ key ] );

    }

  }

  toJSON() {

    const output = {};

    for ( let i = 0; i < this.groups.length; i++ ) {

      const group = this.groups[ i ];

      if ( group !== null ) {

        output[ i ] = group.toJSON();

      } else {

        output[ i ] = null;

      }

    }

    return output;

  }

}