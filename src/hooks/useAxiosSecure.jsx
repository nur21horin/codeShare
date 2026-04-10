import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext/AuthContext";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
   async (config) => {
        if(user){
            const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) =>{
        return res;
      },
       (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          logOut().then(()=>{
            navigate("/login");
          });
         
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;