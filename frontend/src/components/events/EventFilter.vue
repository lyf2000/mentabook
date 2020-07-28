<template>
    <v-row>
        <v-col
                cols="12"
                sm="4"
        >
            <v-text-field
                    v-on:keypress.enter="filterEvents"
                    v-model="search"
                    label="Search"
                    :filled="true"
            ></v-text-field>
        </v-col>
        <v-col
                cols="12"
                sm="2"
        >
            <v-select
                    filled
                    :items="['all', 'day', 'week', 'month']"
                    label="Period"
                    v-model="period"
                    ></v-select>
        </v-col>
        <v-col  sm="2">

            <div class="ma-2">
                <v-btn :disabled="!previous"
                       depressed
                       small
                       @click="filter(previous)"
                      >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn :disabled="!next"
                       depressed
                       small
                       @click="filter(next)"
                       >
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </div>
        </v-col>
        
        <v-col  sm="2">

                <v-btn 
                       medium
                       @click="filter(null)"
                >Seacrh
                </v-btn>
                
        </v-col>
        <v-col  sm="2">

                <v-btn 
                       medium
                       @click="openCreate"
                >Create
                </v-btn>
                
        </v-col>

    </v-row>
</template>


<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import events from '@/store/modules/events'
import dialogs from '../../store/modules/dialogs';


@Component({
  name: 'EventFilter',
  components: {
    
  },
})
export default class EventFilter extends Vue {
    get next() {
        return events.next
    }

    get previous() {
        return events.previous
    }

    search = ''
    period = ''

    getSearchParamsUrl(pageNum: string | null) {
        
        const params = {
            'title': this.search.trim(),
            'date': this.period,
        }

        if (pageNum) {
            params['page'] = pageNum
        }
        
        return decodeURIComponent(new URLSearchParams(params).toString())
    }

    filter(pageNum) {
        const params = this.getSearchParamsUrl(pageNum)
        events.loadEventList(params)
    }

    openCreate() {
        dialogs.changeActiveDialog('EventCreate')
    }

}

</script>