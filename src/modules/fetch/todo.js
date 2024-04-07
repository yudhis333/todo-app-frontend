// const axios = require('axios');

import { instance as axios } from "../axios";



const getTodos = async (id) => {
  try {
    
    const response = await axios.get(`/api/v1/users/${id}/todos`, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};





module.exports = { getTodos };
