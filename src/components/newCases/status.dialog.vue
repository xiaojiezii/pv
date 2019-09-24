<template>
    <div>
     <el-dialog :title="$t('case.cassta')"  customClass="customWidth" :visible.sync="status" :before-close="closeDialog">
        <div>
            <ul class="uls">
                <li class="lis">
                    <span class="spans" style="margin-right:100px;">{{$t("case.catran")}}</span>
                    <span>
                        <el-radio-group v-model="option.status">
                            <el-radio :label="1">{{$t("case.wsend")}}</el-radio>
                            <el-radio :label="2">{{$t("case.ysend")}}</el-radio>   
                            <el-radio :label="3">{{$t("case.ysa")}}</el-radio>
                        </el-radio-group>
                    </span>
                </li>
                <li class="lis" v-show="as">
                   <div>
                      <span class="spans">病例确认状态：</span>
                      <span>{{list.caseType}}</span>
                      <el-tooltip style="float:right;" :content="list.errorComment" placement="right-start" effect="light">
                         <i style="font-size:20px" class="el-icon-s-management"></i>
                     </el-tooltip>
                   </div>
                </li>
                <li class="lis" v-show="as">
                   <div>
                      <span class="spans">信息确认状态：</span>
                      <span>{{list.messageType}}</span>
                       <el-tooltip style="float:right;" :content="list.errorMessage" placement="right-start" effect="light">
                         <i style="font-size:20px" class="el-icon-s-management"></i>
                     </el-tooltip>
                   </div>
                </li>
                <li class="lis lis1" v-show="as">
                    <div>
                        <span class="spans">{{$t("case.ack")}}</span>
                        <span>{{option.ackTime | filterTime}}</span>
                    </div>
                    <div >
                        <span class="spans">{{$t("case.ackf")}}</span>
                        <span class="d1" @click="sxml" :title="$t('case.cli')">
                            <i class="el-icon-document"></i>
                            {{option.ackUrl}}
                        </span>
                    </div>
                </li>
                <li class="lis lis1"  v-show="as">
                    <div>
                        <span class="spans">{{$t("case.times")}}</span>
                        <span>{{list.icsrTime | filterTime}}</span>
                    </div>
                    <div>
                        <span class="spans">{{$t("case.batch")}}</span>
                        <span>{{list.batch}}</span>
                    </div>
                </li>
                <li class="lis lis1" v-show="as">
                    <div>
                        <span class="spans">{{$t("case.conten")}}</span>
                        <span>{{list.ICSRBatch}}</span>
                    </div>
                    <div>
                        <span class="spans">{{$t("case.ackz")}}</span>
                        <span>{{list.ackReceiver}}</span>
                    </div>
                </li>
                <li class="lis lis1" v-show="as">
                    <div>
                        <span class="spans">{{$t("case.acksend")}}</span>
                        <span>{{list.ackSender | sender}}</span>
                    </div>
                    <div>
                        <span class="spans">{{$t("case.iscr")}}</span>
                        <span>{{list.ICSRMessageNumber}}</span>
                    </div>
                    
                </li>
            </ul>
        </div>
        <div style="width:100%;text-align:right;margin-top:30px;">
            <el-button type="danger" @click="closeDialog" round>{{$t('case.clos')}}</el-button>
        </div>
      </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return {
          as:false,
        option:{
            status:1,
            ackTime:'',
            ackUrl:'',
        },
        list:{
            time:'',
            batch:'',
            ICSRBatch:'',
            ackReceiver:'',
            ackSender:'',
            errorComment:'',
            errorMessage:'',
            ICSRMessageNumber:'',
            caseType:'',
            messageType:'',
        }
      }
    },
    props:[
      "status",
      "caseId"
    ],
    watch:{
       caseId(val){
           if(val!==undefined){
            //    this.get()
               this.get3()
           }
       },
       option(val){
           if(val.ackUrl!==undefined){
            //    this.get21()
           }
       }
    },
    filters:{
        sender(val){
            return val=="CDETEST" ? "测试账号" : "正式账号"
        }
    },
    methods:{     
       closeDialog(){
           this.$parent.closestatusDialog();
       },
       get(){
          var url=this.global.url
          this.$axios.get(url+"/case/selectCaseStatus?caseId="+this.caseId).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.option=res.data.data
                  res.data.data.status==3 ? this.as=true : this.as=false
                  this.option.status=JSON.parse(res.data.data.status)
              }else{
                  this.$message.error("查询数据为空！")
              }
          })
       },
       get21(){
          var url=this.global.url+"/case/selectCaseAck?ackUrl="+this.option.ackUrl;
          this.$axios.get(url).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.list=JSON.parse(res.data.data)
                  console.log(this.list)
              }
          })
       },
       get3(){
           var url=this.global.url+"/case/selectAck";
           this.$axios.get(url).then(res=>{
               console.log(res)
           })
       },
    //    下载xml文件
       sxml(){

       }
    }
  };
</script>
<style>
 /* *{margin: 0;padding: 0;} */
.customWidth{
    width:60%;
}
.el-radio{
    margin-bottom: 15px;
}
.d1{
    display: inline-block;
    cursor: pointer;
    width:60%;
}
.d1:hover{
    color: #c2c2c2;
}
.uls{
    width:95%;margin:0 auto;
    list-style: none;
    color: #909399;
}
.lis{
    border-bottom: 1px solid #EBEEF5;
    border-radius: 3px;
    padding:15px;
}
.spans{
    color:#909399;
    font-weight: 700;
    display: inline-block;
    padding-right: 20px;
}
.lis:hover{
    background: #f6faff;
}
.lis1{
    display: flex;
    justify-content: space-between;
}
.lis1>div{
    width:50%;
}
.ipts{
    width:250px;
}
.el-icon-document{
    font-size:20px;
}
.el-tooltip__popper {
    width: 300px;
    font-size: 12.5px !important;
    text-indent:25px;
    line-height: 1.5!important;
}
</style>
