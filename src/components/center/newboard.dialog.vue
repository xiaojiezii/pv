<template>
    <div id="demo">
      <el-dialog :title="$t('notice.newnot')" :visible.sync="newboard" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
          <el-form :model="ruleForm"  ref="ruleForm" label-width="200px" style="margin-top:20px" class="demo-ruleForm">
              <el-form-item :label="$t('notice.notit')+':'" prop="noticeTitle">
                  <el-input v-model="ruleForm.noticeTitle" class="ipts" :placeholder="$t('btn.enter')"></el-input>
                  <i class="el-icon-s-order lii" title="编写中"></i>
              </el-form-item>               
              <el-form-item :label="$t('notice.notype')+':'" prop="noticeType">
                  <el-select v-model="ruleForm.noticeType" class="ipts" :placeholder="$t('btn.selects')">
                    <el-option :label="$t('notice.fi')" value="1"></el-option>                      
                    <el-option :label="$t('notice.not')" value="2"></el-option>                                        
                  </el-select>
                  <i class="el-icon-s-order lii" title="编写中"></i>
              </el-form-item>
              <el-form-item :label="$t('notice.notcon')+':'" prop="noticeContent">
                  <el-input type="textarea" :rows="2" class="ipts" :placeholder="$t('btn.enter')" v-model="ruleForm.noticeContent"></el-input>
                  <i class="el-icon-s-order lii" title="编写中"></i>
              </el-form-item>              
              <el-form-item :label="$t('notice.bz')+':'" prop="remark">
                    <el-input type="textarea" :rows="2" class="ipts" :placeholder="$t('btn.enter')" v-model="ruleForm.remark"></el-input>
                  <i class="el-icon-s-order lii" title="编写中"></i>
              </el-form-item>
              <el-form-item style="margin:30px 0 0 -250px;">
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('project.set')}}</el-button>
              </el-form-item>
          </el-form>
       </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
      return{
            ruleForm:{
              noticeTitle:'',
              noticeType:'',
              noticeContent:'',
              // status:'',
              remark:'',	
            }
        }
    },
    props:[
       "newboard",
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
             this.$confirm(this.$t('notice.nore'), this.$t('notice.notishi'), {
                confirmButtonText: this.$t('notice.noyes'),
                cancelButtonText: this.$t('notice.nono'),
                type: 'warning'
            }).then(() => {        
        //   点击确认后向服务器传参
              var url=this.global.url+"/notice/add?";
                var postData=this.qs.stringify({
                      noticeTitle:this.ruleForm.noticeTitle,
                      noticeType:this.ruleForm.noticeType,
                      noticeContent:this.ruleForm.noticeContent,
                      // status:this.ruleForm.status,
                      remark:this.ruleForm.remark,	
                })
                this.$axios.post(url+postData).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
                         this.$message({
                            type: 'success',
                            message: this.$t('notice.nosccc'),
                         });
                         this.closeDialog();
                         this.$parent.get();
                    }else{
                        this.$message.console.error(this.$t('notice.noerro'));   
                    }
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: this.$t('notice.noexit')
                }); 
            });  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       closeDialog(){
          this.$parent.closeboardDialog();
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
.lii{ 
    text-align: center;
    color:#838ab6;
    line-height: 30px;
    width:30px;border: 1px solid #ececff;
    height:30px;
  }

</style>
