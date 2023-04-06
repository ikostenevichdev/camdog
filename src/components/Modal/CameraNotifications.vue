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

      <div class="fixed inset-0 overflow-y-auto" >
        <div
          class="flex min-h-full items-center justify-center p-4 text-center "
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
              class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white px-8 pb-6 text-left align-middle shadow-xl transition-all"
              style="width: 573px; height:465px;"
            >
              <DialogTitle
                as="h3"
                class="pt-6 pb-4 -mx-8 px-8 flex items-center justify-between cameras__modal_title text-xl font-medium leading-6 text-gray-900 border-b border-gray-200 cursor-move"
              >
                Notifications of the camera
                <XIcon class="w-4 h-4 text-gray-500 hover:text-teal-600 cursor-pointer" @click="closeModal" />
              </DialogTitle>
              <div class="flex flex-col py-8 space-y-2">
                <div class="flex space-x-4">
                  <div
                      class="w-32 p-2 py-6 notification-card border  gap-2 flex flex-col items-center cursor-pointer">
                    <img class="mt-3 " src="@/assets/images/sms-push.svg"  alt=""/>
                    <div class="flex items-center">
                      <input disabled id="inline-disabled-checkbox" type="checkbox" value=""  class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                      <label for="inline-disabled-checkbox" class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">SMS</label>
                    </div>
                  </div>

                  <div
                      :class="[{'border-gray-200': !formNotifications.mobilePushEnabled}, {'border-teal-400': formNotifications.mobilePushEnabled}]" class="w-32 p-2 py-6 notification-card border  gap-2 flex flex-col items-center cursor-pointer" @click="formNotifications.mobilePushEnabled = !formNotifications.mobilePushEnabled">
                    <img class="mt-3 ml-3" :class="[{'icon-color-gray': !formNotifications.mobilePushEnabled}, {'icon-color-green': formNotifications.mobilePushEnabled}]" src="@/assets/images/mobile-push.svg"  alt=""/>
                    <div class="flex items-center">
                      <input checked id="checked-mobile-push" type="checkbox" v-model="formNotifications.mobilePushEnabled" class="w-4 h-4 text-teal-400 bg-gray-100 rounded border-gray-300 focus:ring-white">
                      <label @click="formNotifications.mobilePushEnabled = !formNotifications.mobilePushEnabled" for="disabled-checked-checkbox" class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Push</label>
                    </div>
                  </div>
                  <div
                      :class="[{'border-gray-200': !formNotifications.webPushEnabled}, {'border-teal-400': formNotifications.webPushEnabled}]" class="w-32 p-2 py-6 notification-card border  gap-2 flex flex-col items-center cursor-pointer" @click="formNotifications.webPushEnabled = !formNotifications.webPushEnabled">
                    <img class="mt-3 ml-3" :class="[{'icon-color-gray': !formNotifications.webPushEnabled}, {'icon-color-green': formNotifications.webPushEnabled}]" src="@/assets/images/web-push.svg"  alt=""/>
                    <div class="flex items-center">
                      <input checked id="checked-web-push" type="checkbox" v-model="formNotifications.webPushEnabled" class="w-4 h-4 text-teal-400 bg-gray-100 rounded border-gray-300 focus:ring-white">
                      <label @click="formNotifications.webPushEnabled = !formNotifications.webPushEnabled" for="disabled-checked-checkbox" class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Web-Push</label>
                    </div>
                  </div>
                  <div
                      :class="[{'border-gray-200': !formNotifications.emailEnabled}, {'border-teal-400': formNotifications.emailEnabled}]" class="w-32 p-2 py-6 notification-card border  gap-2 flex flex-col items-center cursor-pointer" @click="formNotifications.emailEnabled = !formNotifications.emailEnabled">
                    <img class="mt-3 ml-3" :class="[{'icon-color-gray': !formNotifications.emailEnabled}, {'icon-color-green': formNotifications.emailEnabled}]" src="@/assets/images/email-push.svg"  alt=""/>
                    <div class="flex items-center">
                      <input checked id="email-checkbox" type="checkbox" v-model="formNotifications.emailEnabled" class="w-4 h-4 text-teal-400 bg-gray-100 rounded border-gray-300 focus:ring-white">
                      <label @click="formNotifications.emailEnabled = !formNotifications.emailEnabled" for="disabled-checked-checkbox" class="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">Email</label>
                    </div>
                  </div>
                </div>
                <div class="flex justify-start">
                  <div class="flex items-center gap-2">
                    <div class="mt-3 bg-white">
                      <div class="cameras__modal_notification mb-4">Notification level</div>
                      <div class="flex mb-3">
                        <div class="flex items-center h-5">
                          <input @click="piked.value= 'Custom'"  id="Custom" v-model="piked.value" type="radio" value="Custom"  class="w-4 h-4 text-teal-400 bg-gray-100 border-gray-300 focus:ring-white">
                        </div>
                        <div class="ml-2 text-sm ">
                          <div class="flex">
                            <label for="default-radio-2" class="font-medium text-teal-600">Threshold</label>
                            <div class="mb-2">
                              <input min="1" v-model="formNotifications.minIntervalSeconds" type="number" class="rounded-lg shadow ml-6" style="width: 60px; height:20px">
                            </div>
                            <label class="font-medium text-gray-500 ml-2">sec</label>
                          </div>
                          <p id="helper-radio-text-2" class="text-xs font-normal text-gray-300">You will receive alerts with chosen threshold</p>
                        </div>
                      </div >
                    </div>
                  </div>
                </div>
                <div class="flex justify-center">
                  <BaseButton @click="saveNotificationSettings" title="Save" height="139" width="32" rounded outline class=" py-2 px-4 border-solid border-2 border-teal-400" />
                </div>

                <div>
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
import { XIcon, CheckIcon } from '@heroicons/vue/solid'
import { reactive, ref, watch, inject } from 'vue'
import BaseButton from "@/components/Base/Button.vue"

const { $api, $snotify } = inject('$app')

const props = defineProps(['open', 'data'])
const emit = defineEmits(['close'])
const piked =reactive({
  value:"Custom"
})
const formNotifications = reactive({
  minIntervalSeconds: 5,
  emailEnabled: false,
  webPushEnabled: false,
  mobilePushEnabled: false
})

let isOpen = ref(props.open)

const getDataCameras = async () => {
  try {
    let { data } = await $api.cameras.getNotifications(props.data.id)
    for (const key in formNotifications) {
      formNotifications[key] = data[key]
    }
  } catch (e) {
    console.error(e)
    $snotify.error(e.messages || e.message);
  }
}

const saveNotificationSettings = async () => {
  try {
    const payload = { ...formNotifications }

    await $api.cameras.updateNotification({ id: props.data.id, payload })
    $snotify.success('Notification updated...');
    isOpen.value = false
  } catch (e) {
    console.error(e)
    $snotify.error(e.messages || e.message);
  }
}

watch(() => props.open, (newVal) => {
  isOpen.value = newVal
  if (isOpen.value) {
    getDataCameras()
  }
})

function closeModal() {
  isOpen.value = false
  emit('close', false)
}

</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.icon-color-green{
  filter: invert(49%) sepia(86%) saturate(380%) hue-rotate(121deg) brightness(90%) contrast(88%);
}
.icon-color-gray{
  filter: invert(65%) sepia(9%) saturate(372%) hue-rotate(173deg) brightness(90%) contrast(90%);
}
</style>
