import { createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';

const primaryColor = {
    "50":"#5D6486",
    "100":"#5D6486",
    "200":"#5D6486",
    "300":"#41486C",
    "400":"#41486C",
    "500":"#2A3052",
    "600":"#2A3052",
    "700":"#2A3052",
    "800":"#2A3052",
    "900":"#2A3052",
    "A100":"#1A2144",
    "A200":"#1A2144",
    "A400":"#0C112E",
    "A700":"#0C112E",
    "contrastDefaultColor":"light"
};

const secondaryColor = {
    "50":"#FFB879",
    "100":"#FFB879",
    "200":"#FFB879",
    "300":"#F89E4F",
    "400":"#F89E4F",
    "500":"#E98124",
    "600":"#E98124",
    "700":"#E98124",
    "800":"#E98124",
    "900":"#E98124",
    "A100":"#BE600D",
    "A200":"#BE600D",
    "A400":"#964700",
    "A700":"#964700",
    "contrastDefaultColor":"dark"
}


export default createMuiTheme({
    palette: {
        primary: primaryColor,
        secondary: secondaryColor,
    }
});
