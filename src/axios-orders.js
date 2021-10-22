import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-e3d26-default-rtdb.firebaseio.com/"
});

export default instance;
