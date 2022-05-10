import * as React from "react";
import { useRouter } from "next/router";
import { LaunchDetailsDocument } from "../api/spacex-graphql.services";
import { useQuery } from "@apollo/client";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

export default function LaunchDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(LaunchDetailsDocument, {
    variables: { id },
  });

  let body = <div>Loading.. </div>;
  if (!loading) {
    const launch = data.launch;
    console.log(launch);
    const patchImage = launch.links["mission_patch"]
      ? launch.link["mission_patch"]
      : "https://iili.io/WhzCkN.jpg";
    body = (
      <>
        <h1 style={{ textAlign: "center" }}>{launch["mission_name"]}</h1>
        <div>{launch.details}</div>
        <div
          style={{
            textAlign: "center",
            marginTop: "3rem",
            marginBottom: "6rem",
          }}
        >
          <img width="600px" src={patchImage} alt={launch["mission_name"]} />
        </div>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          {launch.links["flickr_images"].map((link: any) => {
            return (
              <Grid key={link} item xs={12} md={4}>
                <img width="300px" src={link} alt="launch image" />
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
  return <Container>{body}</Container>;
}
