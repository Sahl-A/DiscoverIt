import React from "react";
import { Link } from "react-router-dom";
import dayJs from "dayjs";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import MuiLink from "@material-ui/core/Link";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Redux stuff
import { connect } from "react-redux";
import { uploadProfilePic, logoutUser } from "../../redux/actions/userActions";
import EditDetails from "./EditDetails";

// Components
import ProfileSkeleton from "../../utils/ProfileSkeleton";

const useStyles = makeStyles((theme) => {
  return {
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 150,
        height: 150,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: theme.palette.primary.main,
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  };
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapActionsToProps = {
  uploadProfilePic,
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(function Login(props) {
  const classes = useStyles();

  let {
    user: {
      loading,
      authenticated,
      credentials: { handle, imageUrl, createdAt, bio, website, location },
    },
    uploadProfilePic,
    logoutUser,
  } = props;

  ///////// Hooooooooooooooooks /////////

  ///////// Functions /////////
  // When changing the image using the input tag
  const handleImageChange = (e) => {
    // Get The image and prepare it in <form> format using formData
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    // Upload the profile pic
    uploadProfilePic(formData);
  };

  // When clicking on the edit button to open the above fn
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  // Logout
  const handleLogout = () => {
    logoutUser();
  };

  ///////// Markup /////////
  const profileMarkup = !loading ? (
    authenticated ? (
      // When user is authenticated
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img
              src={imageUrl[imageUrl.length - 1]}
              alt="profile"
              className="profile-image"
            />
            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <Tooltip title="Edit Profile Picture" placement="top">
              <IconButton onClick={handleEditPicture} className="button">
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
          </div>
          <hr />
          <Grid
            container
            direction="column"
            justify="flex-start"
            className="profile-details"
          >
            <Grid item>
              <MuiLink
                style={{ textAlign: "center" }}
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
            </Grid>
            <Grid item>
              {bio && (
                <Typography variant="body2" align="center">
                  {bio}
                </Typography>
              )}
              <hr />
            </Grid>
            <Grid item>
              {location && (
                <>
                  <LocationOn color="primary" />
                  <span>{location}</span>
                </>
              )}
              <hr />
            </Grid>
            <Grid item>
              {website && (
                <>
                  <LinkIcon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                </>
              )}
              <hr />
            </Grid>
            <Grid item>
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayJs(createdAt).format("MMM YYYY")}</span>
            </Grid>
          </Grid>
          <Tooltip title="Logout" placement="top">
            <IconButton onClick={handleLogout}>
              <KeyboardReturn color="primary" />
            </IconButton>
          </Tooltip>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      // When user is NOT authenticated
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No Profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ color: "white" }}
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );
  return profileMarkup;
});
