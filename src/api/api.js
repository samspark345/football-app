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
  checkForError(response) {

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }
}

export default ApiService;