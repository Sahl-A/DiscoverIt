import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// MUI

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import StarEmptyIcon from "@material-ui/icons/StarOutline";

// Redux
import { connect } from "react-redux";
import { likeUnlike } from "../../redux/actions/dataActions";

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
  const {
    postId,
    likeCount,
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
    setLikesCountUI(likeCount);
  }, [likes, likeCount]);
  /////// Functions ///////
  /////////////////////
  // Check if the post is liked by comparing the scream id with the one in the likes array fetched when user is logged
  const isPostLiked =
    likesArrUI.length && likesArrUI.find((item) => item.screamId === postId);
  // When the user likes a post
  const likePost = () => {
    setLikesCountUI(likesCountUI + 1);
    setLikesArrUI([
      ...likesArrUI,
      {
        userHandle: credentials.userHandle,
        screamId: postId,
      },
    ]);
    likeUnlike(postId, "like");
  };
  // When the user unlikes a post
  const unLikePost = () => {
    setLikesCountUI(likesCountUI - 1);
    setLikesArrUI(likesArrUI.filter((like) => like.screamId !== postId));
    likeUnlike(postId, "unlike");
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
    <>
      {likeButton}
      <span>{likesCountUI} Likes</span>
    </>
  );
});
