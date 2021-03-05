<template>
  <div class="container mx-auto  rounded-lg mt-20">
    <transition name="slide-fade">
      <div v-if="ShowAlert" v-bind:class="Change()" role="alert">
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
          />
        </svg>
        <p>{{ AlertType.message }}</p>
      </div>
    </transition>

    <form @submit.prevent="OnAdd">
      <input
        type="text"
        
        v-model="Input"
        placeholder="Write down some tasks..."
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      />

      <button
        class="bg-gray-500  text-white font-bold py-2 px-4 rounded m-3"
        type="submit"
        :disabled="!Input"
      >
        ADD
      </button>
      <button
        class="bg-red-500  text-white font-bold py-2 px-4 rounded m-3" type="button"
        @click="RemoveAll"
      >
        Remove All
      </button>
    </form>

    <div>
      <div
        class="flex justify-between  border-solid border-4 border-light-blue-500 rounded-full py-3 px-6  mb-2"
        v-for="(msg, index) in Tasks"
        :key="msg.id"
      >
        <div class="flex items-center ">
          <h4 class="text-2xl text-opacity-75" :class="{ done: msg.done }">
            {{ msg.content }}
          </h4>
        </div>
        <div class="flex justify-center">
          <div>
            <button
              class="bg-green-500  text-white font-bold py-2 px-4 rounded"
              @click="Edit(msg.content, index)"
            >
              Edit
            </button>
            <button
              class="bg-red-500  text-white font-bold py-2 px-4 rounded m-3"
              @click="Remove(index)"
            >
              Remove
            </button>
            <input type="checkbox" class="cursor-pointer h-5 w-5 text-gray-600 "  @click="toggleDone(index)" :checked="msg.done" />
          </div>
        </div>
      </div>
    </div>
    

    <div v-if="ShowModal " class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <!-- Heroicon name: outline/exclamation -->
                <svg
                  class="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Update task !!
                </h3>
                <div class="mt-2">
                  <input
                    type="text"
                    v-model="ModalInput"
                    class=" appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="UpdateInput"
              required
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              @click="ShowModal  = false"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p v-if="Tasks.length == 0" class=" text-4xl text-opacity-75 mt-10">there are no tasks to show</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import store from "../store/index";
export default {
  setup() {
    let n = 0;
    let i;
    const Input = ref("");
    const ModalInput = ref("");
    const ShowAlert = ref(false);
    let ShowModal  = ref(false);
     const AlertType = ref({
      type: "",
      message: "",
    });
    const Tasks = computed(() => store.state.Tasks); // Access the store and gets the state

    // triggers every time we need to update the message of our Alert and its CSS class
     const Change = () => {
       switch(AlertType.value.type) {
         case "Add":
         AlertType.value.message = "Task Added !";
        return "flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3";
         case "Remove":
            AlertType.value.message = "Task Removed !";
        return "flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3";          
          case "Remove All":
            AlertType.value.message = "All tasks Removed !";
        return "flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"; 
         case "Updated":
            AlertType.value.message = "Task Updated !";
        return "flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3";   
          case "Capital":
            AlertType.value.message = "First Letter must be Capital !";
        return "flex items-center bg-gray-700 text-white text-sm font-bold px-4 py-3";    
          case "Special Character":
            AlertType.value.message = "No Special Caracters are allowed !";
        return "flex items-center bg-gray-700 text-white text-sm font-bold px-4 py-3";
         case "Min":
            AlertType.value.message = "Minimum number of characters allowed is 20 !";
        return "flex items-center bg-gray-700 text-white text-sm font-bold px-4 py-3";
         case "Max":
            AlertType.value.message = "Maximum number of characters allowed is 200 ";
        return "flex items-center bg-gray-700 text-white text-sm font-bold px-4 py-3";
        default:
         return ;  
         }}
    // returns "true" if the 1st char of the task is Capital 
    const CheckCapital = (message) => {
      let NoSpaces = message.trim();
      return NoSpaces.charCodeAt(0) >= 65 && NoSpaces.charCodeAt(0) <= 90;
    };
      // returns "true" if the task value has no special characters(Regex could be modified)
    const CheckSpecialChar = (message) => {
      let regex = /^[A-Za-z\s]+$/;
      return regex.test(message);
    };

  // triggers every time we add a task to our state
    const OnAdd = () => {
    if((Input.value.length>=20) && (Input.value.length<=200)){ // checks if the length is valid
      if (CheckCapital(Input.value)) { 
        if (CheckSpecialChar(Input.value)) {
          for (let j = 0; j < Tasks.value.length; j++) { // loop through all the tasks to check if the added taks already exists or not 
            if (Tasks.value[j].content == Input.value) {
              Input.value = "";
              alert("Already exists");
              return;
            }}
            // if its doesnt exists then we can commit out mutation
          store.commit("AddTask", { 
            id: n++,
            done: false,
            content: Input.value,
          });
          AlertType.value.type = "Add"; //triggers alert
          ShowAlert.value = true;
          Input.value = "";
          
        } else {
          AlertType.value.type = "Special Character"; // if CheckSpecialChar() returns false trigger an alert
          ShowAlert.value = true;
        }
      } else {
        AlertType.value.type = "Capital"; //if CheckCapital() returns false trigger an alert
        ShowAlert.value = true;
      }}
       else if( Input.value.length < 20){ // if length wasnt valid trigger an alert
          AlertType.value.type = "Min";
          ShowAlert.value = true;
      }else if (Input.value.length >200){
AlertType.value.type = "Max";
          ShowAlert.value = true;
      }
    };
      // remove a task based on its index in the Tasks array by committing a mutation
    const Remove = (index) => {
      store.commit("RemoveTask", index);
      AlertType.value.type = "Remove"; //trigger alert
      ShowAlert.value = true;
    };
  // remove all tasks
    const RemoveAll = () => {
      if(Tasks.value.length>0){
      store.commit("RemoveAllTasks");
      AlertType.value.type = "Remove All";
      ShowAlert.value = true;
      n = 0 }}
    
    //Edit button function
    const Edit = (val, index) => {
      ShowModal.value = true;
      ModalInput.value = val.trim(); // removes white spaces
      i = index;
      Tasks.value.forEach((element) => { // Updates the InputModal with the selected value
        if (element == val) {
          element.content = Input;
        }
      });
    };
      // Toggle the check Box
    const toggleDone = (index) => {
      store.commit("DoneMutation", index);
    };
      // function to hide the alert after 2s
    const hide_alert = () => {
      setInterval(() => {
        ShowAlert.value = false;
      }, 2000);
    };
      // Save button function inside the Edit Modal
    const UpdateInput = () => {
       if((ModalInput.value.length>=20) && (ModalInput.value.length<=200)){
      if (CheckCapital(ModalInput.value)) {
        if (CheckSpecialChar(ModalInput.value)) {
          for (let j = 0; j < Tasks.value.length; j++) {
            if (Tasks.value[j].content == ModalInput.value) {
              alert("Already exists");
              return;
            }
          }
          Tasks.value[i].content = ModalInput.value;
          ShowModal .value = false;
          AlertType.value.type = "Updated";
          ShowAlert.value = true;
        } else {
          AlertType.value.type = "Special Character";
          ShowAlert.value = true;
        }
      } else {
        AlertType.value.type = "Capital";
        ShowAlert.value = true;
      }}  
      else if( Input.value.length < 20){
          AlertType.value.type = "Min";
          ShowAlert.value = true;
      }else if (Input.value.length >200){
          AlertType.value.type = "Max";
          ShowAlert.value = true;
      }
    };

    onMounted(() => {
      hide_alert(); // After all elements are mounted to the Dom , Hide the alert 
      });
      
    return {
      OnAdd,
      Input,
      Tasks,
      Edit,
      Remove,
      RemoveAll,
      toggleDone,
      hide_alert,
      ShowModal ,
      UpdateInput,
      ModalInput,
      ShowAlert,
      Change,
      AlertType,
      store,
    };
  },
};
</script>
<style>
.done {
  text-decoration: line-through;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>
