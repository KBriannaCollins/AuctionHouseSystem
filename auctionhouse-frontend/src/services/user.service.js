const { default: axios } = require('axios')

class UserService {
    constructor(){
        this.URI = 'http://localhost:5000/users';
    }

    checkLogin() {
        return axios.get(this.URI, {withCredentials: true})
    }
    login(username) {
        return axios.post(this.URI, 'user='+username, {withCredentials: true})
    }
    logout() {
        return axios.delete(this.URI, {withCredentials: true})
    }
    updateUser(infoObject) {
        console.log(infoObject)
        return axios.put(this.URI + '/' + infoObject.username, infoObject, infoObject, {withCredentials: true})
    }

}

export default UserService;