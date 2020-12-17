import React from "react";
// MUI
import Skeleton from "@material-ui/lab/Skeleton";

const ScreamSkeleton = () => {
  const content = Array.from({ length: 5 }).map((item, index) => (
    <div style={{ marginBottom: "1rem" }} key={index}>
      <Skeleton variant="text" width={400} />
      <Skeleton variant="circle" width={80} height={80} />
      <Skeleton variant="rect" width={400} height={118} />
    </div>
  ));

  return content;
};

export default ScreamSkeleton;
