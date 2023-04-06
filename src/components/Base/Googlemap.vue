<script setup>
const props = defineProps({
  markers: {
    Type: Array,
    default: () => [],
  },
  zoom: { type: Number, default: 20 },
  center: { type: Object, default: {} },
  icon: { type: String, default: "" },
});

import markIcon from "@/assets/images/pin.svg";

const clusterStyles = [
  {
    textColor: 'white',
    url: markIcon,
    height: 64,
    width: 53
  },
 {
    textColor: 'white',
    url: markIcon,
    height: 64,
    width: 53
  },
 {
    textColor: 'white',
    url: markIcon,
    height: 64,
    width: 53
  }
];

</script>

<script>
export default {
  name: "Googlemap",

  data() {
    return {
      coordinates: null,
      openedMarkerID: null,
    };
  },

  methods: {
    openMarker(marker) {
      this.openedMarkerID = marker.id;
      this.$router.push({ path: '/cameras', query: { locationsId: marker.location } })
    },
    async update(id, cameraLocation) {
      try {
        await this.$app.$api.cameras.updateLocation({
          id,
          payload: { ...cameraLocation },
        });
      } catch (e) {
        this.$app.$snotify.error(e.messages || e.message);
      } finally {
      }
    },
    updateCoordinate(location, cameraId) {
      let coordinaties = location.latLng
        .toString()
        .replace(/[()]/g, "")
        .split(",");
      const cameraLocation = {
        lat: parseFloat(coordinaties[0]),
        lng: parseFloat(coordinaties[1]),
      };
      this.update(cameraId, cameraLocation);
    },
  },
};
</script>
<template>
  <div>
    <GMapMap
      :center="center"
      :zoom="zoom"
      class="flex-col"
      map-type-id="roadmap"
      style="width: 68vw; height: 84vh"
    >
      <GMapCluster :zoomOnClick="true" :minimumClusterSize="2" :styles="clusterStyles">
        <GMapMarker
          v-for="(m, index) in markers"
          :key="`marker-${index}`"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @dragend="updateCoordinate($event, m.id)"
          @click="openMarker(m)"
          :icon="icon"
        >
          <GMapInfoWindow
            :opened="true"
          >
            <div>{{ m.title }}</div>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapCluster>
    </GMapMap>
  </div>
</template>

<style scoped></style>
