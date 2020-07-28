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
    _next: string | null = null
    _previous: string | null = null
               

    // ----- PAGE NUMS -----

    @Mutation
    setNext(next: string) {
        this._next = next
    }

    @Action({commit: 'setNext'})
    async changeNext(next: string) {
        const url = new URL(next);
        next = url.searchParams.get("page") || '';
        return next
    }

    get next() {
        return this._next
    }

    @Mutation
    setPrevious(previous: string) {
        this._previous = previous
    }

    @Action({commit: 'setPrevious'})
    async changePrevious(previous: string) {
        const url = new URL(previous);
        previous = url.searchParams.get("page") || '1';
        return previous
    }

    get previous() {
        return this._previous
    }


    // ----- EVENT -----

    @Mutation
    setEventList(eventList: EventItem[]) {
        this._eventList = eventList
    }

    @Action({commit: 'setEventList'})
    async loadEventList(params='') {
        const data = await loadEvents(params)
        const { next, previous } = data
        console.log('QQQ',next, previous)
        store.dispatch('events/changeNext', next)
        store.dispatch('events/changePrevious', previous)
        return data.results  || [] as (EventItem)[]
    }

    @Action({commit: 'setEventList'})
    async clearEventList() {
        return [] as EventItem[]
    }

    get eventList() {
        return this._eventList
    }


    // ----- SEARCH -----

    // @Mutation
    // setSearch(search: string) {
    //     this._search = search
    // }

    // @Action({commit: 'setSearch'})
    // async changeSearch(search: string) {
    //     return search.trim()
    // }

    // get search() {
    //     return this._search
    // }


    // ----- PERIOD -----

    // @Mutation
    // setPeriod(period: string) {
    //     this._period = period
    // }

    // @Action({commit: 'setPeriod'})
    // async changePeriod(period: string) {
    //     return period
    // }

    // get period() {
    //     return this._period
    // }

}

export default getModule(EventsModule)