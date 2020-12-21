import React, { useState } from "react";
// MUI Stuff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deletePost } from '../../redux/actions/dataActions';

const useStyles = makeStyles({
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "3%",
  },
});

export default connect(null, { deletePost })(function DeletePost(props) {
  const classes = useStyles();

  const { deletePost, postId } = props;

  //////// HOOOOOOOOKS /////////
  //////// useState
  const [openDialog, setOpenDialog] = useState(false);

  //////// Functions /////////
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleDeletePost = () => {
    deletePost(postId);
    setOpenDialog(false);
  };

  return (
    <>
      <Tooltip
        title="Delete Post"
        placement="top"
        onClick={handleDialogOpen}
        className={classes.deleteButton}
      >
        <IconButton>
          <DeleteOutline color="secondary" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
