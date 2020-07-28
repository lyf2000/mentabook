import { Module, Action, getModule, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { EventItem } from '../models'
import { loadEvents } from '../api'

@Module({
    namespaced: true,
    name: 'events',
    store,
    dynamic: true
})
class EventsModule extends VuexModule {
    _eventList: EventItem[] = []


    @Mutation
    setEventList(eventList: EventItem[]) {
        this._eventList = eventList
    }

    @Action({commit: 'setEventList'})
    async loadEventList() {
        const eventList = await loadEvents()
        return eventList
    }

    @Action({commit: 'setEventList'})
    async clearEventList() {
        return [] as EventItem[]
    }

    get eventList() {
        return this._eventList
    }

}

export default getModule(EventsModule)