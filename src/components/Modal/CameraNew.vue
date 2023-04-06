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
        <div class="fixed inset-0 bg-black bg-opacity-25" />
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
                Add a new camera
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
              <!--              <div class="mt-4 h-96 flex border border-gray-200 rounded">-->
              <!--                <img src="@/assets/images/kiev.webp" class="w-full object-cover object-bottom" alt="">-->
              <!--              </div>-->

              <div v-if="isLoad || load" class="flex justify-center">
                <img src="@/assets/images/load.gif" alt="load" />
              </div>
              <Form v-else v-slot="{ errors }" :validation-schema="schema">
                <form>
                  <div class="mt-2 flex flex-col space-y-1">
                    <BaseInput
                      v-model="form.displayName"
                      label="Name"
                      name="displayName"
                      :error="isShowErrors && !!errors['displayName']"
                    />
                    <div class="py-2">
                      <label
                        class="mb-2 block text-gray-500"
                        :class="{ 'text-red-400': error }"
                      >
                        Location
                      </label>
                      <BaseListbox
                        v-model="form.locationId"
                        :options="locations"
                        placeholder="Select location"
                        pre-label="Location: "
                      />
                    </div>
                    <div class="flex items-center gap-4">
                      <label class="block text-gray-500"
                        >Connection mode:</label
                      >
                      <RadioGroup
                        class="py-2"
                        :options="radioGroups"
                        :default-value="selectRadio"
                        @input="changeTab"
                      />
                    </div>
                    <template v-if="selectRadio === 'auto'">
                      <div class="ip-wrapper">
                        <BaseInput
                          v-model="formUri.addr"
                          label="ONVIF IP"
                          name="addr"
                          :maska="'0[00].0[00].0[00].0[00]'"
                          maskaLazy
                          class-wrapper="ip-wrapper__ip"
                          :error="isShowErrors && !!errors['addr']"
                        />
                        <BaseInput
                          v-model="formUri.onvifPort"
                          label="ONVIF"
                          name="onvifPort"
                          :error="isShowErrors && !!errors['onvifPort']"
                        />
                        <BaseInput
                          v-model="formUri.rtspPort"
                          label="RTSP"
                          name="rtspPort"
                          :error="isShowErrors && !!errors['rtspPort']"
                        />
                      </div>
                      <BaseInput
                        v-model="formUri.user"
                        label="ONVIF Login"
                        name="user"
                        :error="isShowErrors && !!errors['user']"
                      />
                      <BaseInput
                        v-model="formUri.password"
                        label="ONVIF Password"
                        name="password"
                        :error="isShowErrors && !!errors['password']"
                      />
                      <!-- <div
                        class="py-2"
                      >
                        <label
                          class="mb-2 block text-gray-500"
                        >
                          Profile
                        </label>
                        <BaseListbox
                          v-model="form.profile"
                          :options="profiles"
                          placeholder="Select profile"
                          pre-label="profile: "
                        />
                      </div> -->
                      <div
                        class="py-2"
                        v-if="connectionProfiles && connectionProfiles.length"
                      >
                        <label
                          class="mb-2 block text-gray-500"
                          :class="{ 'text-red-400': error }"
                        >
                          Profiles
                        </label>
                        <BaseListbox
                          v-model="form.connectionUri"
                          :options="connectionProfiles"
                          placeholder="Select profile"
                          pre-label="Profile: "
                        />
                      </div>
                    </template>
                    <template v-else>
                      <p class="text-center mt-6 mb-4">
                        Try to generate your camera connection string
                      </p>
                      <BaseButton
                        title="Generate"
                        btn-classes="mb-6"
                        width="full"
                        rounded
                        type="button"
                        @click="generate"
                      />
                      <BaseInput
                        v-model="form.connectionUri"
                        label="URI"
                        name="connectionUri"
                        :error="isShowErrors && !!errors['connectionUri']"
                      />
                    </template>
                  </div>

                  <div class="flex justify-between mt-4">
                    <BaseButton
                      title="Save"
                      type="button"
                      rounded
                      outline
                      class="border-solid border-2 border-teal-400"
                      @click="onSubmit"
                    />
                    <template v-if="selectRadio === 'auto'">
                      <BaseButton
                        title="Test connection"
                        rounded
                        outline
                        type="button"
                        class="
                          border-solid border-2 border-gray-500
                          hover:border-teal-400
                        "
                        @click="testConnection"
                      />
                    </template>
                    <template v-if="selectRadio === 'manual'">
                      <BaseButton
                        title="Test connection"
                        rounded
                        outline
                        type="button"
                        class="
                          border-solid border-2 border-gray-500
                          hover:border-teal-400
                        "
                        @click="testManualConnection"
                      />
                    </template>
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
import { ref, watch, inject, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const { $api, $snotify } = inject('$app');

import BaseInput from "@/components/Base/Input.vue";
import BaseButton from "@/components/Base/Button.vue";
import BaseListbox from "@/components/Base/Listbox.vue";
import RadioGroup from "@/components/Base/RadioGroup.vue";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const props = defineProps(["open", "load", "locations", "connectionProfiles"]),
  emit = defineEmits(["close", "save", "generation"]);
const route = useRoute();
const router = useRouter();
const schema = ref(
  yup.object({
    displayName: yup
      .string()
      .required("The name is required.")
      .min(2, "The length of the value must be at least 2 characters"),
    addr: yup.string().required("The ONVIF IP is required.").min(9).max(21),
    onvifPort: yup.string().required("The ONVIF Port is required."),
    rtspPort: yup.string().required("The RTSP Port is required."),
    user: yup.string().required("The ONVIF Login is required.").min(2).max(50),
    password: yup.string().required("The ONVIF Password is required."),
  })
);
let isOpen = ref(props.open),
  isLoad = ref(props.load),
  isShowErrors = ref(false),
  selectRadio = ref(route.query.cameraNewMode || "auto"),
  profiles = ref([]),
  formUri = ref({
    addr: "",
    user: "",
    password: "",
    onvifPort: "80",
    rtspPort: "554",
  }),
  form = ref({
    locationId: "",
    displayName: "",
    connectionUri: "",
  }),
  radioGroups = ref([
    {
      value: "auto",
      label: "AUTO",
    },
    {
      value: "manual",
      label: "MANUAL",
    },
    {
      value: "batch",
      label: "BATCH",
      disabled: true,
    },
  ]);
onMounted(() => {
  if (route.query.cameraNewMode) {
    selectRadio.value = route.query.cameraNewMode;
    changeTab("manual");
    form.value.connectionUri = route.query.connectionUri;
    router.replace({ query: undefined });
  }
});
watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);
watch(
  () => props.connectionProfiles,
  (newVal) => {
    setDefaultProfile();
  }
);
//-- methods
function changeTab(index) {
  isShowErrors.value = false;
  selectRadio.value = index;
  schema.value =
    index === "manual"
      ? yup.object({
          displayName: yup
            .string()
            .required("The name is required.")
            .min(2, "The length of the value must be at least 2 characters"),
          connectionUri: yup.string().required("The URL is required.").min(10),
        })
      : yup.object({
          displayName: yup
            .string()
            .required("The name is required.")
            .min(2, "The length of the value must be at least 2 characters"),
          addr: yup
            .string()
            .required("The ONVIF IP is required.")
            .min(10)
            .max(21),
          user: yup
            .string()
            .required("The ONVIF Login is required.")
            .min(2)
            .max(50),
          onvifPort: yup.string().required("The ONVIF Port is required."),
          rtspPort: yup.string().required("The RTSP Port is required."),
          password: yup.string().required("The ONVIF Password is required."),
        });
}

function closeModal() {
  isOpen.value = false;
  emit("close", false);
}
function generate() {
  closeModal();
  emit("generate");
}
function setDefaultProfile() {
  if (props.connectionProfiles && props.connectionProfiles.length) {
    form.value.connectionUri = props.connectionProfiles[0].value;
  }
}
async function onSubmit() {
  isShowErrors.value = true;
  if (await schema.value.validate({ ...formUri.value, ...form.value })) {
    emit("save", { formUri, form, selectRadio });
  }
}
function testConnection() {
  isShowErrors.value = true;
  emit("test", { formUri, form, selectRadio });
}

async function testManualConnection() {
  try {
    await $api.cameras.testConnection({uri: form.value.connectionUri})
    $snotify.success('Camera has been successfuly connected');
  } catch (error) {
    $snotify.error('Not connected');
  }
}

function liveBtn() {
  console.log("liveBtn clicked");
}

function ptzBtn() {
  console.log("ptzBtn clicked");
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
