import axios from "axios";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

class ApiService {
  api_url = "https://api-football-v1.p.rapidapi.com/v3";

  async fetchUsers() {
    const response = await axios.get("/api/users");
    return response.data;
  }

  async createUser(data) {
    const response = await axios.post("/api/users", data);
    return response.data;
  }

  createOptions(parameters, endpoint) {
    const options = {
      method: "GET",
      url: this.api_url + endpoint,
      params: parameters ? parameters : "",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      },
    };
    return options;
  }

  checkForError(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }

  async callFootballApi(options) {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
      // Need to check the response for error even if it is a 200 status code
    } catch (error) {
      console.error(error);
    }
  }
  async retrievePlayerStatsByTeam(team_id, season_year) {
    let parameters = {
      team: team_id,
      season: season_year,
    };
    const option = this.createOptions(parameters, "/players");
    return await this.callFootballApi(option);
  }

  async retrieveAllCountries() {
    const options = this.createOptions(null, "/countries");
    console.log(options);
    return await this.callFootballApi(options);
  }

  async retrieveTopScorer(teamId, season) {
    const parameters = { team: teamId, season };
    const options = this.createOptions(parameters, "/players");
    const response = await this.callFootballApi(options);

    if (response.response && response.response.length > 0) {
      const players = response.response;
      const topScorer = players.reduce((max, player) => {
        const goals = player.statistics[0]?.goals?.total || 0;
        return goals > (max.goals || 0)
          ? { name: player.player.name, goals, photo: player.player.photo }
          : max;
      }, {});

      return topScorer;
    }

    return null;
  }

  async retrieveAllLeagues() {
    const options = this.createOptions(null, "/leagues");
    return this.callFootballApi(options);
  }

  async retrieveAllSeasons() {
    const options = this.createOptions(null, "/seasons");
    return this.callFootballApi(options);
  }

  async retrieveTeamInfo(country) {
    let parameters = {
      id: country,
    };
    const options = this.createOptions(parameters, "/teams");
    return this.callFootballApi(options);
  }

  async retrieveTeamInfo(league, season) {
    let parameters = {
      league: league,
      season: season,
    };
    const options = this.createOptions(parameters, "/teams");
    return this.callFootballApi(options);
  }

  async retrieveTeamInfoById(teamId) {
    let parameters = {
      id: teamId,
    };
    const options = this.createOptions(parameters, "/teams");
    return this.callFootballApi(options);
  }

  async retrieveTeamFixtures(teamId, seasonYear) {
    let parameters = {
      team: teamId,
      season: seasonYear,
    };
    const options = this.createOptions(parameters, "/fixtures");
    return this.callFootballApi(options);
  }

  async retrieveLeaguesByCountryName(country_name) {
    let parameters = {
      country: country_name,
    };
    const options = this.createOptions(parameters, "/leagues");
    return this.callFootballApi(options);
  }

  async retrieveLeaguesByTeamId(team_id) {
    let parameters = {
      team: team_id,
    };
    const options = this.createOptions(parameters, "/leagues");
    return this.callFootballApi(options);
  }

  async retrieveTeamStatsByLeague(league_id, team_id, season) {
    let parameters = {
      league: league_id,
      season: season,
      team: team_id,
    };
    const options = this.createOptions(parameters, "/teams/statistics");
    return this.callFootballApi(options);
  }

  async populateCountriesInDatabase() {
    const countries = await this.retrieveAllCountries();
    const db = getFirestore();
    console.log(countries);
    const countriesRef = doc(db, "groups", "countries");
    setDoc(countriesRef, countries);
  }

  async getTeamsInDatabase() {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const savedTeamsRef = doc(db, "saved_teams", user.uid);

    try {
      // Retrieve the current document data
      const docSnapshot = await getDoc(savedTeamsRef);

      if (docSnapshot.exists()) {
        // Get the existing data
        const currentData = docSnapshot.data();
        console.log(currentData.team_Info);

        return currentData.team_Info;
      } else {
        // If no document exists, create a new one with the team_Info list
        return [];
      }
    } catch (error) {
      console.error("Error retrieving teams:", error);
    }
  }

  async addTeamInDatabase(team_Info) {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated");
      return "Error user not authenticated";
    }

    const savedTeamsRef = doc(db, "saved_teams", user.uid);

    try {
      // Retrieve the current document data
      const docSnapshot = await getDoc(savedTeamsRef);

      if (docSnapshot.exists()) {
        // Get the existing data
        const currentData = docSnapshot.data();
        const currentTeams = currentData.team_Info || []; // Default to an empty array

        // Check if the team already exists in the list
        if (!currentTeams.some((team) => team.id === team_Info.id)) {
          // Add the new team to the list
          currentTeams.push(team_Info);
        } else {
          console.log("Team already exists in the saved list.");
        }

        // Update the document
        await setDoc(savedTeamsRef, { team_Info: currentTeams });
      } else {
        // If no document exists, create a new one with the team_Info list
        await setDoc(savedTeamsRef, { team_Info: [team_Info] });
      }

      return "Team successfully added.";
    } catch (error) {
      console.error("Error adding team:", error);
      return "Error adding team";
    }
  }

  async deleteTeamFromDatabase(teamId) {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("User not authenticated");
      return "Error: User not authenticated";
    }

    const savedTeamsRef = doc(db, "saved_teams", user.uid);

    try {
      // Retrieve the current document data
      const docSnapshot = await getDoc(savedTeamsRef);

      if (docSnapshot.exists()) {
        // Get the existing data
        const currentData = docSnapshot.data();
        const currentTeams = currentData.team_Info || []; // Default to an empty array

        // Filter out the team to be deleted
        const updatedTeams = currentTeams.filter((team) => team.id !== teamId);

        // Update the document with the updated team list
        await setDoc(savedTeamsRef, { team_Info: updatedTeams });

        return "Team successfully deleted.";
      } else {
        console.log("No saved teams found for the user.");
        return "No teams to delete.";
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      return "Error deleting team.";
    }
  }
}

export default ApiService;
