import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

type CardProps = {
  smallPatchImage: String;
  missionName: String;
  rocketName: String;
  launchDate: String;
  image: String;
};

export default function AppCard(props: CardProps) {
  const { smallPatchImage, image, launchDate, rocketName, missionName } = props;
  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardContent>
        <img src={smallPatchImage} width="35px" alt={missionName} />
        <Typography
          variant="body"
          sx={{
            display: "inline-block",
            marginLeft: "5px",
          }}
          align="justify"
        >
          {missionName}
        </Typography>
        <Typography variant="subtitle2" align="justify">
          {rocketName} - launched {launchDate}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="300"
        width="300"
        image={image}
        alt={missionName}
      />
    </Card>
  );
}
