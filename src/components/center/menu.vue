<template>
    <div>
         <div class="crumbs" style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> 菜单管理</el-breadcrumb-item>
          </el-breadcrumb>
       </div>
       <div class="container">
         <div style="margin:15px;">             
               <el-button type="info" @click="casedia">新增一级菜单</el-button>
          </div>
       <el-table
            :data="nav"
            style="width: 100%"
            row-key="menuId"
            border
            lazy
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column 
                prop="menuName"
                label="名称"
                 width="250"> 
            </el-table-column>
            <el-table-column
                prop="menuId"
                label="编码"
                width="200">
            </el-table-column>
            <el-table-column
                label="类型"
                 width="200">
                <template slot-scope="scope">
                    <p>{{scope.row.menuType | type}}</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                width="300">
            </el-table-column>
            <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                    <el-button @click="handlenewsong(scope.row)" type="text" size="small">添加子菜单</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small" style="margin-right:10px;">编辑</el-button>
                    <el-popover
                        placement="top"
                        width="160">
                        <p>删除后不可恢复，是否删除？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button  type="danger"  icon="el-icon-delete" circle @click="handleEdit(scope.row)"></el-button>
                        </div>
                       <el-button slot="reference" type="text" size="small">删除</el-button>
                        </el-popover>           
                </template>
            </el-table-column>
        </el-table>
       </div>
        <menu-dialog :menu="menudia" @closeTagDialog="closemeneuDialog" :mId="menuId" :mes="menus" :parm='parmenu'>              
    </menu-dialog>
    </div>
</template>
<script>
import menuDialog from "./menu.dialog.vue"
export default {
    data(){
        return{
            nav:[],
            menudia:false,
            menuId:'',
            menus:"",
            parmenu:'',
        }
    },
    components:{
      menuDialog
    },
    filters:{
        type(val){
            if(val=="M"){
                return "目录"
            }else if(val=="C"){
                return "菜单"
            }else if(val=="F"){
                return "按钮"
            }
        }
    },
    methods:{
       handlenewsong(row){
           this.menus=true
            this.menuId=row.menuId
            this.menudia=true
            this.parmenu=false
       },
       closemeneuDialog(){
           this.menudia=false
       },
       handleClick(row){
            this.menuId=row.menuId
           this.menudia=true
           this.menus=false
           this.parmenu=false
       },
       handleEdit(row){
           var menuId=row.menuId
           var url=this.global.url+"/menu/delParent?menuId="+menuId
           this.$axios.get(url).then((res)=>{
               console.log(res)
               if(res.data.status==200){
                   this.get()
               }else{
                   this.$message.error("数据传输错误！")
               }
           })
       },
       casedia(){
            this.menudia=true
            this.parmenu=true
       },
       get(){
        var url=this.global.url+"/menu/list";
                console.log(url)
                this.$axios.get(url).then((res)=>{
                    console.log(res)
                    if(res.data.status==200){
                        this.nav=res.data.data
                    }else{
                        this.$message.error("数据传输错误！")
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

