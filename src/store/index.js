import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
    key: 'Tasks',
    storage: window.localStorage
  }); 
  
export default createStore ({
        state:{
            Tasks:[],
        },
        getters:{
            // filteredData :(state) => (search) => {  
            //     return state.Tasks.filter(element => element.content.toLowerCase().includes(search.toLowerCase()))
            //   }
        },
        mutations:{
            AddTask(state,value){
                state.Tasks.push(value);
            },
            RemoveTask(state,index){
                state.Tasks.splice(index, 1);
            },
            RemoveAllTasks(state){
                state.Tasks=[]
            },
            DoneMutation(state,index){
                state.Tasks[index].done = ! state.Tasks[index].done 
            }
        },
        actions:{},
        plugins: [vuexPersist.plugin]
})