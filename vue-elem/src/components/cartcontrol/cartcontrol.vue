<template>
    <div class="cart-control">
        <transition name="move-cart-control">
            <div class="car-decrease" @click.stop.prevnent="decreaseCart($event)" v-show="food.count>0">
                    <span class="icon decrease">-</span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0"> {{ food.count }}</div>
        <div class="cart-add" @click.stop.prevnent="addCart($event)">
            <span class="icon add">+</span>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        props: {
            food: {
                type: Object
            }
        },
        created() {
        },
        methods: {
            addCart(event) {
                if (!event._constructed) {
                    return
                }
                if (!this.food.count) {
                    Vue.set(this.food, 'count', 1)
                } else {
                    this.food.count++
                }
                console.log(this.food.count)
            },
            decreaseCart(event) {
                if (!event._constructed) {
                    return
                }
                if (this.food.count) {
                    this.food.count --
                }
                console.log(this.food.count)
            }
        }
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    $com-clr: rgb(0, 160, 220);

    .cart-control {
        display: flex;
        .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 18px;
            text-align: center;
            color: #fff;
            border-radius: 50%;
        }
        .car-decrease, .cart-add, .cart-count {
            padding: 6px;

        }
        .car-decrease {
            transition:0.4s all linear;
            .decrease {
                box-sizing:border-box;
                border: 1px solid $com-clr;
                color: $com-clr;
                transition:0.3s all linear;
            }
            &.move-cart-control-enter-active,&.move-cart-control-leave{
                transform: translate3D(0,0,0);
                opacity: 1;
                .decrease {
                    transform: rotate(0deg);
                }
            }

            &.move-cart-control-enter,&.move-cart-control-leave-active{
                opacity: 0;
                transform: translate3D(20px,0,0);
                .decrease {
                    transform: rotate(360deg);
                }
            }

        }
        .cart-count {
            color: rgb(147, 153, 159);
            line-height: 20px;
            font-size:10px;
            padding-top:6px;
        }
        .cart-add {
            .icon {
                background-color: $com-clr;
            }
        }
    }
</style>