<template>
    <div class="rating-select">
        <div class="rating-tab border1px">
            <span @click="select(2,$event)" class="block positive" :class="{'active':childSelectType===2}">
                {{ ratingDesc.all }}
                <span class="rating-count">{{ ratings.length }}</span>
            </span>
            <span @click="select(0,$event)" class="block positive" :class="{'active':childSelectType===0}">
                {{ ratingDesc.positive }}
                <span class="rating-count">{{ getRating(0).length }}</span>
            </span>
            <span @click="select(1,$event)" class="block negative" :class="{'active':childSelectType===1}">
                {{ ratingDesc.negative }}
                <span class="rating-count">{{ getRating(1).length }}</span>
            </span>
        </div>
        <div @click="toggleContent($event)" class="switch border1px" :class="{'on': childOnlyContent}">
            <i class="icon icon-check"></i>
            <span class="text">选择有内容的评论</span>
        </div>

    </div>
</template>

<script>
    //    const POSITIVE = 0
    //    const NEGATIVE = 1
    const ALL = 2

    export default {
        props: {
            ratings: {
                type: Array,
                default() {
                    return []
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            ratingDesc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                }
            }
        },
        data() {
            return {
                childSelectType: this.selectType,
                childOnlyContent: this.onlyContent
            }
        },
        methods: {
            select(type, event) {
                if (!event._constructed) {
                    return false
                }
                this.childSelectType = type
                this.$emit('ratingtype', type)
            },
            toggleContent(event) {
                if (!event._constructed) {
                    return false
                }
//                debugger
                this.childOnlyContent = !this.childOnlyContent
                this.$emit('ratingcontent', this.childOnlyContent)
            },
            getRating(type) {
                let arr
                arr = this.ratings.filter((rating) => {
                    return rating.rateType === type
                })
                return arr
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "../../common/sass/mixin";

    $bd-clr: rgba(7, 17, 27, .1);
    $com-clr: rgb(147, 153, 159);

    .rating-tab {
        padding: 18px 0;
        margin: 0 18px;
        @include border-1px('border-bottom', $bd-clr);
        font-size: 0;
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 2px;
            font-size: 12px;
            color: rgb(77, 85, 93);
            &.active {
                color: #fff;
            }
            &.positive {
                background-color: rgba(0, 160, 220, .2);
                &.active {
                    background-color: rgb(0, 160, 220);
                }
            }
            &.negative {
                background-color: rgba(77, 85, 93, .2);
                &.active {
                    background-color: rgb(77, 85, 93);
                }
            }
            .rating-count {
                margin-left: 2px;
                font-size: 8px;
                line-height: 16px;
            }
        }
    }

    .switch {
        padding: 12px 18px;
        line-height: 24px;
        font-size: 12px;
        @include border-1px('border-bottom', $bd-clr);
        color: $com-clr;
        .icon {
            display: inline-block;
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            background-color: $com-clr;
            border-radius: 50%;
            color: #fff;
            font-size: 18px;
            margin-right: 4px;
        }
        &.on {
            .icon {
                background-color: #00c850;
            }
        }
    }
</style>