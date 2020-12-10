import React, { useEffect, useState } from "react";

import axios from "axios";

import Scream from "../components/Scream";

//MUI
import Grid from "@material-ui/core/Grid";
// import { makeStyles } from "@material-ui/core/styles";


/* const useStyles = makeStyles({
  card: {},
}); */

export default function Home() {
//   const classes = useStyles;
  ////////// Hoooooooooooooks //////////////

  ///////// useState
  const [screams, setScreams] = useState(null);

  ///////// useEffect
  useEffect(() => {
    (async () => {
      const fetchedData = await axios.get("/screams");
      const data = fetchedData.data.screams;
      setScreams(data);
    })();
  }, [screams]);

  ///////// Rendered Variables
  const screamsMarkup = screams ? (
    screams.map((scream) => <Scream key={scream._id} scream={scream} />)
  ) : (
    <p>Loading.....</p>
  );

  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        Profile...
      </Grid>
    </Grid>
  );
}
