import axios from "axios";

const login = (payload) => {
  const config = {
    method: "POST",
    url: "https://api.remotebootcamp.dev/api/users/login",
    data: payload, 
    crossdomain: true,
    withCredentials: true,
    headers: {"Content-Type": "application/json"}
  };
  return axios(config);
}

export { login };
