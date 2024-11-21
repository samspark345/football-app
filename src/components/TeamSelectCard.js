import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const TeamSelectCard = ({ logo, name, founded, city, type, id, onClick, addButtonFunction }) => {

  const createObject = () => {
    const obj = {
      name, // Always included
      ...(id !== undefined && { id }),
      ...(logo !== undefined && { logo }), // Added only if `age` is not undefined
      ...(city !== undefined && { city }), // Added only if `city` is not undefined
      ...(type !== undefined && { type }), 
      ...(founded !== undefined && { founded }), 
    };
  
    return obj;
  };
  
  return (
    <Card sx={{ maxWidth: 345, margin: "10px" }} onClick={onClick}>
      {logo && (
        <LazyLoadImage
          alt={name}
          src={logo} // Use the flag URL
          effect="blur" // Blur effect while loading
          width="100%"
          height="200"
        />
      )}
      <CardContent>
        {name && (
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        )}

        {type && (
          <Typography gutterBottom variant="h6" component="div">
            {type}
          </Typography>
        )}


        {founded && (
          <Typography variant="body2" color="text.secondary">
            <strong>Founded:</strong> {founded}
          </Typography>
        )}
        {city && (
          <Typography variant="body2" color="text.secondary">
            <strong>City:</strong> {city}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {addButtonFunction && <Button size="small" onClick={() => {addButtonFunction(createObject())}}> add </Button>}
      </CardActions>
    </Card>
  );
};

export default TeamSelectCard;
