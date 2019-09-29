<template>
    <div>
     <el-dialog :title="$t('case.cassta')" :visible.sync="status" width="60%" :before-close="closeDialog">
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
                        <span class="d1" v-if="option.ackUrl==null" @click="sxml" :title="$t('case.cli')">
                            <i class="el-icon-document"></i>
                            {{option.ackUrl}}
                        </span>
                        <span class="d1" v-else @click="sxml" :title="$t('case.cli')">
                            <i class="el-icon-document"></i>
                            {{option.ackUrl.substring(42)}}
                        </span>
                    </div>
                </li>
                <li class="lis lis1"  v-show="as">
                    <div>
                        <span class="spans">{{$t("case.times")}}</span>
                        <span>{{list.time}}</span>
                    </div>
                     <div>
                        <span class="spans">{{$t("case.conten")}}</span>
                        <span>{{list.ICSRBatch}}</span>
                    </div>
                </li>
                <li class="lis lis1" v-show="as">
                    <div>
                        <span class="spans">{{$t("case.iscr")}}</span>
                        <span>{{list.ICSRMessageNumber}}</span>
                    </div>
                   <div>
                        <span class="spans">{{$t("case.batch")}}</span>
                        <span>{{list.batch}}</span>
                    </div>
                </li>
                <li class="lis lis1" v-show="as">
                    <div>
                        <span class="spans">{{$t("case.acksend")}}</span>
                        <span>{{list.ackReceiver}}</span>
                    </div>
                    <div>
                        <span class="spans">{{$t("case.ackz")}}</span>
                        <span>{{list.ackSender}}</span>
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
            ackUrl:'11',
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
               this.get()
               this.get3()
           }
       },
       option(val){
           if(val.status==3){
               this.get21()
           }
       }
    },
    filters:{
        // ackurl(val){
        //     return val!==undefined ? option.ackUrl.substring(option.ackUrl.lastIndexOf('/')+1,option.ackUrl.length) : val
        // }
    },
    methods:{     
       closeDialog(){
           this.$parent.closestatusDialog();
           this.$parent.cId2=""
       },
       get(){
           if(this.caseId!==""){
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
           }
          
       },
       get21(){
           if(this.caseId!==""){
                var url=this.global.url+"/case/selectCaseAck?ackUrl="+this.option.ackUrl;
                this.$axios.get(url).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
                        this.list=JSON.parse(res.data.data)
                        console.log(this.list)
                    }else{
                        this.$message.error("数据传输错误")
                    }
                })
           }
         
       },
       get3(){
           var url=this.global.url+"/case/selectAck";
           this.$axios.get(url).then(res=>{
               console.log(res)
           })
       },
    //    下载xml文件
       sxml(){
    //     var url=this.global.file
    //     console.log(url+this.option.ackUrl.substr(1))
    //      window.open(url+this.option.ackUrl)
       }
    }
  };
</script>
<style>
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
    width: 320px;
    font-size: 12px !important;
    text-indent:25px;
    line-height: 1.2!important;
}
</style>
