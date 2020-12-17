import React, { useState, useEffect } from "react";

// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";

// Redux stuff
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => {
  return { ...theme.spreadIt, button: { float: "right" } };
});

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

const mapActionsToProps = { editUserDetails };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(function Login(props) {
  const classes = useStyles();
  const { credentials, editUserDetails } = props;

  ///////// Hooooooooooooooooks /////////
  ///////// useState
  const [openDialog, setOpenDialog] = useState(false);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  ///////// useEffect
  useEffect(() => {
    // Set the current profile details in the state
    setBio(credentials.bio ? credentials.bio : "");
    setLocation(credentials.location ? credentials.location : "");
    setWebsite(credentials.website ? credentials.website : "");
  }, [credentials]);
  ///////// Functions /////////
  // When open the dialog to edit the profile details
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    switch (e.target.name) {
      case "bio":
        setBio(e.target.value);
        break;

      case "website":
        setWebsite(e.target.value);
        break;

      case "location":
        setLocation(e.target.value);
        break;

      default:
        break;
    }
  };

  // Handle when submitting the data
  const handleSubmit = () => {
    editUserDetails({ bio, website, location });
  };

  ///////// Markup /////////

  return (
    <>
      <Tooltip title="Edit details" placement="top">
        <IconButton onClick={handleDialogOpen} className={classes.button}>
          <EditIcon color="primary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="edit_profile_details-dialog-title"
        aria-describedby="edit_profile_details-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              rowsMax="3"
              placeholder="Summary about yourself"
              className={classes.textField}
              value={bio}
              onChange={handleInputChange}
              fullWidth
            />

            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your website"
              className={classes.textField}
              value={website}
              onChange={handleInputChange}
              fullWidth
            />

            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Your current location"
              className={classes.textField}
              value={location}
              onChange={handleInputChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
