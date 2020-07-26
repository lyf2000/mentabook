import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
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
    _user: User | null = null
    _dialogLogin = false
    _dialogSignUp = false
  


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


    // ---- DIALOG_LOGIN ----

    @Mutation
    setDialogLogin(dialogLogin: boolean) {
        console.log(this._dialogLogin, dialogLogin);
        
        this._dialogLogin = dialogLogin

        console.log(this._dialogLogin, dialogLogin);
    }

    @Action({commit: 'setDialogLogin'})
    openDialogLogin() {
        return true
    }
    
    @Action({commit: 'setDialogLogin'})
    closeDialogLogin() {
        return false
    }


    // ---- DIALOG_SIGN_UP ----

    @Mutation
    setDialogSignUp(dialogSignUp: boolean) {
        this._dialogSignUp = dialogSignUp
    }

    @Action({commit: 'setDialogSignUp'})
    openDialogSignUp() {
        return true
    }
    
    @Action({commit: 'setDialogSignUp'})
    closeDialogSignUp() {
        return false
    }

}

export default getModule(UsersModule)