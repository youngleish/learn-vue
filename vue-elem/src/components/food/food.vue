<template>
    <transition name="move-food">
        <div v-show="showFlag" class="food-detail" ref="food">
            <div class="food-detail-content">
                <div class="img-header">
                    <img class="pic" :src="food.image" width="100%" height="100%">
                    <div class="back" @click="hide">
                        <i class="icon icon-angle-left"></i>
                    </div>
                </div>
                <div class="content">
                    <div class="name">{{ food.name }}</div>
                    <div class="detail">
                        <span class="sell">月售{{ food.sellCount }}份</span>
                        <span class="rating-radio">好评率{{ food.rating }}</span>
                    </div>
                    <div class="price">
                        <span class="now">&yen;{{ food.price }}</span>
                        <del class="old" v-show="food.oldPrice">&yen;{{ food.oldPrice }}</del>
                    </div>
                    <div class="cart-control-box">
                        <cartcontrol :food="food" v-show="food.count"></cartcontrol>
                    </div>
                    <transition name="btn-fade">
                        <div class="buy-btn" v-show="!food.count || food.count === 0" @click="addFrist($event)">加入购物车
                        </div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="food-info" v-show="food.info">
                    <h1 class="food-title">商品信息</h1>
                    <p class="food-text">{{ food.info }}</p>
                </div>
                <split></split>
                <div class="food-rating">
                    <h1 class="food-title">商品评价</h1>
                    <rating-select :select-type="selectType" :only-content="onlyContent" :rating-desc="ratingDesc" :ratings="food.ratings" @ratingtype="getRatingType" @ratingcontent="getRatingContent"></rating-select>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                                class="rating-item">
                                <div class="user-box">
                                    <div class="time">{{ rating.rateTime | formatDate }}</div>
                                    <div class="user">
                                        <span class="user-name">{{ rating.username }}</span>
                                        <img class="pic" :src="rating.avatar" width="12px" height="12px">
                                    </div>
                                </div>
                                <div class="rating-text">
                                    <i class="icon icon-heart" :class="{'like': !rating.rateType}"></i>
                                    <span class="text">{{ rating.text }}</span>
                                </div>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import Vue from 'vue'
    import BScroll from 'better-scroll'
    import cartcontrol from 'components/cartcontrol/cartcontrol'
    import split from 'components/split/split'
    import ratingSelect from 'components/rating-select/rating-select'
    import {formatDate} from 'common/js/date'

    const ALL = 2

    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: false,
                ratingDesc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        components: {
            cartcontrol, split, ratingSelect
        },
        methods: {
            show() {
                this.showFlag = true
                // 组件显示以后要再重新初始化一下数据
                this.selectType = ALL
                this.onlyContent = false

                this.$nextTick(() => {
                    this._initBScroll()
                })
            },
            hide() {
                this.showFlag = false
            },
            addFrist(event) {
                if (!event._constructed) {
                    return false
                }
                Vue.set(this.food, 'count', 1)
            },
            getRatingType(type) {
                this.selectType = type

                this.$nextTick(() => {
                    this.foodsScroll.refresh()
                })
            },
            getRatingContent(onlyContent) {
                this.onlyContent = onlyContent

                this.$nextTick(() => {
                    this.foodsScroll.refresh()
                })
            },
            needShow(type, text) {
                // 如果只显示有内容的评论&&当前这条评论没有内容，返回false
                if (this.onlyContent && !text) {
                    return false
                }
                if (this.selectType === ALL) {
                    return true
                } else {
                    return this.selectType === type
                }
            },
            _initBScroll() {
                this.foodsScroll = new BScroll(this.$refs.food, {
                    click: true
                })
            }
        },
        filters: {
            formatDate(time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    $com-clr: rgb(7, 17, 27);
    .food-detail {
        position: fixed;
        top: 0;
        left: 50%;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        max-width: 750px;
        height: 100%;
        background-color: #fff;
        transform: translate3d(-50%, 0, 0);
        transition: 0.2s all linear;
        &.move-food-enter-active, &.move-food-leave {
            transform: translate3d(0, 0, 0);
        }
        &.move-food-enter, &.move-food-leave-active {
            transform: translate3d(50%, 0, 0);
        }
        &-content {
            .img-header {
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 100%;
                .pic {
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .back {
                    position: absolute;
                    left: 10px;
                    top: 10px;
                    width: 40px;
                    height: 40px;
                    line-height: 55px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: rgba(0, 0, 0, 0.4);
                    .icon-angle-left {
                        font-size: 30px;
                        color: #fff;
                        display: inline-block;
                    }
                }
            }
            .content {
                padding: 18px;
                position: relative;
                .name {
                    font-size: 14px;
                    font-weight: 700;
                    line-height: 14px;
                    padding-bottom: 8px;
                    color: $com-clr;
                }
                .detail {
                    color: rgb(147, 153, 159);
                    line-height: 14px;
                    font-size: 0;
                    padding-bottom: 18px;
                    & > span {
                        font-size: 10px;
                    }
                    .sell {
                        padding-right: 12px;
                    }
                }
                .price {
                    font-size: 0;
                    line-height: 24px;
                    font-weight: 700;
                    .now {
                        font-size: 14px;
                        color: rgb(240, 20, 20);
                        line-height: 24px;
                        margin-right: 8px;
                    }
                    .old {
                        font-size: 10px;
                        color: rgb(147, 153, 159);

                    }
                }
                .cart-control-box {
                    position: absolute;
                    right: 12px;
                    bottom: 12px;
                }
                .buy-btn {
                    position: absolute;
                    z-index: 10;
                    right: 18px;
                    bottom: 18px;
                    width: 74px;
                    height: 24px;
                    text-align: center;
                    line-height: 24px;
                    background-color: rgb(0, 160, 220);
                    color: #fff;
                    font-size: 10px;
                    border-radius: 12px;
                    /*appearance: none;*/
                    &.btn-fade-enter-active, &.btn-fade-leave {
                        transition: all 0.5s;
                        opacity: 1;
                    }
                    &.btn-fade-enter, &.btn-fade-leave-active {
                        opacity: 0;
                    }
                }

            }
            .food-info {
                padding: 18px;
                .food-title {
                    margin-bottom: 6px;
                    line-height: 14px;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .food-text {
                    line-height: 24px;
                    font-size: 12px;
                    color: rgb(77, 85, 93);
                    padding: 0 8px;
                }
            }
            .food-rating {
                padding-top: 18px;
                padding-bottom: 48px;
                .food-title {
                    line-height: 14px;
                    font-size: 14px;
                    margin-left: 18px;
                    color: rgb(7, 17, 27);
                }
                .rating-wrapper {
                    padding: 0 18px;
                    .rating-item {
                        padding: 16px 0;
                        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                        .user-box {
                            padding-bottom: 6px;
                            font-size: 10px;
                            line-height: 12px;
                            color: #93999f;
                            display: flex;
                            .time {
                                flex: 1
                            }
                            .user {
                                &-name {
                                    margin-right: 6px;
                                }
                                .pic {
                                    border-radius: 50%;
                                }
                            }
                        }
                        .rating-text {
                            line-height: 16px;
                            font-size: 12px;
                            color: #07111b;
                            .icon {
                                margin-right: 4px;
                                color: #93999f;
                                &.like {
                                    color: #00a0dc;
                                }
                            }
                        }
                    }
                    .no-rating{
                        padding:16px 0;
                        font-size:12px;
                        color: rgb(147,153,159);
                    }
                }
            }
        }
    }
</style>