import React, { useEffect } from "react";

import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";
import PostSkeleton from "../utils/PostSkeleton";

//MUI
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
import { getAllPosts } from "../redux/actions/dataActions";

const mapStateToProps = (state) => ({
  posts: state.data.posts,
});

const mapDispatchToProps = {
  getAllPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Home(props) {
  const { posts, getAllPosts } = props;
  ////////// Hoooooooooooooks //////////////
  const theme = useTheme();
  const belowXS = useMediaQuery(theme.breakpoints.down("xs"));
  ///////// useEffect
  useEffect(() => {
    (async () => {
      getAllPosts();
    })();
  }, [getAllPosts]);

  ///////// Rendered Variables
  const postsMarkup = posts[0] ? (
    posts.map((post) => <Post key={post._id} post={post} />)
  ) : (
    <PostSkeleton />
  );

  return (
    <Grid container spacing={6} direction={!belowXS? 'row': 'column-reverse'}>
      <Grid item sm={7} md={8} xs={12}>
        {postsMarkup}
      </Grid>
      <Grid item sm={5} md={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
});
