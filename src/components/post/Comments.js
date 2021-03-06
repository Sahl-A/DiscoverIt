import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadIt,
  commentImage: {
    maxWidth: "100%",
    height: 70,
    minWidth: 70,
    objectFit: "cover",
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      minWidth: 50,
      height: 50,
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: 40,
      height: 40,
    },
  },
  commentData: {
    marginLeft: 20,
  },
}));

export default function Comments(props) {
  const classes = useStyles();
  const { comments } = props;
  return (
    <Grid container>
      {comments?.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={2} style={{ marginRight: "-1rem" }}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item xs={10}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      color="textSecondary"
                    >
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />

                    <Typography variabnt="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
}
