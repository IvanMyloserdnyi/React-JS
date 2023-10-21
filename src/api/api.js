import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
/*    headers: {
        'API-KEY': '9a6dd39a-c42f-4e63-bf98-b8cde886a912'
    }*/
})
export const usersAPI = {
    getUsers(currentPage = 1,pageSize = 100)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    }
}
