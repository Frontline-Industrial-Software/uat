import axios from "axios";
// !inputDATA 
const baseUrl="https://app.frontline-optimizer.com/"

export default function sendFile(){
    axios.post(`${baseUrl}`, {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}