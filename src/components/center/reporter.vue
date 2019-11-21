<template>
 <div>
      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('repo.reinfo')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
          <div style="margin:15px;">
              <el-button @click="handleadd()" type="primary" style="width:100px" >{{$t('repo.renew')}}</el-button>
          </div>
          <template>
            <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column
                :label="$t('repo.repost')"
                prop="post">
            </el-table-column>
            <el-table-column
                :label="$t('repo.rename')"
				prop="name">
            </el-table-column>
            <el-table-column
                :label="$t('repo.rebranch')"
                prop="branch">
            </el-table-column>
            <el-table-column
                :label="$t('repo.recity')"
                prop="city">
            </el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="mini"
                    :placeholder="$t('btn.select')"/>
                </template>
                <template slot-scope="scope">
                    <!-- <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">报告者</el-button> -->
                    <el-button
                    size="mini"
                    @click="handlemodify(scope.row)">{{$t('btn.edtiot')}}</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">{{$t('btn.delete')}}</el-button>
                </template>
            </el-table-column>
            </el-table>
            </template>
            <!-- <div style="margin:20px;text-align:right;">
               <el-pagination
                    :page-size="20"
                    layout="prev, pager, next"
                    :total="1000">
              </el-pagination>
          </div> -->
      </div>
      <newrepor-dialog :newrepor="newrepor" @closeTagDialog="closereporDialog" :siteId="siteId" :siName='siName'>              
    </newrepor-dialog>
      <editrepor-dialog :editrepor="editrepor" @closeTagDialog="closeeditDialog" :rowId="rowId" :siName='siName' :siteId="siteId">              
    </editrepor-dialog>
 </div>
</template>
<script>
import editreporDialog from "./editrepor.dialog.vue"
import newreporDialog from "./newrepor.dialog.vue"
export default {
    data(){
        return{
           rowId:'',
           newrepor:false,
           editrepor:false,
           url:this.global.url,
		   siteId:"",
           tableData: [],
           search: '',
           siName:'',
        }
    },
   components:{
       newreporDialog,
       editreporDialog
    },
    methods: {
        closereporDialog(){
            this.newrepor=false
        },
        closeeditDialog(){
            this.editrepor=false
        },
        get(){
           var siteId=this.$route.query.sid
           this.siName = this.$route.query.siName
		   this.siteId=siteId
           var url=this.url
            this.$axios.get(url+"/siteReporter/selectSiteReporter?siteId="+siteId).then((res)=>{
                console.log(res)
                if(res.data.status==200){
					console.log(siteId)
                    this.tableData=res.data.data
                }
        })
        },
		//   新建按钮
		    handleadd() {
		      this.newrepor=true
		  },
      //   查看按钮
          handleEdit(row) {
            var siteId=row.siteId
            this.$router.push({path:'/reporter', query:{sid:siteId}})
        },
		 
    //   删除按钮
          handleDelete(row) {
            var reporter=row.id
           this.$confirm(this.$t('repo.redelete'), this.$t('repo.retishi'), {
              confirmButtonText: this.$t('repo.reyes'),
              cancelButtonText: this.$t('repo.reno'),
              type: 'warning'
           }).then(() => {
           var url=this.global.url+"/siteReporter/delete?siteReporterId="+reporter;
            this.$axios.delete(url).then((res)=>{
                 console.log(res)
                 if(res.data.status==200){
                    this.$message({
                      type: 'success',
                      message: this.$t('repo.redesuccess')
                    });
                    this.get()
                 }
             })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: this.$t('repo.redeexit')
                });          
            });  
         },
//    编辑修改按钮
         handlemodify(row){
            this.rowId=row.id
           this.editrepor=true
         }
    },
    created(){
       this.get();
    }
}
</script>
<style scoped>

</style>


