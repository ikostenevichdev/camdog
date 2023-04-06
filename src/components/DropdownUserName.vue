<template>
<!--  <div class="fixed top-16 w-56 text-right">-->
    <Menu as="div" class=" relative flex items-center text-left mr-4 z-10">
      <div class="flex layout__user-avatar">
        <img src="@/assets/images/user-avatar.png" alt="avatar" class="layout__user-avatar ml-5" />
        <MenuButton
          class="inline-flex w-full justify-center rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {{ user.email || 'username@gmail.com' }}
<!--          <UserIcon class="h-10 w-10 text-white"/>-->
          <ChevronDownIcon
            class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </MenuButton>
      </div>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute top-6 right-0 mt-6 w-56 overflow-hidden origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <ul>
            <router-link to="/profile" class="px-4 py-3 flex items-center w-full group hover:bg-gray-100 hover:text-teal-600 cursor-pointer">
              <UserCircleIcon class="h-5 w-5 mr-4 text-teal-600"/>
              <div class="" aria-hidden="true">Profile</div>
            </router-link>
            <router-link to="/billing" class="px-4 py-3 flex items-center w-full group hover:bg-gray-100 hover:text-teal-600 cursor-pointer">
              <CreditCardIcon class="h-5 w-5 mr-4 text-teal-600"/>
              <div class="">Billing</div>
            </router-link>
            <li @click="openSupportModal" class="px-4 py-3 flex items-center w-full group hover:bg-gray-100 hover:text-teal-600 cursor-pointer">
              <MailIcon class="h-5 w-5 mr-4 text-teal-600" />
              <div class="">Support</div>
            </li>
            <a href="https://help.camdog.ai/" target="_blank" class="px-4 py-3 flex items-center w-full group hover:bg-gray-100 hover:text-teal-600 cursor-pointer">
              <InformationCircleIcon class="h-5 w-5 mr-4 text-teal-600" />
              <div class="">Help</div>
            </a>
            <li class="px-4 py-3 flex items-center w-full group hover:bg-gray-100 hover:text-teal-600 cursor-pointer">
<!--            <div class="px-4 py-3 flex items-center w-full group hover:bg-gray-100 hover:text-teal-600 cursor-pointer">-->
              <InformationCircleIcon class="h-5 w-5 mr-4 text-teal-600" />
              <div class="flex items-center justify-between"

              >
                <div class="mr-14">Tooltips</div>
                <Switch
                  v-model="enabled"
                  :class="enabled ? 'bg-teal-900' : 'bg-teal-700'"
                  class="relative inline-flex h-[21px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  <span class="sr-only">Tooltips</span>
                  <span
                    aria-hidden="true"
                    :class="enabled ? 'translate-x-4' : 'translate-x-0'"
                    class="pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                  />
                </Switch>
              </div>
            </li>
            <li
              class="px-4 py-3 flex items-center w-full group hover:bg-gray-100 hover:text-teal-600 cursor-pointer"
              @click="logout"
            >
              <LogoutIcon class="h-5 w-5 mr-4 text-teal-600" />
              <div class="">Logout</div>
            </li>
          </ul>
<!--          <div class="px-1 py-1">-->
<!--            <MenuItem v-slot="{ active }">-->
<!--              <button-->
<!--                :class="[-->
<!--                  active ? 'bg-violet-500 text-white' : 'text-gray-900',-->
<!--                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',-->
<!--                ]"-->
<!--              >-->
<!--                <EditIcon-->
<!--                  :active="active"-->
<!--                  class="mr-2 h-5 w-5 text-violet-400"-->
<!--                  aria-hidden="true"-->
<!--                />-->
<!--                Edit-->
<!--              </button>-->
<!--            </MenuItem>-->
<!--            <MenuItem v-slot="{ active }">-->
<!--              <button-->
<!--                :class="[-->
<!--                  active ? 'bg-violet-500 text-white' : 'text-gray-900',-->
<!--                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',-->
<!--                ]"-->
<!--              >-->
<!--                <DuplicateIcon-->
<!--                  :active="active"-->
<!--                  class="mr-2 h-5 w-5 text-violet-400"-->
<!--                  aria-hidden="true"-->
<!--                />-->
<!--                Duplicate-->
<!--              </button>-->
<!--            </MenuItem>-->
<!--          </div>-->
<!--          <div class="px-1 py-1">-->
<!--            <MenuItem v-slot="{ active }">-->
<!--              <button-->
<!--                :class="[-->
<!--                  active ? 'bg-violet-500 text-white' : 'text-gray-900',-->
<!--                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',-->
<!--                ]"-->
<!--              >-->
<!--                <ArchiveIcon-->
<!--                  :active="active"-->
<!--                  class="mr-2 h-5 w-5 text-violet-400"-->
<!--                  aria-hidden="true"-->
<!--                />-->
<!--                Archive-->
<!--              </button>-->
<!--            </MenuItem>-->
<!--            <MenuItem v-slot="{ active }">-->
<!--              <button-->
<!--                :class="[-->
<!--                  active ? 'bg-violet-500 text-white' : 'text-gray-900',-->
<!--                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',-->
<!--                ]"-->
<!--              >-->
<!--                <MoveIcon-->
<!--                  :active="active"-->
<!--                  class="mr-2 h-5 w-5 text-violet-400"-->
<!--                  aria-hidden="true"-->
<!--                />-->
<!--                Move-->
<!--              </button>-->
<!--            </MenuItem>-->
<!--          </div>-->

<!--          <div class="px-1 py-1">-->
<!--            <MenuItem v-slot="{ active }">-->
<!--              <button-->
<!--                :class="[-->
<!--                  active ? 'bg-violet-500 text-white' : 'text-gray-900',-->
<!--                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',-->
<!--                ]"-->
<!--              >-->
<!--                <DeleteIcon-->
<!--                  :active="active"-->
<!--                  class="mr-2 h-5 w-5 text-violet-400"-->
<!--                  aria-hidden="true"-->
<!--                />-->
<!--                Delete-->
<!--              </button>-->
<!--            </MenuItem>-->
<!--          </div>-->
        </MenuItems>
      </transition>
      <Support :open="supportModal" @close="closeSupportModal" />
    </Menu>
<!--  </div>-->
</template>

<script setup>
import { ref } from 'vue'
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import { Switch } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import {
  UserCircleIcon,
  CreditCardIcon,
  MailIcon,
  InformationCircleIcon,
  LogoutIcon
} from '@heroicons/vue/solid'
// import ArchiveIcon from './archive-icon.vue'
// import DuplicateIcon from './duplicate-icon.vue'
// import MoveIcon from './move-icon.vue'
// import EditIcon from './edit-icon.vue'
// import DeleteIcon from './delete-icon.vue'
import Support from "@/components/Modal/Support.vue"

const supportModal = ref(false)
const enabled = ref(false)

const openSupportModal = () => {
  supportModal.value = !supportModal.value
}

const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))

const closeSupportModal = () => {
  supportModal.value = false
}
</script>

<script>
// import Support from "@/components/Modal/Support.vue"

export default {
  name: "Camera",
  // components: { Support },
  // data() {
  //   return {
  //     supportModal: false
  //   }
  // },
  // methods: {
  //   openSupportModal() {
  //     this.supportModal = !this.supportModal
  //   },
  //   closeSupportModal() {
  //     this.supportModal = false
  //   }
  // }
  methods: {
    logout() {
      this.$cookies.remove('token')
      this.$cookies.remove('refreshToken')
      this.$router.push({ name: 'login' });
    }
  }
}
</script>
