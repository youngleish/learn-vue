<template>
    <div id="app">
        <m-head></m-head>
        <tab></tab>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
    import MHead from 'components/head/header'
    import Tab from 'components/tab'
    export default {
        name: 'app',
        components: {
            MHead, Tab
        }
    }
</script>

<style>
</style>
