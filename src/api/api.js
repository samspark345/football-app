import axios from 'axios';

class ApiService {
  static api_url = 'https://api-football-v1.p.rapidapi.com/v3';

  async fetchUsers() {
    const response = await axios.get('/api/users');
    return response.data;
  }
  async loadJSON() {
    try {
      const response = await fetch('sample.json');
      console.log("O")
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async createUser(data) {
    const response = await axios.post('/api/users', data);
    return response.data;
  }

  createOptions(parameters, endpoint)  {
    const options =  {
      method: 'GET',
      url: this.api_url + endpoint,
      params: parameters,
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };
    return options
  }
  createOptions(endpoint)  {
    const options =  {
      method: 'GET',
      url: this.api_url + endpoint,
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    };
    return options
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
      return response.data
      // Need to check the response for error even if it is a 200 status code
    } catch (error) {
      console.error(error);
    }
  }
  async retrievePlayerStatsByTeam(team_id, season_year) {
    let parameters = {
      team: team_id,
      season: season_year
    }
    const option = this.createOptions(parameters, '/players')
    return await this.callFootballApi(option)
  }

  async retrieveAllCountries() {
    const options =  this.createOptions('/countries')
    return await this.callFootballApi(options)
  }

  async retrieveAllLeagues() {
    const options =  this.createOptions('/leagues')
    return this.callFootballApi(options)
  }

  async retrieveAllSeasons() {
    const options =  this.createOptions('/seasons')
    this.callFootballApi(options)
  }


  async retrieveTeamInfo(country) {
    let parameters = {
      id: country
    }
    const options =  this.createOptions(parameters, '/teams')
    this.callFootballApi(options)
  }

  async retrieveLeaguesByTeamId(team_id) {
    let parameters = {
      team: team_id
    }
    const options =  this.createOptions(parameters, '/leagues')
    this.callFootballApi(options)
  }

  async retrieveTeamStatsByLeague(league_id, team_id, season) {
    let parameters = {
      league: league_id,
      season: season,
      team: team_id
    }
    const options =  this.createOptions(parameters, '/teams/statistics')
    this.callFootballApi(options)
  }

}

export default ApiService;