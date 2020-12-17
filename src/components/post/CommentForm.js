import React, { useState } from "react";
// Redux
import { connect } from "react-redux";
import { addComment } from "../../redux/actions/dataActions";
// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadIt,
}));

export const CommentForm = (props) => {
  const { addComment, postId, authenticated } = props;

  /////// HOOOOKS ///////
  ///////////////////////
  const classes = useStyles();

  /////// useState
  const [commentBody, setCommentBody] = useState("");

  /////// Functions ///////
  /////////////////////////
  const handleInputChange = (e) => {
    setCommentBody(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(postId, { body: commentBody });
    setCommentBody("");
  };

  /////// Markup ///////
  //////////////////////
  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Add a comment..."
          value={commentBody}
          onChange={handleInputChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={commentBody === ""}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;

  return commentFormMarkup;
};

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  authenticated: state.user.authenticated,
});

const mapDispatchToProps = {
  addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
