<template>
    <section class="post-list">
        <PostPreview 
            id="1"
            :isAdmin="isAdmin"
            thumbnails="https://thyblackman.com/wp-content/uploads/2018/11/TECH.jpg"
            title="Hello there"
            previewText="This is my first post" />
        <PostPreview 
            id="2"
            :isAdmin="isAdmin"
            thumbnails="https://thyblackman.com/wp-content/uploads/2018/11/TECH.jpg"
            title="Hello there - second time"
            previewText="This is my second post" />
    </section>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview'

export default {
  components: {
    PostPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>