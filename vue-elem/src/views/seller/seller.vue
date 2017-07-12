<template>
    <div class="shops" ref="shops">
        <div class="shops-con">
            <div class="shops-overview">
                <h1 class="shops-title">{{ seller.name }}</h1>
                <div class="shops-overview-desc border1px">
                    <star :size="36" :score="seller.score"></star>
                    <span class="text">({{ seller.ratingCount }})</span>
                    <span class="text">月售{{ seller.sellCount }}单</span>
                </div>
                <ul class="shops-overview-remark">
                    <li class="remark-block border1px">
                        <h2>起送价</h2>
                        <div class="con">
                            <span class="stress">{{ seller.minPrice }}</span>元
                        </div>
                    </li>
                    <li class="remark-block border1px">
                        <h2>商家配送</h2>
                        <div class="con">
                            <span class="stress">{{ seller.deliveryPrice }}</span>元
                        </div>
                    </li>
                    <li class="remark-block border1px">
                        <h2>平就均配送时间</h2>
                        <div class="con">
                            <span class="stress">{{ seller.deliveryTime }}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="shops-overview-collect">
                    <i class="icon icon-heart"></i>
                    <div class="text">已收藏</div>
                </div>
            </div>
            <split></split>
            <div class="bulletin">
                <h1 class="shops-title">公告与活动</h1>
                <p class="bulletin-con border1px">{{ seller.bulletin }}</p>
                <div class="supports">
                    <div class="supports-list border1px" v-if="seller.supports" v-for="item in seller.supports">
                        <h-label class="label-bg" :labelType="item.type"></h-label>
                        <span class="desc">{{ item.description }}</span>
                    </div>
                </div>
            </div>
            <split></split>
            <div class="shops-pics">
                <h1 class="shops-title">商家实景</h1>
                <div class="shops-pics-box" ref="shopPics">
                    <ul class="shops-pics-list" ref="shopsPicsList">
                        <li class="shops-pics-item" v-for="pic in seller.pics">
                            <img :src="pic" width="120" height="90" alt="">
                        </li>
                    </ul>
                </div>
            </div>
            <split></split>
            <div class="shops-info">
                <h1 class="shops-title border1px">商家信息</h1>
                <ul>
                    <li class="shops-info-item border1px" v-for="info in seller.infos">{{ info }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import star from 'components/star/star'
    import split from 'components/split/split'
    import hLabel from 'components/label/label'
    import BScroll from 'better-scroll'

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        components: {
            star, split, hLabel
        },
        watch: {
            seller() {
                this.$nextTick(() => {
                    this._initBScroll()
                    this._initShopsPicScroll()
                })
            }
        },
        mounted() {
            this._initBScroll()
            this._initShopsPicScroll()
        },
        methods: {
            _initBScroll() {
                if (!this.shopsScroll) {
                    this.shopsScroll = new BScroll(this.$refs.shops, {
                        click: true
                    })
                } else {
                    this.shopsScroll.refresh()
                }
            },
            _initShopsPicScroll() {
                if (this.seller.pics) {
                    let picW = 120
                    let marginW = 6
                    let listW = (picW + marginW) * this.seller.pics.length - marginW
                    this.$refs.shopsPicsList.style.width = `${listW}px`
                    if (!this.picsScroll) {
                        this.picsScroll = new BScroll(this.$refs.shopPics, {
                            scrollX: true,
                            eventPassThrough: 'vertical'
                        })
                    } else {
                        this.picsScroll.refresh()
                    }
                }
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "../../common/sass/mixin";

    $bd-clr: rgba(7, 17, 27, 0.1);
    $fz-clr: rgb(77, 85, 93);
    .shops {
        position: absolute;
        top: 176px;
        left: 0;
        right: 0;
        bottom: 0;
        max-width: 750px;
        overflow: hidden;
        &-title {
            padding-bottom: 8px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        &-overview {
            padding: 18px;
            &-desc {
                padding-bottom: 18px;
                font-size: 0;
                @include border-1px('border-bottom', $bd-clr);
                .star {
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 8px;
                }
                .text {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 18px;
                    font-size: 10px;
                    color: $fz-clr;
                    margin-right: 12px;
                }
            }
            &-remark {
                display: flex;
                margin: 18px 0;
                text-align: center;
                .remark-block {
                    flex: 1;
                    @include border-1px('border-right', $bd-clr);
                    font-size: 10px;
                    color: rgb(147, 153, 189);
                    line-height: 10px;
                    h2 {
                        padding-bottom: 4px;
                    }
                    .stress {
                        font-size: 24px;
                        color: rgb(7, 17, 27);
                        line-height: 24px;
                    }
                    &:last-child {
                        @include border-none();
                    }
                }
            }
            &-collect {
                position: absolute;
                right: 18px;
                top: 18px;
                text-align: center;
                .icon {
                    font-size: 24px;
                    line-height: 24px;
                    display: inline-block;
                    padding-bottom: 4px;
                }
                .text {
                    font-size: 10px;
                    color: $fz-clr;
                    line-height: 10px;
                }
            }
        }
        .bulletin {
            padding: 18px 18px 0;
            &-con {
                padding: 0 12px 16px 12px;
                font-size: 12px;
                font-weight: 200;
                color: rgb(240, 20, 20);
                line-height: 24px;
                text-align: justify;
                @include border-1px('border-bottom', $bd-clr);
            }
            .supports {
                display: flex;
                flex-flow: column;
                .text {
                    line-height: 14px;
                    font-size: 10px;
                }
                &-list {
                    padding: 12px 16px;
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    @include border-1px('border-bottom', $bd-clr);
                    &:last-child {
                        @include border-1px('border-bottom', #fff);
                    }
                    .label {
                        width: 16px;
                        height: 16px;
                        line-height: 18px;
                        vertical-align: top;
                    }
                }
                .icon {
                    display: inline-block;
                    vertical-align: middle;
                }
                .desc {
                    font-weight: 200;
                    font-size: 14px;
                }
            }

        }
        &-pics {
            padding: 18px 0 18px 18px;
            .shops-title {
                margin-bottom: 12px;
            }
            &-box {
                width: 100%;
                overflow: hidden;
                white-space: nowrap;
            }
            &-list {
                /*font-size:0;*/
                display: flex;
            }
            &-item {
                /*display: inline-block;*/
                margin-right: 6px;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
        &-info{
            padding: 18px 18px 0;
            .shops-title{
                @include border-1px('border-bottom',$bd-clr);
            }
            &-item{
                padding:16px 12px;
                font-size:12px;
                font-weight:200;
                color:  rgb(7, 17, 27);
                line-height:16px;
                @include border-1px('border-bottom',$bd-clr);
                &:last-child{

                    @include border-1px('border-bottom',#fff);
                }
            }
        }
    }
</style>