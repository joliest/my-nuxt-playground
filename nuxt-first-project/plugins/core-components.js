import Vue from 'vue'

import AppButton from '@/components/UI/AppButton'
import AppControlInput from '@/components/UI/AppControlInput'
import PostList from '@/components/Posts/PostList'

// you can now access them globally without importing them
Vue.component('AppButton', AppButton)
Vue.component('AppControlInput', AppControlInput)
Vue.component('PostList', PostList)