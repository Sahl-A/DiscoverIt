import React, { useEffect } from "react";

import Post from "../components/post/Post";
import Profile from '../components/profile/Profile'
import PostSkeleton from '../utils/PostSkeleton'

//MUI
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from 'react-redux';
import {getAllPosts} from '../redux/actions/dataActions'

const mapStateToProps = (state) => ({
  posts: state.data.posts
})

const mapDispatchToProps = {
  getAllPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(function Home(props) {
  const {posts, getAllPosts} = props
  ////////// Hoooooooooooooks //////////////

  ///////// useEffect
  useEffect(() => {
    (async () => {
      getAllPosts()
    })();
  }, [getAllPosts]);

  ///////// Rendered Variables
  const postsMarkup = posts[0] ? (
    posts.map((post) => <Post key={post._id} post={post} />)
  ) : (
    <PostSkeleton />
  );

  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {postsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile/>
      </Grid>
    </Grid>
  );
})
