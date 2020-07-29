import { Module, Action, getModule, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { EventItemEdit, EventItem } from '../models'

@Module({
    namespaced: true,
    name: 'dialogs',
    store,
    dynamic: true
})
class DialogsModule extends VuexModule {
    _activeDialog: string | null = null
    _event = <EventItemEdit>{}

    @Mutation
    setActiveDialog(value: string | null) {
        this._activeDialog = value
    }

    @Action({commit: 'setActiveDialog'})
    changeActiveDialog(value: string | null) {
        return value
    }

    get activeDialog() {
        return this._activeDialog
    }


    // EVENT

    @Mutation
    setEvent(value: EventItemEdit) {
        this._event = value
    }

    @Action({commit: 'setEvent'})
    changeEvent(value: EventItem) {
        const { id, text, title, date } = value
        return {
          id: id,
          title: title,
          text: text,
          date: '',
          time: '',
          fullDate: date
        } as EventItemEdit
        
    }

    get event() {
        return this._event
    }
}

export default getModule(DialogsModule)