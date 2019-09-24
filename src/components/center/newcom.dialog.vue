<template>
    <div id="demo">
     <el-dialog title="新增公司" :visible.sync="newcom" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item label="公司编号：" prop="inp5">
                    <el-input v-model="ruleForm.inp5" class="ipts" placeholder="请输入编号"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item label="公司名称：" prop="inp1">
                    <el-input v-model="ruleForm.inp1" class="ipts" placeholder="请输入名字"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item label="AS2名称:" prop="as2">
                    <el-input v-model="ruleForm.as2" class="ipts" placeholder="请输入名字"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item label="公司地址：" prop="hist1">
                    <el-input v-model="ruleForm.hist1" class="ipts" placeholder="请输入名字"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>

                <el-form-item label="联系人姓名：" prop="inp2">
                    <el-input v-model="ruleForm.inp2" class="ipts" placeholder="请输入负责人姓名"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item label="联系人方式：" prop="inp3">
                    <el-input v-model="ruleForm.inp3"  class="ipts" placeholder="请输入联系方式"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item label="消息发送者标识符" prop="inp4">
                    <el-select v-model="ruleForm.inp4" placeholder="请输入发送者标识符" class="ipts">
                       <el-option label="测试账号" value="0"></el-option>                      
                       <el-option label="正式账号" value="1"></el-option>                                        
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item style="margin:50px 0 0 -250px;">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
          inp1:'',
          inp2:'',
          inp3:'',
          hist1:'',
          as2:'',
          inp4:'',
          inp5:'',
        },
        rules: {
          inp5: [{ required: true, message: '请输入公司编号', trigger: 'blur' }],
          inp1: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
          as2: [{ required: true, message: '请输入AS2名称', trigger: 'blur' }],
          inp2: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          inp3: [{ required: true, message: '请输入联系方式', trigger: 'blur' },
          // { min: 11, max: 11, message: '手机号码格式错误', trigger: 'blur' }
          ],
          hist1: [{ required: true, message: '请输入公司地址', trigger: 'blur' }],
        }
      };
    },
    props:[
       "newcom"
    ],
    // watch:{
    //    newcom(val){
    //      if(val){
    //        this.get();
    //      }
    //    }
    // },
    methods:{
         submitForm(formName) {
           
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm('是否创建新的公司?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               
        //   点击确认后向服务器传参
             var url=this.global.url+"/sysCompany/addSysCompany?";
                    url+="name="+this.ruleForm.inp1;
                    url+="&address="+this.ruleForm.hist1;
                    url+="&userName="+this.ruleForm.inp2;
                    url+="&phone="+this.ruleForm.inp3;
                    url+="&as2="+this.ruleForm.as2;
                    url+="&messageSenderIdentifier="+parseInt(this.ruleForm.inp4);
                    url+="&id="+this.ruleForm.inp5;
                this.$axios.post(url).then((res)=>{
                    if(res.data.status==200){
                     this.$message({
                      type: 'success',
                      message: '创建成功!',
                      });
                      this.closeDialog()
                      this.$parent.get();
                    }else{
                      this.$message.error("创建失败，数据传输错误！"); 
                    }
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消保存'
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       closeDialog(){
           this.$parent.closecomDialog();
       },
       get(){

       },
    }
  };
</script>
<style scoped>
 /* *{margin: 0;padding: 0;} */
.ipts{
    width:250px; margin: 0 30px 0 0px;
}
  .lii{ text-align: center;
  color:#838ab6;
      line-height: 30px;
      width:30px;border: 1px solid #ececff;
      height:30px;}

</style>
