import Vue from 'vue'
import VueRouter from 'vue-router'
import voiceNavig from '../views/VoiceNavig.vue'
Vue.use(VueRouter)

  const routes = [
	{
		path: '/',
		name: 'voiceNavig',
		component: voiceNavig
    },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
export default router
