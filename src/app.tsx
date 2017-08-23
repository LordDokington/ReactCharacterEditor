import * as React from "react";
import * as ReactDOM from "react-dom";

import SiteFrame from './views/siteFrame';
import 'file-loader?name=[name].[ext]!./index.html';

const App = () => <SiteFrame/>;

ReactDOM.render(<App />, document.getElementById("app"));

