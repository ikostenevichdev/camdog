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
                max-w-5xl
                transform
                rounded-2xl
                bg-white
                pl-6
                pr-8
                pb-3
                text-left
                align-middle
                shadow-xl
                transition-all
              "
            >
              <DialogTitle
                as="h3"
                class="
                  pt-4
                  pb-4
                  -ml-6
                  -mr-8
                  px-8
                  flex
                  items-center
                  justify-between
                  text-xl
                  cameras__modal_title
                  leading-6
                  border-b border-gray-200
                  cursor-move
                "
              >
                Setup detection modes and borders of alert zone
                <XIcon
                  class="
                    w-5
                    h-5
                    text-gray-400
                    hover:text-teal-600
                    cursor-pointer
                  "
                  @click="closeModal"
                />
              </DialogTitle>
              <div class="flex flex-col-3">
                <div class="flex justify-between">
                  <div class="mt-8 flex flex-col overflow-hidden">
                    <Lasso
                      :image="URL + dataCameras.snapshotUri"
                      :video="URL + dataCameras.httpStreamUri"
                      :coordinates="dataCameras.coordinates"
                      :loadSnapShot="loadSnapShot"
                      @change="newCoordinates = $event"
                      @enable-controller="enablePTZ = !enablePTZ"
                      @enable-resize="resize = !resize"
                      @change-polygon="dataCameras.coordinates = $event"
                      @refresh-snapshot="getSnapshot"
                      @loading-lasso="enableLasso"
                      @open-help="helpModalOpen = true"
                    />
                  </div>

                  <div class="pl-8 min-w-[262px] flex flex-col justify-center items-center">
                    <template v-if="!enablePTZ">
                      <div
                        class="pt-7 pb-5 text-left self-start cameras__modal_notification"
                        style="width: inherit"
                      >
                        Detection mode
                      </div>
                    </template>

                    <template v-else>
                      <div
                        class="
                          cameras__modal_title
                          flex
                          justify-center
                          py-7
                        "
                      >
                        PTZ
                      </div>
                    </template>

                    <div
                      :class="[{ 'w-full flex flex-col space-y-3': !enablePTZ }]"
                    >
                      <template v-if="!enablePTZ">
                        <BaseButton
                          id="buttonHuman"
                          title="Human Detection"
                          width="30"
                          height="10"
                          justify="start"
                          class="
                            btn-mode
                            flex
                            justify-start
                            p-2
                            cameras__modal_alerts
                            border border-gray-400
                            rounded-md
                          "
                          outline
                          btnClasses="hover:bg-primary px-4"
                          :active="dataCameras.mode === 'human'"
                          :class="{ active: dataCameras.mode === 'human' }"
                          @click="dataCameras.mode = 'human'"
                        >
                          <template #btnImage>
                            <img
                              id="iconHuman"
                              src="@/assets/images/human.svg"
                              class="h-6 w-6 mr-2 icon-color-gray"
                              alt=""
                            />
                          </template>
                        </BaseButton>
                        <BaseButton
                          id="buttonObject"
                          title="Object Detection"
                          width="30"
                          height="10"
                          justify="start"
                          class="
                            btn-mode
                            flex
                            justify-start
                            p-2
                            cameras__modal_alerts
                            border border-gray-400
                            rounded-md
                          "
                          outline
                          btnClasses="hover:bg-primary px-4"
                          :active="dataCameras.mode === 'object'"
                          :class="{ active: dataCameras.mode === 'object' }"
                          @click="dataCameras.mode = 'object'"
                        >
                          <template #btnImage>
                            <img
                              id="iconObject"
                              src="@/assets/images/object.svg"
                              class="h-6 w-6 mr-2 icon-color-gray"
                              alt=""
                            />
                          </template>
                        </BaseButton>
                        <BaseButton
                          id="buttonCamDog"
                          title="CAMDOG Mode"
                          justify="start"
                          width="30"
                          height="10"
                          class="
                            btn-mode
                            flex
                            justify-start
                            p-2
                            cameras__modal_alerts
                            border border-gray-400
                            rounded-md
                          "
                          outline
                          btnClasses="hover:bg-primary px-4"
                          :active="dataCameras.mode === 'camdog'"
                          :class="{ active: dataCameras.mode === 'camdog' }"
                          @click="dataCameras.mode = 'camdog'"
                        >
                          <template #btnImage>
                            <img
                              id="iconCamDog"
                              src="@/assets/images/camdgmode.svg"
                              class="h-6 w-6 mr-2 icon-color-gray"
                              alt=""
                            />
                          </template>
                        </BaseButton>
                        <BaseButton
                          id="alprButton"
                          title="ALPR Mode"
                          justify="start"
                          class="
                            btn-mode
                            flex
                            justify-start
                            cameras__modal_alerts
                            p-2
                            border border-gray-400
                            rounded-md
                          "
                          width="30"
                          height="10"
                          outline
                          btnClasses="hover:bg-primary px-4"
                          :active="dataCameras.mode === 'ALPR'"
                          :class="{ active: dataCameras.mode === 'ALPR' }"
                          @click="dataCameras.mode = 'ALPR'"
                        >
                          <template #btnImage>
                            <img
                              id="alprIcon"
                              src="@/assets/images/alpr.svg"
                              class="h-6 w-6 mr-2 icon-color-gray"
                              alt=""
                            />
                          </template>
                        </BaseButton>
                        <BaseButton
                          id="LoiteringButton"
                          title="Loitering Detection"
                          width="30"
                          height="10"
                          justify="start"
                          class="
                            pointer-events-none
                            opacity-40
                            bg-gray-300
                            btn-mode
                            flex
                            justify-start
                            p-2
                            cameras__modal_alerts
                            text-sm
                            border border-gray-400
                            rounded-md
                          "
                          outline
                          btnClasses="hover:bg-primary px-4"
                          :active="dataCameras.mode === 'loitering'"
                          :class="{ active: dataCameras.mode === 'loitering' }"
                          @click="dataCameras.mode = 'loitering'"
                        >
                          <template #btnImage>
                            <img
                              id="iconLoitering"
                              src="@/assets/images/lotering.svg"
                              class="h-6 w-6 mr-2 icon-color-gray"
                              alt=""
                            />
                          </template>
                        </BaseButton>
                        <BaseButton
                          id="faceButton"
                          title="Face Recognition"
                          justify="start"
                          width="30"
                          height="10"
                          class="
                            pointer-events-none
                            opacity-40
                            bg-gray-300
                            btn-mode
                            flex
                            justify-start
                            p-2
                            cameras__modal_alerts
                            text-sm
                            border border-gray-400
                            rounded-md
                          "
                          outline
                          btnClasses="hover:bg-primary px-4"
                          :active="dataCameras.mode === 'face'"
                          :class="{ active: dataCameras.mode === 'face' }"
                          @click="dataCameras.mode = 'face'"
                        >
                          <template #btnImage>
                            <img
                              id="faceIcon"
                              src="@/assets/images/face.svg"
                              class="h-6 w-6 mr-2 icon-color-gray"
                              alt=""
                            />
                          </template>
                        </BaseButton>
                      </template>
                      <template v-else>
                        <div class="flex justify-center">
                          <Controller />
                        </div>
                      </template>
                    </div>

                    <div class="mt-auto pt-2 flex items-center h-[65px] w-full">
                      <BaseButton
                        @click="savePolygon"
                        class="
                          cursor-pointer
                          text-primary text-sm
                          
                          border-solid border border-primary
                          hover:bg-primary
                          px-4 h-11 font-bold
                        "
                        width="full"
                        rounded
                        outline
                        title="Save"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <CameraHelp :open="helpModalOpen" @close="helpModalOpen = false"></CameraHelp>
</template>

<script>
  export default {
    name: 'AlertZone'
  }
</script>
<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Switch,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { XIcon, UserGroupIcon } from "@heroicons/vue/solid";
import { ref, watch, inject, reactive } from "vue";
import CameraHelp from "@/components/Modal/CameraHelp.vue"
import BaseButton from "@/components/Base/Button.vue";
import Controller from "@/components/Controller.vue";
import Lasso from "@/components/Lasso.vue";
const { $api, $snotify } = inject("$app");

const URL = import.meta.env.VITE_VUE_DOWNLOAD_URL;

const props = defineProps(["open", "data"]);
const emit = defineEmits(["close", "loading-lasso"]);

let helpModalOpen = ref(false)
let isOpen = ref(props.open);
const loadingLasso = ref(false);
const enablePTZ = ref(false);
const resize = ref(false);
watch(isOpen, (value) => {
  if (value) {
    getDataCameras();
    getSnapshot();
  }
});

watch(
  () => props.open,
  (newVal) => {
    isOpen.value = newVal;
  }
);

function closeModal() {
  isOpen.value = false;
  emit("close", false);
}
function enableLasso() {
  loadingLasso.value = false;
}
function liveBtn() {
  console.log("liveBtn clicked");
}

function ptzBtn() {
  console.log("ptzBtn clicked");
}
const dataCameras = reactive({
  mode: "",
  enabled: false,
  coordinates: "",
  snapshotUri: "",
  settings: {
    sensitivity: 0,
    threshold: 0,
  },
});
const newCoordinates = ref("");
const resetData = () => {
  dataCameras.mode = "";
  dataCameras.enabled = false;
  dataCameras.coordinates = "200,200 150,400 400,300 300,200";
  dataCameras.settings = {
    sensitivity: 0,
    threshold: 0,
  };
};
const getDataCameras = async () => {
  try {
    let { data } = await $api.cameras.getCamerasData(props.data.id);
    const snapshotUri = data.snapshotUri;
    if (data.recognitionProfiles) {
      data = data.recognitionProfiles[0];
      for (const key in dataCameras) {
        if (key === "coordinates") {
          if (!data.roi) {
            dataCameras[key] = "200,200 150,400 400,300 300,200";
            newCoordinates.value = dataCameras[key];
          } else {
            dataCameras[key] = transformToCoordinates(data.roi);
            newCoordinates.value = dataCameras[key];
          }
        } else if (key === "snapshotUri") {
          dataCameras[key] = snapshotUri;
        } else {
          dataCameras[key] = data[key];
        }
      }
    } else {
      resetData();
    }
  } catch (e) {
    console.error(e);
    $snotify.error(e.messages || e.message);
  }
};

const loadSnapShot = ref(false);

const getSnapshot = async () => {
  try {
    loadSnapShot.value = false;
    await $api.cameras.getSnapshot(props.data.id);
    let { data } = await $api.cameras.getCamerasData(props.data.id);
    dataCameras.snapshotUri = data.snapshotUri;
    dataCameras.httpStreamUri = data.httpStreamUri;
    dataCameras.coordinates = newCoordinates.value;
    loadSnapShot.value = true;
  } catch (e) {
    console.error(e);
    $snotify.error(e.messages || e.message);
  }
};

const coordinates = ref("200,200 150,400 400,300 300,200");
const transformToCoordinates = (arr) =>
  arr.map((elem) => elem.x + "," + elem.y).join(" ");
const collectCoordinates = (coordinates) => {
  let arrayCoordinates = coordinates.split(" ").map((elem) => {
    const temp = elem.split(",");
    return {
      x: Math.ceil(Number(temp[0])),
      y: Math.ceil(Number(temp[1])),
    };
  });
  return arrayCoordinates;
};
const savePolygon = async () => {
  try {
    if (enablePTZ.value) {
      enablePTZ.value = false
      return
    }

    const payload = {
      cameraId: props.data.id,
      enabled: true,
      mode: dataCameras.mode,
      roi: collectCoordinates(newCoordinates.value),
      settings: {
        sensitivity: Number(dataCameras.settings.sensitivity),
      },
    };

    await $api.cameras.updatePolygon({ id: props.data.id, payload });
    $snotify.success("Polygon updated...");
    isOpen.value = false;
  } catch (e) {
    $snotify.error(e.messages || e.message);
    console.error(e);
  }
};
</script>
<style>
.icon-color-gray {
  filter: invert(68%) sepia(18%) saturate(203%) hue-rotate(173deg)
    brightness(85%) contrast(86%);
}

.btn-mode.active > .icon-color-gray {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg)
    brightness(101%) contrast(102%);
}

.btn-mode:hover > .icon-color-gray {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg)
    brightness(101%) contrast(102%);
}
/* 
#buttonHuman:focus > #iconHuman {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
#buttonObject:hover > #iconObject {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
#buttonObject:focus > #iconObject {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
#buttonCamDog:hover > #iconCamDog {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
#buttonCamDog:focus > #iconCamDog {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
#LoiteringButton:hover > #iconLoitering {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
#LoiteringButton:focus > #iconLoitering {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
#alprButton:hover > #alprIcon {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
#alprButton:focus > #alprIcon {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
#faceButton:hover > #faceIcon {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
}
#faceButton:focus > #faceIcon {
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(324deg) brightness(101%) contrast(102%);
} */
</style>
