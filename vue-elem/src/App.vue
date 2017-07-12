<template>
    <div id="app">
        <v-Header :seller="seller"></v-Header>
        <div class="tab border1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/rating">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <router-view :seller="seller"></router-view>
    </div>
</template>

<script>
    import vHeader from 'components/header/header.vue'

    const ERR_OK = 0

    export default {
        name: 'app',
        components: {
            vHeader
        },
        data() {
            return {
                seller: {}
            }
        },
        created() {
            this.$http.get('/api/seller').then((res) => {
                let rst = res.body
                let errno = rst.errno
                if (errno === ERR_OK) {
                    this.seller = rst.data
                }
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "common/sass/mixin";
    .tab{
        display: flex;
        width:100%;
        height:40px;
        line-height:40px;
        background-color: #fff;
        @include border-1px('border-bottom');
        &-item{
            flex:1;
            text-align: center;
            a {
                display: block;
                font-size:14px;
                color: rgb(77,85,93);
                &.active{
                    color: rgb(240,20,20);
                }
            }
        }
    }
</style>
