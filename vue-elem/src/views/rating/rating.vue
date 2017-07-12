<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left border1px">
                    <div class="score">{{ seller.score }}</div>
                    <div class="desc">综合评分</div>
                    <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="con-title">服务态度</span>
                        <star :size=36 :score="seller.serviceScore"></star>
                        <span class="score-num">{{ seller.serviceScore }}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="con-title">商品评分</span>
                        <star class="rating-star" :size=36 :score="seller.foodScore"></star>
                        <span class="score-num">{{ seller.foodScore }}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="con-title">送达时间</span>
                        <span class="delivery">{{ seller.deliveryTime }}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <rating-select :select-type="selectType" :only-content="onlyContent" :rating-desc="ratingDesc" :ratings="ratings" @ratingtype="getRatingType" @ratingcontent="getRatingContent"></rating-select>
            <div class="rating-list" >
                <ul>
                    <li v-show="needShow(rating.rateType,rating.text)" class="rating-item" v-for="rating in ratings">
                        <div class="avatar">
                            <img :src="rating.avatar" class="pic" width="28" height="28">
                        </div>
                        <div class="item-detail">
                            <div class="name">{{ rating.username }}</div>
                            <div class="star-wrapper">
                                <star :size='24' :score="rating.score"></star>
                                <span class="delivery-time" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
                            </div>
                            <p class="item-text">{{ rating.text }}</p>
                            <div class='recommend' :class="{active: rating.rateType === 0}" v-if="rating.recommend && rating.recommend.length">
                                <i class="icon icon-heart"></i>
                                <span class="recom-item" v-for="recom in rating.recommend">{{ recom }}</span>
                            </div>
                            <div class="time">{{ rating.rateTime | formatDate }}</div>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import star from 'components/star/star'
    import split from 'components/split/split'
    import ratingSelect from 'components/rating-select/rating-select'
    import {formatDate} from 'common/js/date'
    import BScroll from 'better-scroll'

    const [ALL, ERR_OK] = [2, 0]
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            star, split, ratingSelect
        },
        data() {
            return {
                selectType: ALL,
                onlyContent: false,
                ratingDesc: {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                },
                ratings: []
            }
        },
        created() {
            this.$http.get('/api/ratings').then((res) => {
                let rst = res.body
                if (rst.errno === ERR_OK) {
                    this.ratings = rst.data
                    this.$nextTick(() => {
                        this._initBScroll()
                    })
                }
            })
        },
        filters: {
            formatDate(time) {
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },
        methods: {
            _initBScroll() {
                this.ratingScroll = new BScroll(this.$refs.ratings, {
                    click: true
                })
            },
            getRatingType(type) {
                this.selectType = type
                this.$nextTick(() => {
                    this.ratingScroll.refresh()
                })
            },
            getRatingContent(flag) {
                this.onlyContent = flag
                this.$nextTick(() => {
                    this.ratingScroll.refresh()
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
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "../../common/sass/mixin";

    $bd-clr: rgba(7, 17, 27, .1);
    $com-clr: rgb(7, 17, 27);

    .ratings {
        position: absolute;
        top: 176px;
        left: 0;
        bottom: 0;
        right: 0;
        overflow: hidden;
    }
    .overview {
        display: flex;
        padding: 18px 0;
        &-left {
            flex: 0 0 137px;
            width: 137px;
            @include border-1px('border-right', $bd-clr);
            text-align: center;
            padding: 6px 0;
            @media only screen and (max-width: 320px) {
                flex: 0 0 120px;
                width: 120px;
            }
            .score {
                font-size: 24px;
                line-height: 28px;
                color: rgb(255, 153, 0);
                margin-bottom: 6px;
            }
            .desc {
                font-size: 12px;
                line-height: 12px;
                color: rgb(7, 17, 27);
                margin-bottom: 8px;
            }
            .rank {
                line-height: 10px;
                font-size: 10px;
                color: rgb(147, 153, 159);
            }
        }
        &-right {
            flex: 1;
            padding: 6px 0 6px 24px;
            @media only screen and (max-width: 320px) {
                padding-left: 6px;
            }
            .score-wrapper {
                margin-bottom: 8px;
                font-size: 0;
                .con-title {
                    display: inline-block;
                    font-size: 12px;
                    color: $com-clr;
                    line-height: 18px;
                }
                .star {
                    display: inline-block;
                    vertical-align: top;
                    margin: 0 12px;
                }
                .score-num {
                    display: inline-block;
                    vertical-align: top;
                    color: rgb(250, 153, 0);
                    font-size: 12px;
                    line-height: 18px;
                }
            }
            .delivery-wrapper {
                font-size: 0;
                .con-title {
                    font-size: 12px;
                    color: $com-clr;
                    line-height: 18px;
                }
                .delivery {
                    margin-left: 12px;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                }
            }
        }
    }
    .rating-list{
        padding : 0 18px;
        .rating-item{
            display: flex;
            padding:18px 0;
            @include border-1px('border-bottom', $bd-clr);
            .avatar {
                flex:0 0 8px;
                width:28px;
                margin-right:24px;
                .pic{
                    border-radius:50%;
                }
            }
            .item-detail{
                position: relative;
                flex:1;
                .name{
                    margin-bottom:4px;
                    line-height:12px;
                    font-size:10px;
                    color: $com-clr;
                }
                .star-wrapper{
                    margin-bottom:6px;
                    font-size:0;
                    .star{
                        display: inline-block;
                        margin-right:6px;
                        vertical-align: top;
                    }
                    .delivery-time{
                        display: inline-block;
                        vertical-align: top;
                        color: rgb(147,153,159);
                        font-size:10px;
                    }
                }
                .item-text{
                    margin-bottom:18px;
                    line-height:18px;
                    font-size:12px;
                    color: $com-clr;
                }
                .recommend{
                    font-size:0;
                    .icon{
                        line-height:16px;
                        font-size:12px;
                        color: rgb(183,187,191);
                        margin-right:8px;
                    }
                    &.active{
                        .icon{
                            color: rgb(0,160,220);
                        }
                    }
                    .recom-item{
                        display: inline-block;
                        padding: 6px;
                        margin:0 8px 8px 0;
                        font-size:9px;
                        color: rgb(147,153,159);
                        line-height:16px;
                        @include border-1px('border', $bd-clr);
                    }
                }
                .time{
                    position: absolute;
                    top:0;
                    right:18px;
                    font-size:10px;
                    line-height:12px;
                    font-weight:200;
                    color: rgb(147,153,159);
                }
            }
        }
    }
</style>