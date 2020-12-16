import React, { useState } from "react";
// Reudx
import { connect } from "react-redux";
import { postPost } from "../redux/actions/dataActions";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadIt,
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10,
  },
  progressSpinner: {
    position: "absolute",
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
  },
}));

export const PostPost = (props) => {
  const classes = useStyles();
  const {
    postPost,
    UI: { loading },
  } = props;

  /////// Hooks ///////
  /////////////////////
  /////// useState
  const [openDialog, setOpenDialog] = useState(false);
  const [postBody, setPostBody] = useState("");
  const [errors, setErrors] = useState(false);

  /////// Functions ///////
  ////////////////////////
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrors(false);
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    // Send the ajax request to dataActions
    await postPost({ body: postBody });
    setOpenDialog(false);
  };
  const handleInputChange = (e) => {
    // Handle the validation of the post
    setErrors(e.target.value === "");
    setPostBody(e.target.value);
  };
  return (
    <>
      <Tooltip
        title="Write a post"
        placement="bottom"
        onClick={handleOpenDialog}
      >
        <IconButton>
          <AddIcon style={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <Tooltip
          title="Close"
          placement="top"
          onClick={handleCloseDialog}
          className={classes.closeButton}
        >
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Tooltip>
        <DialogTitle>Share a new post</DialogTitle>
        <DialogContent>
          <form onSubmit={handlePostSubmit}>
            <TextField
              name="body"
              type="text"
              label="POST!!"
              multiline
              rows="3"
              placeholder="What's in your mind now!"
              error={errors}
              helperText={errors ? "The post cannot be empty.." : null}
              className={classes.textField}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={postBody === "" || errors || loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapDispatchToProps = { postPost };

export default connect(mapStateToProps, mapDispatchToProps)(PostPost);
