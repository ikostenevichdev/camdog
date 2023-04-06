<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50">
      <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
            class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
          >
            <DialogPanel
                class="w-full max-w-5xl transform rounded-2xl bg-white px-8 pb-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                  as="h3"
                  class="pt-6 pb-4 -mx-8 px-8 flex items-center justify-between cameras__modal_title leading-6 text-gray-900 border-b border-gray-200 cursor-move"
              >
               Camera Settings
                <XIcon class="w-4 h-4 text-gray-500 hover:text-teal-600 cursor-pointer" @click="closeModal" />
              </DialogTitle>
              <div class="flex flex-col">
                <div class="flex justify-between">
                  <div class=" flex flex-col rounded overflow-hidden " style="width: 410px">
                    <div class="max-w-sm  overflow-hidden">
                      <div class=" flex flex-col rounded overflow-hidden camera-card-modal h-68 m-3"  style="width: 350px; height: 196px">
                        <img class="canvas-block__image" :src="URL+ form.previewUri"  alt=""/>
                      </div>
                      <div class="px-6 pt-4 pb-2">
                        <div class=" flex justify-center cursor-pointer" @click="updateSnapShot">
                          <CameraIcon  style="width: 28px; height: 32px" />
                          <div @click="changeColor" :class="[{'cameras__modal_snapshot':!snapshotValue.value}, {'cameras__modal_snapshot_green': snapshotValue}]" class="mt-2 ml-1">
                            New snapshot
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex flex-col" style="width: 438px">
                    <Form v-slot="{ handleSubmit, errors }" :validation-schema="schema">
                      <form @submit.prevent="handleSubmit(onSubmit)">
                        <div class="mt-2 flex flex-col space-y-2">
                          <BaseInput
                              v-model="form.name"
                              label="Name"
                              name="displayName"
                              :error="!!errors['displayName']"
                          />
                          <div
                              class="py-3"
                          >
                            <label
                                class="mb-2 block text-gray-500"
                                :class="{ 'text-red-400': error }"
                            >
                              Location
                            </label>
                            <BaseListbox
                                v-model="form.locationId"
                                class="py-3"
                                :options="form.locations"
                                placeholder="Select Profile"
                                pre-label="Location: "
                            />
                            <BaseInput
                                v-model="form.connectionUri"
                                label="URI"
                                class="py-3"
                                name="connectionUri"
                                :error="!!errors['connectionUri']"
                            />
                            <label
                                class="mb-2 py-3 block text-gray-500"
                                :class="{ 'text-red-400': error }"
                            >
                              Profiles
                            </label>
                            <BaseListbox
                                v-model="form.profileId"
                                :options="form.profiles"
                                class="py-2"
                                placeholder="Select Profile"
                                pre-label="profile: "
                            />
                          </div>
                          <label
                              class="block text-gray-500"
                              :class="{ 'text-red-400': error }"
                          >
                            GEO
                          </label>
                          <div class="ip-wrapper">
                            <BaseInput
                                v-model="form.geo.lat"
                                label="Latitude"
                                name="lat"
                                :error="!!errors['lat']"
                            />
                            <BaseInput
                                v-model="form.geo.lng"
                                label="Longitude"
                                name="lng"
                                :error="!!errors['lng']"
                            />
                          </div>
                        </div>

                        <div class="flex justify-around mt-4">
                          <BaseButton title="Save" height="44" width="32" rounded outline class="border-solid border-2 border-teal-400" />
                          <BaseButton
                              title="Test connection"
                              rounded
                              icon="wifi"
                              outline
                              type="button"
                              class="border-solid border-2 border-gray-500  text-black hover:border-teal-400"
                              @click="testConnection"
                          />

                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/solid'
import {inject, ref, watch} from 'vue'
import BaseButton from "@/components/Base/Button.vue"
import BaseInput from "@/components/Base/Input.vue"
import BaseListbox from "@/components/Base/Listbox.vue"
import { Form } from "vee-validate";
import * as yup from "yup"
import { CameraIcon } from "@heroicons/vue/outline"

const URL = import.meta.env.VITE_VUE_DOWNLOAD_URL
const props = defineProps(['open', 'data','locations','previewUri'])
const emit = defineEmits(['close'])
 const {$api, $snotify} = inject('$app');
const schema = ref(yup.object({
  displayName: yup
      .string()
      .min(
          2,
          "The length of the value must be at least 2 characters"
      ),
}))
let form = ref({
  id: props.data.id,
  name: props.data.displayName,
  connectionUri:props.data.connectionUri,
  profiles:[{label: '0', value: '0'}],
  locations:props.locations,
  locationId: props.data.locationId,
  profileId:'',
  geo:{
    lat:props.data.lat,
    lng:props.data.lng
  },
  previewUri:props.data.previewUri
})
let snapshotValue = ref({
  value:null
})
function changeColor() {
  snapshotValue.value=true
  setTimeout(()=>{
    snapshotValue.value= false
  },500)
}
function onSubmit() {
  emit('save', {form})
  isOpen.value = false
}
let isOpen = ref(props.open)
watch(() => props.open, (newVal) => {
  snapshotValue.value= false
  isOpen.value = newVal
})
watch(() => props.previewUri, (newVal) => {
  form.value.previewUri= newVal
})
function closeModal() {
  isOpen.value = false
  emit('close', false)
}
 function updateSnapShot(){
  emit('updateSnapShot',{form})
  }
async  function  testConnection() {
  emit('testConnection',{form})
}
</script>
<script>

</script>
<style scoped>
.cameras__modal_snapshot:focus{
  color: #2fac72;
}

</style>
