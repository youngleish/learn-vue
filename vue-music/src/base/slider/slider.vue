<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
            <!--<div class="slider-item">-->
            <!--<a href="">-->
            <!--<img src="./banner.jpg" alt="banner">-->
            <!--</a>-->
            <!--</div>-->
            <!--<div class="slider-item">-->
            <!--<a href="">-->
            <!--<img src="./banner1.jpg" alt="banner">-->
            <!--</a>-->
            <!--</div>-->
        </div>
        <div class="slider-dots">
            <span class="slider-dot" v-for="(item, index) in dots" :class="{'active': index === currentPage}"></span>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import {addClassName} from 'common/js/dom'
    export default {
        name: 'slider',
        data() {
            return {
                dots: [],
                currentPage: 0
            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        mounted() {
            this.init()
        },
        destroyed() {
            clearTimeout(this.timer)
        },
        methods: {
            init() {
                setTimeout(() => {
                    this._setSliderWidth()
                    this._initDots()
                    this._initBScroll()
                }, 20)

                // 浏览器窗口发生变化的时候 重新计算slider的宽度
                window.addEventListener('resize', () => {
                    if (!this.slider) { // slider不存在的情况下 不需要重新计算
                        return
                    }

                    this._setSliderWidth(true)
                    this.slider.refresh()
                })
            },
            _setSliderWidth(isRefresh) {
                this.children = this.$refs.sliderGroup.children
                let width = 0
                let sliderWidth = this.$refs.slider.clientWidth
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i]
                    addClassName(child, 'slider-item')

                    child.style.width = sliderWidth + 'px'
                    width += sliderWidth
                }
                // 如果循环播放的模式，会在sliderGroup前后各复制一个dom
                if (this.loop && !isRefresh) { // 第一次初始化的时候需要加2, 但是窗口resize后不需要家2哥slider元素的宽度
                    width += 2 * sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px'
            },
            _initBScroll() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: {
                        loop: this.loop,
                        threshold: 0.3,
                        speed: 400
                    }
                })

                this.slider.on('scrollEnd', this._onScrollEnd)

                // 自动轮播
                if (this.autoPlay) {
                    this._sliderPlay()
                }
            },
            _onScrollEnd() {
                // 确定currentPage
                let pageIndex = this.slider.getCurrentPage().pageX
                if (this.loop) {
                    // 如果是循环模式下，会给第一个元素加一个拷贝所以要减少1
                    pageIndex -= 1
                }
                this.currentPage = pageIndex

                // 循环轮播
                if (this.autoPlay) {
                    this._sliderPlay()
                }
            },
            _initDots() {
                this.dots = new Array(this.children.length)
            },
            _sliderPlay() {
                let pageIndex = this.currentPage + 1 // 轮播到下一张的index 所以要加1
                if (this.loop) {
                    pageIndex += 1 // 因为loop的情况要拷贝第一个slider-item 所以要再加1
                }
                clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400) // 第二个参数是y方向
                }, this.interval)
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "../../common/sass/variable";

    .slider {
        overflow: hidden;
        position: relative;
        &-group {
            overflow: hidden;
        }
        &-item {
            width: 375px;
            float: left;
            a {
                display: block;
            }
            img {
                display: block;
                width: 100%;
            }
        }
        &-dots {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 12px;
            text-align: center;
            font-size: 0;
        }
        &-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            margin: 0 4px;
            border-radius: 50%;
            background-color: $color-text-l;
            &.active {
                width: 20px;
                border-radius: 5px;
            }
        }
    }
</style>
