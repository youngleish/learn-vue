<template>
    <div class="slider">
        <div class="slider-group">
            <div class="slider-item">
                <a href="">
                    <img src="./banner.jpg" alt="banner">
                </a>
            </div>
            <div class="slider-item">
                <a href="">
                    <img src="./banner1.jpg" alt="banner">
                </a>
            </div>
        </div>
        <div class="slider-dots">
            <span class="slider-dot"></span>
            <span class="slider-dot active"></span>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "../../common/sass/variable";
    .slider {
        overflow: hidden;
        position: relative;
        &-group {
            width:2000px;
            overflow: hidden;
        }
        &-item {
            width:375px;
            float: left;
            a {
                display: block;
            }
            img {
                display: block;
                width:100%;
            }
        }
        &-dots {
            position: absolute;
            left:0;
            right:0;
            bottom:12px;
            text-align: center;
            font-size:0;
        }
        &-dot {
            display: inline-block;
            width:8px;
            height:8px;
            margin:0 4px;
            border-radius:50%;
            background-color: $color-text-l;
            &.active {
                width: 20px;
                border-radius: 5px;
            }
        }
    }
</style>
