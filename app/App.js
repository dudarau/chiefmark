import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDown,
  faAngleRight,
  faFolder,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';

import Home from './pages/home';

import 'bootstrap/dist/css/bootstrap.min.css';

library.add([faAngleRight, faEdit, faAngleDown, faFolder]);

const App = () => <Home />;

export default App;
