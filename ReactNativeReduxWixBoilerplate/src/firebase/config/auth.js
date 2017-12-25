import { FBLoginManager } from 'react-native-facebook-login';
const Facebook = {
    login: (permissions) => {
        return new Promise((resolve, reject) => {
            FBLoginManager.loginWithPermissions(permissions || ['email'], (error, data) => {
                if (!error) {
                    resolve(data.credentials.token);
                    console.log(data,'login resolve')
                } else {
                    reject(error);
                    console.log(error,'login error')
                }
            });
        });
    },
    logout: () => {
        return new Promise((resolve, reject) => {
            FBLoginManager.logout((error, data) => {
                if (!error) {
                    resolve(true);
                    console.log(data,'logout success')
                } else {
                    reject(error);
                    console.log(error,'logout error')
                }
            });
        });
    }
}
const Auth = { Facebook };
export default Auth;