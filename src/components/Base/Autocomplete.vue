<template>
<div class="w-full">
    <ComboboxLabel v-if="label" class="mb-2 block text-gray-500">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </ComboboxLabel>
    <Combobox v-model="selected">
        <div class="input relative mt-1">
            <div class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <ComboboxInput
                  class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  :displayValue="(item) => item.name"
                  @change="query = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </ComboboxButton>
            </div>
            <TransitionRoot leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <ComboboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                <div v-if="!filterOptions.length" class="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                </div>
                <ComboboxOption
                  v-for="item in filterOptions"
                  as="template"
                  :key="item.id"
                  :value="item"
                  v-slot="{ selected, active }"
                >
                  <li
                    class="relative cursor-default select-none py-2 pl-10 pr-4"
                    :class="{'bg-teal-600 text-white': active, 'text-gray-900': !active,}"
                    @click="$emit('update:modelValue', item.value)"
                  >
                    <span class="block truncate" :class="{ 'font-medium': selected, 'font-normal': !selected }">
                        {{ item.name }}
                    </span>
                    <span
                      v-if="selected"
                      class="absolute inset-y-0 left-0 flex items-center pl-3"
                      :class="{ 'text-white': active, 'text-teal-600': !active }"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ComboboxOption>
              </ComboboxOptions>
            </TransitionRoot>
        </div>
    </Combobox>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import {
  CheckIcon,
  SelectorIcon
} from '@heroicons/vue/solid'

const props = defineProps({
  load: { type: Boolean, default: false },
  options: { type: Array, default: [] },
  required: { type: Boolean, default: false },
  label: { type: String, default: '' },
})


let selected = ref('')
let query = ref('')

let filterOptions = computed(() =>
    query.value === '' ?
    props.options :
    props.options.filter((item) =>
        item.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.value.toLowerCase().replace(/\s+/g, ''))
    )
)
</script>
