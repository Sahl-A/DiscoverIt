import React from "react";
import { Link } from "react-router-dom";
// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import Notifications from "@material-ui/icons/Notifications";
// Redux
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(function Navbar(props) {
  const { authenticated } = props;
  return (
    <AppBar position="sticky">
      <Grid container justify="center">
        <Toolbar>
          {authenticated ? (
            <>
              <Tooltip title="Write a post" placement="top">
                <IconButton>
                  <AddIcon style={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              <Link to="/">
                <Tooltip title="Home" placement="top">
                  <IconButton>
                    <HomeIcon style={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </Link>
              <Tooltip title="Notifications" placement="top">
                <IconButton>
                  <Notifications style={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            //////////// Not Authenticated
            <>
              <Button color="inherit" component={Link} to="/">
                <Typography>Home</Typography>
              </Button>
              <Button color="inherit" component={Link} to="/login">
                <Typography>login</Typography>
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                <Typography>signup</Typography>
              </Button>
            </>
          )}
        </Toolbar>
      </Grid>
    </AppBar>
  );
});
