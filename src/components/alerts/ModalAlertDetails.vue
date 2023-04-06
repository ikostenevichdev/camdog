<template>
  <TransitionRoot class="modal-alert-details" appear :show="true" as="template">
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
          class="
            flex
            min-h-full
            items-center
            justify-center
            p-4
            text-center
            overflow-hidden
          "
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
                modal-alert-details__dialog
                relative
                w-full
                transform
                rounded-2xl
                bg-white
                px-3
                pb-6
                text-left
                align-middle
                shadow-xl
                transition-all
              "
              :style="[{ width: (isLargeModal && '100vw') || '826px' }]"
            >
              <DialogTitle
                as="h3"
                class="
                  pt-6
                  pb-4
                  w-full
                  px-8
                  flex
                  items-center
                  justify-between
                  text-xl
                  font-medium
                  leading-6
                  text-gray-900
                  border-b border-gray-200
                "
              >
                Alert Details
                <XIcon
                  class="
                    w-4
                    h-4
                    text-gray-500
                    hover:text-teal-600
                    cursor-pointer
                  "
                  @click="$emit('close')"
                />
              </DialogTitle>
              <div class="modal-alert-details__content">
                <div
                  class="
                    content__top
                    flex
                    items-center
                    justify-between
                    py-3
                    px-6
                  "
                >
                  <div class="flex items-center">
                    <div class="mr-14 flex items-center">
                      <img class="mr-3" src="/icons/schedule.svg" alt="" />
                      {{ moment(alertFrame.timeInitial).format("HH:mm:ss") }}
                    </div>
                    <div class="flex items-center">
                      <img class="mr-3" src="/icons/calendar.svg" alt="" />
                      {{ moment(alertFrame.timeInitial).format("DD.MM.YYYY") }}
                    </div>
                  </div>
                  <div class="flex items-center" v-if="data.type">
                    <img
                      class="mr-3"
                      :src="alertDetectionType[data.type].icon"
                      alt=""
                    />
                    {{ alertDetectionType[data.type].title }}
                  </div>
                </div>
                <div
                  class="content__image"
                  :style="{ height: isLargeModal ? 'auto' : '408px' }"
                >
                  <div v-if="resetCanvas">
                    <div id="canvasRecognitionRoi" v-show="canvasShow"></div>
                    <div id="canvasBoundigBox" v-show="canvasShow"></div>
                  </div>

                  <template v-if="isImageMode">
                    <img
                      class="image__img"
                      ref="snapshotImage"
                      :src="`${baseURL}${alertFrame.uri}`"
                      alt=""
                    />
                    <div class="image__actions">
                      <div class="image__icon" @click="onZoomImage">
                        <img
                          :src="
                            isLargeModal
                              ? '/icons/close_fullscreen.svg'
                              : '/icons/open_in_full.svg'
                          "
                          alt=""
                        />
                      </div>
                      <div class="image__icon" @click="onEyeClick()">
                        <img src="/icons/visibility.svg" alt="" />
                      </div>
                    </div>
                  </template>
                  <div class="h-full w-full" v-show="!isImageMode">
                    <video
                      ref="videoPlayer"
                      data-setup=""
                      class="video-js w-full h-full"
                    />
                  </div>
                </div>
                <div class="content__actions">
                  <div>
                    <Button
                      class="actions__btn mr-3"
                      title="Video"
                      border
                      outline
                      rounded
                      :active="!isImageMode"
                      @click="toggleIsImageMode"
                    >
                      <template #btnImage>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4 6H16C16.55 6 17 6.45 17 7V10.5L21 6.5V17.5L17 13.5V17C17 17.55 16.55 18 16 18H4C3.45 18 3 17.55 3 17V7C3 6.45 3.45 6 4 6ZM15 16V8H5V16H15Z"
                            fill="currentColor"
                          />
                        </svg>
                      </template>
                    </Button>
                    <Button
                      class="actions__btn"
                      title="Save"
                      border
                      outline
                      rounded
                      @click="saveImage"
                    >
                      <template #btnImage>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.55286 10.1143C9.59439 11.1558 9.59439 12.8445 8.55286 13.886C7.51133 14.9275 5.82268 14.9275 4.78115 13.886C3.73962 12.8445 3.73962 11.1558 4.78115 10.1143C5.82268 9.07275 7.51133 9.07275 8.55286 10.1143"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.2189 4.78103C20.2604 5.82256 20.2604 7.51121 19.2189 8.55274C18.1773 9.59427 16.4887 9.59427 15.4472 8.55274C14.4056 7.51121 14.4056 5.82256 15.4472 4.78103C16.4887 3.7395 18.1773 3.7395 19.2189 4.78103"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.2189 15.4472C20.2604 16.4887 20.2604 18.1773 19.2189 19.2189C18.1773 20.2604 16.4887 20.2604 15.4472 19.2189C14.4056 18.1773 14.4056 16.4887 15.4472 15.4472C16.4887 14.4056 18.1773 14.4056 19.2189 15.4472"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.04004 10.8102L14.96 7.85022"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.04004 13.1899L14.96 16.1499"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </template>
                    </Button>
                  </div>
                  <div
                    class="btn__delete ml-auto"
                    @click="$emit('removeAlertFrame', alertFrame.id)"
                  >
                    <img src="/icons/delete.svg" alt="" />
                    Delete
                  </div>
                </div>
                <!-- <div class="items">
                                    <div class="items__item" v-for="(item, index) in 20" :key="index">
                                        <div class="item__info">
                                            22.03  12:36:17
                                        </div>
                                    </div>
                                </div> -->
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import moment from "moment";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { alertDetectionType } from "@/constant.js";
import Button from "@/components/Base/Button.vue";
import { XIcon } from "@heroicons/vue/solid";

import { ref, watch, inject, nextTick } from "vue";
const baseURL = import.meta.env.VITE_VUE_BASE_URL;
const isLargeModal = ref(false);
const canvasRecognitionRoi = ref(null);
const canvasBoundigBox = ref(null);
const canvasShow = ref(false);
const resetCanvas = ref(true);
const snapshotImage = ref(null);

const props = defineProps(["isOpen", "data", "alertFrame", "currentAlert"]);
function saveImage() {
  window.open(`${baseURL}${props.alertFrame.uri}`);
}

const createCanvasPolygons = (points, bgColor, name) => {
  const canvasWidth = snapshotImage.value.clientWidth;
  const canvasHeight = snapshotImage.value.clientHeight;

  let originalWidth = 1920;
  let originalHeight = 1080;
  let ratioX = originalWidth / canvasWidth;
  let ratioY = originalHeight / canvasHeight;

  let canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.zIndex = 0;
  canvas.style.position = "absolute";

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.beginPath();

  console.log('Canvas type:', name);
  points.forEach((point, index) => {
    const x = +(point.x / ratioX).toFixed(0);
    const y = +(point.y / ratioY).toFixed(0);
    console.log(`Point-${index + 1} X:`, x)
    console.log(`Point-${index + 1} Y:`, y)
    console.log('-------------------------');

    if (index === 0) {
      ctx.moveTo(x, y);
    }
    ctx.lineTo(x, y);
  });

  ctx.closePath();
  ctx.fill();

  return canvas;
};

const addPolygons = () => {
  if (!canvasRecognitionRoi.value) {
    const points = props.alertFrame.recognitionRoi
    let canvasRoi = createCanvasPolygons(points, "#46e413ab", 'RecognitionRoi');

    canvasRecognitionRoi.value = canvasRoi;
    document.getElementById("canvasRecognitionRoi").appendChild(canvasRoi);
  }

  if (!canvasBoundigBox.value) {
    const points = props.alertFrame.recognitionData.items[0].boundingBox
    let canvasBoundingBox = createCanvasPolygons(points, "#e00505c9", 'BoundigBox');

    canvasBoundigBox.value = canvasBoundingBox;
    document.getElementById("canvasBoundigBox").appendChild(canvasBoundingBox);
  }
}

const onEyeClick = () => {
  canvasShow.value = !canvasShow.value;
  addPolygons()
};

const onZoomImage = () => {
  isLargeModal.value = !isLargeModal.value;
  resetCanvas.value = false;
  nextTick(() => {
    resetCanvas.value = true;
    setTimeout(() => {
      
      canvasRecognitionRoi.value = null;
      canvasBoundigBox.value = null;

      if (canvasShow.value) {
        addPolygons();
      }
    }, 200);
  });
};
</script>
<script>
import video from "@/modules/mixins/video.js";

export default {
  props: {
    item: Object,
  },
  mixins: [video],
  data() {
    return {
      dataKey: "data",
      isImageMode: true,
    };
  },
  methods: {
    toggleIsImageMode() {
      this.isImageMode = !this.isImageMode;
      this.loadVideoSource();
    },
  },
};
</script>


<style lang="scss">
.modal-alert-details {
  &__dialog {
    min-width: 826px;
    width: 826px;
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }
  &__content {
    padding-top: 12px;
    max-height: calc(100% - 65px);
    overflow-y: auto;
    .content {
      &__top {
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        font-feature-settings: "clig" off;
        color: #2c3f58;
      }
      &__image {
        width: 100%;
        background: #eaeaea;
        margin-top: 12px;
        position: relative;
        .image {
          &__actions {
            display: flex;
            align-items: center;
            align-content: center;
            position: absolute;
            right: 0;
            bottom: 20px;
            cursor: pointer;
          }
          &__icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(31, 41, 55, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
          }
          &__img {
            // object-fit: cover;
            width: 100%;
            height: 100%;
          }
        }
      }
      &__actions {
        display: flex;
        align-items: center;
        padding: 20px 24px 0;
        .actions__btn {
          width: auto;
          min-width: 130px;
          padding: 0 35px;
          height: 44px;
          font-weight: 500;
          font-size: 14px;
          svg {
            margin-right: 12px;
          }
        }
        .btn__delete {
          cursor: pointer;
          display: flex;
          align-items: center;
          color: #ca2619;
          font-weight: 500;
          font-size: 14px;
          img {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>