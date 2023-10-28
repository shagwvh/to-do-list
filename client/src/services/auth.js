import axios from 'axios';
import { toast } from 'react-toastify';

export function login(userName,password) {
    return axios
      .post(`http://localhost:5001/user/login`, {
        userName:userName,
        password:password,
      })
      .then((response) => {
        console.log(response);
        if (response && response.status === 200) {
          const authToken = response.headers.authorization
          localStorage.setItem('token', authToken);
          return {
            body: response.data,
            headers: response.headers,
          };
        }
        throw new Error('Status code is not okk');
      })
      .catch((err) => {
        console.error({ err }, 'Error in endpoint');
        if(err.response.status==401){
          toast.error(err.response.data.errorMessage)
        }else{
          toast.error('Something Went Wrong')
        }
      });
}
