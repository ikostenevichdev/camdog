<template>
    <div class="alert-preview">
        <div class="alert-preview__video-wrapper">
            <div class="h-full" v-show="videos && videos.length">
                <video ref="videoPlayer" data-setup='' class="video-js w-full h-full"/>
            </div>
            <NoData class="no-data" v-if="(!videos || !videos.length) && !isLoading" text="No video" />
        </div>
        <div class="alert-preview__info">   
            <div>Incident appears at: {{ moment(item.startTime).format("YYYY-MM-DD HH:mm:ss") }}</div>
            <div>Camera <span class="info__text-dark">{{ item.camera.displayName }}</span> at location <span class="info__text-dark">{{ item.location.displayName }}</span></div>
            <div v-if="alertFramesTotal || alertFramesTotal === 0">Contains <span class="info__text-orange">{{ alertFramesTotal }} alerts record</span></div>
            <Button
                class="info__btn"
                title="Press to investigate"
                border
                outline 
                rounded
                @click="$emit('showAlertRecord')"
            />
        </div>
    </div>
</template>

<script setup>
    import moment from 'moment'
    import Button from '@/components/Base/Button.vue'
    import NoData from '@/components/Base/NoData.vue'

    const props = defineProps(['item', 'alertFramesTotal'])
</script>

<script>
import video from '@/modules/mixins/video.js'
export default {
    mixins: [video],
    data () {
        return {
            dataKey: 'item'
        }
    }
}
</script>

<style lang="scss">
.alert-preview {
    padding: 0 24px 24px 24px;
    border-left: 1px solid #E9E9E9;
    margin-left: 14px;
    overflow-y: auto;
    height: calc(100vh - 115px);
    &__video-wrapper {
        max-height: 440px;
        height: 440px;
        width: 100%;
        min-height: 440px;
        object-fit: cover;
        border-radius: 12px;
        background: #E9E9E9;
        overflow: hidden;
        position: relative;
        @media(max-width: 1640px) {
            height: 380px;
            min-height: auto;
        }
        @media(max-width: 1440px) {
            height: 360px;
        }
        @media(max-width: 1240px) {
            height: 320px;
        }
        .no-data {
            position: absolute;
            min-height: auto;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
    &__info {
        font-weight: 400;
        font-size: 18px;
        line-height: 34px;
        font-feature-settings: 'clig' off;
        color: #8E97A2;
        margin-top: 24px;
        & > div {
            margin-bottom: 6px;
            &:last-of-type {
                margin-bottom: 0;
            }
        }
        .info {
            &__text {
                &-dark {
                    color: #2C3F58;
                }
                &-orange {
                    color: #FD7E14;
                }
            }
            &__btn {
                margin-top: 28px;
                font-size: 14px;
                height: 44px;
            }
        }
    }
}
</style>
