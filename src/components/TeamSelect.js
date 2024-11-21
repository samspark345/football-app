import React, { useEffect, useState } from "react";
import {
  Button,
  Center,
  Container,
  Flex,
  Group,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core"; // Mantine components for UI styling and layout

import TeamCard from "./TeamCard"; // Component for displaying a single team
import TeamSelectCard from "./TeamSelectCard"; // Component for selecting a team, country, or league
import ApiService from "../api/api"; // Custom service for interacting with the backend
import { Snackbar } from "@mui/material"; // Material-UI component for notifications

const TeamSelect = () => {
  // States to manage the view and selected items
  const [viewState, setViewState] = useState("countries"); // Tracks the current view (countries, leagues, or teams)
  const [selectedCountry, setSelectedCountry] = useState(null); // Stores the selected country name
  const [selectedLeague, setSelectedLeague] = useState(null); // Stores the selected league name
  const [selectedLeagueId, setSelectedLeagueId] = useState(null); // Stores the selected league ID

  // States for managing data
  const [countries, setCountries] = useState([]); // List of available countries
  const [leagues, setLeagues] = useState([]); // List of available leagues
  const [teams, setTeams] = useState([]); // List of available teams

  // States for notifications
  const [notifyUser, setNotifyUser] = useState(false); // Controls Snackbar visibility
  const [message, setMessage] = useState(null); // Stores feedback messages for the user

  // Instance of the API service
  const apiService = new ApiService();

  // Fetches the list of countries
  const getCountries = async () => {
    const response = await apiService.retrieveAllCountries();
    console.log("Countries response:", response.response);
    setCountries(Array.isArray(response.response) ? response.response : []);
  };

  // Fetches the leagues for the selected country
  const getLeagues = async () => {
    const response = await apiService.retrieveLeaguesByCountryName(selectedCountry);
    console.log("Leagues response:", response);
    setLeagues(Array.isArray(response.response) ? response.response : []);
  };

  // Fetches the teams for the selected league
  const getTeams = async () => {
    const response = await apiService.retrieveTeamInfo(selectedLeagueId, "2024");
    console.log("Teams response:", response);
    setTeams(Array.isArray(response.response) ? response.response : []);
  };

  // Closes the Snackbar notification
  const handleClose = () => {
    setNotifyUser(false); // Hide the Snackbar
    setMessage(null); // Clear the message
  };

  // Adds a team to the database
  const addTeam = async (team_info) => {
    setMessage(await apiService.addTeamInDatabase(team_info)); // Show feedback from the API
  };

  // Trigger notification visibility when a message is set
  useEffect(() => {
    if (message) setNotifyUser(true);
  }, [message]);

  // Fetches data based on the current view state
  useEffect(() => {
    if (viewState === "countries") {
      getCountries(); // Load countries when in the "countries" view
    } else if (viewState === "leagues") {
      getLeagues(); // Load leagues when in the "leagues" view
    } else if (viewState === "teams") {
      getTeams(); // Load teams when in the "teams" view
    }
  }, [viewState]);

  // Renders cards based on the current view state
  const renderCards = () => {
    switch (viewState) {
      case "countries":
        return countries.map((country) => (
          <TeamSelectCard
            key={country.name}
            name={country.name}
            logo={country.flag}
            onClick={() => {
              setSelectedCountry(country.name); // Set the selected country
              setViewState("leagues"); // Move to the "leagues" view
              console.log(country.flag);
            }}
          />
        ));
      case "leagues":
        return leagues.map((league) => {
          return (
            league.league.type !== "Cup" && ( // Exclude leagues of type "Cup"
              <TeamSelectCard
                name={league.league.name}
                type={league.league.type}
                logo={league.league.logo}
                id={league.league.id}
                onClick={() => {
                  setSelectedLeague(league.league.name); // Set the selected league
                  setSelectedLeagueId(league.league.id); // Set the league ID
                  setViewState("teams"); // Move to the "teams" view
                }}
              />
            )
          );
        });
      case "teams":
        return teams.map((team) => (
          <TeamSelectCard
            name={team.team.name}
            logo={team.team.logo}
            id={team.team.id}
            founded={team.team.founded}
            city={team.venue.city}
            addButtonFunction={(team_info) => {
              addTeam(team_info); // Add the team to the database
            }}
            onClick={() => {
              setViewState("teams"); // Stay in the "teams" view
            }}
          />
        ));
      default:
        return null; // Default case returns nothing
    }
  };

  return (
    <Flex direction="column" align="center" mt="50px">
      {/* Page Title */}
      <Title order={1}>Team Select</Title>
      {/* Subtitle dynamically changes based on the view state */}
      <Title order={2} fz="35px" fw="300" c="grey">
        {viewState === "countries" && "Select a Country"}
        {viewState === "leagues" && `Leagues in ${selectedCountry}`}
        {viewState === "teams" && `Teams in ${selectedLeague}`}
      </Title>

      {/* Grid to display cards */}
      <SimpleGrid cols={3} mt="20px">
        {renderCards()}
      </SimpleGrid>

      {/* Back button appears if not in the "countries" view */}
      {viewState !== "countries" && (
        <Button
          mt="20px"
          color="black"
          onClick={() =>
            viewState === "teams"
              ? setViewState("leagues") // Move back to "leagues" view
              : setViewState("countries") // Move back to "countries" view
          }
        >
          Back
        </Button>
      )}

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={notifyUser} // Controls Snackbar visibility
        autoHideDuration={6000} // Snackbar auto-hide duration
        onClose={handleClose} // Close handler for Snackbar
        message={message} // Displays the feedback message
      />
    </Flex>
  );
};

export default TeamSelect;
