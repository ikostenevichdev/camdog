<template>
  <div class="flex items-center">
    <div
      class="buttonWrapper cursor-pointer p-2"
      
      @click="updateValue(2)"
    >
      <button
        id="button4x"
        :class="[{ 'active bg-teal-400 stroke-teal-400 text-white': columns === 2 }]"
        class="
          button
          py-2
          px-4
          rounded-full
          inline-flex
          items-center
          text-xs
          font-medium
          text-center text-[#B4B4B4]
          transition-colors ease-in duration-75
          bg-white
          hover:bg-teal-400 hover:text-white
          focus:bg-teal-400 focus:text-white
        "
      >
        <img
          id="icon4x"
          class="icon buttonWrapper__center buttonWrapper__icon-color"
          src="@/assets/images/windows-four.svg"
          alt=""
        />
        <span>4x</span>
      </button>
    </div>
    <div></div>
    <div
      class="buttonWrapper cursor-pointer"
      
      @click="updateValue(3)"
    >
      <button
        id="button6x"
        :class="[{ 'active bg-teal-400 stroke-teal-400 text-white': columns === 3 }]"
        class="
          button
          py-2
          px-4
          rounded-full
          inline-flex
          items-center
          text-xs
          font-medium
          text-center text-[#B4B4B4]
          transition-colors ease-in duration-75
          bg-white
          hover:bg-teal-400 hover:text-white
          focus:bg-teal-400 focus:text-white
        "
      >
        <img
          id="icon6x"
          class="icon buttonWrapper__center buttonWrapper__icon-color"
          src="@/assets/images/windows-six.svg"
          alt=""
        />
        <span>6x</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  columns: { type: Number },
});

const emit = defineEmits(["update:columns"]);

const updateValue = (value) => {
  emit("update:columns", value);
};
</script>
<script>
export default {
  name: "ViewSelector",
};
</script>

<style scoped>
.buttonWrapper.selected svg path {
  stroke: #21a28e;
}
.buttonWrapper__icon-color {
  filter: invert(80%) sepia(1%) saturate(186%) hue-rotate(315deg)
    brightness(90%) contrast(93%);
}
.buttonWrapper__center {
  margin: 0 4px;
}

.button.active {
  color: white;
}

.button.active > .icon,
.button:hover > .icon {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg)
    brightness(101%) contrast(102%);
}
</style>
