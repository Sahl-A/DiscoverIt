import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Post from "../components/post/Post";
import StaticProfile from "../components/profile/StaticProfile";

import PostSkeleton from "../utils/PostSkeleton";
import ProfileSkeleton from "../utils/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

export const User = (props) => {
  const {
    match,
    data: { posts, loading },
    getUserData,
  } = props;
  ///// HOOOOKS /////
  ///// useState
  const [profile, setProfile] = useState(null);
  // const [screamIdParam, setScreamIdParam] = useState(null);

  ///// useEffect
  useEffect(() => {
    const handle = match.params.handle;
    // const postId = match.params.postId;

    // if (postId) setScreamIdParam(postId);

    getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [match.params.handle, getUserData]);

  const postsMarkup = loading ? (
    <PostSkeleton />
  ) : !posts ? (
    <p>No posts from this user</p>
  ) : (
    posts.map((post) => <Post key={post._id} post={post} />)
  );

  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {postsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
