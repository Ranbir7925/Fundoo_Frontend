import axiosService from './axiosService'
class UserService{
    addUser(signUpData){
        return axiosService.post(`user/userSignUp`,signUpData)
    }
    loginUser(signInData){
        return axiosService.post(`user/login`,signInData)
    }
    forgotPassword(forgotPasswordData){
        return axiosService.post(`user/reset`,forgotPasswordData)
    }
    resetPassword(resetPasswordData,token){
        return axiosService.post(`user/reset-password?access_token=${token}`,resetPasswordData)
    }
}
export default new UserService