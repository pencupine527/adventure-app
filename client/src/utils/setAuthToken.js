import axios from 'axios';

const setAuthToken = () => {
  var token = localStorage.getItem('idToken');
  if (token) {
    // Apply to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common['Authorization'];
    console.log('No idToken');
  }
};

export default setAuthToken;
