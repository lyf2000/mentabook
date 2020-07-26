import axios from 'axios'
import { UserSubmit, UserRespnonse, User, EventItem } from './models'

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