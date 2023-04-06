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
              class="w-full max-w-xl transform rounded-2xl bg-white px-8 pb-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="pt-6 pb-4 -mx-8 px-8 flex items-center justify-between text-xl font-medium leading-6 text-gray-900 border-b border-gray-200 cursor-move"
              >
                Add a new camera
                <XIcon class="w-4 h-4 text-gray-500 hover:text-teal-600 cursor-pointer" @click="closeModal" />
              </DialogTitle>
<!--              <div class="mt-4 h-96 flex border border-gray-200 rounded">-->
<!--                <img src="@/assets/images/kiev.webp" class="w-full object-cover object-bottom" alt="">-->
<!--              </div>-->

              <div v-if="isLoad || load" class="flex justify-center">
                <img src="@/assets/images/load.gif" alt="load">
              </div>
              <Form v-else v-slot="{ handleSubmit, errors }" :validation-schema="schema">
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <div class="mt-2 flex flex-col space-y-2">
                    <BaseInput
                      v-model="form.displayName"
                      label="Name"
                      name="displayName"
                      :error="!!errors['displayName']"
                    />
                    <div
                      class="py-2"
                    >
                      <label
                        class="mb-2 block text-gray-500"
                        :class="{ 'text-red-400': error }"
                      >
                        Location
                      </label>
                      <BaseListbox
                        v-model="form.locationId"
                        :options="locations"
                        placeholder="Select location"
                        pre-label="Location: "
                      />
                    </div>
                    <TabGroup :selectedIndex="selectedTab" @change="changeTab">
                      <TabList class="flex space-x-1 rounded-xl bg-teal-500 p-1">
                        <Tab v-slot="{ selected }" as="template">
                          <button
                            type="button" 
                            class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                            :class="selected ? 'text-teal-700 bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'"
                          >
                            Auto
                          </button>
                        </Tab>
                        <Tab v-slot="{ selected }" as="template">
                          <button
                            type="button" 
                            class="w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                            :class="selected ? 'text-teal-700 bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'"
                          >
                            Manual
                          </button>
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <div class="ip-wrapper">
                            <BaseInput
                              v-model="formUri.addr"
                              label="ONVIF IP"
                              name="addr"
                              placeholder="XXX XXX"
                              size="16"
                              class-wrapper="ip-wrapper__ip"
                              :error="!!errors['addr']"
                            />
                            <BaseInput
                              v-model="formUri.port"
                              label="Port"
                              name="port"
                              :error="!!errors['port']"
                            />
                          </div>
                          <BaseInput
                            v-model="formUri.user"
                            label="ONVIF Login"
                            name="user"
                            :error="!!errors['user']"
                          />
                          <BaseInput
                            v-model="formUri.password"
                            label="ONVIF Password"
                            name="password"
                            :error="!!errors['password']"
                          />
                        </TabPanel>
                        <TabPanel>
                          <p class="text-center mt-3 mb-4">Try to generate your camera connection string</p>
                          <BaseButton
                            title="Generate"
                            btn-classes="mb-6"
                            width="full"
                            rounded 
                            type="button"
                            @click="generate"
                          />
                          <BaseInput
                            v-model="form.connectionUri"
                            label="URL"
                            name="connectionUri"
                            :error="!!errors['connectionUri']"
                          />
                        </TabPanel>
                      </TabPanels>
                    </TabGroup>
                  </div>

                  <div class="flex justify-between mt-4">
                    <BaseButton title="Save" rounded outline class="border-solid border-2 border-teal-400" />
                    <BaseButton
                      title="Test connection"
                      rounded
                      outline
                      type="button"
                      class="border-solid border-2 border-gray-500 hover:border-teal-400"
                      @click="testConnection"
                    />
                  </div>
                </form>
              </Form>
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
import { ref, watch, inject } from 'vue'
import BaseInput from "@/components/Base/Input.vue"
import BaseButton from "@/components/Base/Button.vue"
import BaseListbox from "@/components/Base/Listbox.vue"
import 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/masking-input.js'
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const props = defineProps(['open', 'load', 'locations']),
  emit = defineEmits(['close', 'save', 'generation'])

const schema = ref(yup.object({
    displayName: yup
      .string()
      .required("The email is required.")
      .min(
        2,
        "The length of the value must be at least 2 characters"
      ),
    addr: yup.string().required("The ONVIF IP is required.").min(10).max(21),
    addr: yup.string().required("The Port is required."),
    user: yup.string().required("The ONVIF Login is required.").min(2).max(50),
    password: yup
      .string()
      .required("The ONVIF Password is required."),
  }))
let isOpen = ref(props.open),
  isLoad = ref(props.load),
  selectedTab = ref(0),
  profiles = ref([]),
  formUri = ref({
    addr: '',
    port: '',
    user: '',
    password: '',
    // profile: ''
  }),
  form = ref({
    locationId: '',
    displayName: '',
    connectionUri: ''
  })

watch(() => props.open, (newVal) => {
    isOpen.value = newVal
  }
)

//-- methods
function changeTab(index) {
  selectedTab.value = index
  schema.value = index ? yup.object({
      displayName: yup
        .string()
        .required("The email is required.")
        .min(
          2,
          "The length of the value must be at least 2 characters"
        ),
      connectionUri: yup.string().required("The URL is required.").min(10),
    }) :
    yup.object({
      displayName: yup
        .string()
        .required("The email is required.")
        .min(
          2,
          "The length of the value must be at least 2 characters"
        ),
      addr: yup.string().required("The ONVIF IP is required.").min(10).max(21),
      user: yup.string().required("The ONVIF Login is required.").min(2).max(50),
      password: yup
        .string()
        .required("The ONVIF Password is required."),
    })
}

function closeModal() {
  isOpen.value = false
  emit('close', false)
}
function generate() {
  closeModal()
  emit('generate')
}
function onSubmit() {
  emit('save', { formUri, form, selectedTab })
}
function testConnection() {
  emit('test', { formUri, form, selectedTab })
}

function liveBtn() {
  console.log('liveBtn clicked')
}

function ptzBtn() {
  console.log('ptzBtn clicked')
}

</script>

<style>
.ip-wrapper {
  display: flex;
  gap: 15px;
}
.ip-wrapper__ip {
  flex-basis: 100%;
}
</style>
