<template>
  <div class="flex justify-between p-4 bg-gray-700 h-20">
    <div class="flex">
      <router-link
        to="/cameras"
        class="mr-4 w-20 flex items-center justify-center hover:bg-gray-600  cursor-pointer rounded-2xl"
        :class="[ route.path === '/cameras' ? 'bg-gray-600' : '']"
      >
        <VideoCameraIcon
          class="h-10 w-10"
          :class="[ route.path === '/cameras' ? 'text-teal-600' : 'text-white']"
        />
      </router-link>
      <router-link
        to="/alerts"
        class="mr-4 w-20 flex items-center justify-center hover:bg-gray-600 cursor-pointer rounded-2xl"
        :class="[ route.path === '/alerts' ? 'bg-gray-600' : '']"
      >
        <BellIcon
          class="h-10 w-10"
          :class="[ route.path === '/alerts' ? 'text-teal-600' : 'text-white']"
        />
      </router-link>
      <router-link
        to="/locations"
        class="mr-4 w-20 flex items-center justify-center hover:bg-gray-600 cursor-pointer rounded-2xl"
        :class="[ route.path === '/locations' ? 'bg-gray-600' : '']"
      >
        <LocationMarkerIcon
          class="h-10 w-10"
          :class="[ route.path === '/locations' ? 'text-teal-600' : 'text-white']"
        />
      </router-link>
      <div
        class="mr-4 w-20 flex items-center justify-center hover:bg-gray-600 cursor-pointer rounded-2xl"
        @click="openSupportModal"
      >
        <MailIcon class="h-10 w-10 text-white"/>
      </div>
    </div>
    <div class="flex">
      <DropdownUserName />
<!--      <div class="mr-4 w-20 flex items-center justify-center hover:bg-gray-600 cursor-pointer rounded-2xl">-->
<!--        <UserCircleIcon class="h-10 w-10 text-white"/>-->
<!--      </div>-->
<!--      <DropdownUser />-->
<!--      <div class="w-20 flex items-center justify-center hover:bg-gray-600 cursor-pointer rounded-2xl">-->
<!--        <LogoutIcon class="h-10 w-10 text-white"/>-->
<!--      </div>-->
    </div>
    <Support :open="supportModal" @close="closeSupportModal" />
  </div>
</template>

<script setup>
import {
  VideoCameraIcon,
  BellIcon,
  LocationMarkerIcon,
  MailIcon,
  UserCircleIcon,
  UserIcon,
  LogoutIcon
} from '@heroicons/vue/outline'
// import {
  // VideoCameraIcon,
  // BellIcon,
  // LocationMarkerIcon,
  // MailIcon,
  // UserCircleIcon,
  // UserIcon,
  // LogoutIcon
// } from '@heroicons/vue/solid'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// import DropdownUser from "@/components/DropdownUser.vue"
import DropdownUserName from "@/components/DropdownUserName.vue"
import Support from "@/components/Modal/Support.vue"

const router = useRouter()
const route = useRoute()


const supportModal = ref(false)

const openSupportModal = () => {
  supportModal.value = !supportModal.value
}

const closeSupportModal = () => {
  supportModal.value = false
}
</script>

<script>

export default {
  name: "Sidebar",
  // components: { Support },
  data() {
    return {
      supportModal: false
    }
  },
  methods: {
    openSupportModal() {
      this.supportModal = !this.supportModal
    },
    closeSupportModal() {
      this.supportModal = false
    }
  }
}
</script>

<style scoped>

</style>