<template>
    <div class="admin-post-page">
        <section class="update-form">
            <AdminPostForm 
                :post="loadedPost"
                @submit="onSubmitted" />
        </section>
    </div>
</template>

<script>
import AdminPostForm from '@/components/Admin/AdminPostForm'

export default {
    layout: 'admin',
    middleware: ['check-auth', 'auth'],
    components: {
        AdminPostForm,
    },
    asyncData(context) {
        return context.app.$axios
            .$get(`/posts/${context.params.postId}.json`)
            .then(data => {
                // manually add the id
                return { loadedPost: { ...data, id: context.params.postId  } }
            })
            .catch(e => context.error(e))
    },
    methods: {
        onSubmitted(editedPosts) {
            this.$store.dispatch('editPost', editedPosts).then(() => {
                this.$router.push('/admin');
            });

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