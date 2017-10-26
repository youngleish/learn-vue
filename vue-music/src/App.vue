<template>
    <div id="app">
        <m-head></m-head>
        <tab></tab>
        <router-view></router-view>
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
