<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm :post="loadedPost" />
        </section>
    </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
    components: {
        AdminPostForm,
    },
    data() {
        return {
            loadedPost: {
                author: 'Joli',
                title: 'My awesome post',
                content: 'Super amazing',
                thumbnailLink: 'https://thyblackman.com/wp-content/uploads/2018/11/TECH.jpg'
            }
        }
    }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>