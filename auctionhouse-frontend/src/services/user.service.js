const { default: axios } = require('axios')

class UserService {
    constructor(){
        this.URI = 'http://localhost:5000/users';
    }

    checkLogin() {
        return axios.get(this.URI, {withCredentials: true})
    }
    login(username, password) {
        let req_data = {user: username, password: password}
        return axios.post(this.URI, req_data, {withCredentials: true})
    }
    logout() {
        return axios.delete(this.URI, {withCredentials: true})
    }
    getUsers(){
        return axios.get(this.URI+'list', {withCredentials: true})
    }
    removeUser(userID){
        return axios.delete(this.URI+'list', {data: {'_id': userID}});
    }
}

export default UserService;