import Vue from 'vue'
import Router from 'vue-router'

import PostList from '@/components/home/PostList'
import userInfo from '@/components/home/userInfo'
import Article from '@/components/home/Article'
import SideBar from '@/components/home/SideBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      components: {
      	main: PostList
      }
    },
    {
      path: '/user/:name',
      name: 'user_info',
      components: {
      	main: userInfo
      }
    },
    {
    	path: '/topics/:id&author=:name',
    	name: 'post_content',
    	components: {
	      	main: Article,
	      	sidebar:SideBar
	    }
    }
  ]
})
