import { 
  Button, 
  Center, 
  Flex, 
  Stack, 
  Title 
} from "@mantine/core"; // Mantine components for UI layout and styling
import './teamCard.css'; // CSS for custom styling

import TeamCard from "./TeamCard"; // Component for displaying individual team cards
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { Snackbar, Typography } from "@mui/material"; // Material-UI components for notifications and typography
import { useEffect, useState } from "react"; // React hooks for state and lifecycle management
import ApiService from "../api/api"; // Custom API service for interacting with the backend

const MyTeams = () => {
  const navigate = useNavigate(); // Navigation hook for page redirection
  const apiService = new ApiService(); // Instance of the API service to interact with the backend
  const [teams, setTeams] = useState([]); // State to store the list of teams
  const [isTeamRefreshed, setIsTeamRefreshed] = useState(false); // Flag to track if teams need to be refreshed
  const [message, setMessage] = useState(null); // State to store feedback messages
  const [notifyUser, setNotifyUser] = useState(false); // Flag to control Snackbar visibility

  // Fetch teams from the database
  const getTeams = async () => {
    setTeams(await apiService.getTeamsInDatabase()); // Call API to retrieve teams
    setIsTeamRefreshed(true); // Mark teams as refreshed
  };

  // Trigger fetching teams when the component loads or `isTeamRefreshed` changes
  useEffect(() => {
    if (!isTeamRefreshed) {
      getTeams();
    }
  }, [isTeamRefreshed]);

  // Delete a team from the database and show feedback
  const deleteTeam = async (team_id) => {
    setMessage(await apiService.deleteTeamFromDatabase(team_id)); // Call API to delete the team and set the response message
    setNotifyUser(true); // Show the Snackbar notification
  };

  // Close the Snackbar and clear the message
  const handleClose = () => {
    setNotifyUser(false); // Hide the Snackbar
    setMessage(null); // Clear the message
  };

  // Handle updates to the message state
  useEffect(() => {
    if (message) {
      setNotifyUser(true); // Show the Snackbar if there is a message
      // Refresh teams if the message indicates a successful deletion
      if (message.includes("success")) {
        setIsTeamRefreshed(false);
      }
    }
  }, [message]);

  // Render the list of teams or a fallback message if no teams exist
  const renderCards = () => {
    console.log(teams); // Debugging log to inspect the `teams` array
    return teams == undefined || teams == null || teams.length < 1 ? (
      <Typography>No Teams have been added</Typography> // Display message if no teams are found
    ) : (
      Array.isArray(teams) &&
      teams.map((team) => (
        <TeamCard
          name={team.name} // Team name
          logo={team.logo} // Team logo
          id={team.id} // Team ID
          founded={team.founded} // Year founded
          city={team.city} // Team's city
          deleteFunction={() => {
            deleteTeam(team.id); // Callback to delete the team
          }}
          seeDetailsFunction={() => {
            navigate(`/myteams/team/${team.id}`); // Navigate to the team details page
          }}
        />
      ))
    );
  };

  return (
    <>
      {/* Page layout */}
      <Flex direction="column">
        <Center mt="100px">
          <Stack align="center">
            {/* Page title */}
            <Title order={1} fz="60px">
              My Teams
            </Title>
            {/* Add team button */}
            <Flex direction="row">
              <Button color="black" onClick={() => navigate('/teamSelect')}>
                Add team
              </Button>
            </Flex>
          </Stack>
        </Center>
      </Flex>

      {/* Container for rendering team cards */}
      <div class="container">{renderCards()}</div>

      {/* Snackbar for displaying feedback messages */}
      <Snackbar
        open={notifyUser} // Visibility control
        autoHideDuration={6000} // Duration before the Snackbar automatically closes
        onClose={handleClose} // Callback to close the Snackbar
        message={message} // Message to display
      />
    </>
  );
};

export default MyTeams;
