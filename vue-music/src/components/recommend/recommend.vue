<template>
    <div>
        <div class="slider-wrapper">
            <slider></slider>
        </div>
    </div>
</template>

<script>
    import Slider from 'base/slider/slider'
    import {getRecommend} from 'api/recommend'
    export default {
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
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>

</style>
