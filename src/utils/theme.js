import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#7289DA",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#bc000d",
      main: "#f44336",
      dark: "#ff7961",
      contrastText: "#000",
    },
    text:{
      primary: '#dcddde',
      secondary:'#72767d'
    },
    background: {
      paper: '#36393F',
      default: '#36393F',
    }
  },
  spreadIt: {
    loginContainer: { maxWidth: 400, margin: "auto", textAlign: "center" },
    image: { maxWidth: 100 },
    pageTitle: { fontWeight: "lighter", margin: "1rem auto" },
    textField: { marginBottom: "1rem" },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        // backgroundColor: '#7289DA'
      }
    },
    MuiIconButton: {
      root: {
        padding: '8px',
        '&:hover': {
          backgroundColor: '#202225'
        }
      }
    }
  }
});
