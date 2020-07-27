import axios from 'axios'
import { UserSubmit, User, EventItem, UserSignUp } from './models'
import users from './modules/users'
import router from '@/router'
import events from './modules/events'
import dialogs from './modules/dialogs'

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

//         if (!(users.dialogLogin || users.dialogSignUp)) {
//             if (!config.headers['Authorization']) {
//                 const accessToken = users.user?.access  
//                 if (accessToken) {
//                     config.headers['Authorization'] = 'Bearer ' + accessToken
//                 } else {    
//                     delete config.headers['Authorization']
//                     if (!users.dialogLogin) { users.openDialogLogin() }
//                 }
//             } 
//         }

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
        return (response.data as User)
    } catch (e) {
        console.log('ERROR');
        
        console.log(e);
    }
}

export async function loadEvents() {
    

        return axs.get('/events/', {
            headers: {
                'Authorization': `Bearer ${users.user?.access}`
            }
        }).then(response => {
            return response.data || [] as (EventItem)[]
        }).catch(err => {
            return []
        })
}

export async function updateEvent(id: number, ev: object) {

    console.log(id, ev);
    

    return axs.put(`/events/${id}/`, ev, {
        headers: {
            'Authorization': `Bearer ${users.user?.access}`
        }
    }).then(response => {
        console.log(response.data, response.status);
        return response.data as EventItem
    }).catch(err => {
        console.log('err', err);
        return err
    })
}


export async function deleteEvent(id: number) {

    return axs.delete(`/events/${id}/`, {
        headers: {
            'Authorization': `Bearer ${users.user?.access}`
        }
    }).then(response => {
        console.log(response.data, response.status);
        return response.data as EventItem
    }).catch(err => {
        console.log('err', err);
        return err
    })
}


export async function signUp(userSignUp: UserSignUp) {

    console.log(userSignUp);
    

    return axs.post(`/signup/`, userSignUp).then(response => {
        console.log(response.data, response.status);
        return response.data as EventItem
    }).catch(err => {
        console.log('err', err);
        return err
    })
}