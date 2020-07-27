export interface User {
    username: string,
    access: string,
    refresh: string
}

export interface UserSubmit {
    username: string,
    password: string
}

export interface UserRespnonse {
    user: User
}

export interface EventItem {
    id: number,
    title: string,
    text: string,
    date: string,
    author: number,
    created: string,
    updated: string
}

export interface EventItemEdit {
    id: number,
    title: string,
    text: string,
    date: string,
    time: string,
    fullDate: string
}