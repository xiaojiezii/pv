<template>
 <div>
      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i>{{$t('user.list')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
          <div style="margin:15px;" v-show="save">
              <el-button type="primary" @click="news" style="width:100px" >{{$t('user.newu')}}</el-button>
          </div>
          <template>
            <el-table
            :data="tableData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
            <el-table-column
                :label="$t('user.user')"
                prop="username"
				>
            </el-table-column>
            <el-table-column
                :label="$t('user.sex')"
                >
                <template slot-scope="scope">
                     <p>{{scope.row.sex | sex1}}</p>
                </template>
               
            </el-table-column>
            <el-table-column
                :label="$t('user.sta')"
                >
                <template slot-scope="scope">
                     <p>{{scope.row.status | sta}}</p>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('user.phone')"
                prop="phone">
            </el-table-column>
			  <el-table-column
			    :label="$t('user.duty')">
                 <template slot-scope="scope">
                     <p>{{scope.row.role | roles}}</p>
                </template>
			</el-table-column>
            <el-table-column
                align="right" width="230%">
                <template slot="header" slot-scope="scope">
                <el-input
                    v-model="search"
                    size="mini"
                    :placeholder="$t('btn.select')"/>
                </template>
                <template slot-scope="scope">
					<el-button
                    v-show="scope.row.role==4"
					size="mini"
					@click="handleEdit(scope.row)"
					id="fsz">{{$t('user.send')}}</el-button>
                     <el-button
                    size="mini"
                    @click="handlemodify(scope.row)">{{$t('btn.dateils')}}</el-button>
					<el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">{{$t('btn.delete')}}</el-button>
                </template>
            </el-table-column>
            </el-table>
            </template>
			<div style="font-size: 13px;float: left;margin: 27px;color: gray">
				<span>{{$t('btn.gon')}} {{total}} {{$t('btn.strip')}}</span>
			</div>
			<div style="font-size: 13px;float: right;margin: 27px;color: gray">
				<span>{{$t('btn.gon')}} {{pages}} {{$t('btn.page')}}</span>
			</div>
            <div style="margin:20px;text-align:right;">
               <el-pagination
                    :page-size="10"
                     @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout=" prev, pager, next"
                    :total="total">
              </el-pagination>
          </div>
      </div>
      <user-dialog :user="userDialog" @closeTagDialog="closeuserDialog" :role="role">              
    </user-dialog>
      <userdit-dialog :userdit="userdit" @closeTagDialog="closeuserditDialog" :userId="userId">              
    </userdit-dialog>
 </div>
</template>
<script>
import userDialog from "./newuser.dialog.vue"
import userditDialog from "./userdit.dialog.vue"
export default {
    data(){
        return{
            save:true,
            userId:"",
            commId:'',
            role:'',
          userDialog:false,
          userdit:false,
           url:this.global.url,
           tableData: [],
           search: '',
		   role:'',
		   currentPage:1,//初始页码
		   total:0,//数据总条数
		   pages:'',//数据总页数
        }
    },
    components:{
        userDialog,
        userditDialog
    },
    filters:{
      sex1(val){
          return val==0 ? "女" : "男"
      },
      sta(val){
          return val==0 ? "开启" : "关闭"
      },
      roles(val){
          if(val==1){
             return '系统管理员'
          }else if(val==2){
              return '病例录入员'
          }else if(val==3){
              return '病例审核员'
          }else if(val==4){
              return "pv经理"
          }
      }
    },
    methods: {
		news(){
           this.userDialog=true
        },
        closeuserDialog(){
            this.userDialog=false
        },
        closeuserditDialog(){
            this.userdit=false
        },
		//页码跳转
		handleCurrentChange: function(currentPage){
		        this.currentPage = currentPage;
		        console.log(this.currentPage)
				var url=this.url
				this.$axios.get(url+"/user/selectAllUser?page="+this.currentPage).then((res)=>{
				    console.log(res)
					// console.log(pager)
				   if(res.status==200){
				       this.tableData=res.data.list
				   }
				})
		},
      //   发送者
         handleEdit(row) {
           var userId=row.id
           sessionStorage.setItem("userId",userId)
            this.$router.push({path:'/sendlist'})
         },
// 删除用户列表中的账号
          handleDelete(row) {
           var userId=row.id
           var name=row.username
             this.$confirm(this.$t('user.userre') +' '+name+' '+this.$t('user.userre1'), this.$t('user.usertishi'), {
                    confirmButtonText: this.$t('user.useryes'),
                    cancelButtonText: this.$t('user.userno'),
                    type: 'warning'
                }).then(() => {
                     var url=this.global.url+"/registerLogin/delete?userId="+userId
                    this.$axios.delete(url).then((res)=>{
                        console.log(res)
                        if(res.data.status==200){
                            this.$message({
                                type: 'success',
                                message: this.$t('user.usersuccess'),
                            });
                            this.get();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('user.userdeaft')
                    });          
                });
         },
		 get(){           
             var url=this.url+"/user/selectAllUser?"
             var postData=this.qs.stringify({
                 page:this.currentPage,
                 companyId:this.commId
             })
			 this.$axios.get(url+postData).then((res)=>{
			     console.log(res)
			    if(res.status==200){
					var list=res.data.list
			 	    this.total=res.data.total
			 	    this.pages=res.data.pages
			        this.tableData=res.data.list
			    }
			 })
         },
//    编辑修改按钮
         handlemodify(row){
            this.userId=row.id
            this.userdit=true
         }
    },
    created(){
        this.commId=this.$route.query.commId
        console.log(this.commId)
        this.get()
       var role=sessionStorage.getItem("role")
       this.role=role
       if(role==4 || 1){
           this.save=true
       }else{
           this.save=false
       }
    }
}
</script>
<style scoped>
.el-button--mini{
    padding:7px 10px;
}
</style>

