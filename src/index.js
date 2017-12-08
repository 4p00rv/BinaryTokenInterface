import React from "react";
import { render } from "react-dom";
import { MuiThemeProvider } from 'material-ui/styles';

import Drawer from "./components/drawer/drawer";
import theme from "./components/theme/binaryTheme";


render(
    <MuiThemeProvider theme={theme}>
        <div>
            <Drawer />
        </div>
    </MuiThemeProvider>,
  document.getElementById("root")
);
