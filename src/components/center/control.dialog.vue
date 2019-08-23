 <template>
  <div>
     <el-dialog title="用户权限" :visible.sync="control" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
         <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm">
            
            <el-form-item label="请输入职务名称：" prop="name">
                 <el-input type="text" class="ipts" v-model="ruleForm.name" placeholder='请输入职务名称'></el-input>
            </el-form-item>
            <el-form-item label="选择状态：" prop="stage">
                <el-radio-group class="ipts" v-model="ruleForm.stage">
                    <el-radio label="0">关闭</el-radio>
                    <el-radio label="1">启用</el-radio>
                </el-radio-group>
             </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" style="width:400px;" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item  style="margin:30px 0 0 -250px;">
                <el-button type="primary" @click="submitForm('ruleForm')" v-show="save">立即创建</el-button>
                <el-button type="primary" @click="mitForm('ruleForm')" v-show="!save">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
      </el-dialog>
    </div>
</template>


<script>
export default {
    data(){
        return{
            ruleForm:{
                name:'',
                stage:'',
                remark:'',
            },
         rules:{
             name: [{required: true, message: '请输入活动名称', trigger: 'blur' }],
             stage:[{required: true, message: '请选择职务', trigger: 'change' }]
         }
        }
    },
    props:[
        "control",
        "save",
        "contId"
    ],
    watch:{
        contId(val){
            if(val!==undefined){
                this.get()
            }
        }
    },
    methods:{
       closeDialog(){
           this.$parent.closecontrolDialog()
       },
    //    新建菜单权限
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log(this.ruleForm.name)
           var url=this.global.url+"/role/add?";
           var postData=this.qs.stringify({
               name:this.ruleForm.name,
               stage:this.ruleForm.stage,
               remark:this.ruleForm.remark
           })
           this.$axios.post(url+postData).then((res)=>{
              if(res.data.status==200){
                   this.$message({
                    type: 'success',
                    message: '创建成功!',
                 });
                 this.$parent.get()
                 this.closeDialog()
              }
           })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //   修改权限信息
    mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              console.log(this.ruleForm.name)
           var url=this.global.url+"/role/update?";
           var postData=this.qs.stringify({
               id:this.contId,
               name:this.ruleForm.name,
               stage:this.ruleForm.stage,
               remark:this.ruleForm.remark
           })
           this.$axios.put(url+postData).then((res)=>{
               console.log(res)
               if(res.data.status==200){
                  this.$message({
                    type: 'success',
                    message: '修改成功!',
                 });
                  this.$parent.get()
                 this.closeDialog()
                 
               }
           })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      get(){
          var url=this.global.url+"/role/select?id="+this.contId;
          this.$axios.get(url).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.ruleForm=res.data.data
              }else{
                  this.$message.error("数据传输错误！");
                  
              }
          })
      }
    },
}
</script>

<style scoped>
 /* *{margin: 0;padding: 0;} */
.ipts{
    width:250px; margin: 0 30px 0 0px;
}
</style>
