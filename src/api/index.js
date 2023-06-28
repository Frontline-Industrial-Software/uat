import axios from "axios";
// !inputDATA
const instance = axios.create({
  baseURL: "api",
  timeout: 10000,
});
export default {
  sendFile(file) {
    instance
      .post(`upload`, {
        file,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  constraintsfileDownload(constraintsFilename) {
    instance
      .get(`fileDownload/constraints/${constraintsFilename}`, {})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  
};
