import isEmpty from "lodash/isEmpty";

export const APIhandler = options => {
  const { api_response } = options;
  let params = {};
  // get url params
  const routeParams = options.reqUrl.split("?");
  if (routeParams.length > 1) {
    let paramsStr = routeParams[1];
    paramsStr.split("&").map(data => {
      let keyValue = data.split("=");
      params[keyValue[0]] = keyValue[1] ? keyValue[1] : "";
      return "";
    });
  }

  return new Promise(async (resolve, reject) => {
    // console.log("params", params);
    if (api_response.length) {
      if (!isEmpty(params)) {
        let response = api_response;
        if (!isEmpty(params.name)) {
          response = response.filter(
            item =>
              item.Brand.toLowerCase().includes(params.name.toLowerCase()) ||
              item.Variety.toLowerCase().includes(params.name.toLowerCase()) ||
              item.Style.toLowerCase().includes(params.name.toLowerCase()) ||
              item.Country.toLowerCase().includes(params.name.toLowerCase())
          );
        }
        if (!isEmpty(params.region)) {
          response = response.filter(item =>
            item.Country.toLowerCase().includes(params.region.toLowerCase())
          );
        }
        return resolve({
          data: response
        });
      } else {
        return resolve({
          data: api_response
        });
      }
    } else {
      return reject({});
    }
  });
};
