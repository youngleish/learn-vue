<template>
    <transition name="slide">
        <div class="singer-detail"></div>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {ERR_OK} from 'api/config'
    import {getSingerDetail} from 'api/singer'
    export default {
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        created() {
            console.log(this.singer)
            this.getSingerDetail()
        },
        methods: {
            getSingerDetail() {
                getSingerDetail(this.singer.id).then((res) => {
                    if (res.code === ERR_OK) {
                        console.log(res)
                    }
                })
            }
        }
    }
</script>

<style scoped lang='scss' rel='stylesheet/scss' type="text/scss">
    @import "~scss_vars";
    .singer-detail {
        position: fixed;
        z-index:100;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background-color: $color-background;
    }
    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s;
    }
    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0);
    }

</style>
