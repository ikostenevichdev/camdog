<template>
    <TransitionRoot class="modal-alert-record" appear :show="true" as="template">
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
            <div v-if="alertFrames" class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center overflow-hidden"
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
                        class="modal-alert-record__dialog relative overflow-hidden w-full max-w-xl transform rounded-2xl bg-white px-3 text-left align-middle shadow-xl transition-all"
                        >
                            <DialogTitle
                                as="h3"
                                class="pt-6 pb-4 -mx-3 px-8 flex items-center justify-between text-xl font-medium leading-6 text-gray-900 border-b border-gray-200"
                            >
                                Alerts Record
                                <XIcon class="w-4 h-4 text-gray-500 hover:text-teal-600 cursor-pointer" @click="$emit('close')" />
                            </DialogTitle>
                            <div class="modal-alert-record__content" :style="[`${alertFrames && alertFrames.length && alertFramesTotal > alertFrames && alertFrames.length ? 'max-height: calc(100% - 134px); height: fit-content;' : 'max-height: calc(100% - 54px); height: 100%; padding-bottom: 24px;'}`]">
                                <div class="items" v-if="alertFrames">
                                    <template v-if="alertFrames && alertFrames.length"> 
                                        <div class="items__item" v-for="(item, index) in alertFrames" :key="index" @click="$emit('showDetail', item)">
                                            <img class="w-full h-full" :src="`${baseURL}${item.previewUri}`" alt="">
                                            <div class="item__info">
                                                {{ item.time }}
                                            </div>
                                        </div>
                                    </template>
                                    <NoData :maxHFull="true" text="You do not have any alert records" v-else />
                                </div>
                                <img class="spinner" src="@/assets/images/load.gif" alt="load" v-else>
                            </div>
                            <div class="load-more__wrapper" v-if="alertFramesTotal > alertFrames.length">
                                <Button
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
import NoData from '@/components/Base/NoData.vue'
import Button from '@/components/Base/Button.vue'

import { ref, watch, inject } from 'vue'
const baseURL = import.meta.env.VITE_VUE_BASE_URL
const props = defineProps(['isOpen', 'alertFrames', 'alertFramesTotal'])
</script>

<style lang="scss">
.modal-alert-record {
    &__dialog {
        min-width: 826px;
        max-height: calc(100vh - 32px);
        height: 631px;
    }
    &__content {
        padding-top: 18px;
        overflow-y: auto;
    }
    .items {
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        height: 100%;
        padding-bottom: 84px;
        &__item {
            margin: 8px;
            border-radius: 12px;
            background: #eaeaea;
            width: 181px;
            height: 120px;
            position: relative;
            cursor: pointer;
            overflow: hidden;
            .item__info {
                background: rgba(31, 41, 55, 0.7);
                border-radius: 0px 0px 12px 12px;
                height: 30px;
                position: absolute;
                bottom: 0;
                left: 0;
                color: #fff;
                width: 100%;
                padding: 6px 8px;
                line-height: 16px;
                font-size: 16px;
            }
        }
    }
    .load-more {
        &__btn {
            width: 140px;
            height: 44px;  
        }
        &__wrapper {
            height: 74px;
            position: absolute;
            bottom: 0;
            width: 100%;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 0;
        }
    }
}
</style>