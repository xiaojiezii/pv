<template>
    <div class="crumbs"  style="margin-bottom:10px;">
          <el-breadcrumb separator="/">
             <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('log.tran')}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="container">
              <el-table
                ref="filterTable"
                :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                style="width: 100%">
                <el-table-column
                    prop="Timestamp"
                    :label="$t('log.da')"
                    width="300"
                    >
                </el-table-column>
                <el-table-column
                    prop="Status"
                     :label="$t('log.sta')"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="PortId"
                     :label="$t('log.com')"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="Direction"
                     :label="$t('log.dir')"
                    width="150"
                    :filters="[{ text: $t('log.rie'), value: 'Receive' }, { text: $t('log.se'), value: 'Send'}]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.Direction === 'Receive' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.Direction}}</el-tag>
                    </template>
                </el-table-column>
                 <el-table-column
                    prop="Filename"
                     :label="$t('log.file')">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="filedown(scope.row.Id)" class="as">{{scope.row.Filename}}</a>
                    </template>
                </el-table-column>
            </el-table>
                 <div style="margin:10px 20px 0 0;text-align:right;">
               <el-pagination
                    :page-size="pagesize"
                     @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout=" prev, pager, next"
                    :total="tableData.length+1">
              </el-pagination>
          </div> 
          </div>
    </div>
</template>
<script>
export default {
     data() {
      return {
           currentPage:1,
           total:0,
           pages:'',
           pagesize:10,
         tableData:[]
      };
    },
    methods: {
    //   获取传输日志记录
       get(){
           this.$axios.get("https://pv.yikeen.cn:4080/rssbus/api.rsc/transactions",{
               headers:{"x-rssbus-authtoken": "7i2L1j9v5Q6e8f5M6s9l"}
           }).then((res)=>{
               console.log(res)
               if(res.request.status==200){
                   this.tableData=res.data.value
                   console.log(this.tableData)
               }else{
                   this.$message.error("数据传输错误");              
               }
           })
       },
    //    选择方向
      filterTag(value, row) {
        return row.Direction === value;
      },
      handleCurrentChange(currentPage){
           this.currentPage=currentPage
       },
    //   下载文件    
     filedown(id){
          console.log(id)
     }  
    },
    created(){
        this.get()
    }
}
</script>
<style scoped>
  .as{
      color:#177cb8;
      text-decoration:underline;
  }
  .as:hover{
      opacity: .8;
  }
</style>

