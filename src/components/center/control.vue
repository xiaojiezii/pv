<template>
    <div>
        <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> 权限管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
           <div style="margin:15px;">
              <el-button  type="primary" style="width:100px;" @click="news">+新增</el-button>                
          </div>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="id"
                label="序号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
                width="300">
            </el-table-column>
            <el-table-column
                label="状态"
                width="300">
                <template slot-scope="scope">
                    <p>{{scope.row.stage | sta}}</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="说明"
                width="300">
            </el-table-column>
            <el-table-column
              label="操作">
                <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                <el-button type="text" v-show="scope.row.stage!=='0'" @click="handleConmen(scope.row)" size="small">菜单权限</el-button>
                <el-button type="text" @click="handleDelete(scope.row)" size="small">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
      </div>
      <control-dialog :control="controldialog" @closeTagDialog="closecontrolDialog" :contId="contId" :save="save"></control-dialog>
      <conmenu-dialog :conmen="comendialog" @closeTagDialog="closeconmenDialog" :contId="contId"></conmenu-dialog>
    </div>
</template>
<script>
import controlDialog from './control.dialog.vue'
import conmenuDialog from "./conmen.dialog.vue"
export default {
    data(){
        return{
            controldialog:false,
            comendialog:false,
            contId:'',
            save:"",
           tableData: []
        }
    },
    filters:{
        sta(val){
            return val=="0" ? "关闭" : "开启" 
        }
    },
    components:{
        controlDialog,
        conmenuDialog
    },
    methods:{
        handleClick(row){
          this.controldialog=true
          this.contId=row.id
          this.save=false
        },
        closecontrolDialog(){
            this.controldialog=false
        },
        news(){
           this.controldialog=true
           this.save=true
        },
        // 菜单权限
        handleConmen(row){
           this.comendialog=true
           this.contId=row.id
        },
        closeconmenDialog(){
            this.comendialog=false
        },
        // 删除
        handleDelete(row){
            var url=this.global.url+"/role/del?id="+row.id
            this.$axios.delete(url).then((res)=>{
                if(res.data.status==200){
                  this.$message({
                    type: 'success',
                    message: '删除成功!',
                 });
                 this.get()
                }
            })
        },
        gos(){
            this.$router.go(0)
        },
        get(){
            var url=this.global.url+"/role/list";
            console.log(url)
            this.$axios.get(url).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    this.tableData=res.data.data
                    console.log(this.tableData)
                }
            })
        }
    },
    created(){
      this.get()
    }
}
</script>
<style scoped>

</style>


