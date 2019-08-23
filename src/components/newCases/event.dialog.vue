<template>
    <div>
     <el-dialog :title="$t('event.tiz')" :visible.sync="events" :before-close="closeDialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item :label="$t('event.nei')+'：'" prop="reason">
                <el-input type="textarea" style="width:550px;" :placeholder="$t('event.pnei')" row="2" v-model="ruleForm.reason"></el-input>
            </el-form-item>
            <el-form-item :label="$t('event.jian')+'：'" prop="suggestion">
                <el-input type="textarea" style="width:550px;" row="2" :placeholder="$t('event.pj')" v-model="ruleForm.suggestion"></el-input>
            </el-form-item>
            <el-form-item style="margin-left:250px;">
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('btn.save')}}</el-button>
            </el-form-item>
            </el-form>
     </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        ruleForm: {
            reason:'',
            suggestion:'',
            tColume:'',
            // status:'',
        },
        rules:{
            suggestion:[{ required: true, message: '请输入质疑字段内容', trigger: 'blur' },],
            reason:[{ required: true, message: '请填写质疑的原因', trigger: 'blur' }],
            // status:[ { required: true, message: '请选择质疑状态', trigger: 'change' }]
        }
      }
    },
    props:[
      "events",
      "caseId"
    ],
    methods:{
    //    关闭弹出框
       closeDialog(){
           this.$parent.closeeventDialog();
       },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
               var url=this.global.url+"/question/addQuestion?";
               var postData=this.qs.stringify({
                   caseId:this.caseId,
                //    status:this.ruleForm.status,
                   tColume:"assess",
                   reason:this.ruleForm.reason,
                   suggestion:this.ruleForm.suggestion
               })
               this.$axios.post(url+postData).then((res)=>{
                   console.log(res)
                   if(res.data.status==200){
                        this.$message({
                            type: 'success',
                            message: this.$t('case.casuccess4'),
                         });
                         this.ruleForm.reason=''
                         this.ruleForm.suggestion=""
                         this.closeDialog()
                   }else{
                       this.$message.error(this.$t('case.caerro1'));
                   }
               })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
       
       },
    
  };
</script>
<style scoped>
 /* *{margin: 0;padding: 0;} */
</style>
