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
              class="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white px-8 pb-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="pt-6 pb-4 -mx-8 px-8 flex items-center justify-between text-xl font-medium leading-6 text-gray-900 border-b border-gray-200 cursor-move"
              >
                Support form
                <XIcon class="w-4 h-4 text-gray-500 hover:text-teal-600 cursor-pointer" @click="closeModal" />
              </DialogTitle>

              <div class="h-40 overflow-hidden">
                <img src="@/assets/images/support-splash.png" class="object-cover" alt="">
              </div>

              <div class="mt-2 flex justify-center">
                <div class="w-80 flex flex-col space-y-2">
                  <BaseInput
                    label="Name"
                  />
                  <BaseInput
                    label="Email"
                  />
                  <textarea name="" id="" cols="30" rows="3"></textarea>
                </div>
              </div>

              <div class="flex justify-center mt-4">
                <BaseButton
                  title="Send message"
                  rounded
                  outline
                />
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

import { ref, watch } from 'vue'
import BaseInput from "@/components/Base/Input.vue"
import BaseButton from "@/components/Base/Button.vue"

const props = defineProps(['open'])
const emit = defineEmits(['close'])

let isOpen = ref(props.open)

watch(() => props.open, (newVal) => {
  isOpen.value = newVal
})

function closeModal() {
  isOpen.value = false
  emit('close', false)
}

function liveBtn() {
  console.log('liveBtn clicked')
}

function ptzBtn() {
  console.log('ptzBtn clicked')
}

</script>

<style scoped>

</style>