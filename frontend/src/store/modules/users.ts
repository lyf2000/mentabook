import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from "@/store";
import { User, UserSubmit } from '../models';
import { loginUser } from '../api';


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
    async login(userSubmit: UserSubmit) {
        const user = await loginUser(userSubmit)
        return user
    }

    get user() {
        return this._user
    }

}

export default getModule(UsersModule)