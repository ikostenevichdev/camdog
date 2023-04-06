<template>
  <div>
    <div class="flex flex-col justify-center items-center">
      <button
        id="arrowUp"
        style="width: 56px; height: 56px"
        type="button"
        class="
          control-button
          transition-all
          duration-100
          ease-in
          flex
          justify-center
          items-center
          select-none
          bg-white
          border
          rounded-full
          hover:bg-teal-400
        "
      >
        <img
          id="iconUp"
          width="22"
          height="22"
          src="@/assets/images/arrow_upward.svg"
          class="object-cover"
          alt=""
        />
      </button>
      <div class="flex flex-row">
        <button
          id="arrowBack"
          style="width: 56px; height: 56px"
          type="button"
          class="
            control-button
            transition-all
            duration-100
            ease-in
            flex
            mr-3
            mt-3
            justify-center
            items-center
            select-none
            bg-white
            border
            p-2
            m-2
            rounded-full
            hover:bg-teal-400
          "
        >
          <img
            id="iconBack"
            width="22"
            height="22"
            src="@/assets/images/arrow_back.svg"
            class="object-cover"
            alt=""
          />
        </button>
        <button
          style="width: 32px; height: 32px"
          type="button"
          class="
            transition-all
            duration-100
            ease-in
            flex
            mt-6
            justify-center
            items-center
            select-none
            bg-white
            border
            text-xl
            font-bold
            p-2
            m-2
            rounded-full
            shadow
            focus:outline-none focus:shadow-outline
          "
        ></button>
        <button
          id="arrowForward"
          style="width: 56px; height: 56px"
          type="button"
          class="
            control-button
            transition-all
            duration-100
            ease-in
            flex
            ml-3
            mt-2.5
            justify-center
            items-center
            select-none
            bg-white
            border
            p-2
            m-2
            rounded-full
            hover:bg-teal-400
          "
        >
          <img
            id="iconForward"
            width="22"
            height="22"
            src="@/assets/images/arrow_forward.svg"
            class="object-cover"
            alt=""
          />
        </button>
      </div>
      <button
        id="arrowDown"
        style="width: 56px; height: 56px;"
        type="button"
        class="
          control-button
          transition-all
          duration-100
          ease-in
          flex
          justify-center
          items-center
          select-none
          bg-white
          border
          p-2
          mt-1
          hover:bg-teal-400
          rounded-full
        "
      >
        <img
          id="iconDown"
          width="22"
          height="22"
          src="@/assets/images/arrow_downward.svg"
          class="object-cover"
          alt=""
        />
      </button>
    </div>
    <div class="mt-2 flex justify-center">
      <p class="pr-1 text-sm">In</p>
      <input
        type="range"
        style="width: 170px"
        v-model="dataController.settings.zoom"
        class="
          h-1
          m-2
          ml-2
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
      <p class="pb-4 pl-1 text-sm">Out</p>
    </div>
    <p class="flex justify-center font-bold">Zoom</p>
  </div>
</template>
<script setup>
import { ref, watch, inject, reactive } from "vue";
const dataController = reactive({
  settings: {
    zoom: 0,
  },
});
</script>
<script>
import {
  QuestionMarkCircleIcon,
  ArrowsExpandIcon,
  RefreshIcon,
} from "@heroicons/vue/solid";

export default {
  name: "Lasso",
  props: ["image", "coordinates"],
  components: {
    QuestionMarkCircleIcon,
    ArrowsExpandIcon,
    RefreshIcon,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>

#arrowForward:hover > #iconForward,
#arrowBack:hover > #iconBack,
#arrowUp:hover > #iconUp,
#arrowDown:hover > #iconDown {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg)
    brightness(200%) contrast(102%);
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  @apply bg-primary;
  margin-top: 0px;
}

</style>
