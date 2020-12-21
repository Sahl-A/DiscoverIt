import React, { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI
import Dialog from "@material-ui/core/Dialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { connect } from "react-redux";
import { getAPost } from "../../redux/actions/dataActions";
// Components
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadIt,
  profileImage: {
    minwidth: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      minWidth: 70,
      height: 70,
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: 50,
      height: 50,
    },
  },

  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    color: theme.palette.text.secondary,
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
}));

export const PostDialog = (props) => {
  const classes = useStyles();
  const {
    UI: { loading },
    post: {
      createdAt,
      userImage,
      userHandle,
      body,
      likeCount,
      commentCount,
      comments,
    },
    postId,
    getAPost,
  } = props;

  //////// Hooooks ////////
  //////// useState
  const [openDialog, setOpenDialog] = useState(false);

  //////// Functions ////////
  const handleOpenDialog = () => {
    getAPost(postId);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //////// Markup ////////
  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container>
      <Grid item sm={3}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={9}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton postId={postId} likeCount={likeCount} />
        <Tooltip title="comments" placement="bottom">
          <IconButton>
            <ChatIcon color="primary" />
          </IconButton>
        </Tooltip>
        <span>{commentCount} Comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm postId={postId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <>
      {/* Expand button */}
      <Tooltip
        arrow
        title="See the full post"
        placement="bottom"
        onClick={handleOpenDialog}
      >
        <IconButton>
          <UnfoldMore color={"primary"} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        {/* Close button */}
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
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  post: state.data.post,
});

const mapDispatchToProps = {
  getAPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDialog);
