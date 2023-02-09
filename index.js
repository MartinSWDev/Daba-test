import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

axios
  .get(
    `https://api.daba.so/${process.env.PROJECT_ID}/${process.env.DB_KEY}/key/my_new_key`
  )
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
