<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50  ">
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
              class="w-full max-w-xs transform rounded-xl bg-white px-8 pb-6 text-left align-middle shadow-xl transition-all"
            >

              <div class="flex flex-col-reverse divide-y divide-y-reverse">
                <div v-if="load" class="flex justify-center">
                  <img src="@/assets/images/load.gif" alt="load">
                </div>
                <template v-else>
                  <div class="flex flex-col content-center justify-center z-50 mt-3">
                    <form action="#" class="flex justify-center mb-4">
                      <BaseListbox
                          v-model="form.location_id"
                          :options="locations"
                          placeholder="Choose location"
                          pre-label="Location: "
                          class="w-72"
                          @update:modelValue="changeLocation"
                      />
                    </form>
                    <form action="#" class="flex justify-center">
                      <BaseListbox
                          v-model="form.camera_id"
                          :options="cameras"
                          placeholder="Choose camera"
                          pre-label="Camera: "
                          class="w-72"
                      />
                    </form>
                  </div>
                </template>
                <DialogTitle
                    as="h3"
                    class="pt-6 pb-4 -mx-8 px-8 flex items-center justify-between cameras__empty-dialog leading-6 cursor-move"
                >
                  Add a new camera
                  <XIcon class="w-6 h-6 text-gray-500 hover:text-teal-600 cursor-pointer" @click="closeModal" />

                </DialogTitle>

              </div>



              <div class="flex justify-center mt-4">
                <BaseButton @click="addNewCamera(form)" title="Add" class="mt-1 mr-3 cursor-pointer border-solid border-2 border-teal-400" rounded outline height="10" width="44" />
              </div>
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
} from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/solid'
import { ref, watch } from 'vue'
import BaseInput from "@/components/Base/Input.vue"
import BaseButton from "@/components/Base/Button.vue"
import BaseListbox from "@/components/Base/Listbox.vue"

const form = ref({
  location_id: null,
  camera_id: null,
  cameras_ids: [],
});
const props = defineProps(['open', 'position', 'locations']);
const emit = defineEmits(['close']);

let isOpen = ref(props.open);

watch(() => props.open, (newVal) => {
  isOpen.value = newVal;
});

function closeModal() {
  isOpen.value = false;
  emit('close', false);
}

function addNewCamera(form) {
  isOpen.value = false
  emit('close', { position: props.position, cameraSrc: form.camera_id });// 'http://185.70.181.30:8080/hls/live.stream.m3u8' })
}
</script>
<script>
export default {
  name: "CameraWorkerNewModal",
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      load: false,
      cameras: [],
    };
  },
  methods: {
    changeLocation(location) {
      this.loadCameras(location);
    },
    async loadCameras(id) {
      this.load = true
      try {
        let { data } = await this.$app.$api.cameras.get({locationId: id});
        this.cameras = data.cameras.map(cam => {
          return { value: cam, label: cam.displayName};
        });
      } catch (e) {
        console.error(e)
        this.$app.$snotify.error(e.messages || e.message);
      } finally {
        this.load = false
      }
    }
  },
}
</script>

<style scoped>

</style>
