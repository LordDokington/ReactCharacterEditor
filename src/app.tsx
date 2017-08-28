import * as React from "react";
import * as ReactDOM from "react-dom";

import EditorMain from './views/main';
import 'file-loader?name=[name].[ext]!./index.html';

const App = () => <EditorMain />;

ReactDOM.render(<App />, document.getElementById("app"));

