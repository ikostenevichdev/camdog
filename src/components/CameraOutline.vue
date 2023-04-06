<template>
  <div class="flex-col h-68 p-2 border-2 border-gray-300 rounded-xl overflow-hidden">
    <div class="h-40 overflow-hidden">
      <img src="@/assets/images/kiev.webp" class="object-cover" alt="">
    </div>
    <div class="py-2 text-xl text-gray-600 cursor-default">camera1</div>
    <div class="flex justify-between">
      <div class="text-gray-400 border-2 border-gray-400 hover:text-green-500 hover:border-green-500 px-1 rounded cursor-pointer"
      @click="openM">
        Live
      </div>
      <PlayIcon class="h-7 w-7 text-gray-400 hover:text-teal-600 cursor-pointer" />
      <ExclamationIcon class="h-7 w-7 text-gray-400 hover:text-yellow-500 cursor-pointer" />
      <AdjustmentsIcon class="h-7 w-7 text-gray-400 hover:text-gray-500 cursor-pointer" />
      <BellIcon class="h-7 w-7 text-gray-400 hover:text-amber-600 cursor-pointer" />
      <TrashIcon class="h-7 w-7 text-gray-400 hover:text-red-500 cursor-pointer" />
    </div>
  </div>
  <LiveMode :open="openLiveModeModal" @close="closeM" />
<!--    :open="this.openLiveModeModal"-->
<!--    @close="this.openLiveModeModal = false"-->
</template>

<script setup>
// import LiveMode from "@/components/Modal/LiveMode.vue"

import {
  PlayIcon,
  ExclamationIcon,
  AdjustmentsIcon,
  BellIcon,
  TrashIcon
// } from '@heroicons/vue/solid'
} from '@heroicons/vue/outline'
</script>

<script>
import LiveMode from "@/components/Modal/LiveMode.vue"

export default {
  name: "Camera",
  components: { LiveMode },
  data() {
    return {
      openLiveModeModal: false
    }
  },
  methods: {
    openM() {
      this.openLiveModeModal = !this.openLiveModeModal
    },
    closeM() {
      this.openLiveModeModal = false
    }
  }
}
</script>

<style scoped>

</style>