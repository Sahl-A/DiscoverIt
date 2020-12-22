import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useTheme } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";

// Components
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginBottom: ".5rem",
    position: "relative",
  },
  content: {
    padding: 20,
    marginTop: "-.8rem",
    [theme.breakpoints.down("xs")]: {
      padding: "20px 10px 20px 10px",
    },
  },
  image: {
    margin: "5px 0 0 5px",
    minWidth: 80,
    height: 80,
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      minWidth: 70,
      height: 70,
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: 50,
      height: 50,
    },
  },
  postBody: {
    maxWidth: "35rem",
    maxHeight: "10rem",
    overflowY: (props) => {
      let scroll;
      scroll = props.post.body.split(" ").length > 20 ? "scroll" : "none";
      return scroll;
    },
  },
  commentsCount: {
    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem",
    },
  },
}));

// Deal with time
dayjs.extend(relativeTime);

const mapStateToProps = (state) => ({
  posts: state.data.posts,
  user: state.user,
});

export default connect(mapStateToProps)(function Post(props) {
  const classes = useStyles(props);
  const {
    post: {
      _id,
      body,
      userImage,
      createdAt,
      userHandle,
      likeCount,
      commentCount,
    },
    user: { credentials },
  } = props;

  /////// Hooks ///////
  // const theme = useTheme();
  // const matchesSM = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        className={classes.image}
        title="Human face"
      />
      <CardContent className={classes.content}>
        {credentials.handle === userHandle ? <DeletePost postId={_id} /> : null}
        <Typography
          component={Link}
          to={`/users/${userHandle}`}
          gutterBottom
          variant="h5"
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography display="inline" variant="caption" color="textSecondary">
          {"   "}
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography
          className={classes.postBody}
          style={{ marginTop: ".5rem" }}
          variant="body1"
        >
          {body}
        </Typography>
        <LikeButton postId={_id} likeCount={likeCount} />
        <Tooltip
          style={{ marginLeft: ".3rem" }}
          title="comments"
          placement="bottom"
        >
          <IconButton>
            <ChatIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Typography display="inline" className={classes.commentsCount}>
          {commentCount} Comments{" "}
        </Typography>
        <PostDialog postId={_id} />
      </CardContent>
    </Card>
  );
});
