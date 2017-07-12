<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'active': index === currentIndex}"
                    @click="selectMenu(index,$event)">
                    <span class="text border1px">
                        <h-label v-if="item.type>0" class="menu-label" :labelType="item.type"></h-label>
                        {{ item.name.trim() }}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="foods-list j-foods-list">
                    <h1 class="goods-type">{{ item.name }}</h1>
                    <ul>
                        <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border1px">
                            <div class="pic">
                                <img :src="food.icon" width="57" height="57">
                            </div>
                            <div class="content">
                                <div class="name">{{ food.name }}</div>
                                <div class="desc" v-if="food.description">{{ food.description }}</div>
                                <div class="extra">
                                    <span class="sales">月售{{ food.sellcount }}份</span>
                                    <span class="rating">好评{{ food.rating }}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">&yen;{{ food.price }}</span>
                                    <del class='old' v-show="food.oldPrice">&yen;{{ food.oldPrice }}</del>
                                </div>
                                <div class="cart-control-box">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                  :min-price="seller.minPrice"></shopcart>
        <food :food="selectedFood" ref="food"></food>
    </div>
</template>

<script>
    import hLabel from 'components/label/label'
    import BScroll from 'better-scroll'
    import shopcart from 'components/shopcart/shopcart'
    import cartcontrol from 'components/cartcontrol/cartcontrol'
    import food from 'components/food/food'

    const ERR_OK = 0
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                labelType: 0, // 标签类型
                listHeight: [], // 每一块商品的高度区间
                scrollY: 0,
                selectedFood: {}
            }
        },
        components: {
            hLabel, shopcart, cartcontrol, food
        },
        computed: {
            currentIndex() {
                // 确定当前高亮的index值
                let heightArr = this.listHeight
                let len = heightArr.length
                for (let i = 0; i < len; i++) {
                    let nowHeight = heightArr[i]
                    let nextHeight = heightArr[i + 1]
                    let scrollY = this.scrollY
                    if (!nextHeight || (scrollY >= nowHeight && scrollY < nextHeight)) {
                        return i
                    }
                }
                return 0
            },
            selectFoods() {
                let foods = []
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods
            }
        },
        created() {
            this.$http.get('/api/goods').then((res) => {
                let rst = res.body
                if (rst.errno === ERR_OK) {
                    // 给goods赋值
                    this.goods = rst.data
                    // DOM更新以后处理滚动
                    this.$nextTick(() => {
                        // betterScroll 初始化
                        this._initBScroll()
                        // 初始化listHeight
                        this._calculateHeight()
                    })
                }
            })
        },
        methods: {
            selectMenu(index, event) {
                if (!event._constructed) {
                    return false
                }
                let foodsList = this.$refs.foodsWrapper.getElementsByClassName('j-foods-list')
                this.foodsScroll.scrollToElement(foodsList[index], 500)
            },
            selectFood(food, event) {
                if (!event._constructed) {
                    return false
                }
                this.selectedFood = food
                this.$refs.food.show()
            },
            _initBScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                })
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    probeType: 3, // 可以监控scroll事件，获取滚动的位置
                    click: true
                })
                // 获取滚动y轴的值
                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            _calculateHeight() {
                let height = 0
                let foodsList = this.$refs.foodsWrapper.getElementsByClassName('j-foods-list')
                let len = foodsList.length
                this.listHeight.push(height)

                for (let i = 0; i < len; i++) {
                    height += foodsList[i].clientHeight
                    this.listHeight.push(height)
                }
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import '../../common/sass/mixin.scss';

    $border-cl: rgba(7, 17, 27, 0.1);

    .goods {
        display: flex;
        position: absolute;
        top: 176px;
        left: 0;
        right: 0;
        bottom: 46px;
        max-width: 750px;
        overflow: hidden;
        .menu-wrapper {
            flex: 0 0 80px;
            width: 80px;
            background-color: #f3f5f7;
            /*position: relative;*/
            /*overflow: scroll;*/
            /*-webkit-overflow-scrolling: touch;*/
            .menu-item {
                display: table;
                height: 54px;
                width: 54px;
                line-height: 14px;
                padding: 0 12px;
                &.active {
                    background-color: #fff;
                    color: rgb(240, 20, 20);
                    font-weight: 700;
                    margin-top: -1px;
                    .text {
                        @include border-none();
                    }
                }
                .text {
                    display: table-cell;
                    width: 100%;
                    vertical-align: middle;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 200;
                    @include border-1px('border-bottom', $border-cl);
                    &:last-child {
                        &:after {
                            display: none;
                        }
                    }
                }
                .menu-label {
                    width: 12px;
                    height: 12px;
                    font-size: 10px;
                    font-weight: 100;
                    margin-right: 0;
                }
            }
        }
        .foods-wrapper {
            flex: 1;
            .goods-type {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147, 153, 159);
                background: #f3f5f7;
            }
            .food-item {
                display: flex;
                padding: 18px;
                @include border-1px('border-bottom', $border-cl);
                &:last-child {
                    &:after {
                        display: none;
                    }
                }
                .pic {
                    flex: 0 0 57px;
                    width: 57px;
                    margin-right: 10px;
                }
                .content {
                    flex: 1;
                    .name {
                        margin: 2px 0 8px;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .desc, .extra {
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .desc {
                        line-height: 12px;
                        margin-bottom: 8px;
                    }
                    .extra {
                        .sales {
                            margin-right: 12px;
                        }
                    }
                    .price {
                        font-weight: 700;
                        line-height: 24px;
                        .now {
                            color: rgb(240, 20, 20);
                            margin-right: 8px;
                            font-size: 14px;
                        }
                        .old {
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                    }
                    .cart-control-box {
                        position: absolute;
                        right: 0;
                        bottom: 12px;
                    }
                }
            }
        }
    }
</style>