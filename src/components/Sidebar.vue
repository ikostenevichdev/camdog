<template>
  <div class="fixed z-10 bg-gray-800 w-[105px] h-screen overflow-auto sideBar">
    <div class="flex justify-center my-4">
      <img :src="logoURL || '/icons/logo.svg'" alt="logo" class="layout__logo-img" v-if="logoURL"/>
    </div>
    <ul class="text-white">
      <template v-for="(item, index) in menuItems" :key="index">
        <router-link
          :to="item.link"
          class="
            layout__navbar-item
            px-4
            py-3
            grid
            w-full
            group
            cursor-pointer
            items-center
            sideBar-link
          "
          style="grid-template-columns: 18px 1fr"
          :class="{ 'layout__navbar-item-active': $route.path.includes(item.name.toLowerCase())}"
        >
          <div
            class="layout__icon layout__icon-inactive"
            :class="{ 'layout__icon-active': $route.path.includes(item.name.toLowerCase())}"
          >
            <component
              :is="item.componentImg"
              class="w-5 h-5"
            ></component>
          </div>
          <div>
            {{ item.name }}
          </div>
        </router-link>
      </template>
      <!-- <router-link
        to="/cameras"
        class="
          px-4
          py-3
          grid
          w-full
          group
          hover:bg-gray-600 hover:text-teal-600
          cursor-pointer
          items-center
        "
        style="grid-template-columns: 18px 1fr"
        :class="{ 'justify-center': isToggle, isToggle: isToggle }"
      >
        <VideoCameraIcon
          class="text-white group-hover:bg-gray-600 group-hover:text-teal-600"
          :class="{ 'w-10': isToggle, 'h-10': isToggle }"
        />
        <div
          class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600 none"
          :class="{ 'w-0': isToggle, truncate: isToggle, invisible: isToggle }"
        >
          Cameras
        </div>
      </router-link> -->

      <!-- <router-link
        to="/videos"
        class="
          px-4
          py-3
          flex
          items-center
          w-full
          group
          hover:bg-gray-600 hover:text-teal-600
          cursor-pointer
        "
      >
        <PlayIcon
          class="
            h-5
            w-5
            text-white
            group-hover:bg-gray-600 group-hover:text-teal-600
          "
        />
        <div class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600">
          Videos
        </div>
      </router-link> -->
      <!-- <router-link
        to="/videowall"
        class="
          px-4
          py-3
          flex
          items-center
          w-full
          group
          hover:bg-gray-600 hover:text-teal-600
          cursor-pointer
        "
      >
       <ViewGridIcon
          class="
            h-5
            w-5
            text-white
            group-hover:bg-gray-600 group-hover:text-teal-600
          "
        />
        <div class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600">
          Videowall
        </div>
      </router-link> -->
      <!-- <router-link
        to="/locations"
        class="
          px-4
          py-3
          flex
          items-center
          w-full
          group
          hover:bg-gray-600 hover:text-teal-600
          cursor-pointer
        "
      >
        <LocationMarkerIcon
          class="
            h-5
            w-5
            text-white
            group-hover:bg-gray-600 group-hover:text-teal-600
          "
        />
        <div class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600">
          Locations
        </div>
      </router-link> -->
      <!-- <router-link
        to="/alerts"
        class="
          px-4
          py-3
          flex
          items-center
          w-full
          group
          hover:bg-gray-600 hover:text-teal-600
          cursor-pointer
        "
      >
        <BellIcon
          class="
            h-5
            w-5
            text-white
            group-hover:bg-gray-600 group-hover:text-teal-600
          "
        />
        <div class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600">
          Alerts
        </div>
      </router-link> -->
      <!--    <router-link to="/profile" class="px-4 py-3 flex items-center w-full group hover:bg-gray-600 hover:text-teal-600 cursor-pointer">-->
      <!--      <UserCircleIcon class="h-5 w-5 text-white group-hover:bg-gray-600 group-hover:text-teal-600"/>-->
      <!--      <div class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600">Profile</div>-->
      <!--    </router-link>-->
      <!--    <router-link to="/billing" class="px-4 py-3 flex items-center w-full group hover:bg-gray-600 hover:text-teal-600 cursor-pointer">-->
      <!--      <CreditCardIcon class="h-5 w-5 text-white group-hover:bg-gray-600 group-hover:text-teal-600"/>-->
      <!--      <div class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600">Billing</div>-->
      <!--    </router-link>-->
      <!-- <router-link
        to="/reports"
        class="
          px-4
          py-3
          flex
          items-center
          w-full
          group
          hover:bg-gray-600 hover:text-teal-600
          cursor-pointer
        "
      >
        <DocumentTextIcon
          class="
            h-5
            w-5
            text-white
            group-hover:bg-gray-600 group-hover:text-teal-600
          "
        />
        <div class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600">
          Reports
        </div>
      </router-link> -->
      <!--    <router-link to="/support" class="px-4 py-3 flex items-center w-full group hover:bg-gray-600 hover:text-teal-600 cursor-pointer">-->
      <!--      <MailIcon class="h-5 w-5 text-white group-hover:bg-gray-600 group-hover:text-teal-600"/>-->
      <!--      <div class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600">Support</div>-->
      <!--    </router-link>-->
      <!--    <a href="https://help.camdog.ai/" target="_blank" class="px-4 py-3 flex items-center w-full group hover:bg-gray-600 hover:text-teal-600 cursor-pointer">-->
      <!--      <InformationCircleIcon class="h-5 w-5 text-white group-hover:bg-gray-600 group-hover:text-teal-600"/>-->
      <!--      <div class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600">Help</div>-->
      <!--    </a>-->
      <!--    <router-link to="/" class="px-4 py-3 flex items-center w-full group hover:bg-gray-600 hover:text-teal-600 cursor-pointer">-->
      <!--      <LogoutIcon class="h-5 w-5 text-white group-hover:bg-gray-600 group-hover:text-teal-600"/>-->
      <!--      <div class="pl-4 group-hover:bg-gray-600 group-hover:text-teal-600">Logout</div>-->
      <!--    </router-link>-->
    </ul>
  </div>
</template>

<script setup>
import {
  VideoCameraIcon,
  BellIcon,
  PlayIcon,
  ViewGridIcon,
  LocationMarkerIcon,
  DocumentTextIcon,
  ClipboardListIcon,
} from "@heroicons/vue/outline";
import { ref } from "vue";
const isToggle = ref(false);
const toggleMenu = () => {
  isToggle.value = !isToggle.value;
};
const logoURL = import.meta.env.VITE_VUE_LOGO

const menuItems = [
  { id: 1, name: "Cameras", link: "/cameras", componentImg: VideoCameraIcon },
  { id: 2, name: "Videos", link: "/videos", componentImg: PlayIcon },
  { id: 3, name: "Videowall", link: "/videowall", componentImg: ViewGridIcon },
  {
    id: 4,
    name: "Locations",
    link: "/locations",
    componentImg: LocationMarkerIcon,
  },
  { id: 5, name: "Alerts", link: "/alerts", componentImg: BellIcon },
  { id: 6, name: "Reports", link: "/reports", componentImg: DocumentTextIcon },
];
</script>

<script>
export default {
  name: "Sidebar",
};
</script>

<style lang="scss" scoped>
.sideBar {
  transition: 0.3s;
  &-icon {
    transition: 0.3s;
  }
  &-link {
    transition: 0.3s;
  }
}
.isToggle {
  grid-template-columns: 37px 0 !important;
}
</style>