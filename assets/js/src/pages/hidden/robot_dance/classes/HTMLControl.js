const canvas = document.querySelector( '#canvas' );
const container = document.querySelector( '#container' );

const loading = {
  bar: document.querySelector( '#loading-bar' ),
  overlay: document.querySelector( '#loading-overlay' ),
  revealOnLoad: document.querySelectorAll( '.reveal-on-load' ),
  hideOnLoad: document.querySelectorAll( '.hide-on-load' ),
  progress: document.querySelector( '#progress' ),
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

