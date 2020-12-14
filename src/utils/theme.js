import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  spreadIt: {
    loginContainer: { maxWidth: 400, margin: "auto", textAlign: "center" },
    image: { maxWidth: 100 },
    pageTitle: { fontWeight: "lighter", margin: "1rem auto" },
    textField: { marginBottom: "1rem" },
  },
});
