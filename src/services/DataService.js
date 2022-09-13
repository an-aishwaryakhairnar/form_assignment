import axios from 'axios';


export const fetchData=()=>{
const resp = axios.get('https://631db901cc652771a48a2912.mockapi.io/api/V1/getData');

    return resp;

}


export const getFormData=async()=>{
const data = await fetchData();
    return data;


}