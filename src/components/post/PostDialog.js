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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
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
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: 90,
      height: 90,
    },
    [theme.breakpoints.down("xs")]: {
      width: 50,
      height: 50,
    },
  },

  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "85%",
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
  commentsCount: {
    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem",
    },
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
  const theme = useTheme();
  const belowXS = useMediaQuery(theme.breakpoints.down("xs"));
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
      <Grid item xs={3} sm={3}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item xs={9} sm={9}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <Typography display="block" variant="caption" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        {!belowXS ? (
          <>
            <Typography variant="body1">{body}</Typography>
            <LikeButton postId={postId} likeCount={likeCount} />
            <Tooltip title="comments" placement="bottom">
              <IconButton>
                <ChatIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Typography display="inline" className={classes.commentsCount}>
              {commentCount} Comments
            </Typography>
          </>
        ) : null}
      </Grid>
      {belowXS ? (
        <Grid container direction='column'>
          <Grid item style={{marginTop: '1rem'}} >
            <Typography variant="body1">{body}</Typography>
          </Grid>
          <Grid item>
            <LikeButton postId={postId} likeCount={likeCount} />
            <Tooltip title="comments" placement="bottom">
              <IconButton>
                <ChatIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Typography display="inline" className={classes.commentsCount}>
              {commentCount} Comments
            </Typography>
          </Grid>
        </Grid>
      ) : null}
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
