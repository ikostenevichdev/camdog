<script setup>
import { ref, computed } from "vue";
import {WifiIcon} from "@heroicons/vue/outline"
const props = defineProps({
  iconClass:{
    type: String,
    default:""
  },
  title: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "submit",
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: false 
  },
  variant: {
    type: Boolean,
    default: 'default' 
  },
  disabled: Boolean,
  width: String,
  height: String,
  justify: String,
  btnClasses: String,
});

const variants = {
  default: 'bg-primary text-white hover:bg-primary-darker',
  gray: 'gray-btn'
}

const outlineVariants = {
  default: 'text-teal-400 hover:bg-teal-400 hover:text-white border-primary',
  gray: 'text-gray-light hover:bg-gray-light hover:text-white border-gray-light',
  black: 'text-gray-dark hover:bg-gray-dark hover:text-white border-gray-dark',
  red: 'text-red-700 hover:bg-red-700 hover:text-white border-red-700'
}

const classes = computed(() => {
  let btnClasses = ref([
    { "rounded-full ": props.rounded },
    { "justify-center": !props.justify },
    { "justify-start": !props.justify === 'start'},
    { "justify-end": !props.justify === 'end'},
    {'border border-solid' : props.outline},
    props.rounded ? "rounded-full" : "rounded-lg",
    props.width ? `w-${props.width}` : "w-44",
    props.height ? `h-${props.height}` : "h-12",
    props.outline
      ? outlineVariants[props.variant]
      : variants[props.variant],
    props.active ? "bg-primary important-text-white" : "",
    props.border && "border border-primary",
  ]);
  return btnClasses.value;
});
</script>

<script>
export default {
  name: "BaseButton",
};
</script>

<template>
  <button
    :id="props.id"
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center transition-all ease-in-out duration-200"
    :class="[classes, btnClasses]"
  >
    <template v-if="props.icon==='wifi'">
      <WifiIcon class="mr-2" style="width: 28px; height: 32px" />
    </template>

    <slot name="btnImage"></slot> {{ props.title }}
  </button>
</template>

<style scoped>
.icon-color-white{
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
.icon-color-black{
  filter: invert(16%) sepia(33%) saturate(529%) hue-rotate(177deg) brightness(101%) contrast(88%)
}
</style>
