import axios from 'axios';

class ApiService {
  static api_url = 'https://api-football-v1.p.rapidapi.com/v3';

  async fetchUsers() {
    const response = await axios.get('/api/users');
    return response.data;
  }

  async createUser(data) {
    const response = await axios.post('/api/users', data);
    return response.data;
  }


  async retrievePlayerStatsByTeam(team_id, season_year) {
    const options = {
      method: 'GET',
      url: api_url + '/players',
      params: {
        team: team_id,
        season: season_year
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async retrieveAllCountries() {
    const options = {
      method: 'GET',
      url: api_url + '/countries',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async retrieveAllLeagues() {
    const options = {
      method: 'GET',
      url: api_url + '/leagues',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async retrieveAllSeasons() {
    const options = {
      method: 'GET',
      url: api_url + '/seasons',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  async retrieveTeamInfo(country) {
    const options = {
      method: 'GET',
      url: api_url + '/teams',
      params: {
        id: team_id
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async retrieveLeaguesByTeamId(team_id) {
    const options = {
      method: 'GET',
      url: api_url + '/leagues',
      params: {
        team: team_id,
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async retrieveTeamStatsByLeague(league_id, team_id, season) {
    const options = {
      method: 'GET',
      url: api_url + '/teams/statistics',
      params: {
        league: league_id,
        season: season,
        team: team_id
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  checkForError(response) {

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }
}

export default ApiService;