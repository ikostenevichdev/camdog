<template>
  <div
    class="relative flex justify-between flex-col h-68 p-6 camera-card"
    :style="{ 'background-image': `url(${URL + camera.previewUri})` }"
  >
    <div v-if="load" class="flex justify-center">
      <img src="@/assets/images/load.gif" alt="load" />
    </div>
    <template v-else>
      <div
        v-if="camera.enabledManually"
        class="camera-card__overlay-guard flex justify-center items-center"
      >
        <div class="flex flex-col items-center">
          <LockClosedIcon class="camera-card__overlay-guard-icon" />
          <p class="camera-card__overlay-guard-text">On Guard</p>
        </div>
      </div>
      <div class="z-10">
        <div class="py-2 text-xl camera-card__title cursor-default">
          <p class="camera-card__title-header">{{ camera.displayName }}</p>
        </div>
      </div>
      <div>
        <div
          :class="{ 'camera-card__actions-active': playType }"
          class="
            camera-card__actions
            flex
            justify-center
            gap-4
            mb-4
            items-center
          "
        >
          <div
            class="
              camera-card__actions-bg
              flex
              gap-2
              hover:text-teal-400
              cursor-pointer
              items-center
            "
            @click="manual('start')"
          >
            <RefreshIcon class="camera-card__actions-icon" />
            <p class="camera-card__actions-text">MANUAL</p>
          </div>
          <div
            class="
              camera-card__actions-bg
              flex
              gap-2
              hover:text-teal-400
              cursor-pointer
              items-center
            "
            @click="cameraScheduleModal = true"
          >
            <CalendarIcon class="camera-card__actions-icon" />
            <p class="camera-card__actions-text">SCHEDULE</p>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div
            class="
              camera-card__title
              hover:border-red-500 hover:text-red-500
              cursor-pointer
            "
            @click="openLiveModeModal"
          >
            <p class="camera-card__title-font">Live</p>
          </div>
          <div
            v-if="camera.enabledManually"
            class="
              camera-card__icon-bg camera-card__icon-bg-stop
              cursor-pointer
            "
            @click="manual('stop')"
          >
            <CustomBoxIcon name="stop" size="20" color="#E64B18;" />
          </div>
          <div
            v-else
            class="
              camera-card__icon-bg
              hover:border-teal-600 hover:text-teal-600
              cursor-pointer
            "
            @click="onPlayClick"
          >
            <PlayIcon class="camera-card__icon" />
          </div>
          <div
            class="
              camera-card__icon-bg
              hover:border-yellow-400 hover:text-yellow-400
              cursor-pointer
            "
            @click="openAlertZoneModal"
          >
            <ExclamationIcon class="camera-card__icon" />
          </div>
          <div
            class="
              camera-card__icon-bg
              hover:border-violet-500 hover:text-violet-500
              cursor-pointer
            "
            @click="openCameraNotificationsModal"
          >
            <BellIcon class="camera-card__icon" />
          </div>
          <div
            class="
              camera-card__icon-bg
              hover:border-cyan-300 hover:text-cyan-300
              cursor-pointer
            "
            @click="openCameraSettingsModal"
          >
            <AdjustmentsIcon class="camera-card__icon" />
          </div>
          <div
            class="
              camera-card__icon-bg
              hover:border-red-400 hover:text-red-400
              cursor-pointer
            "
            @click="emit('remove', camera.id)"
          >
            <TrashIcon class="camera-card__icon" />
          </div>
        </div>
      </div>
    </template>
  </div>
  <LiveMode
    :data="`${URL}${camera.httpStreamUri}`"
    :open="liveModeModal"
    @close="closeLiveModeModal"
  />
  <AlertZone :open="alertZoneModal" :data="camera" @close="closeAlertZoneModal" />
  <CameraNotifications
    :open="cameraNotificationsModal"
    :data="camera"
    @close="closeCameraNotificationsModal"
  />
  <CameraSchedule :open="cameraScheduleModal" @close="cameraScheduleModal = false"></CameraSchedule>
  <CameraSettings
    :open="cameraSettingsModal"
    @save="changeCameraSettings"
    @updateSnapShot="updateSnapShot"
    @testConnection="testConnection"
    :previewUri="previewUri"
    :data="camera"
    :locations="locations"
    @close="closeCameraSettingsModal"
  />
</template>

<script setup>
import { ref, inject } from "vue";
import LiveMode from "@/components/Modal/LiveMode.vue";
import AlertZone from "@/components/Modal/AlertZone.vue";
import CameraNotifications from "@/components/Modal/CameraNotifications.vue";
import CameraSettings from "@/components/Modal/CameraSettings.vue";
import CameraSchedule from "@/components/Modal/CameraSchedule.vue";
import {
  PlayIcon,
  ExclamationIcon,
  AdjustmentsIcon,
  BellIcon,
  TrashIcon,
  CalendarIcon,
  RefreshIcon,
  LockClosedIcon,
} from "@heroicons/vue/outline";
import CustomBoxIcon from "@/components/CustomBoxIcon.vue";

const { $api, $snotify } = inject("$app");
const props = defineProps(["data", "locations"])
const emit = defineEmits(["remove"])
let camera = ref(props.data)
const URL = import.meta.env.VITE_VUE_DOWNLOAD_URL;
const load = ref(false),
  playType = ref(false);

//-- methods
const onPlayClick = () => {
  playType.value = !playType.value;
  setTimeout(() => {
    playType.value = false;
  }, 10000);
};

async function manual() {
  load.value = true;
  try {
    await $api.cameras.play(
      `${props.data.id}:${props.data.enabledManually ? "disable" : "enable"}`
    );
    camera.value.enabledManually = !camera.value.enabledManually
    playType.value = false
  } catch (e) {
    console.error(e);
    $snotify.error(e.messages || e.message);
  } finally {
    load.value = false;
  }
}
async function changeCameraSettings({ form }) {
  try {
    load.value = true
    let payload = {
      displayName: form.value.name,
      locationId: form.value.locationId,
      connectionUri: form.value.connectionUri,
    };
    const { data } = await $api.cameras.update({ id: form.value.id, payload });
    camera.value = data
  } catch (e) {
    console.error(e);
    $snotify.error(e.messages || e.message);
  } finally {
    load.value = false
  }
}
async function testConnection({ form }) {
  try {
    $snotify.warning("check is running");
    let { data } = await $api.cameras.testConnection({
      uri: form.value.connectionUri,
    });
    if (data.connected) {
      $snotify.success("connected");
    } else {
      $snotify.error("error");
    }
  } catch (e) {
    console.error(e);
    this.$app.$snotify.error('Not connected');
  } finally {
  }
}
</script>

<script>
export default {
  name: "Camera",
  data() {
    return {
      liveModeModal: false,
      alertZoneModal: false,
      helpModal: false,
      cameraSettingsModal: false,
      cameraScheduleModal: false,
      cameraNotificationsModal: false,
      previewUri: null,
    };
  },
  methods: {
    async updateSnapShot({ form }) {
      try {
        await this.$app.$api.cameras.getPreview(form.value.id);
        let { data } = await this.$app.$api.cameras.getCamerasData(
          form.value.id
        );
        this.previewUri = data.previewUri;
        this.$app.$snotify.success("updated");
      } catch (e) {
        console.error(e);
        this.$app.$snotify.error(e.messages || e.message);
      }
    },
    openLiveModeModal() {
      this.liveModeModal = !this.liveModeModal;
    },
    closeLiveModeModal() {
      this.liveModeModal = false;
    },

    openAlertZoneModal() {
      this.alertZoneModal = !this.alertZoneModal;
    },
    closeAlertZoneModal() {
      this.alertZoneModal = false;
    },
    openCameraSettingsModal() {
      this.cameraSettingsModal = !this.cameraSettingsModal;
    },
    closeCameraSettingsModal() {
      this.cameraSettingsModal = false;
    },
    openCameraNotificationsModal() {
      this.cameraNotificationsModal = !this.cameraNotificationsModal;
    },
    closeCameraNotificationsModal() {
      this.cameraNotificationsModal = false;
    },
  },
};
</script>
