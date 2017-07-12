<template>
    <div class="shopcart">
        <div class="shopcart-con">
            <div class="content">
                <div class="content-left" :class="{highlight: totalCount>0}"  @click="toggleList">
                    <div class="logo-box">
                        <div class="logo">
                            <i class="icon icon-shopping-cart"></i>
                        </div>
                        <div class="number" v-show="totalCount">{{ totalCount }}</div>
                    </div>
                    <div class="price">&yen;{{ totalPrice }}</div>
                    <div class="desc">另需配送费&yen;{{ deliveryPrice }}</div>
                </div>
                <div class="content-right">
                    <div class="pay" :class="{account: totalPrice >= minPrice  }">{{ payDesc }}</div>
                </div>
                <transition name="move-shopcart">
                    <div class="shopcart-list1" v-show="listShow">
                        <div class="list-header">
                            <div class="list-title">购物车</div>
                            <div class="list-clear" @click="empty">清空</div>
                        </div>
                        <div class="list-content" ref="listContent">
                            <ul>
                                <li class="food" v-for="food in selectFoods">
                                    <span class="name">{{ food.name }}</span>
                                    <div class="price">
                                        <span>￥{{ food.price*food.count }}</span>
                                    </div>
                                    <div class="carcontrol-box">
                                        <carcontrol :food="food"></carcontrol>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>
</template>

<script>
    import carcontrol from 'components/cartcontrol/cartcontrol'
    import BScroll from 'better-scroll'

    export default {
        props: {
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            },
            selectFoods: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                fold: true
            }
        },
        created() {

        },
        computed: {
            totalPrice() {
                let total = 0
                this.selectFoods.forEach((foods) => {
                    total += foods.price * foods.count
                })
                return total
            },
            totalCount() {
                let count = 0
                this.selectFoods.forEach((foods) => {
                    count += foods.count
                })
                return count
            },
            payDesc() {
                if (this.totalPrice === 0) {
                    return `￥${this.minPrice}起送`
                } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
                    return `还差￥${this.minPrice - this.totalPrice}元起送`
                } else {
                    return '去结算'
                }
            },
            listShow() {
                if (!this.totalCount) {
                    this.fold = true
                    return false
                }

                let show = !this.fold
                if (show) {
                    this.$nextTick(() => {
                        if (!this.listScroll) {
                            this._initBScroll()
                        } else {
                            this.listScroll.refresh()
                        }
                    })
                }
                return show
            }
        },
        components: {
            carcontrol
        },
        methods: {
            toggleList() {
                if (!this.totalCount) {
                    return
                }
                this.fold = !this.fold
            },
            empty() {
                this.selectFoods.forEach((food) => {
                    food.count = 0
                })
            },
            hideList() {
                this.fold = true
            },
            _initBScroll() {
                this.listScroll = new BScroll(this.$refs.listContent, {
                    click: true
                })
            }
        }
    }

</script>

<style lang='scss' rel='stylesheet/scss'>
    $com-clr: rgb(0, 160, 220);
    .shopcart-con {
        position: fixed;
        left: 50%;
        bottom: 0;
        z-index: 100;
        width: 100%;
        max-width:750px;
        height: 48px;
        transform:translate3d(-50%,0,0);
        .content {
            display: flex;
            background-color: #141d27;
            color: rgba(255, 255, 255, 0.4);
            &-left {
                flex: 1;
                font-size: 0;
                .logo-box, .desc, .price {
                    display: inline-block;
                }
                .logo-box {
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    vertical-align: top;
                    background-color: rgb(20, 29, 39);
                    .logo {
                        width: 100%;
                        height: 100%;
                        text-align: center;
                        border-radius: 50%;
                        background-color: rgba(255, 255, 255, 0.2);
                        .icon {
                            display: inline-block;
                            vertical-align: middle;
                            font-size: 20px;
                            line-height: 44px;
                            color: #80858a;
                        }
                    }
                    .number {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border-radius: 16px;
                        font-size: 9px;
                        background-color: rgb(240, 20, 20);
                        font-weight: 400;
                        color: #fff;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
                    }
                }
                .price {
                    line-height: 24px;
                    font-size: 16px;
                    font-weight: 700;
                    margin-top: 12px;
                    padding-right: 12px;
                    border-right: 1px solid rgba(255, 255, 255, 0.1);
                }
                .desc {
                    font-size: 10px;
                    margin: 12px 0 0 12px;
                    line-height: 24px;
                    font-weight: 200;
                    color: rgba(255, 255, 255, 0.4);
                }
                &.highlight {
                    .logo {
                        background-color: rgb(0, 160, 220);
                        .icon {
                            color: #fff;
                        }
                    }
                    .price {
                        color: #fff;
                    }
                }
            }
            &-right {
                flex: 0 0 105px;
                width: 105px;
                .pay {
                    height: 48px;
                    line-height: 48px;
                    background-color: #2b333b;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 700;
                    &.account {
                        background-color: green;
                        color: #fff;
                    }
                }
            }
            .shopcart-list1 {
                color: #000;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
                width: 100%;
                background-color: #fff;
                transform: translate3d(0, -100%, 0);
                transition: all 0.5s;
                &.move-shopcart-enter-active, &.move-shopcart-leave {
                    transform: translate3d(0, -100%, 0);
                }
                &.move-shopcart-enter, &.move-shopcart-leave-active {
                    transform: translate3d(0, 0, 0);
                }
                .list-header {
                    display: flex;
                    height: 40px;
                    line-height: 40px;
                    padding: 0 18px;
                    background-color: #f3f5f7;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    font-size: 14px;
                    & > div {
                        flex: 1;
                        &.list-clear {
                            text-align: right;
                            color: $com-clr;
                        }
                    }
                }
                .list-content {
                    padding: 0 18px;
                    max-height: 217px;
                    overflow: hidden;
                    background-color: #fff;
                    .food {
                        display: flex;
                        align-content: center;
                        padding: 12px 0;
                        height: 40px;
                        line-height: 40px;
                        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                        .name {
                            width: 70%;
                            line-height: 24px;
                        }
                    }
                }
            }
        }
    }
    .list-mask{
        position: fixed;
        top:0;
        left:50%;
        /*right:0;*/
        /*bottom:0;*/
        z-index:20;
        width:100%;
        height:100%;
        max-width:750px;
        background-color: rgba(7,17,27,0.6);
        transform:translate3d(-50%,0,0);
        transition:all 0.5s;
        -webkit-backdrop-filter: blur(10px);
        &.fade-enter-active,&.fade-leave-acitve{
            opacity:1;
        }
        &.fade-enter,&.fade-leave{
            opacity:0;
        }
    }
</style>