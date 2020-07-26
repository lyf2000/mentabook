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
    eventList: EventItem[] = []


    @Mutation
    setEventList(eventList: EventItem[]) {
        console.log('eLI', eventList);

        this.eventList = eventList
    }

    @Action({commit: 'setEventList'})
    async loadEventList() {
        const EventList = await loadEvents()
        
        return EventList
    }

    get getEventList() {
        return this.eventList
    }

}

export default getModule(EventsModule)