<template>
    <div>
        <div v-if="sliders.length" class="slider-wrapper">
            <slider>
                <div class="slider-item" v-for="item in sliders">
                    <a :href="item.linkUrl">
                        <img :src="item.picUrl" alt="">
                    </a>
                </div>
            </slider>
        </div>
        <div class="recommend-list">
            <h1 class="list-title">热门歌单列表</h1>
            <ul>
                <li v-for="item in discList" class="item">
                    <div class="icon">
                        <img width="60" height="60" :src="item.imgurl">
                    </div>
                    <div class="text">
                        <h2 class="name" v-html="item.creator.name"></h2>
                        <p class="desc" v-html="item.dissname"></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Slider from 'base/slider/slider'
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
            Slider
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
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "~scss_vars";
    .recommend-list{
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
</style>
