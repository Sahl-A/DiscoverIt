import React from "react";
// MUI
import Skeleton from "@material-ui/lab/Skeleton";

const ProfileSkeleton = () => {
  return (
    <div style={{margin: 'auto'}}>
      <Skeleton variant="circle" width={80} height={80} />
      <Skeleton variant="text" width={200} />
      <Skeleton variant="text" width={130} />
      <Skeleton variant="text" width={180} />
      <Skeleton variant="rect" width={200} height={118} />
    </div>
  );
};

export default ProfileSkeleton;
