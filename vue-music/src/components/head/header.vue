<template>
    <div class="header">
        <div class="header-logo"></div>
        <h1 class="header-title">music</h1>
        <i class="icon icon-mine"></i>
    </div>
</template>

<script>
    export default {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    @import "../../common/sass/variable";
    @import "../../common/sass/mixin";
    .header {
        position: relative;
        height: 44px;
        line-height:44px;
        color: $color-theme;
        text-align: center;
        &-logo{
            display: inline-block;
            vertical-align: middle;
            width:30px;
            height:32px;
            margin-right:9px;
            @include bg-image('./logo');
            background-repeat:no-repeat;
            background-size:100% ;
        }
        &-title {
            display: inline-block;
            font-size: 18px;
        }
        .icon-mine{
            position: absolute;
            right:0;
            top:50%;
            transform: translateY(-50%);
            padding-right:12px;
            font-size:20px;
        }
    }
</style>
