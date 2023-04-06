<script setup>
const props = defineProps({
  modelValue: { type: [String, Number], default: "" },
  id: { type: String, default: "" },
  label: { type: String, default: "" },
  type: { type: String, default: "text" },
  name: { type: String, default: "" },
  classWrapper: { type: String, default: "" },
  inputClass: { type: String, default: "" },
  beforeInput: { type: Boolean, default: false },
  placeholder: { type: String, default: "" },
  slots: { type: String, default: "" },
  size: { type: String, default: "" },
  accept: { type: String, default: "" },
  error: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  maska: { type: [String, Object], default: "" },
  maskaLazy: { type: Boolean, default: false },
  outline: { type: Boolean, default: false },
});
const emit = defineEmits(["update:modelValue"]);
const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

const outlineClass = "rounded-md border-gray-300 h-12";
const inputClassComp = `border-none ${props.inputClass}`;
</script>

<template>
  <div>
    <Field :name="name" type="password" v-slot="{ field }">
      <div
        class="flex flex-col py-2"
        style="position: relative"
        :class="[
          { 'border-red-400': error },
          classWrapper,
          outline ? '' : 'border-b-2 border-gray-300',
        ]"
      >
        <label
          :for="id"
          class="mb-2 block"
          :class="[
            { 'text-red-400': error },
            outline ? 'text-gray-800' : 'text-gray-500',
          ]"
        >
          {{ label }} <span v-if="required" class="text-red-500">*</span>
        </label>
        <div class="relative">
          <input
            v-bind="field"
            :id="id"
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            :data-slots="slots"
            :size="size"
            required=""
            :data-accept="accept"
            v-imask="maska ? { mask: maska, lazy: maskaLazy } : null"
            class="
              appearance-none
              focus:shadow-none focus:ring-white
              bg-transparent
              w-full
              text-gray-700
              mr-3
              py-1
              px-2
              leading-tight
              focus:outline-none
            "
            :class="[outline ? outlineClass : inputClassComp]"
            @input="updateValue"
          />
          <div
            style="
              width: 32px;
              position: absolute;
              right: 0;
              top: 50%;
              transform: translate(0, -50%);
              display: flex;
              align-items: center;
              justify-content: center;
            "
            v-if="beforeInput"
          >
            <slot name="beforeInput"> </slot>
          </div>
        </div>
      </div>
      <p class="text-red-500 text-sm leading-4 mt-2" v-if="error">
        <ErrorMessage :name="name" />
      </p>
    </Field>
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
import { IMaskDirective } from "vue-imask";

export default {
  components: { Field, ErrorMessage },
  directives: {
    imask: IMaskDirective,
  },
};
</script>

<style scoped></style>
