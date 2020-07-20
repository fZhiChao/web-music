import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入路由spa
import vueRouter from 'vue-router'
// use
Vue.use(vueRouter)
// 导入需要用到的组件
import discovery from './views/discovery.vue'
import lists from './views/lists.vue'
import newmusic from './views/newmusic.vue'
import mvs from './views/mvs.vue'
import sousuo from './views/sousuo.vue'
import playlist from './views/playlist.vue'
import mvContent from './views/mvContent.vue'

// 创建路由并配置
let router = new vueRouter({
    routes:[          //配置地址和组件的关系
      {
        path:'/discovery',
        component:discovery
      },
      {
        path:'/',
        component:discovery
      },
      {
        path: '/newmusic',
        component: newmusic
      },
      {
        path: '/mvs',
        component: mvs
      },
      {
        path: '/lists',
        component:lists
      },
      {
        path:'/sousuo',
        component:sousuo
      },
      {
        path:'/playlist',
        component:playlist
      },
      {
        path: '/mvContent',
        component: mvContent
      }
      ]
})


// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


// 导入axios
import axios from 'axios'



new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
