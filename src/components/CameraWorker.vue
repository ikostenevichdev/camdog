<template>
  <div class="cameraWorkerItem">
    <div v-show="datasource" class="w-full h-full">
      <!-- <video ref="videoPlayer" data-setup='' class="video-js w-full h-full" controls>
        <source :src="`${URL}${datasource}`" :type="DEFAULT_STREAM_TYPE">
      </video> -->
      <video
        class="w-full h-full"
        controls
        autoplay
      >
        <source :src="`${URL}${datasource}`">
      </video>
    </div>
    <div 
        class="flex justify-center items-center w-full h-full text-teal-400 text-6xl cursor-pointer"
        v-if="!datasource"
        @click="showModalSelector(position)"
    >
        +
    </div>
  </div>
</template>

<script setup>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '@videojs/http-streaming/dist/videojs-http-streaming.min.js';

window.videojs = videojs;

const props = defineProps({
  datasource: { type: Object },
  position: { type: Number }
});
const emit = defineEmits(['modal:show:camera']);
const showModalSelector = (value) => {
  emit('modal:show:camera', value);
};
</script>
<script>
const DEFAULT_STREAM_TYPE = 'application/x-mpegURL';
const URL = import.meta.env.VITE_VUE_DOWNLOAD_URL;
export default {
  name: "CameraWorker",
  data() {
    return {
      DEFAULT_STREAM_TYPE,
      URL,
      player: null,
      source: '',
    }
  },
  watch: {
    datasource: {
      handler(newValue) {
        if (newValue) {
          
          if (this.player) { 
            // Video.js player can't changes source after created dynamically
            // Solution found here: https://www.thewebblinders.in/programming/article/videojs-changing-src-dynamically-6075
            let keys = Object.keys(videojs.getPlayers());

            delete videojs.getPlayers()[keys[0]];
          }
          this.source = `<source src="${URL}${newValue}" type="${DEFAULT_STREAM_TYPE}">`;
          this.$nextTick(() => { // Vue should wait for the next tick to render the video
            this.player = videojs(this.$refs.videoPlayer, {
              autoplay: true,
              controls: true,
              preload: 'auto',
            });
          });
        } else {
          if (this.player) {
            this.player.pause();
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.cameraWorkerItem {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
