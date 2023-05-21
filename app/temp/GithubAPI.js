import axios from 'axios';

const BASE_URL = 'https://api.github.com';

const GithubAPI = {
  getRepos: async (username) => {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    console.log(username);

    try {
      const response = await axios.get(`${BASE_URL}/users/${username}/repos`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return "error"
    }
  },

  getRepoLanguages: async (owner, repo) => {
    try {
      const response = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/languages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching repository languages:', error);
      throw error;
    }
  },
};

export default GithubAPI;
