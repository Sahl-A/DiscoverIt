import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  card: { display: "flex", marginBottom: "1rem" },
  content: { padding: 20 },
  image: { minWidth: 200 },
});

// Deal with time
dayjs.extend(relativeTime);

export default function Scream(props) {
  const classes = useStyles();
  const {
    scream: {
      _id,
      body,
      userImage,
      createdAt,
      userHandle,
      commentCount,
      likeCount,
    },
  } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        className={classes.image}
        title="Human face"
      />
      <CardContent className={classes.content}>
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
      </CardContent>
    </Card>
  );
}
