<template>
    <div class="posts-page">
      <PostList :posts="loadedPosts" />
    </div>
</template>

<script>
import PostList from '@/components/Posts/PostList'

export default {
  components: {
    PostList
  },
  fetch(context) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          loadedPosts: [
            {
              id: '1',
              title: 'First Post',
              previewText: 'This is our first post',
              thumbnail: 'https://thyblackman.com/wp-content/uploads/2018/11/TECH.jpg'
            },
            {
              id: '2',
              title: 'Second Post',
              previewText: 'This is our second post',
              thumbnail: 'https://thyblackman.com/wp-content/uploads/2018/11/TECH.jpg'
            }
          ]
        })
      }, 1000)
    }).then(data => {
      // you can access the state via context
      context.store.commit('setPosts', data.loadedPosts)
    }).catch(e => {
      // if you call reject()
    });
  },
  computed: {
    // loaded posts will be no longer accessed by interpolation
    // use thcomputed to get the data
    loadedPosts() {
      return this.$store.getters.loadedPosts
    }
  }
}
</script>

<style scoped>
.posts-page {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>