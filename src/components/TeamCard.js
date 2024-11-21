import React from "react";
import Card from "@mui/material/Card"; // Material-UI card component for the main container
import CardActions from "@mui/material/CardActions"; // For placing action buttons
import CardContent from "@mui/material/CardContent"; // For displaying the main content of the card
import Button from "@mui/material/Button"; // Material-UI button component for user actions
import Typography from "@mui/material/Typography"; // Material-UI typography for consistent text styling
import { LazyLoadImage } from "react-lazy-load-image-component"; // Library for optimized lazy loading of images
import "react-lazy-load-image-component/src/effects/blur.css"; // CSS for the blur effect during image loading
import ApiService from "../api/api"; // API service for interacting with the backend

// TeamCard component: displays a team's information and provides action buttons
const TeamCard = ({ 
  logo,               // Team's logo URL (optional)
  name,               // Name of the team
  founded,            // Year the team was founded (optional)
  city,               // City of the team (optional)
  type,               // Type of the team (e.g., club, league, country)
  id,                 // Unique identifier for the team
  deleteFunction,     // Callback function to handle team deletion
  seeDetailsFunction  // Callback function to show team details
}) => {
  return (
    // Card component with a maximum width and margin for spacing
    <Card className="item" sx={{ maxWidth: 345, margin: "10px" }}>
      
      {/* Display the team logo only if the `logo` prop is provided */}
      {logo && (
        <LazyLoadImage
          alt={name}       // Fallback text for accessibility if the image doesn't load
          src={logo}       // Source URL for the team logo
          effect="blur"    // Apply a blur effect while the image is loading
          width="100%"     // Stretch the image to fill the card width
          height="200"     // Fixed height to maintain consistent card layout
        />
      )}

      {/* CardContent: container for displaying textual information about the team */}
      <CardContent>
        {/* Display the team's name if provided */}
        {name && (
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        )}

        {/* Display the type of team (e.g., league, country) if provided */}
        {type && (
          <Typography gutterBottom variant="h6" component="div">
            {type}
          </Typography>
        )}

        {/* Display the founding year if `founded` is provided */}
        {founded && (
          <Typography variant="body2" color="text.secondary">
            <strong>Founded:</strong> {founded}
          </Typography>
        )}

        {/* Display the team's city if `city` is provided */}
        {city && (
          <Typography variant="body2" color="text.secondary">
            <strong>City:</strong> {city}
          </Typography>
        )}
      </CardContent>

      {/* CardActions: container for action buttons */}
      <CardActions>
        {/* Button to delete the team, calls the `deleteFunction` prop */}
        <Button size="small" onClick={deleteFunction}> 
          Delete 
        </Button>
        
        {/* Button to see more details about the team, calls the `seeDetailsFunction` prop */}
        <Button size="small" onClick={seeDetailsFunction}> 
          See Details 
        </Button>
      </CardActions>
    </Card>
  );
};

export default TeamCard;
