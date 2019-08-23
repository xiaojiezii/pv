
<template>
    <div>
     <el-dialog title="菜单管理" id="menu" :visible.sync="menu" :before-close="closeDialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" style="text-align:center;" class="demo-ruleForm">
            <el-form-item label="菜单名称" prop="menuName">
                <el-input v-model="ruleForm.menuName" class="ipts" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
              <el-form-item label="英文名称：" prop="menuUs">
                <el-input v-model="ruleForm.menuUs" class="ipts" placeholder="请输入菜单英文名称"></el-input>
            </el-form-item>
           <el-form-item label="菜单类型" prop="menuType">
                <el-select v-model="ruleForm.menuType" class="ipts" placeholder="请选择类型">
                    <el-option label="菜单" value="C"></el-option>
                    <el-option label="目录" value="M"></el-option>
                </el-select>
           </el-form-item>
           <el-form-item label="选择图标" prop="icon">
                <el-select v-model="ruleForm.icon" class="ipts" placeholder="请选择类型">
                    <el-option v-for="(item,i) of option" :class="item.icon" :label="item.name" :value="item.icon" :key="i"></el-option>
                </el-select>
           </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea"  class="ipts" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item style="margin:50px 0 0 -200px;" v-if="parm">
                <el-button type="primary" @click="mitForm('ruleForm')">保存</el-button>
            </el-form-item>
            <el-form-item style="margin:50px 0 0 -200px;" v-else>
                <el-button type="primary" @click="submitForm('ruleForm')" v-show="mes">保存</el-button>
                <el-button type="primary" @click="Form('ruleForm')" v-show="!mes">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
            </el-form>
      </el-dialog>
    </div>
</template>


<script>
  export default {
    data() {
       return{
        ruleForm: {
             menuName: '',
             remark:'',
             menuType:'',
             icon:'',
             menuUs:'',
         },
         option:[
           {icon:"el-icon-lx-sort",name:' 种类'},
           {icon:"el-icon-lx-settings",name:' 设置'},
           {icon:"el-icon-lx-calendar",name:' 日历'},
           {icon:"el-icon-lx-addressbook",name:' 通讯录'},
           {icon:"el-icon-lx-vipcard",name:' vip'},
           {icon:"el-icon-lx-friend",name:' 朋友'},
           {icon:"el-icon-lx-file",name:' 文件'},
           {icon:"el-icon-lx-read",name:' 阅读'},
           {icon:"el-icon-lx-shop",name:' 商店'},
           {icon:"el-icon-lx-rank",name:' 数据'},
           {icon:"el-icon-lx-tag",name:' 标签'},
           {icon:"el-icon-lx-people",name:' 人类'},
           {icon:"el-icon-lx-notice",name:' 通知'},
           {icon:"el-icon-lx-mobile",name:' 移动电话'},
           {icon:"el-icon-lx-voice",name:' 声音'},
           {icon:"el-icon-lx-unlock",name:' 开启'},
           {icon:"el-icon-lx-lock",name:' 关闭'},
           {icon:"el-icon-lx-home",name:' 首页'},
           {icon:"el-icon-lx-delete",name:' 删除'},
           {icon:"el-icon-lx-notification",name:' 通告'},
           {icon:"el-icon-lx-notificationforbidfill",name:' 禁止'},
           {icon:"el-icon-lx-comment",name:' 评论'},
           {icon:"el-icon-lx-warn",name:' 警告'},
           {icon:"el-icon-lx-location",name:' 位置'},
           {icon:"el-icon-lx-favor",name:' 帮助'},
           {icon:"el-icon-lx-news",name:' 新闻'},
           {icon:"el-icon-lx-record",name:' 记录'},
           {icon:"el-icon-lx-message",name:' 消息'},
           {icon:"el-icon-lx-goods",name:' 商品'},
         ],
         rules:{
           menuName:[{ required: true, message: '请输入菜单名称', trigger: 'blur'}],
           menuUs:[{ required: true, message: '请输入菜单英文名称', trigger: 'blur'}],
           menuType:[{required: true, message: '请选择类型', trigger: 'change'}],
         }
       }  
    },
    props:[
      "menu",
      "mId",
      "mes",
      "parm"
    ],
    watch:{
      mId(val){
          if(val!==undefined){
              this.get()
          }
      }
    },
    methods:{
       closeDialog(){
          this.$parent.closemeneuDialog();
       },
      //  创建新的子菜单栏
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm('确定新创建菜单栏?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {         
        //   点击确认后向服务器传参
        console.log(this.mId)
               var url=this.global.url+"/menu/add?";
               var postData=this.qs.stringify({
                   parentId:this.mId,
                   menuName:this.ruleForm.menuName,
                   menuType:this.ruleForm.menuType,
                   remark:this.ruleForm.remark,
                   icon:this.ruleForm.icon,
                   menuUs:this.ruleForm.menuUs
               })
               this.$axios.get(url+postData).then((res)=>{
                   console.log(res)
                   if(res.data.status==200){
                       this.$message({
                            type: 'success',
                            message: '创建成功!',
                        });
                       this.closeDialog()
                       this.$parent.get()
                   }else{
                       this.$message.error("创建失败，数据传输错误！")
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
    //   创建一级菜单
      mitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm('确定新创建菜单栏?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {         
        //   点击确认后向服务器传参
        console.log(this.mId)
               var url=this.global.url+"/menu/addParent?";
               var postData=this.qs.stringify({
                   menuName:this.ruleForm.menuName,
                   menuType:this.ruleForm.menuType,
                   remark:this.ruleForm.remark,
                   icon:this.ruleForm.icon,
                   menuUs:this.ruleForm.menuUs
               })
               this.$axios.get(url+postData).then((res)=>{
                   console.log(res)
                   if(res.data.status==200){
                        this.$message({
                            type: 'success',
                            message: '创建成功!',
                        });
                       this.closeDialog()
                       this.$parent.get()
                   }else{
                       this.$message.error("创建失败，数据传输错误！")
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
    //   修改菜单信息
      Form(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$confirm('确定新创建菜单栏?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {         
        //   点击确认后向服务器传参
        console.log(this.mId)
               var url=this.global.url+"/menu/update?";
               var postData=this.qs.stringify({
                   menuId:this.mId,
                   menuName:this.ruleForm.menuName,
                   menuType:this.ruleForm.menuType,
                   remark:this.ruleForm.remark,
                   icon:this.ruleForm.icon,
                   menuUs:this.ruleForm.menuUs
               })
               this.$axios.get(url+postData).then((res)=>{
                   console.log(res)
                   if(res.data.status==200){
                        this.$message({
                            type: 'success',
                            message: '修改成功!',
                        });
                       this.closeDialog()
                       this.$parent.get()
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
       get(){
           var url=this.global.url+"/menu/select?id="+this.mId;
           this.$axios.get(url).then((res)=>{
               console.log(res)
               if(res.data.status==200){
                   this.ruleForm=res.data.data
               }else{
                   this.message.error("数据传输错误！");
                   
               }
           })
       },
     resetForm(formName) {
        this.$refs[formName].resetFields();
      }
       
    }
  };
</script>
<style scoped>
.ipts{
    width:300px;
}
.el-select-dropdown__item{
  display: block;
}
</style>
