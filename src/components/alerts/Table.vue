<template>
  <div class="alert-table">
    <div class="table-wrapper">
      <table class="table">
        <thead class="table__head">
          <th>
            <BaseListbox
              v-model="sort.locationId"
              :options="locations"
              placeholder="Location"
              isShowClear
              pre-label="Location: "
              class="alert-table__select"
              @update:modelValue="loadCameras(sort.locationId), $emit('loadData', sort)"
            />
          </th>
          <th>
            <BaseListbox
              v-model="cameraId"
              :options="cameras"
              placeholder="Camera"
              isShowClear
              pre-label="Camera: "
              class="alert-table__select"
              @update:modelValue="$emit('loadData', sort)"
            />
          </th>
          <th>
            <BaseListbox
              v-model="sort.type"
              :options="typeOptions"
              placeholder="Alert type"
              isShowClear
              pre-label="Alert type: "
              class="alert-table__select"
              @update:modelValue="$emit('loadData', sort)"
            />
          </th>
          <th>Alert start</th>
          <th>Alert stop</th>
        </thead>
        <tbody class="table__body">
          <tr
            :class="{ selected: currentAlert && currentAlert.id === item.id }"
            v-for="(item, index) in items"
            :key="index"
            @click="showDetails(item)"
          >
            <td>{{ item.location.displayName }}</td>
            <td>{{ item.camera.displayName }}</td>
            <td>{{ alertDetectionType[item.type].title }}</td>
            <td>{{ item.formattedStartTime }} (EST)</td>
            <td>
              <div class="flex items-center pr-5">
                {{ item.formattedEndTime }} (EST)
                <div
                  class="item__delete"
                  @click.stop="$emit('removeAlert', [item.id])"
                >
                  <img src="/icons/delete.svg" alt="trash" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table__load-more">
      <span class="load-more__count" v-if="total - items.length"
        >Left {{ total - items.length }} alerts</span
      >
      <Button
        v-if="total > items.length"
        class="load-more__btn"
        title="Load more"
        width="36"
        height="11"
        border
        outline
        rounded
        @click="$emit('loadMore')"
      />
    </div>
  </div>
</template>

<script setup>
import Button from "@/components/Base/Button.vue";
import BaseListbox from "@/components/Base/Listbox.vue";
import { alertDetectionType } from "@/constant.js";
import { ref, reactive, inject } from "vue";
const props = defineProps(["items", "total", "currentAlert"]);
const emit = defineEmits(["showDetails", "loadData"]);

const { $api, $snotify } = inject("$app");

const typeOptions = [
  { value: "connection", label: "Connection Lost" },
  { value: "rec-human", label: "Human Detection" },
  { value: "rec-object", label: "Object Detection" },
  { value: "rec-camdog", label: "Camdog Mode" },
];
const locations = ref([]);
const cameras = ref([]);

const sort = reactive({
  locationId: "",
  cameraId: "",
  type: "",
});

loadLocations()
async function loadLocations() {
  try {
    const { data } = await $api.locations.get();
    locations.value = data.locations.map((el) => {
      return {
        label: el.displayName,
        value: el.id,
      };
    });
  } catch (err) {
    console.log(err);
  }
}
async function loadCameras(locationId) {
  sort.cameraId = ''
  try {
    const { data } = await $api.cameras.get({ locationId });
    cameras.value = data.cameras.map((el) => {
      return {
        label: el.displayName,
        value: el.id,
      };
    });
  } catch (err) {
    console.log(err);
  }
}
const option = ref(null);
function showDetails(item) {
  emit("showDetails", item);
}
</script>

<style lang="scss">
.alert-table {
  &__select {
    button {
      background: none;
      box-shadow: none;
      padding-left: 0;
    }
  }
}
.table {
  position: relative;
  line-height: 34px;
  text-align: left;
  width: 100%;
  padding: 0 50px;
  ul {
    width: auto;
  }
  li {
    padding: 8px 12px;
  }
  &-wrapper {
    // max-width: calc(100% + 25px);
    height: 100%;
    // width: 1063px;
    overflow-x: auto;
    height: calc(100vh - 200px);
    margin-left: -25px;
  }
  &__head {
    th {
      background: #f5f5f5;
      position: sticky;
      top: 0;
      z-index: 3;
      border-bottom: 1px solid #e9e9e9;
      font-size: 14px;
      color: #8e97a2;
    }
  }
  &__body {
    td {
      font-size: 16px;
      color: #2c3f58;
    }
  }
  td,
  th {
    font-weight: 400;
    padding: 8px 20px;
    white-space: nowrap;
    height: 34px;
    &:last-of-type {
      padding-right: 80px;
    }
  }
  th {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  tr {
    position: relative;
    &:hover,
    &.selected {
      cursor: pointer;
      background: rgba(193, 204, 218, 0.1);
      td {
        color: #21a28e;
      }
      .item__delete {
        display: block;
        transform: translateY(-1px);
      }
    }
  }
  &__load-more {
    position: relative;
    width: 100%;
    padding: 22px 0;

    .load-more {
      &__count {
        font-size: 16px;
        color: #8e97a2;
      }
      &__btn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        width: 140px;
        height: 44px;
      }
    }
  }
  .item__delete {
    display: none;
    width: 18px;
    height: 18px;
    position: absolute;
    right: 10px;
  }
}
</style>