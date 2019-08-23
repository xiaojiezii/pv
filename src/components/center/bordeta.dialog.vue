<template>
    <div id="demo">
     <el-dialog :title="ruleForm.noticeType | Type"   :visible.sync="boardeta" :before-close="closeDialog">
            <!-- <el-form :model="ruleForm"  ref="ruleForm" label-width="200px" style="margin-top:20px" class="demo-ruleForm">
                <el-form-item label="公告标题：" prop="noticeTitle">
                    <el-input v-model="ruleForm.noticeTitle" class="ipts" :disabled="save" placeholder="请输入用户名"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                
                 <el-form-item label="公告类型：" prop="noticeType">
                    <el-select v-model="ruleForm.noticeType" class="ipts" :disabled="save" placeholder="请选择">
                       <el-option label="通知" value="1"></el-option>                      
                       <el-option label="公告" value="2"></el-option>                                        
                    </el-select>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
                 <el-form-item label="公告内容：" prop="noticeContent">
                    <el-input type="textarea" :rows="4" class="ipts" :disabled="save" placeholder="请输入内容" v-model="ruleForm.noticeContent"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item label="备注：" prop="remark">
                     <el-input type="textarea" :rows="2" class="ipts" :disabled="save" placeholder="请输入内容" v-model="ruleForm.remark"></el-input>
                    <i class="el-icon-s-order lii" title="编写中"></i>
                </el-form-item>
               <el-form-item style="margin:30px 0 0 -150px;">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
                </el-form> -->
            <div>
                <p>
                  <span style="font-weight:700;font-size:20px;">{{ruleForm.noticeTitle}}</span>
                  <span style="float:right;">{{$t('notice.cretime')}}：{{ruleForm.createTime | filterTime }}</span>
                </p>
                <p style="width:98%;height:200px;padding:20px;text-indent:40px;">{{ruleForm.noticeContent}}</p>
                <p style="width:100%;text-align:right;">{{ruleForm.remark}}</p>
            </div>
      </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return{
          save:false,
            ruleForm:{
              noticeTitle:'',
              noticeType:'',
              noticeContent:'',
              createTime:'',
              remark:'',	
            }
        }
    },
    filters:{
       Type(val){
          return val==1 ? "通知" : "公告"
      }
    },
    props:[
       "boardeta",
       "nId"
    ],
    watch:{
       boardeta(val){
         if(val){
           this.get();
         }
       },
    },
    methods:{
         submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm('是否修改当前信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               
        //   点击确认后向服务器传参
        console.log(this.nId)
            var url=this.global.url+"/notice/edit?";
            var postData=this.qs.stringify({
                 noticeId:this.nId,
                 noticeTitle:this.ruleForm.noticeTitle,
                 noticeType:this.ruleForm.noticeType,
                 noticeContent:this.ruleForm.noticeContent,
                 remark:this.ruleForm.remark,	
            })
            this.$axios.post(url+postData).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                     this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.closeDialog();
                    this.$parent.get();
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
          this.$parent.closedetaDialog();
       },
       get(){
           var role=sessionStorage.getItem("role")
           if(role==4){
               this.save=false
           }else{
               this.save=true
           }
        var url=this.global.url+"/notice/select?id="+this.nId
        this.$axios.get(url).then((res)=>{
            console.log(res)
            if(res.data.status==200){
                this.ruleForm=res.data.data
            }else{
                this.$message.error("查询失败，数据传输错误");
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
  .lii{ 
      text-align: center;
      color:#838ab6;
      line-height: 30px;
      width:30px;
      border: 1px solid #ececff;
      height:30px;
    }
</style>
