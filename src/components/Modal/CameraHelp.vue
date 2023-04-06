<script setup>
import { ref, watch } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import BaseButton from "@/components/Base/Button.vue";
import { XIcon } from "@heroicons/vue/solid";

const props = defineProps(["open"])
const emit = defineEmits(["close"])

let isOpen = ref(props.open)

watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);

const closeModal = () => {
  isOpen.value = false
  emit("close", false);
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-[60]">
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
              class="
                w-full
                max-w-sm
                transform
                rounded-2xl
                bg-white
                px-6
                pb-4
                text-left
                align-middle
                shadow-xl
                transition-all
              "
            >
              <DialogTitle
                as="h3"
                class="
                  pt-3
                  pb-3
                  -mx-6
                  px-6
                  flex
                  items-center
                  justify-between
                  text-xl
                  font-medium
                  leading-6
                  text-gray-900
                  border-b border-gray-200
                  cursor-move
                "
              >
                Help
              </DialogTitle>
              <div class="mt-3">
                <div class="mb-3">
                  To <span class="font-bold text-gray-800">create a polygon</span>, 
                  click <i class="-mt-1 bg-mouse-left-click h-6 w-5 inline-block align-middle bg-center bg-no-repeat bg-cover"></i> mouse left button on editor
                </div>

                <div>
                  To <span class="font-bold text-gray-800">delete a polygon</span>, 
                  click <i class="-mt-1 bg-mouse-right-click h-6 w-5 inline-block align-middle bg-center bg-no-repeat bg-cover"></i> mouse right button on polygon
                </div>

                <div class="text-right mt-2">
                  <BaseButton
                    @click="closeModal"
                    class="
                      cursor-pointer
                      text-primary text-sm
                      
                      border-solid border border-primary
                      hover:bg-primary
                      px-4
                    "
                    btnClasses="py-1"
                    height="8"
                    width="22"
                    rounded
                    outline
                    title="Close"
                  />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>