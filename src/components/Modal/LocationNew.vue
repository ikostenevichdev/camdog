<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50 ">
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
              class=" w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-8 pb-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="pt-6 pb-4 -mx-8 px-8 flex items-center justify-between text-xl font-medium leading-6  locations__dialog border-b border-gray-200 cursor-move"
              >
                Add new location
                <XIcon class="w-4 h-4 text-gray-500 hover:text-teal-600 cursor-pointer" @click="closeModal" />
              </DialogTitle>
<!--              <div class="mt-4 h-96 flex border border-gray-200 rounded">-->
<!--                <img src="@/assets/images/kiev.webp" class="w-full object-cover object-bottom" alt="">-->
<!--              </div>-->

              <div v-if="load" class="flex justify-center">
                <img src="@/assets/images/load.gif" alt="load">
              </div>
              <Form v-else v-slot="{ handleSubmit, errors }" :validation-schema="schema">
                <form @submit.prevent="handleSubmit(save)">
                <div class="mt-2 flex flex-col">
                  <BaseInput
                    v-model="name"
                    label="Location name"
                    name="name"
                    :error="!!errors['name']"
                  />
                </div>
  
                <div class="flex justify-center mt-4">
                  <BaseButton  title="Save" class="mt-1 mr-3 cursor-pointer border-solid border-2 border-teal-400" rounded outline height="10" width="44" />
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
import { ref, watch } from 'vue'
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import BaseInput from "@/components/Base/Input.vue"
import BaseButton from "@/components/Base/Button.vue"

const props = defineProps(['open', 'load']),
  emit = defineEmits(['close', 'save'])

const schema = ref(yup.object({
  name: yup
    .string()
    .required("The Location name is required.")
    .min(
      2,
      "The length of the value must be at least 2 characters"
    ),
}))
let isOpen = ref(props.open),
  name = ref('')

watch(() => props.open, (newVal) => {
  isOpen.value = newVal
})

function closeModal() {
  isOpen.value = false
  emit('close', false)
}

function save() {
  emit('save', name._value)
  name._value = ''
}

</script>

<style scoped>

</style>
