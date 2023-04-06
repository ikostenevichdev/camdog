<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="
                w-full
                max-w-xl
                transform
                rounded-2xl
                bg-white
                px-8
                pb-6
                text-left
                align-middle
                shadow-xl
                transition-all
              "
            >
              <DialogTitle
                as="h3"
                class="
                  pt-6
                  pb-4
                  -mx-8
                  px-8
                  flex
                  items-center
                  justify-between
                  text-xl
                  font-medium
                  leading-6
                  text-gray-900
                  border-b border-gray-200
                  cursor-move
                "
              >
                Connection string pattern
                <XIcon
                  class="
                    w-4
                    h-4
                    text-gray-500
                    hover:text-teal-600
                    cursor-pointer
                  "
                  @click="closeModal"
                />
              </DialogTitle>
              <div v-if="isLoad || load" class="flex justify-center">
                <img src="@/assets/images/load.gif" alt="load" />
              </div>
              <Form
                v-else
                v-slot="{ handleSubmit, errors }"
                :validation-schema="schema"
              >
                <form @submit.prevent="handleSubmit(onSubmit)">
                  <div class="items mt-2 flex flex-col space-y-2">
                    <BaseAutocomplete
                      class="base-autocomplete"
                      label="Camera Name"
                      required
                      v-model="form.cameraName"
                      :options="cameraNames"
                      @update:modelValue="getCameraModels"
                    />
                    <BaseAutocomplete
                      class="base-autocomplete"
                      v-model="form.model"
                      label="Camera Model"
                      required
                      :options="cameraModel"
                      @update:modelValue="getModelsConnectionOptions"
                    />
                    <BaseAutocomplete
                      v-model="form.uri"
                      class="base-autocomplete"
                      label="Schema"
                      required
                      :options="cameraSchema"
                    />
                    <BaseInput
                      v-model="form.addr"
                      class="base-input"
                      label="Camera IP"
                      name="ip"
                      required
                      :error="!!errors['ip']"
                    />
                    <BaseInput
                      v-model="form.login"
                      class="base-input"
                      label="Camera Login"
                      name="login"
                      required
                      :error="!!errors['login']"
                    />
                    <BaseInput
                      v-model="form.password"
                      class="base-input"
                      label="Camera Password"
                      name="password"
                      required
                      :error="!!errors['password']"
                    />
                    <BaseAutocomplete
                      v-model="form.scheme"
                      class="base-autocomplete"
                      label="Additional data"
                      :options="cameraSchema"
                    />
                    <BaseInput
                      v-model="connectionUriString"
                      class="base-input m-without-label"
                      name="url"
                      placeholder="Here will be generated connection string."
                      :error="!!errors['url']"
                    />
                    <div class="flex justify-between pt-4">
                      <BaseButton
                        :title="connectionUriString ? 'Insert' : 'Generate'"
                        class="border-solid border-2 border-teal-400"
                        type="button"
                        rounded
                        outline
                        @click="connectionUriString ? insert() : compose()"
                      />
                      <BaseButton
                        title="CANCEL"
                        rounded
                        outline
                        class="
                          border-solid border-2 border-gray-500
                          hover:border-teal-400
                        "
                        type="button"
                        @click="closeModal"
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { XIcon } from "@heroicons/vue/solid";
import { ref, watch, inject } from "vue";
import { useRouter } from "vue-router";
import BaseInput from "@/components/Base/Input.vue";
import BaseButton from "@/components/Base/Button.vue";
import BaseListbox from "@/components/Base/Listbox.vue";
import BaseAutocomplete from "@/components/Base/Autocomplete.vue";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const props = defineProps({
    open: { type: Boolean, default: false },
    load: { type: Boolean, default: false },
    locations: { type: Array, default: [] },
  }),
  emit = defineEmits(["close", "save"]);

// const schema = ref(yup.object({
//     displayName: yup
//       .string()
//       .required("The email is required.")
//       .min(
//         2,
//         "value length must be at least 2 runes"
//       ),
//     addr: yup.string().required("The ONVIF IP is required.").min(10).max(21),
//     addr: yup.string().required("The Port is required."),
//     user: yup.string().required("The ONVIF Login is required.").min(2).max(50),
//     password: yup
//       .string()
//       .required("The ONVIF Password is required."),
//   }))
const { $api, snotify } = inject("$app");
const router = useRouter();

let isOpen = ref(props.open),
  isLoad = ref(props.load),
  selectedTab = ref(0),
  profiles = ref([]),
  cameraNames = ref([]),
  cameraModel = ref([]),
  cameraSchema = ref([]),
  form = ref({
    ip: "",
    displayName: "",
    connectionUri: "",
    cameraName: "",
    model: "",
    scheme: "",
    addr: "",
    password: "",
    login: "",
    url: " ",
  });

watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);

const connectionUriString = ref("");

//-- methods
function closeModal() {
  isOpen.value = false;
  router.replace({
    query: {
      cameraNewMode: "manual",
    },
  });
  emit("close");
}
function onSubmit() {
  emit("save", { formUri, form, selectedTab });
}
function testConnection() {
  emit("test", { formUri, form, selectedTab });
}

function liveBtn() {
  console.log("liveBtn clicked");
}

function ptzBtn() {
  console.log("ptzBtn clicked");
}
function insert() {
  isOpen.value = false;
  router.replace({
    query: {
      cameraNewMode: "manual",
      connectionUri: connectionUriString.value,
    },
  });
  emit("close");
}
async function compose() {
  const payload = { ...form.value };
  payload.scheme = cameraSchema.value.find(
    (el) => el.value === payload.uri
  ).name;
  payload.uri += `?user=${payload.login}&pwd=${payload.password}`;
  const {
    data: { connectionUri },
  } = await $api.cameras.composeConnectionUri(payload);
  connectionUriString.value = connectionUri;
}
loadStartData();
function loadStartData() {
  getVendors();
}

async function getVendors() {
  const {
    data: { vendors },
  } = await $api.cameras.getVendors();
  cameraNames.value = vendors.map((el) => ({
    name: el.displayName,
    value: el.id,
  }));
}
// cameraSchema = ref([]),}
// async function getVendorsModels() {
//   const {
//     data: { vendors },
//   } = await $api.cameras.getVendorsModels();
//   cameraModel.value = vendors.map(el => ({
//     name: el.displayName,
//     value: el.id
//   }));
// }
async function getCameraModels(name) {
  const {
    data: { models },
  } = await $api.cameras.getVendorsModels(name);
  cameraModel.value = models.map((el) => ({
    name: el.displayName,
    value: el.id,
  }));
}
async function getModelsConnectionOptions(modelId) {
  const {
    data: { connectionOptions },
  } = await $api.cameras.getModelsConnectionOptions(modelId);

  cameraSchema.value = connectionOptions.map((el) => ({
    name: el.scheme,
    value: el.uri,
  }));
}
</script>

<style>
.ip-wrapper {
  display: flex;
  gap: 15px;
}
.ip-wrapper__ip {
  flex-basis: 100%;
}
</style>

<style lang="scss" scoped>
.items {
  .base-autocomplete {
    display: flex;
    align-items: center;
    ::v-deep .block {
      white-space: nowrap;
      min-width: 150px;
      margin-right: 16px;
      margin-bottom: 0 !important;
      display: flex;
      align-items: center;
    }
    ::v-deep .input {
      width: 100%;
    }
  }
  .base-input {
    &.m-without-label {
      ::v-deep label {
        display: none;
      }
    }
    & > ::v-deep div {
      border: none !important;
      flex-direction: row !important;
      // &:last-of-type {
      //   label {
      //     display: ;
      //   }
      // }
      label {
        white-space: nowrap;
        min-width: 150px;
        margin-right: 16px;
        margin-bottom: 0;
        display: flex;
        align-items: center;
      }
      input {
        border-bottom: 1px solid rgb(209 213 219 / var(--tw-border-opacity));
      }
    }
  }
}
</style>