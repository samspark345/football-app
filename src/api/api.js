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

  createOptions(parameters, endpoint)  {
    return options = {
      method: 'GET',
      url: api_url + endpoint,
      params: parameters,
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };
  }
  createOptions(endpoint)  {
    return options = {
      method: 'GET',
      url: api_url + endpoint,
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };
  }
  async callFootballApi(option) {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      // Need to check the response for error even if it is a 200 status code
    } catch (error) {
      console.error(error);
    }
  }
  async retrievePlayerStatsByTeam(team_id, season_year) {
    parameters = {
      team: team_id,
      season: season_year
    }
    option = createOptions(parameters, '/players')
    callFootballApi(option)
  }

  async retrieveAllCountries() {
    options = createOptions('/countries')
    callFootballApi(options)
  }

  async retrieveAllLeagues() {
    options = createOptions('/leagues')
    callFootballApi(options)
  }

  async retrieveAllSeasons() {
    options = createOptions('/seasons')
    callFootballApi(options)
  }


  async retrieveTeamInfo(country) {
    parameters = {
      id: country
    }
    options = this.createOptions(parameters, '/teams')
    callFootballApi(options)
  }

  async retrieveLeaguesByTeamId(team_id) {
    parameters = {
      team: team_id
    }
    options = this.createOptions(parameters, '/leagues')
    callFootballApi(options)
  }

  async retrieveTeamStatsByLeague(league_id, team_id, season) {
    parameters = {
      league: league_id,
      season: season,
      team: team_id
    }
    options = this.createOptions(parameters, '/teams/statistics')
    callFootballApi(options)
  }

  checkForError(response) {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }
}

export default ApiService;