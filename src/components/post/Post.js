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

// Redux
import { connect } from "react-redux";

// Components
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";

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

export default connect(mapStateToProps)(function Post(props) {
  const classes = useStyles();
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

  /////// STATE ///////
  /////////////////////
  /////// useState

  /////// Functions ///////
  /////////////////////

  /////// Markup ///////
  /////////////////////

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
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton postId={_id} likeCount={likeCount} />
        <Tooltip title="comments" placement="bottom">
          <IconButton>
            <ChatIcon color="primary" />
          </IconButton>
        </Tooltip>
        <span>{commentCount} Comments</span>
        <PostDialog postId={_id} />
      </CardContent>
    </Card>
  );
});
