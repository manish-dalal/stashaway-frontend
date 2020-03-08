import axios from "axios";

import { APIhandler } from "./method";
import { api_response } from "./common";

let apiResponse = [];
const apiBaseUrl = process.env.REACT_APP_SERVER_URL;

const APICaller = ({
  method = "get",
  reqUrl,
  data = {},
  headers = {
    "content-type": "application/json",
    Accept: "application/json"
  }
}) => {
  return new Promise(async (resolve, reject) => {
    let url = `${apiBaseUrl}${reqUrl}`;
    // console.log(url, "data", data, "method", method, "header", headers);
    let options = {
      method,
      url,
      data,
      headers
    };
    if (method.toLowerCase() === "get") delete options["data"];
    axios({ ...options })
      .then(response => {
        // console.log("%c{res}", "color: green", " => ", response); // eslint-disable-line no-console
        apiResponse =
          response.data && response.data.length ? response.data : api_response;
        resolve(response);
      })
      .catch(error => {
        apiResponse = api_response;
        resolve({ data: api_response });
        // reject(error);
      });
  });
};

export default options => {
  if (process.env.REACT_APP_ENV === "withoutServer" || apiResponse.length) {
    return APIhandler({ ...options, api_response: apiResponse });
  } else {
    return APICaller(options);
  }
};
