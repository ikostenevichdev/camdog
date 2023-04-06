<template>
<!--  <div class="fixed top-16 w-56 text-right">-->
    <Menu as="div" class="z-50 relative mr-4 w-20 flex items-center justify-center hover:bg-gray-600 cursor-pointer rounded-2xl">
<!--      <div>-->
<!--          class="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"-->
        <MenuButton
          class="">
<!--          username@gmail.com-->
          <UserIcon class="h-10 w-10 text-white"/>
<!--          <ChevronDownIcon-->
<!--            class="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"-->
<!--            aria-hidden="true"-->
<!--          />-->
        </MenuButton>
<!--      </div>-->

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute top-12 right-0 mt-6 w-56 overflow-hidden origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
            <router-link to="/support" class="px-4 py-3 flex items-center w-full group hover:bg-gray-100 hover:text-teal-600 cursor-pointer">
              <MailIcon class="h-5 w-5 mr-4 text-teal-600" />
              <div class="">Support</div>
            </router-link>
            <a href="https://help.camdog.ai/" target="_blank" class="px-4 py-3 flex items-center w-full group hover:bg-gray-100 hover:text-teal-600 cursor-pointer">
              <InformationCircleIcon class="h-5 w-5 mr-4 text-teal-600" />
              <div class="">Help</div>
            </a>
            <router-link to="/" class="px-4 py-3 flex items-center w-full group hover:bg-gray-100 hover:text-teal-600 cursor-pointer">
              <LogoutIcon class="h-5 w-5 mr-4 text-teal-600" />
              <div class="">Logout</div>
            </router-link>
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
    </Menu>
<!--  </div>-->
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'
import {
  UserCircleIcon,
  CreditCardIcon,
  MailIcon,
  InformationCircleIcon,
  LogoutIcon
} from '@heroicons/vue/solid'
 import {
   UserIcon
} from '@heroicons/vue/outline'
// import ArchiveIcon from './archive-icon.vue'
// import DuplicateIcon from './duplicate-icon.vue'
// import MoveIcon from './move-icon.vue'
// import EditIcon from './edit-icon.vue'
// import DeleteIcon from './delete-icon.vue'
</script>
