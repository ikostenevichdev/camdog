<script setup>
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'rgba(60,60,60,0.5)'
  },
  size: {
    type: String,
    default: '15'
  }
})
</script>
<template>
<span>
  <svg v-if="name === 'stop'" :width="size" :height="size" :style="`fill: ${color};`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18,18H6V6H18V18Z" /></svg>
  <svg v-if="name === 'play'" :width="size" :height="size" :style="`fill: ${color};`" viewBox="0 0 24 24"><path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>
</span>
</template>
