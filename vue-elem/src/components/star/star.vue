<template>
    <div class="star" :class="starType">
        <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script>
    const STAR_LEN = 5
    const CLS_ON = 'on'
    const CLS_HALF = 'half'
    const CLS_OFF = 'off'

    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        data() {
            return {
            }
        },
        computed: {
            starType () {
                return 'star-' + this.size
            },
            itemClasses () {
                let rst = []
                let score = Math.floor(this.score * 2) / 2
                let hasDecimal = score % 1 !== 0
                let integer = Math.floor(score)
                for (let i = 0; i < integer; i++) {
                    rst.push(CLS_ON)
                }
                if (hasDecimal) {
                    rst.push(CLS_HALF)
                }
                while (rst.length < STAR_LEN) {
                    rst.push(CLS_OFF)
                }
                return rst
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "../../common/sass/mixin";

    .star {
        display: inline-block;
        /*width: 100%;*/
        /*padding: 10px 0;*/
        text-align: center;
        font-size:0;
        &-item {
            display:inline-block;
        }
        &-48 {
            .star-item {
                width: 20px;
                height: 20px;
                margin-right: 22px;
                background-size: 100%;
                &:last-child {
                    margin-right: 0;
                }
                &.on {
                    @include bg-img('star48_on');
                }
                &.off {
                    @include bg-img('star48_off');
                }
                &.half {
                    @include bg-img('star48_half');
                }
            }
        }
        &-36 {
            .star-item {
                width: 15px;
                height: 15px;
                margin-right: 6px;
                background-size: 100%;
                &:last-child {
                    margin-right: 0;
                }
                &.on {
                    @include bg-img('star36_on');
                }
                &.off {
                    @include bg-img('star36_off');
                }
                &.half {
                    @include bg-img('star36_half');
                }
            }
        }
        &-24 {
            .star-item {
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-size: 100%;
                &:last-child {
                    margin-right: 0;
                }
                &.on {
                    @include bg-img('star24_on');
                }
                &.off {
                    @include bg-img('star24_off');
                }
                &.half {
                    @include bg-img('star24_half');
                }
            }
        }
    }
</style>