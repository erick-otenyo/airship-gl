import React from "react";
import ReactDOM from "react-dom";
import { defineCustomElements } from "@carto/airship-components";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "@carto/airship-style/dist/airship.css";
import 'index.css'

defineCustomElements(window);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
