<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        props: {
            probeType: { // 决定合适派发scroll事件
                type: Number,
                default: 0
            },
            click: {
                type: Boolean,
                default: false
            },
            data: { // 传入数据， 通过watch data的变化，重新刷新bs, 解决容器高度计算错误的问题
                type: Array,
                default: null
            }
        },
        mounted() {
            setTimeout(() => {
                this.init()
            }, 20)
        },
        watch: {
            // data变化以后要重新计算高度
            data() {
                setTimeout(() => {
                    this.refresh()
                }, 20)
            }
        },
        methods: {
            init() {
                if (!this.$refs.wrapper) {
                    return
                }

                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                })
            },
            // 方法代理
            enable() {
                this.scroll && this.scroll.enable()
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            }
        }
    }
</script>

<style scoped lang='scss' rel='stylesheet/scss' type="text/scss">
    @import "~scss_vars";
</style>
