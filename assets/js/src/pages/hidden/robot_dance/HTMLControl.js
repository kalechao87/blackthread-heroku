const canvas = document.querySelector( '#canvas' );
const container = document.querySelector( '#container' );

const loading = {
  bar: document.querySelector( '#loading-bar' ),
  overlay: document.querySelector( '#loading-overlay' ),
  revealOnLoad: document.querySelectorAll( '.reveal-on-load' ),
  hideOnLoad: document.querySelectorAll( '.hide-on-load' ),
  progress: document.querySelector( '#progress' ),
};

const controls = {
  frames: {
    table: document.querySelector( '#frames' ),
    createButton: document.querySelector( '#create-frame-button' ),

  },
  groups: {
    table: document.querySelector( '#groups' ),
    createButton: document.querySelector( '#create-group-button' ),
  },
  dance: {
    framerate: document.querySelector( '#framerate' ),
    showAdvancedControls: document.querySelector( '#advanced-control-enable' ),
  },
  music: {
    uploadMP3Button: document.querySelector( '#upload-mp3-button' ),
    uploadMP3Input: document.querySelector( '#upload-mp3-input' ),
    tracks: document.querySelector( '#loaded-tracks' ),
    play: document.querySelector( '#play-music' ),
    positionSlider: document.querySelector( '#track-position-slider' ),
  },
  file: {
    saveDanceButton: document.querySelector( '#save-dance' ),
    loadDanceButton: document.querySelector( '#load-dance' ),
    examples: document.querySelector( '#premade-examples' ),
  },
};


export default class HTMLControl {

  static setInitialState() {

  }

  static setOnLoadStartState() {

    loading.bar.classList.remove( 'hide' );

  }

  static setOnLoadEndState() {

    loading.overlay.classList.add( 'hide' );

    for ( let i = 0; i < loading.hideOnLoad.length; i++ ) {

      loading.hideOnLoad[ i ].classList.add( 'hide' );

    }

    for ( let i = 0; i < loading.revealOnLoad.length; i++ ) {

      loading.revealOnLoad[ i ].classList.remove( 'hide' );

    }

  }

}

HTMLControl.canvas = canvas;
HTMLControl.container = container;
HTMLControl.loading = loading;
HTMLControl.controls = controls;
