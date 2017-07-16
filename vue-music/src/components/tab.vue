<template>
    <ul class="tab clearfix">
        <router-link tag="li" class="tab-item" to="/recommend">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link tag="li" class="tab-item" to="/singer">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link tag="li" class="tab-item" to="/rank">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link tag="li" class="tab-item" to="/search">
            <span class="tab-link">搜索</span>
        </router-link>
    </ul>
</template>

<script>
    export default {}
</script>

<style lang='scss' rel='stylesheet/scss'>
@import "../common/sass/variable";
.tab{
    display: flex;
    height:44px;
    line-height:44px;
    &-item{
        flex:1;
        text-align: center;
    }
    &-link{
        padding-bottom:5px;
        color: $color-text-l;
    }
    .router-link-active{
        .tab-link{
            border-bottom:2px solid $color-theme;
            color:$color-theme;
        }
    }
}
</style>
