<template>
    <header class="header">
        <ul class="nav-items">
            <li>
                <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/users">Users</nuxt-link>
            </li>
        </ul>
    </header>
</template>

<style>
    .header {
        background: gray;
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nav-items {
        list-style: none;
        display: flex;
        padding: 0;
        margin: 0;
        justify-content: space-around;
        align-items: center;
        width: 80%;
    }
</style>