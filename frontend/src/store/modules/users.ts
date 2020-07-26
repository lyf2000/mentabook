import { Module, VuexModule, getModule, MutationAction, Mutation, Action } from 'vuex-module-decorators'
import store from "@/store";
import { User, UserSubmit } from '../models';
import { loginUser, axs } from '../api';


@Module({
    namespaced: true,
    name: 'users',
    store,
    dynamic: true
})
class UsersModule extends VuexModule {
    user: User | null = null

    // @MutationAction({mutate: ['user']})
    // async login(userDubmit: UserSubmit) {
    //     console.log(userDubmit);
        
    //     const user = await loginUser(userDubmit)
    //     console.log(user);
        
    //     return { user }     
    // }

    @Mutation
    setUser(user: User) { 
        console.log('user', user);
        
        this.user = user
     }

    @Action({commit: 'setUser'})
    async login(userSubmit: UserSubmit) {
        const user = await loginUser(userSubmit)
        return user
    }
}

export default getModule(UsersModule)