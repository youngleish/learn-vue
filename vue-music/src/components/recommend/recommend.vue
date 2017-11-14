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
    </div>
</template>

<script>
    import Slider from 'base/slider/slider'
    import {getRecommend} from 'api/recommend'
    import {ERR_OK} from 'api/config'
    export default {
        name: 'recommend',
        data() {
            return {
                sliders: []
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
            },
            _getRecommend() {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.sliders = res.data.slider
                    }
                })
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>

</style>
