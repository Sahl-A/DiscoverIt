import React, { useState, useEffect } from "react";
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
import StarIcon from "@material-ui/icons/Star";
import StarEmptyIcon from "@material-ui/icons/StarOutline";

// Redux
import { connect } from "react-redux";
import { likeUnlike } from "../redux/actions/dataActions";

// Components
import DeletePost from "./DeletePost";

const useStyles = makeStyles({
  card: { display: "flex", marginBottom: "1rem", position: "relative" },
  content: { padding: 20 },
  image: { minWidth: 200 },
});

// Deal with time
dayjs.extend(relativeTime);

const mapStateToProps = (state) => ({
  posts: state.data.posts,
  user: state.user,
});

const mapDispatchToProps = {
  likeUnlike,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Post(props) {
  const classes = useStyles();
  const {
    post: {
      _id,
      body,
      userImage,
      createdAt,
      userHandle,
      commentCount,
      likeCount,
    },
    user: { authenticated, likes, credentials },
    likeUnlike,
  } = props;

  /////// STATE ///////
  /////////////////////
  /////// useState
  // The below state to change the likes count immedietly in the UI.
  // In background, we send our http request to modify the DB
  const [likesCountUI, setLikesCountUI] = useState(likeCount);
  // Same for the likes array fetched from state above
  const [likesArrUI, setLikesArrUI] = useState([]);

  /////// useEffect
  useEffect(() => {
    setLikesArrUI(likes);
  }, [likes]);

  /////// Functions ///////
  /////////////////////
  // Check if the post is liked by comparing the scream id with the one in the likes array fetched when user is logged
  const isPostLiked =
    likesArrUI.length && likesArrUI.find((item) => item.screamId === _id);
  // When the user likes a post
  const likePost = () => {
    setLikesCountUI(likesCountUI + 1);
    setLikesArrUI([
      ...likesArrUI,
      {
        userHandle: credentials.userHandle,
        screamId: _id,
      },
    ]);
    likeUnlike(_id, "like");
  };
  // When the user unlikes a post
  const unLikePost = () => {
    setLikesCountUI(likesCountUI - 1);
    setLikesArrUI(likesArrUI.filter((like) => like.screamId !== _id));
    likeUnlike(_id, "unlike");
  };

  /////// Markup ///////
  /////////////////////
  const likeButton = !authenticated ? (
    // When not Authenticated
    <Tooltip title="Like" placement="bottom">
      <IconButton>
        <Link to="/login">
          <StarEmptyIcon color="primary" />
        </Link>
      </IconButton>
    </Tooltip>
  ) : // When Authenticated
  // Check if the post is liked by the current user
  isPostLiked ? (
    // Post is Liked by the current user
    <Tooltip title="Unlike" placement="bottom" onClick={unLikePost}>
      <IconButton>
        <StarIcon color="primary" />
      </IconButton>
    </Tooltip>
  ) : (
    // Post is not Liked by the current user
    <Tooltip title="Like" placement="bottom" onClick={likePost}>
      <IconButton>
        <StarEmptyIcon color="primary" />
      </IconButton>
    </Tooltip>
  );
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
          to={`/users/${userHandle.replace(/ /g, "-")}`}
          gutterBottom
          variant="h5"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {likeButton}
        <span>{likesCountUI} Likes</span>
        <Tooltip title="comments" placement="bottom">
          <IconButton>
            <ChatIcon color="primary" />
          </IconButton>
        </Tooltip>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
});
