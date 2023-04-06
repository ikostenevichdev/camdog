<script setup lang="ts">
const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  id: { type: String, default: "" },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  rows: { type: String, default: "4" },
  error: { type: Array, default: () => [] },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: { target: { value: string | number } }) => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div
    :class="[
      { 'border-red-500': error.length },
      { 'border-blue-500': !error.length },
    ]"
  >
    <label
      :for="id"
      class="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      {{ label }}
    </label>
    <textarea
      :id="id"
      :value="modelValue"
      type="textarea"
      :rows="rows"
      :placeholder="placeholder"
      class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 outline-0 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      @input="updateValue"
    />
  </div>
</template>

<style scoped></style>
