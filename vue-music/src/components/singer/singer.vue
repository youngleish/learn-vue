<template>
    <div class="singer">
        <ul class="">
            <li class="item" v-for="item in singers[0].items" @click="selectSinger(item)">{{ item.name }}</li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script  type="text/ecmascript-6">
    import {getSingerList} from 'api/singer'
    import {ERR_OK} from 'api/config'
    import {mapMutations} from 'vuex'
    import Singer from 'common/js/singer'

    const HOT_NAME = '热门'
    const HOT_LIST_LEN = 10
    export default {
        data() {
            return {
                singers: [],
                list: [
                    {
                        id: '002J4UUk29y8BY',
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
        created() {
            this.getSingerList()
        },
        methods: {
            ...mapMutations({
                setSinger: 'SET_SINGER'
            }),
            selectSinger(item) {
                this.$router.push({
                    path: `/singer/${item.id}`
                })
                this.setSinger(item)
            },
            getSingerList() {
                getSingerList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.singers = this.normalizeSingerList(res.data.list)
                        console.log(this.singers)
                    }
                })
            },
            normalizeSingerList(list) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                }
                list.forEach((item, index) => {
                    // 前10条数据放在热门里面
                    if (index < HOT_LIST_LEN) {
                        map.hot.items.push(new Singer({
                            name: item.Fsinger_name,
                            id: item.Fsinger_mid
                        }))
                    }

                    // 处理其他分类
                    const key = item.Findex
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push(new Singer({
                        name: item.Fsinger_name,
                        id: item.Fsinger_mid
                    }))
                })
                // 进行排序 vue可以遍历对象，但是对象是无序的所以要进行排序 同时进行数据过滤
                let hot = []
                let ret = []
                for (var key in map) {
                    let val = map[key]
                    if (val.title.match(/[a-zA-z]/)) { // map对象中有个key是数字（9）此处可以把这个值过滤掉
                        ret.push(val)
                    } else if (val.title === HOT_NAME) {
                        hot.push(val)
                    }
                }
                // 对ret进行排序
                ret.sort((a, b) => {
                    return a.title.charAt(0) - b.title.charAt(0)
                })

                return hot.concat(ret)
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    .singer {
        position: fixed;
        top:88px;
        bottom:0;
        width:100%;
    }
</style>
