import React from "react";
import { Link } from "react-router-dom";
// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Grid container justify='center'>
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            <Typography>Home</Typography>
          </Button>
          <Button color="inherit" component={Link} to="/login">
            <Typography>login</Typography>
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            <Typography>signup</Typography>
          </Button>
        </Toolbar>
      </Grid>
    </AppBar>
  );
}
