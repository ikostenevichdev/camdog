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
              class="
                transform
                overflow-hidden
                rounded-2xl
                bg-white
                px-8
                pb-6
                text-left
                align-middle
                shadow-xl
                transition-all
                max-w-5xl
              "
            >
              <DialogTitle
                as="h3"
                class="
                  pt-6
                  pb-4
                  -mx-8
                  px-8
                  flex
                  items-center
                  justify-between
                  text-xl
                  leading-6
                  cameras__modal_title
                  border-b border-gray-200
                  cursor-move
                "
              >
                Live mode
                <XIcon
                  class="
                    w-4
                    h-4
                    text-gray-500
                    hover:text-teal-600
                    cursor-pointer
                  "
                  @click="closeModal"
                />
              </DialogTitle>
              <div class="flex flex-row">
                <div
                  class="
                    mt-4
                    h-96
                    min-w-[660px]
                    flex
                    border border-gray-200
                    rounded
                  "
                >
                  <video
                    class="w-full h-full"
                    controls
                    autoplay
                  >
                    <source :src="data">
                  </video>
                  <!-- <img class="max-w-full" :src="data" alt="" /> -->
                </div>
                <div v-if="isController">
                  <div
                    class="cameras__modal_title flex justify-center py-3 ml-8"
                  >
                    PTZ
                  </div>
                  <div class="flex justify-center ml-6 mt-11">
                    <Controller />
                  </div>
                </div>
              </div>

              <div class="flex justify-between mt-4">
                <BaseButton
                  class="mt-2 font-bold text-sm border-teal-400"
                  rounded
                  outline
                  title="Pause"
                  style="width: 104px; height: 44px"
                />
                <BaseButton
                  :class="[
                    { 'bg-[#2D3748] text-white': isController },
                    { 'bg-white text-[#2D3748] ': !isController },
                    { 'ml-80': isController },
                    { 'ml-80': !isController },
                  ]"
                  id="buttonController"
                  @click="isController = !isController"
                  class="
                    flex
                    mt-2
                    cursor-pointer
                    border-solid border
                    font-bold
                    text-sm
                    border-black
                    hover:bg-[#2D3748]
                  "
                  icon="controller"
                  rounded
                  outline
                  title="PTZ"
                  style="width: 104px; height: 44px"
                >
                  <template #btnImage>
                    <img
                      id="iconController"
                      :class="[
                        { 'icon-color-white': isController },
                        { 'icon-color-gray': !isController },
                      ]"
                      class="mr-3"
                      src="@/assets/images/controller.svg"
                      alt=""
                    />
                  </template>
                </BaseButton>
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
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/solid";
import { ref, watch } from "vue";
import BaseButton from "@/components/Base/Button.vue";
import HLSCore from "@cloudgeek/playcore-hls";
import Controller from "@/components/Controller.vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming/dist/videojs-http-streaming.min.js";
window.videojs = videojs;
const props = defineProps(["open", "data"]);
const emit = defineEmits(["close"]);

let isOpen = ref(props.open);
let isController = ref(false);
watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);

function closeModal() {
  isOpen.value = false;
  emit("close", false);
}

function liveBtn() {
  console.log("liveBtn clicked");
}

function ptzBtn() {
  console.log("ptzBtn clicked");
}
</script>

<style scoped>
.icon-color-gray {
  filter: invert(16%) sepia(33%) saturate(529%) hue-rotate(177deg)
    brightness(101%) contrast(88%);
}
.icon-color-white {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg)
    brightness(101%) contrast(102%);
}
#buttonController:hover > #iconController {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg)
    brightness(101%) contrast(102%);
}
</style>
