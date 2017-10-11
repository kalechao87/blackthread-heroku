import HTMLControl from './HTMLControl.js';

export default class FileControl {

  constructor( frames, groups, dance ) {

    this.frame = frames;
    this.groups = groups;
    this.dance = dance;

    this.initSaveButton();
    this.initLoadButton();
    this.initExamples();

  }

  load( file ) {

  }

  initSaveButton() {

    HTMLControl.controls.file.save.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      console.log( 's' );

    } );

  }

  initLoadButton() {

    HTMLControl.controls.file.load.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      HTMLControl.controls.file.fileInput.click();

    } );

    HTMLControl.controls.file.fileInput.addEventListener( 'change', ( e ) => {

      const file = e.target.files[0];

      console.log( file )

      const fileReader = new FileReader();

      fileReader.readAsText( file );

      fileReader.onload = ( evt ) => {

        try {

          const json = JSON.parse( evt.target.result );

          console.log( JSON.stringify( json ) );


        } catch ( error ) {

          console.error( 'Error while trying to read ' + file.name + ' as JSON: ' + error );

        }
      };

    } );
  }

  initExamples() {

    const examples = HTMLControl.controls.file.examples;

    HTMLControl.controls.file.loadExample.addEventListener( 'click', ( e ) => {

      e.preventDefault();

      console.log( examples.options[examples.selectedIndex].value );

    } );

  }

}
