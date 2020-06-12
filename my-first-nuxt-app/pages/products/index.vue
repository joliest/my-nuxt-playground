<template>
    <div>
        <h1>Products</h1>
        <button @click="onClickButton()">Go to product 1</button>
    </div>
</template>

<script>
export default {
    methods: {
        onClickButton() {
            this.$router.push("/users/tide")
        }
    }
}
</script>