import { useQuery } from "@apollo/client";
import { Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import AppCard from "../components/AppCard";
import styles from "../styles/Home.module.css";
import { PastLaunchesListDocument } from "./api/spacex-graphql.services";
const Home: NextPage = () => {
  const { data, loading, error } = useQuery(PastLaunchesListDocument, {
    variables: { limit: 30 },
  });
  const router = useRouter();

  let launchesGrid = null;
  if (data && data.launchesPast) {
    const launches = data.launchesPast.map((pastLaunch: any) => {
      const flickrImage =
        pastLaunch.links["flickr_images"].length > 0
          ? pastLaunch.links["flickr_images"][0]
          : "https://iili.io/WhzCkN.jpg";
      return (
        <Grid item xs={12} md={4} key={pastLaunch.id}>
          <Link href={`/launches/${pastLaunch.id}`}>
            <a>
              <AppCard
                missionName={pastLaunch["mission_name"]}
                image={flickrImage}
                smallPatchImage={pastLaunch.links["mission_patch_small"]}
                launchDate={pastLaunch["launch_date_utc"]}
                rocketName={pastLaunch.rocket["rocket_name"]}
              />
            </a>
          </Link>
        </Grid>
      );
    });

    launchesGrid = (
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {launches}
      </Grid>
    );
  }

  return (
    <Container className={styles.container}>
      {loading ? <div> loading ... </div> : launchesGrid}
    </Container>
  );
};

export default Home;
