<template>
 <div>
      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> 公司列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
          <div style="margin:15px;">
               <el-button type="primary" @click="news" style="width:100px" >+新建公司</el-button>               
          </div>
          <template>
            <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column
                label="公司名称"
                prop="name"
                width="250">
            </el-table-column>
            <el-table-column
                label="AS2名称"
                prop="as2">
            </el-table-column>
            <el-table-column
                label="公司地址"
                prop="address"
                width="200">
               
            </el-table-column>
            <el-table-column
                label="联系人姓名"
                prop="userName">
            </el-table-column>
            <el-table-column
                label="联系人方式"
                prop="phone">
            </el-table-column>
            <el-table-column 
                align="right"
                width="300">
                <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                     <el-button
                    size="mini"
                    v-show="role"
                    @click="handleUser(scope.row)">用户</el-button>      
                     <el-button
                    size="mini"
                    @click="handlemodify(scope.row)">详情</el-button>      
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
            </template>
      </div>
     <newcom-dialog :newcom="newcom" @closeTagDialog="closecomDialog">              
    </newcom-dialog>
     <modcom-dialog :modcom="modcom" @closeTagDialog="closemodcomDialog" :sendId="sendId">              
    </modcom-dialog>
 </div>
</template>
<script>
import newcomDialog from './newcom.dialog.vue'
import modcomDialog from "./modcom.dialog.vue"
export default {
    data(){
        return{
            newcom:false,
            sendId:'',
            modcom:false,
           url:this.global.url,
           tableData: [],
           search: ''
        }
    },
    components:{
        newcomDialog,
        modcomDialog
    },
    methods: {
        news(){
            this.newcom=true
        },
        closecomDialog(){
            this.newcom=false
        },
        closemodcomDialog(){
            this.modcom=false
        },
        handleUser(row){
            var commId=row.id
            this.$router.push({path:'/form',query:{commId:commId}})
        },
        // 获取列表数据
        get(){
             var url=this.url
             this.$axios.get(url+"/sysCompany/selectAllSysCompany").then((res)=>{
                 console.log(res)
                if(res.status==200){
                    this.tableData=res.data.data
                  }   
             })
        },
       //  删除按钮
          handleDelete(row) {
           var siteId=row.id
           this.$confirm('是否删除当前信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                type: 'success',
                message: '删除成功!',
                });
             //   点击确认后向服务器传参
                var url=this.global.url+"/sysCompany/delete?sysCompanyId="+siteId
                this.$axios.delete(url).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
                        this.get()
                    }
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消删除'
                }); 
            });  
          
         },
//    编辑修改按钮
         handlemodify(row){
            this.sendId=row.id
            this.modcom=true
         }
    },
    created(){
       this.role= this.$store.state.role==1 ? true :false
       this.get()
    }
}
</script>
<style scoped>
</style>

