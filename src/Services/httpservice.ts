import axios from 'axios';
import { apiURL } from '../Constant/ApiUrlConstant';
  const axiosClient = axios.create();
  const UNAUTHORIZED = 401;
  // Add a request interceptor
  axiosClient.interceptors.request.use(
      (    config: { headers: { [x: string]: string; }; }):any => {
      const token = sessionStorage.getItem('accessToken')
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      config.headers['Content-Type'] = 'application/json';
      return config
    },
      (    error: { response: { status: any; }; }) => {
      const {status} = error.response;
    if (status === UNAUTHORIZED) {
      clearSessionStorage();
    }
      Promise.reject(error)
    }
  )

  export function getRequest(URL:any) {
    return axiosClient.get(`${URL}`).then((response: any) => response);
  }
  
  export function getRequestWithParam(URL: any, payload: any) {
    return axiosClient.get(URL, { params: payload }).then((response: any) => response);
  }
  
  export function postRequest(URL:any, payload:any) {
    return axiosClient.post(`${URL}`, payload).then((response: any) => response);
  }
  
  export function patchRequest(URL:any, payload:any) {
    return axiosClient.patch(`${URL}`, payload).then((response: any) => response);
  }
  export function deleteRequest(URL:any) {
    return axiosClient.delete(`${URL}`).then((response: any) => response);
  }
  export function clearSessionStorage() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem('civilId');
    sessionStorage.removeItem("isEmail");
  }
  export async function getNewToken() {
    const response = await getRequest(
      process.env.REACT_APP_API_URL + apiURL.GET_TOKEN
    );
    if (response == null) {
      clearSessionStorage();
      return;
    }
    if (response.status === 401) {
      clearSessionStorage();
      return;
    }
    if (response.status === 200) {
      const data = response.data;
      sessionStorage.setItem("accessToken", data);
    }
  }