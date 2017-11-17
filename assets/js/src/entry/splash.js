import 'babel-polyfill';

// this needs to be called before any scripts that use hammer.js, as it sets up the global Hammer
import 'utilities/init/initHammer.js';
import initNav from 'utilities/init/initNav.js';

import 'pages/splash/main.js';

initNav();
