import axiosService from './axiosService'

class UserService{
    addUser(signUpData){
        return axiosService.post(`user/userSignUp`,signUpData)
    }
    loginUser(signInData){
        return axiosService.post(`user/login`,signInData)
    }
}

export default new UserService