<template>
  <div class="w-[660px] h-[371px] leading-none overflow-hidden">
    <div
      v-if="loading"
      class="cameras__modal_no_signal_title flex justify-center items-center"
      style="width: 660px; height: 371px"
    >
      <img src="@/assets/images/load.gif" alt="load" />
    </div>
    <div
      v-else-if="!loadSnapShot"
      class="bg-gray-900 cameras__modal_no_signal_title flex justify-center items-center"
      style="width: 660px; height: 371px"
    >
      <h1 class="text-white">No Signal</h1>
    </div>

    <div v-show="loadSnapShot" class="w-[660px] h-[371px] overflow-auto">
      <div
        v-show="!isControllerEnable"
        :id="`canvas-${uid}`"
        class="w-full"
      >
        <img class="object-contain max-w-full" :src="image" :ref="`imagelasso-${uid}`" alt="" />
      </div>

      <div v-if="isControllerEnable">
        <img  class="max-w-full" :src="video" alt="" />
      </div>
    </div>
    

  </div>
  <div class="h-[65px] pt-2 flex flex-row items-center justify-between">
    <div class="flex gap-4">
      <p>Additional settings</p>
      <Switch
        style="outline: 0"
        v-model="enabledAditional"
        :class="enabledAditional ? 'bg-teal-400' : 'bg-[#626973]'"
        class="relative inline-flex h-6 w-11 items-center rounded-full"
      >
        <span class="sr-only">Enable notifications</span>
        <span
          :class="enabledAditional ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block h-4 w-4 transform rounded-full bg-white"
        />
      </Switch>
    </div>
    <div
      class="transition-all duration-200 ease-in-out"
      :class="[enabledAditional ? 'h-[40px] opacity-100' : 'h-0 overflow-hidden opacity-0']"
    >
      <p class="text-xs leading-none -mb-1">
        Sensitivity: {{ settings.sensitivity }}
      </p>
      <input
        type="range"
        v-model="settings.sensitivity"
        style="width: 156px"
        class="
          h-1
          accent-teal-400
          bg-gray-200
          rounded-lg
          appearance-none
          cursor-pointer
        "
        name="volume"
        min="0"
        step="0.01"
        max="1"
      />
      <!-- <p class="text-xs leading-none mt-1 -mb-1">
        Box Sensitivity: {{ settings.boxSensitivity }}
      </p>
      <input
        type="range"
        v-model="settings.boxSensitivity"
        style="width: 156px"
        name="volume"
        class="
          h-1
          accent-teal-400
          bg-gray-200
          rounded-lg
          appearance-none
          cursor-pointer
        "
        min="0"
        step="0.01"
        max="1"
      /> -->
    </div>
    <div class="flex justify-end items-center">
      <button
        style="width: 40px; height: 40px"
        type="button"
        class="
          flex
          ml-3
          justify-center
          items-center
          select-none
          bg-[#626973]
          rounded-full
          hover:bg-teal-400
        "
        @click="$emit('open-help')"
      >
        <img
          width="13"
          height="19"
          src="@/assets/images/info.svg"
          class="object-cover"
          alt=""
        />
      </button>
      <button
        @click="resizeCanvas"
        :disabled="!loadSnapShot"
        style="width: 40px; height: 40px"
        type="button"
        class="
          flex
          ml-3
          justify-center
          items-center
          select-none
          bg-[#626973]
          rounded-full
          hover:bg-teal-400
        "
      >
        <img
          width="19"
          height="19"
          src="@/assets/images/expand.svg"
          class="object-cover"
          alt=""
        />
      </button>
      <button
        @click="refreshSnapShot()"
        style="width: 40px; height: 40px"
        type="button"
        class="
          flex
          ml-3
          justify-center
          items-center
          select-none
          bg-[#626973]
          rounded-full
          hover:bg-teal-400
        "
      >
        <img
          width="19"
          height="19"
          src="@/assets/images/refresh.svg"
          class="object-cover"
          alt=""
        />
      </button>
      <BaseButton
        id="buttonController"
        @click="enableController"
        :class="[
          { 'bg-[#2D3748] text-white active': isControllerEnable },
          { 'bg-white text-[#2D3748] ': !isControllerEnable },
        ]"
        class="
          flex
          ml-3
          font-bold
          text-sm
        "
        variant="black"
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
              { 'icon-color-white': isControllerEnable },
              { 'icon-color-gray': !isControllerEnable },
            ]"
            class="mr-3"
            src="@/assets/images/controller.svg"
            alt=""
          />
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import {
  QuestionMarkCircleIcon,
  ArrowsExpandIcon,
  RefreshIcon,
} from "@heroicons/vue/solid";

import createLasso from "lasso-canvas-image";
import { Switch } from "@headlessui/vue";
import BaseButton from "@/components/Base/Button.vue";
import HLSCore from '@cloudgeek/playcore-hls'

export default {
  name: "Lasso",
  props: ["image", "video", "coordinates", "loadSnapShot"],
  components: {
    QuestionMarkCircleIcon,
    ArrowsExpandIcon,
    RefreshIcon,
    Switch,
    BaseButton,
  },
  data() {
    return {
      uid: null,
      HLSCore,
      resize: false,
      finishedLoad: true,
      isControllerEnable: false,
      settings: {
        sensitivity: 0,
        boxSensitivity: 0,
        threshold: 0,
      },
      enabledAditional: false,
      imageSize: {
        naturalSize: false,
        naturalWidth: 0,
        naturalHeight: 0,
        width: 0,
        height: 0,
      },
      loading: false,
      lasso: null,
    };
  },

  watch: {
    loadSnapShot(newValue) {
      console.log('newValue', newValue)
      const img = this.$refs[`imagelasso-${this.uid}`];
      this.loadImage(this.image, img)
    }
  },

  methods: {
    refreshSnapShot() {
      this.loading = true;
      this.$emit("refresh-snapshot");
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      setTimeout(() => {
        this.buildLasso();
      }, 2500);
    },
    enableController() {
      this.$emit("enable-controller");
      this.isControllerEnable = !this.isControllerEnable;
    },
    async getLassoMap() {
      try {
        const img = this.$refs[`imagelasso-${this.uid}`];
        
        this.lasso = createLasso({
          element: img,
          radius: 8,
          onChange: (polygon) => {
            let tempCoordinate = polygon
              .split(" ")
              .map((elem) => elem.split(",").map((num) => Number(num)));

            const kWidth = this.ceilNumber(
              this.imageSize.naturalWidth / this.imageSize.width
            );
            const kHeight = this.ceilNumber(
              this.imageSize.naturalHeight / this.imageSize.height
            );

            if (this.imageSize.naturalSize) {
              this.$emit("change", polygon);
            } else {
              this.$emit(
                "change",
                this.transformToCoordinate(
                  tempCoordinate,
                  (elem) => Math.ceil(elem * kWidth),
                  (elem) => Math.ceil(elem * kHeight)
                )
              );
            }
            this.$emit("change-polygon", polygon);
          },
        });

        this.imageSize.naturalWidth = img.naturalWidth;
        this.imageSize.naturalHeight = img.naturalHeight;

        setTimeout(() => {
          const canvas = document.querySelector(`#canvas-${this.uid} canvas`);
          this.imageSize.width = canvas.width;
          this.imageSize.height = canvas.height;

          const ctx = canvas.getContext('2d');
          ctx.strokeStyle = '#fd0101';

          const coordinates = this.coordinates
          let tempCoordinate = coordinates
            .split(" ")
            .map((elem) => elem.split(",").map((num) => Number(num)));

          const kWidth = this.ceilNumber(
            this.imageSize.naturalWidth / this.imageSize.width
          );
          const kHeight = this.ceilNumber(
            this.imageSize.naturalHeight / this.imageSize.height
          );

          if (this.coordinates.length) {
            this.lasso.setPath(
              this.transformToCoordinate(
                tempCoordinate,
                (elem) => Math.ceil(elem / kWidth),
                (elem) => Math.ceil(elem / kHeight)
              )
            );
          }
          
        }, 1000);

      } catch (e) {
        console.error(e);
      }
    },
    transformToCoordinate(array, funcX, funcY) {
      return array
        .map((elem) => funcX(elem[0]) + "," + funcY(elem[1]))
        .join(" ");
    },
    ceilNumber(num, t = 1) {
      return Math.ceil(num * (10 * t)) / (10 * t);
    },
    resizeCanvas() {
      this.resize = !this.resize;
      this.$emit("enable-resize");
      const canvas = document.querySelector(`#canvas-${this.uid} canvas`);

      const ctx = canvas.getContext('2d');
      console.log('ctx', ctx)
      ctx.strokeStyle = '#fd0101';
      console.log('ctx.strokeStyle', ctx.strokeStyle)

      let tempCoordinate = this.coordinates
        .split(" ")
        .map((elem) => elem.split(",").map((num) => Number(num)));

      const kWidth = this.ceilNumber(
        this.imageSize.naturalWidth / this.imageSize.width
      );
      const kHeight = this.ceilNumber(
        this.imageSize.naturalHeight / this.imageSize.height
      );

      if (this.imageSize.naturalSize) {
        canvas.width = this.imageSize.width;
        canvas.height = this.imageSize.height;
        canvas.classList.add('max-w-full')

        this.imageSize.naturalSize = false;
        this.lasso.setPath(
          this.transformToCoordinate(
            tempCoordinate,
            (elem) => Math.ceil(elem / kWidth),
            (elem) => Math.ceil(elem / kHeight)
          )
        );
      } else {
        canvas.width = this.imageSize.naturalWidth;
        canvas.height = this.imageSize.naturalHeight;
        canvas.classList.remove('max-w-full')

        this.imageSize.naturalSize = true;

        this.lasso.setPath(
          this.transformToCoordinate(
            tempCoordinate,
            (elem) => Math.ceil(elem * kWidth),
            (elem) => Math.ceil(elem * kHeight)
          )
        );
      }
    },
    async buildLasso() {
      try {
        await this.getLassoMap();
      } catch (e) {}
    },

    async loadImage(url, elem) {
      return new Promise((resolve, reject) => {
        elem.onload = () => {
          this.finishedLoad = false;
          this.loading = false;
          this.buildLasso();
        };
        elem.onerror = reject;
        elem.src = url;
      });
    }
  },
  mounted() {
    this.uid = this._.uid
    this.loading = true;
    this.$emit("loading-lasso", true);
  },
};
</script>

<style scoped>
.scroll {
  overflow-y: scroll;
  overflow-x: scroll;
}
.hide {
  height: 0px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.icon-color-gray {
  filter: invert(16%) sepia(33%) saturate(529%) hue-rotate(177deg)
    brightness(101%) contrast(88%);
}
.icon-color-white {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg)
    brightness(101%) contrast(102%);
}

#buttonController.active {
  color: #fff;
}
#buttonController:hover > #iconController {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg)
    brightness(101%) contrast(102%);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  @apply bg-primary;
  margin-top: 0px;
}
</style>
