import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from "@/store";
import { User } from '../models';


@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true
})
class UsersModule extends VuexModule {
    _user: User | null = null

    //  ---- USER ----

    @Mutation
    setUser(user: User) { 
        this._user = user
     }

    @Action({commit: 'setUser'})
    login(user: User) {
        return user
    }

    @Mutation
    clearUser() { 
        this._user = null
     }

    @Action({commit: 'clearUser'})
    logout() {
        return null
    }

    get user() {
        return this._user
    }
}

export default getModule(UsersModule)