<template>
    <div class="title">
        <div class="line border1px"></div>
        <div class="text">{{ text }}</div>
        <div class="line border1px"></div>
    </div>
</template>

<script>
    export default{
        props: [ 'text' ]
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "../../common/sass/mixin";
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
</style>