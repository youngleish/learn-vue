<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="con-title">
                    <span class="brand">品牌</span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <div class="desc">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
                <div class="supports" v-if="seller.supports">
                    <h-label class="label-other-bg label-no-bg" :labelType="seller.supports[0].type"></h-label>
                    <span class="text">{{ seller.supports[0].description }}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{ seller.supports.length }}个</span>
                <i class="icon icon-angle-left"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <div class="tit">公告</div>
            <div class="text">{{ seller.bulletin }}</div>
            <div class="icon">
                <i class="icon-angle-left"></i>
            </div>
        </div>
        <div class="bg">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <transition name="slide-fade">
            <div class="detail" v-show="detailShow" >
                <div class="detail-wrapper clearfix" >
                    <div class="detail-main">
                        <h1 class="name">{{ seller.name }}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <title-line :text="title1"></title-line>
                        <div class="supports" >
                            <div class="supports-list" v-if="seller.supports" v-for="item in seller.supports">
                                <h-label class="label-no-bg" :labelType="item.type"></h-label>
                                <span class="desc">{{ item.description }}</span>
                            </div>
                        </div>
                        <title-line :text="title2"></title-line>
                        <div class="bulletin">
                            <p>{{ seller.bulletin }}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close" @click="closeDetail">
                    <i class="icon icon-cross"></i>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import Star from 'components/star/star'
    import hLabel from 'components/label/label'
    import TitleLine from 'components/title-line/title-line'

    const [TITLE_ONE, TITLE_TWO] = ['优惠信息', '商家公告']

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                detailShow: false,
                title1: TITLE_ONE,
                title2: TITLE_TWO,
                labelType: 0
            }
        },
        methods: {
            showDetail() {
                this.detailShow = true
            },
            closeDetail() {
                this.detailShow = false
            }
        },
        components: {
            Star, TitleLine, hLabel
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "../../common/sass/mixin";
    .label-other-bg{
        background-color: #fff;
    }
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
        /*transform: translateX(500px);*/
        /*opacity: 0;*/
        height:0;
        background-color: red;
    }
    .supports{
        display: flex;
        .text{
            line-height:14px;
            font-size:10px;
        }
    }
    .header{
        position: relative;
        color: #fff;
        background-color: rgba(7,17,27,0.3);
        .content-wrapper{
            display: flex;
            position: relative;
            padding:24px 12px 18px 24px;
            .avatar{
                margin-right:16px;
                img{
                    border-radius:2px;
                }
            }
            .content{
                flex:1;
                .con-title{
                    margin:2px 0 8px;
                    font-size:0;
                    .brand{
                        display: inline-block;
                        height:18px;
                        line-height:18px;
                        text-align: center;
                        width:30px;
                        background: red;
                        font-weight:600;
                        font-size:10px;
                    }
                    .name{
                        margin-left:6px;
                        font-size:16px;
                        line-height:18px;
                        font-weight:bold;
                    }
                }
                .desc{
                    line-height:12px;
                    margin-bottom:10px;
                    font-size:12px;
                }
            }
            .support-count{
                position: absolute;
                right:12px;
                bottom:18px;
                padding:0 8px;
                height:24px;
                line-height:24px;
                border-radius:14px;
                background-color: rgba(0,0,0,0.2);
                text-align: center;
                font-size:10px;
                .icon{
                    display: inline-block;
                    margin-left:2px;
                    font-size:10px;
                    transform: rotate(180deg);
                    line-height:24px;
                }
            }
        }
        .bulletin-wrapper{
            display: flex;
            align-items:center;
            width:100%;
            height:28px;
            line-height:28px;
            padding:0 22px 0 12px;
            .tit{
                width:30px;
                height:14px;
                line-height:14px;
                text-align: center;
                background-color: #fff;
                color: #000;
                font-size:8px;
                font-weight:800;
                font-style: normal;
                margin:0;
            }
            .text{
                flex:1;
                line-height:28px;
                height:100%;
                margin:0 4px;
                font-size:10px;
                width:300px;
                @include text-clamp(1);
            }
            .icon{
                width:30px;
                .icon-angle-left{
                    display: inline-block;
                    transform: rotate(180deg);
                }
            }
        }
        .bg{
            position: absolute;
            top:0;
            left:0;
            bottom:0;
            right:0;
            z-index: -1;
            filter:blur(10px);
        }
        .detail{
            position: fixed;
            top:0;
            left:50%;
            transform: translateX(-50%);
            z-index:100;
            width:100%;
            max-width:750px;
            height:100%;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            background-color: rgba(0,0,0,0.8);
            backdrop-filter:blur(10px) hue-rotate(180deg);
            &-wrapper{
                min-height:100vh;
                width:100%;
                .detail-main{
                    padding: 64px 0;
                    .name{
                        font-size:16px;
                        line-height:16px;
                        text-align: center;
                        font-weight:700;
                    }
                    .star-wrapper{
                        padding:18px;
                        text-align: center;
                    }
                    .title{
                        display: flex;
                        width:80%;
                        margin: 30px auto 24px;
                        .line{
                            flex:1;
                            position: relative;
                            top:-6px;
                            @include border-1px('border-bottom',rgba(255,255,255,0.2))
                        }
                        .text{
                            padding:0 12px;
                            font-size:14px;
                        }
                    }
                    .supports{
                        width:80%;
                        margin:0 auto;
                        flex-flow: column;
                        &-list{
                            margin-bottom:12px;
                        }
                        .icon{
                            display: inline-block;
                            vertical-align: middle;
                        }
                        .desc{
                            font-weight:200;
                            font-size:14px;
                        }
                    }
                    .bulletin{
                        width:80%;
                        margin:0 auto;
                        font-size:12px;
                        font-weight:200;
                        line-height:24px;
                    }
                }
            }
            &-close{
                margin: -48px auto 0;
                /*clear: both;*/
                width:32px;
                height:32px;
                .icon-cross{
                    display: inline-block;
                    font-size:32px;
                }
            }
        }

    }
</style>