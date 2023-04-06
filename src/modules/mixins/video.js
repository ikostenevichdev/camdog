import videojs from 'video.js'
import playlist from 'videojs-playlist'
import 'video.js/dist/video-js.css'
import '@videojs/http-streaming/dist/videojs-http-streaming.min.js'
const baseURL = import.meta.env.VITE_VUE_BASE_URL
if (window.videojs) {
    window.videojs = videojs
}
export default {
    data () {
        return {
            player: null,
            source: '',
            isLoading: false,
            videos: [],
            currentVideoIndex: 0
        }
    },
    watch: {
        item (newValue) {
            this.loadVideo(newValue)
        }
    },
    async mounted () {
        videojs.registerPlugin('playlist', playlist)
        this.loadVideo()
    },
    methods: {
        loadVideoSource (videos = this.videos) {
            if (this.player) {  
                this.removePlayer()
            }
            const playlist = videos.map((el) => {
                return {
                    sources: [
                        {
                            src: `${baseURL}${el.uri}`,
                            type: 'video/mp4' 
                        }
                    ]
                }
            })
            if (!this.player) this.player = videojs(this.$refs.videoPlayer, { controls: true, autoplay: true, preload: true, controlBar: {
                progressControl: false
            }}, )
            this.player.playlist(playlist)
            this.player.playlist.autoadvance(0)
        },
        async loadVideo () {
            this.isLoading = true
            try {
                const { cameraId, startTime, endTime } = this[this.dataKey]
                const { data: { videos } } = await this.$app.$api.incidents.loadVideo(cameraId, startTime, endTime)
                this.videos = videos.length ? videos : null
                this.loadVideoSource(videos)
            } catch (err) {
                console.error(err)
                this.$app.$snotify.error(e.messages)
            } finally {
                this.isLoading = false
            }
        
        },
        removePlayer () {
            let keys = Object.keys(videojs.getPlayers())

            delete videojs.getPlayers()[keys[0]]
        }
    }
}