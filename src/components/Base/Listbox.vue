<script setup>
import { ref, computed } from 'vue'
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

const props = defineProps({
  modelValue: [String, Number, Array],
  options: Array,
  placeholder: {
    type: String,
    default: 'Select option'
  },
  preLabel: {
    type: String,
    default: ''
  },
  multiple: Boolean,
  isShowClear: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['update:modelValue'])

const label = computed(() => {
  try {
    return props.options.filter(option => {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.includes(option.value)
    }
    return  option.value === props.modelValue
  }).map(option => option.label).join(', ')
  } catch (error) {
  }
  // return props.options.find(option => option.value === props.modelValue)?.label
});

const onUpdateValue = (value) => {
  emit('update:modelValue', value)
}

</script>

<script>
export default {
  name: "BaseListbox",
  props: {
    doubleExpandIcon: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<template>
  <Listbox
    :model-value="props.modelValue"
    :multiple="props.multiple"
    @update:modelValue="onUpdateValue"
  >
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span class="block truncate" v-if="label">{{preLabel}}{{ label }}</span>
        <span class="text-gray-500" v-else>{{ props.placeholder }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <img src="/icons/expand_more.svg" alt="" v-if="!doubleExpandIcon">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" v-else />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          v-if="props.options.length"
          class="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            key="clear"
            :value="''"
            as="template"
            v-if="isShowClear"
          >
            <li
              class="text-gray-900 relative cursor-default select-none py-2 pl-10 pr-4"
            >
              <span
                class="font-normal block truncate'"
              >All</span
              >
              <!-- <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span> -->
            </li>
          </ListboxOption>
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in props.options"
            :key="option.label"
            :value="option.value"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
              >{{ option.label }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>


<style scoped>
li {
  cursor: pointer;
}
</style>