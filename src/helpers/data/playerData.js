import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayersByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const myPlayers = response.data;
      const players = [];
      Object.keys(myPlayers).forEach((fbId) => {
        myPlayers[fbId].id = fbId;
        players.push(myPlayers[fbId]);
      });
      resolve(players);
    }).catch((err) => reject(err));
});

const deletePlayer = (playerId) => axios.delete(`${baseUrl}/players/${playerId}.json`);

const newPlayer = (playerObj) => axios.post(`${baseUrl}/players.json`, playerObj);

const updatePlayer = (playerId, playerObj) => axios.put(`${baseUrl}/players/${playerId}.json`, playerObj);

export default {
  getPlayersByUid,
  deletePlayer,
  newPlayer,
  updatePlayer,
};
