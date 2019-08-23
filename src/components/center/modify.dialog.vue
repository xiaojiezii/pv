<template>
    <div id="demo">
     <el-dialog :title="$t('inst.centerd')" :visible.sync="modify" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" style="margin-top:20px;" class="demo-ruleForm">
                <el-form-item :label="$t('inst.cename')"  prop="inp1">
                    <el-input v-model="ruleForm.inp1" class="ipts" :placeholder="$t('inst.inname')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <!-- <el-form-item label="状态：" prop="hist1">
                    <el-select v-model="ruleForm.hist1"  placeholder="请选择" class="ipts">
                       <el-option label="开启" value="1"></el-option>
                       <el-option label="关闭" value="0"></el-option>                                             
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item> -->

                <el-form-item :label="$t('inst.pran')+':'" prop="inp2">
                    <el-input v-model="ruleForm.inp2" class="ipts" :placeholder="$t('inst.inname1')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                <el-form-item :label="$t('inst.cphone')+':'" prop="inp3">
                    <el-input v-model="ruleForm.inp3" class="ipts" type="number" :placeholder="$t('inst.inphone')"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>

               <el-form-item style="margin:50px 0 0 -200px;">
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('project.set')}}</el-button>
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
          // hist1:'',
        },
        id:'',
        rules: {
          inp1: [{ required: true, message: '请输入中心名称', trigger: 'blur' }],
          inp2: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          inp3: [{ required: true, message: '请输入联系方式', trigger: 'blur' },
           { min:11, max: 11, message: '请输入正确的手机号码', trigger: 'blur' }],
          // hist1: [{ required: true, message: '请选择状态', trigger: 'change' }],
        }
      };
    },
    props:[
       "modify",
       "centerId"
    ],
    watch:{
       modify(val){
         if(val){
           this.get();
         }
       }
    }, 
    methods:{
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm(this.$t('inst.inre'), this.$t('inst.intishi'), {
                confirmButtonText: this.$t('inst.inyes'),
                cancelButtonText: this.$t('inst.inno'),
                type: 'warning'
            }).then(() => {
               
        //   点击确认后向服务器传参
                 var url=this.global.url+"/site/update?";
                   url+="id="+this.centerId;
                   url+="&name="+this.ruleForm.inp1;
                  //  url+="&status="+this.ruleForm.hist1;
                   url+="&respo="+this.ruleForm.inp2;
                   url+="&telephone="+this.ruleForm.inp3;
                this.$axios.put(url).then((res)=>{
                    if(res.data.status==200){
                          this.$message({
                           type: 'success',
                            message: this.$t('inst.insccc'),
                          });  
                        this.closeDialog();
                        this.$parent.get();   
                    }else{
                      this.$message.error(this.$t('inst.inerro')); 
                    }
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('inst.inexit')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       closeDialog(){
          this.$parent.closemodifyDialog();
       },
       get(){
        var url=this.global.url+"/site/selectSite?siteId="+this.centerId
        this.$axios.get(url).then((res)=>{
            console.log(res)
            if(res.data.status==200){
                this.ruleForm.inp1=res.data.data.name
                this.ruleForm.hist1=JSON.stringify(res.data.data.status)
                this.ruleForm.inp2=res.data.data.respo
                this.ruleForm.inp3=res.data.data.telephone
            }
        })
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
