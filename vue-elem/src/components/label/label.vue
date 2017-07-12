<template>
    <span class='label' :class="`label-${labelType}`"></span>
</template>

<script>
    export default {
        props: ['labelType']
    }
</script>

<style lang='scss' rel='stylesheet/scss'>
    @import "../../common/sass/mixin";
    .label{
        display: inline-block;
        width:14px;
        height:14px;
        line-height:14px;
        text-align: center;
        margin-right:4px;
        color: red;
        position: relative;
        &:after{
            display: inline-block;
            content: '减';
            position: absolute;
            top:0;
            left:0;
            bottom:0;
            right:0;
            font-size:12px;
            font-style: normal;
            font-weight:bolder;
            color: #fff;
        }
        &-0{
            &:after{
                content: '减';
            }
        }
        &-1{
            &:after{
                content: '折';
            }
        }
        &-2{
            &:after{
                content: '保';
            }
        }
        &-3{
            &:after{
                content: '票';
            }
        }
        &-4{
            &:after{
                content: '特';
            }
        }
        &.label-no-bg{
            &.label-0{
                &:after{
                    color: red;
                }
            }
            &.label-1{
                &:after{
                    color: deepskyblue;
                }
            }
            &.label-2{
                &:after{
                    color: lightseagreen;
                }
            }
            &.label-3{
                &:after{
                    color: purple;
                }
            }
            &.label-4{
                &:after{
                    color: lightseagreen;
                }
            }
        }

        &.label-bg{
            &.label-0{
                background-color: red;
            }
            &.label-1{
                background-color: deepskyblue;
            }
            &.label-2{
                background-color: lightseagreen;
            }
            &.label-3{
                background-color: purple;
            }
            &.label-4{
                background-color: lightseagreen;
            }
        }
    }
</style>