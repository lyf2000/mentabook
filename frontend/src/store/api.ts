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
	}
})


export function loginUser(user: UserSubmit) {
    return axs.post('/token/', user)
        .then(response => {
            return response.data
        })
        .catch(err => {
            return Promise.reject(err)
        })
}

export async function loadEvents(params: string) {

    return axs.get('/events/?' + params, {
        headers: {
            'Authorization': `Bearer ${users.user?.access}`
        }
    }).then(response => {
        return response.data
    })
}

export async function updateEvent(id: number, ev: object) {
    
    return axs.put(`/events/${id}/`, ev, {
        headers: {
            'Authorization': `Bearer ${users.user?.access}`
        }
    }).then(response => {
        return response.data as EventItem
    }).catch(err => {
        return Promise.reject(err.response.data)
    })
}



export async function createEvent(ev: object) {
    
    return axs.post(`/events/`, ev, {
        headers: {
            'Authorization': `Bearer ${users.user?.access}`
        }
    }).then(response => {
        return response.data
         
    }).catch(err => {
        return Promise.reject(err.response.data)
    })
}


export async function deleteEvent(id: number) {

    return axs.delete(`/events/${id}/`, {
        headers: {
            'Authorization': `Bearer ${users.user?.access}`
        }
    }).then(response => {
        return response
    })
}


export async function signUp(userSignUp: UserSignUp) {

    return axs.post(`/signup/`, userSignUp).then(response => {
        return response.data
    }).catch(err => {
        return Promise.reject(err.response.data)
    })
}
