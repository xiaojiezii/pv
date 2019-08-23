<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";    /* 深色主题
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
 .el-form-item--small .el-form-item__error {
    padding-top: 2px;
    margin-left: 100px;
}
 .el-dialog__wrapper>.el-dialog{
   border-radius:5px; 
 }
.el-dialog__header{
    border-bottom: 1px solid #606266;
  }
  .el-tooltip__popper {
    width: 290px;
    font-size: 13.5px !important;
    text-indent:25px;
    line-height: 1.5!important;
}
.lii{
  cursor: pointer;
}
</style>