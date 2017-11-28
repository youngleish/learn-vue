<template>
    <div>
        <ul class="">
            <li class="item" v-for="item in list" @click="selectItem(item)">{{ item.name }}</li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script  type="text/ecmascript-6">
    import {mapMutations} from 'vuex'
    export default {
        data() {
            return {
                list: [
                    {
                        id: 1,
                        name: '杨幂'
                    },
                    {
                        id: 2,
                        name: '薛之谦'
                    },
                    {
                        id: 1,
                        name: 'andy'
                    },
                    {
                        id: 1,
                        name: '小样'
                    }
                ]
            }
        },
        methods: {
            ...mapMutations({
                setSinger: 'SET_SINGER'
            }),
            selectItem(item) {
                this.$router.push({
                    path: `/singer/${item.id}`
                })
                this.setSinger(item)
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>

</style>
