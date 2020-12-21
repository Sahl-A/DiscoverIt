import React from "react";
// MUI
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";

const ScreamSkeleton = () => {
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Grid container spacing="2" style={{ marginBottom: "1rem" }} key={index}>
      <Grid item>
        <Skeleton variant="circle" width={70} height={70} />
      </Grid>
      <Grid item>
        <Grid container>
          <Skeleton variant="text" width={60} height={25} />
          <Skeleton
            style={{ margin: ".7rem 0 0 .3rem" }}
            variant="text"
            width={30}
            height={10}
          />
        </Grid>
        <Grid item>
          <Skeleton variant="rect" width={400} height={90} />
          {/* <Skeleton variant="rect" width={300} height={30} /> */}
        </Grid>
      </Grid>
    </Grid>
  ));

  return content;
};

export default ScreamSkeleton;
