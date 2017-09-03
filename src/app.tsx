import * as React from "react";
import * as ReactDOM from "react-dom";

import EditorMain from './views/main';
import 'file-loader?name=[name].[ext]!./index.html';

ReactDOM.render(<EditorMain />, document.getElementById("app"));