 <template>
  <div>
     <el-dialog title="菜单权限" :visible.sync="conmen" :before-close="closeDialog" style="text-align:center;border-radius:5px;">
        <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">
           <el-form-item label="菜单权限：" prop="name">
              <el-tree
                :data="ruleForm.menuTree"
                show-checkbox
                default-expand-all
                node-key="menuId"
                ref="tree"
                highlight-current
                :props="treeProps">
              </el-tree>
            </el-form-item>
             <el-form-item  style="margin:30px 0 0 -250px;">
                <el-button type="primary" @click="getCheckedKeys2" v-show="!save">立即创建</el-button>
                <el-button type="primary" @click="getCheckedKeys" v-show="save">修改</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>


<script>
export default {
    data(){
        return{  
            save:true,
           treeProps: {
             label:'menuName',
            },
          ruleForm:{
              menuList:[],
              menuTree:[],
          },
          menuId:[],
        }
    },
    props:[
        "conmen",
        "contId"
    ],
    watch:{
        contId(val){
            if(val!==undefined){
                this.get()
                this.get2()
            }
        }
    },
    methods:{
      
       closeDialog(){
           this.$parent.closeconmenDialog()
       },
    //   新创建菜单权限
      getCheckedKeys2(){
           this.menuId=this.$refs.tree.getCheckedKeys()
          for(var tr of this.$refs.tree.getHalfCheckedKeys()){
               this.menuId.push(tr)
           }
           console.log(this.menuId)
             var url=this.global.url+"/role/addRole?role="+this.contId;
                url+="&menuIds="+this.menuId;
            this.$axios.post(url).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                 this.$message({
                    type: 'success',
                    message: '创建成功!',
                 });
                 this.$parent.get()
                 this.closeDialog()
                }else{
                    this.$message.error("创建失败,数据传输错误!")
                }
            })
      },
    // 修改菜单权限
        getCheckedKeys(){
            this.menuId=this.$refs.tree.getCheckedKeys()
             for(var tr of this.$refs.tree.getHalfCheckedKeys()){
               this.menuId.push(tr)
           }
            console.log(this.menuId)
            var url=this.global.url+"/role/updateMenu?role="+this.contId;
                url+="&menuIds="+this.menuId;
         
            this.$axios.put(url).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                 this.$message({
                    type: 'success',
                    message: '修改成功!',
                 });
                //  this.$parent.gos()
                 this.$parent.get()
                 this.closeDialog()
                }
            })
        },
   
    //    菜单权限列表
      get(){
          var url=this.global.url+"/menu/list";
          this.$axios.get(url).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.ruleForm.menuTree=res.data.data
              }else{
                  this.$message.error("数据传输错误！");
                  
              }
          })
      },
      get2(){
           var url=this.global.url+"/role/listByRole?roleId="+this.contId
         this.$axios.get(url).then((res)=>{
             console.log(res)
             if(res.data.status==200){
                 this.get()
                 this.ruleForm.menuTree=res.data.data
             var menuId=res.data.data
             console.log(menuId)
             var arr=[]
             for(var menu of menuId){
                 arr.push(menu.menuId)
                 for(var me of menu.children){
                     arr.push(me.menuId)
                 }
             }
             this.ruleForm.menuList=arr
              this.$refs.tree.setCheckedKeys(this.ruleForm.menuList);
             this.ruleForm.menuList.length>0 ? this.save=true : this.save=false
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
