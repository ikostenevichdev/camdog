import Vue3VideoPlayer from '@cloudgeek/vue3-video-player'
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css'

export default {
  install: (app) => {
    app.use(Vue3VideoPlayer)
  },
}