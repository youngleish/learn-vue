<template>
    <div class="recommend">
        <!-- 此处给scroll组件传入data触发组件的refresh事件重新计算容器的高度，但是存在一个问题scroll包括2部分数据，sliders和disclist, 获取slider和disclist都是异步的，如果data中只传disclist， 当获取sliders的接口比较慢的时候，就会出现scorll高度计算错误的问题，导致热门歌单列表展示不全，所以在slider组件中的img中添加load事件触发scroll的refresh事件，重新计算容器的高度解决该问题 -->
        <scroll :data="discList" ref="scroll" class="recommend-content">
            <div>
                <div v-if="sliders.length" class="slider-wrapper">
                    <div class="slider-content">
                        <slider>
                            <div class="slider-item" v-for="item in sliders">
                                <a :href="item.linkUrl">
                                    <img @load="loadImg" :src="item.picUrl" alt="">
                                </a>
                            </div>
                        </slider>
                    </div>
                </div>
                <div class="recommend-list" :data="discList">
                    <h1 class="list-title">热门歌单列表</h1>
                    <ul>
                        <li v-for="item in discList" class="item" @click="selectItem(item)">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.imgurl">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.creator.name"></h2>
                                <p class="desc" v-html="item.dissname"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Slider from 'base/slider/slider'
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/index'
    import {getRecommend, getDiscList} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    export default {
        name: 'recommend',
        data() {
            return {
                sliders: [],
                discList: []
            }
        },
        created() {
            this.init()
        },
        components: {
            Slider, Scroll, Loading
        },
        methods: {
            init() {
                this._getRecommend()
                this._getDiscList()
            },
            _getRecommend() {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.sliders = res.data.slider
                    }
                })
            },
            _getDiscList() {
                getDiscList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.discList = res.data.list
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            loadImg() {
                if (!this.imgLoadFlag) {
                    this.$refs.scroll.refresh()
                    this.imgLoadFlag = true
                }
            },
            selectItem(item) {
                this.$router.push({
                    path: `/recomment/${item.dissid}`
                })
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "~scss_vars";

    .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        &-content {
            height: 100%;
            overflow: hidden;
        }
        .slider-wrapper {
            /*position: relative;*/
            /*width: 100%;*/
            /*height: 0;*/
            /*padding-top: 40%;*/
            /*overflow: hidden;*/
            /*.slider-content {*/
                /*position: absolute;*/
                /*top: 0;*/
                /*left: 0;*/
                /*width: 100%;*/
                /*height: 100%;*/
            /*}*/
        }
        &-list {
            .list-title {
                height: 65px;
                line-height: 65px;
                text-align: center;
                font-size: $font-size-medium;
                color: $color-theme;
            }
            .item {
                display: flex;
                box-sizing: border-box;
                align-items: center;
                padding: 0 20px 20px 20px;
            }
            .icon {
                flex: 0 0 60px;
                width: 60px;
                padding-right: 20px;
            }
            .text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex: 1;
                line-height: 20px;
                overflow: hidden;
                font-size: $font-size-medium;
            }
            .name {
                margin-bottom: 10px;
                color: $color-text;
            }
            .desc {
                color: $color-text-d;
            }
        }
    }

</style>
