import axios from 'axios'
import { UserSubmit, User, EventItem } from './models'
import users from './modules/users'


export const axs = axios.create({
    baseURL:  'http://localhost:8000',
    // baseURL: process.env.API_URL + '/',
	headers: {
		'Content-Type': 'application/json',
        'Accept': 'application/json',
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE',
    //     'Access-Control-Allow-Credentials': true
	}
})


// axs.interceptors.request.use(
//     config => {
//         const accessToken = users.user?.access
//         if (accessToken) {
//             console.log('TOKEN');
//             config.headers['Authorization'] = 'Bearer ' + accessToken
//         } else {
//             console.log('NO TOKEN');
            
//             delete config.headers['Authorization']
//         }
        
//         config.headers['Content-Type'] = 'application/json';

//         return config
//     }
// )

// axs.interceptors.response.use((response) => {
//     return response
// }, function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401
//         // && originalRequest.url ===
//         // 'http://127.0.0.1:8000/api/token/'
//     ) {
//         console.log('401');
        
//         // localStorageService.clearToken();
//         // router.push('/login');
//         return Promise.reject(error);
//     }

//     // const refreshToken = localStorageService.getRefreshToken();
//     // if (error.response.status === 401 && refreshToken && refreshToken !== 'undefined') {
//     //     console.log('retry');
//     //
//     //     return AXIOS.post('/token/refresh/',
//     //         {
//     //             "refresh": refreshToken
//     //         })
//     //         .then(function (res) {
//     //             if (res.status === 201 || res.status === 200) {
//     //                 localStorageService.setToken(res.data);
//     //                 AXIOS.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();
//     //                 return AXIOS(originalRequest);
//     //             }
//     //         })
//     //         .catch(function (err) {
//     //             localStorageService.clearToken();
//     //             router.push('/login')
//     //         })
//     // }
//     // localStorageService.clearToken();
//     // router.push('/login');
//     return Promise.reject(error);
// });


export function setJWT(jwt: string) {
    axs.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
}

export function clearJWT() {
    delete axs.defaults.headers.common['Authorization']
}

export async function loginUser(user: UserSubmit): Promise<User|undefined> {
    try {
        const response = await axs.post('/token/', user)
        console.log(response);
        
        return (response.data as User)
    } catch (e) {
        console.log('ERROR');
        
        console.log(e);
    }
}

export async function loadEvents() {
    
    try {
        
        const response = await axs.get('/events/', {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTk1ODE4MjE2LCJqdGkiOiI4OGZiOTE3YTQ3ZmU0Y2U1OTMwZjY0ZjEwMjhlMjc1OCIsInVzZXJfaWQiOjF9.avXlYQfUKxbwvTAR1B07M6AMqCJcBAqDSOc8Ew0V9Sw'
            }
        })
        
        return response.data as (EventItem)[]
    } catch (e) {
        console.log(e);
    }
}