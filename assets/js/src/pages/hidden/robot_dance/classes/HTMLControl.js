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
  movement: {
    head: {
      pitch: document.querySelector( '#head-pitch' ),
      yaw: document.querySelector( '#head-yaw' ),
    },
    leftShoulder: {
      pitch: document.querySelector( '#l-shoulder-pitch' ),
      yaw: document.querySelector( '#l-shoulder-yaw' ),
    },
    rightShoulder: {
      pitch: document.querySelector( '#r-shoulder-pitch' ),
      yaw: document.querySelector( '#r-shoulder-yaw' ),
    },
    leftElbow: {
      pitch: document.querySelector( '#l-elbow-pitch' ),
      yaw: document.querySelector( '#l-elbow-yaw' ),
    },
    rightElbow: {
      pitch: document.querySelector( '#r-elbow-pitch' ),
      yaw: document.querySelector( '#r-elbow-yaw' ),
    },
  },
  frames: {
    createButton: document.querySelector( '#create-frame-button' ),

  },
  groups: {
    createButton: document.querySelector( '#create-group-button' ),
  },
  dance: {
    framerate: document.querySelector( '#framerate' ),
    showAdvancedControls: document.querySelector( '#advanced-control-enable' ),
  },
  music: {
    startWithDanceCheckbox: document.querySelector( '#start-music-with-dance' ),
    selection: document.querySelector( '#music-select' ),
    playButton: document.querySelector( '#play-music' ),
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

    this.setMovementControlsDisabledState( false );

  }

  static setMovementControlsDisabledState( bool ) {

    controls.movement.head.pitch.disabled = bool;

    for ( const key in controls.movement ) {

      controls.movement[key].pitch.disabled = bool;
      controls.movement[key].yaw.disabled = bool;

    }

  }

}

HTMLControl.canvas = canvas;
HTMLControl.container = container;
HTMLControl.loading = loading;
HTMLControl.controls = controls;
