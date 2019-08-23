<template>
<div id='types'>
     <el-dialog :visible.sync="cement" :before-close="closeDialog">
         <el-carousel trigger="click" style="clear:both;height:500px;"  >
            <el-carousel-item v-for="(item,i) of list" :key="i" >
               <div style="text-align:center;height:300px;">
                   <span style="font-size:25px">{{item.noticeType | Type}}</span>
                   <div style="margin-top:20px;">
                       <span style="float:left;font-size:20px;">{{item.noticeTitle}}</span>
                       <span style="float:right;">{{item.createTime | date}}</span>
                   </div>
                   <div class="cont">
                       {{item.noticeContent}}
                   </div>
                   <div>
                       {{i+1}}
                   </div>
               </div>
            </el-carousel-item>
         </el-carousel>
         <div style="float:right;padding:0 10px 30px 0;">
              {{$t('btn.gon')}} {{list.length}} {{$t('btn.strip')}}
         </div>
     </el-dialog>
   </div>
</template>
<script>
export default {
    data(){
        return{
        //  cement:true,
        //  list:[],
        }
    },
    props:[
        'cement',
        'list'
    ],
    // watch:{
    //    list(val){
    //        if(val.length==0){
    //            this.cement=false
    //        }
    //    }
    // },
    filters:{
         date: function (value) {
            if(value!==null){
                let date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }else{
                return "暂无记录"
            }
      },
      Type(val){
          return val==1 ? "通知" : "公告"
      }
    },
    methods:{
        closeDialog(){
            this.$parent.closecementDialog()
        },
    }
}
</script>
<style>
#types .el-dialog__wrapper>.el-dialog {
    opacity: 0.8;
}
#types .el-carousel__container{
    height:300px !important;
    margin-top:10px;
}
 #types .el-dialog__header{
    border: none;
    padding:0;
}
#types .el-carousel__item {
    height:450px;
}
/* #types .el-carousel__arrow--left{
    display: block !important;
    top:250px;
} */
#types .el-carousel__arrow--right,.el-carousel__arrow--left{
    /* display: block !important; */
    top:300px;
}
.cont{
    height:330px;
    overflow: hidden;
    clear: both;
    margin-top:60px;
    padding:0 15px;
    text-indent:40px;
    text-align:left;
}
</style>


