
<template>
 <div>
      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> 用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
          <template>
            <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column
                label="会话编号"
                prop="username">
            </el-table-column>
            <el-table-column
                label="登录名称"
                >      
            </el-table-column>
            <el-table-column
                label="部门名称"
                >
            </el-table-column>
            <el-table-column
                label="主机"
                prop="phone">
            </el-table-column>
            <el-table-column
                label="登录地点"
                prop="phone">
            </el-table-column>
            <el-table-column
                label="会话状态"
                prop="phone">
            </el-table-column>
            <el-table-column
                label="登录时间"
                prop="phone">
            </el-table-column>
            <el-table-column
                label="最后访问时间"
                prop="phone">
            </el-table-column>
            <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">                   
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">强退</el-button>
                </template>
            </el-table-column>
            </el-table>
            </template>
            <div style="margin:20px;text-align:right;">
               <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    :current-page="currentPage"
                    layout="prev, pager, next"
                    :total="total">
              </el-pagination>
          </div>
      </div>
 </div>
</template>
<script>
import { setTimeout } from 'timers';
export default {
    data(){
        return{
           currentPage:1,
           tableData: [],
           search: '',
           total:0,
        }
    },
    methods: {
       // 强制退出
          handleDelete(row) {
       
         },
         // 页码跳转
         handleCurrentChange: function(currentPage){
		      this.currentPage=currentPage
		},
    },
    created(){

    }
}
</script>
<style scoped>

</style>

