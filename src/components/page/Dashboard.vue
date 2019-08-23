<template>
 <div>
      <div class="crumbs" style="margin-bottom:10px;">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item style="font-size:20px;"><i class="el-icon-lx-cascades"></i> {{$t('notice.notit')}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
          <div style="margin:15px;">
             <el-button type="primary" @click="news" style="width:100px" >{{$t('notice.newnot')}}</el-button>
          </div>
          <template>
            <table class="tab">
                <thead>
                    <tr style="heigt:60px;">
                       <th width="14%" >{{$t('notice.num')}}</th>
                       <th width="14%" >{{$t('notice.notit')}}</th>
                       <th width="14%" >{{$t('notice.notype')}}</th>
                       <th width="14%" >{{$t('notice.sta')}}</th>
                       <th width="14%" >{{$t('notice.cre')}}</th>
                       <th width="14%" >{{$t('notice.cretime')}}</th>
                       <th width="14%"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,i) of tableData" :key="i">
                        <td width="14%">{{i+1}}</td>
                        <td width="14%">{{item.noticeTitle}}</td>
                        <td width="14%">{{item.noticeType | Type}}</td>
                        <td width="14%" class="sta" >{{item.status | sta}}</td>
                        <td width="14%">{{item.createBy}}</td>
                        <td width="14%">{{item.createTime | filterTime}}</td>
                        <td width="20%" align="right">
                           <el-button  v-show="item.status=='0'"
                           size="mini" @click="handlemodify(i)">{{$t('btn.dateils')}}</el-button>    
                           <el-button v-if="save"  v-show="item.status=='0'" size="mini" type="warning" @click="handleClose(i)">{{$t('btn.los')}}</el-button>
                           <el-button   size="mini" type="danger"  @click="handleDelete(item.noticeId)">{{$t('btn.delete')}}</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
         </template>
      </div>
       <board-dialog :newboard="newboard" @closeTagDialog="closeboardDialog"></board-dialog>
       <boardeta-dialog :boardeta="boardeta" @closeTagDialog="closedetaDialog" :nId="nid"></boardeta-dialog>
 </div>
</template>
<script>
import boardDialog from '../center/newboard.dialog'
import boardetaDialog from '../center//bordeta.dialog'
export default {
    data(){
        return{
            role:"",
          newboard:false,
          boardeta:false,
          nid:'',
           save:false,
           url:this.global.url,
        //    currentPage:1,
        //    total:0,
           tableData: [],
           search: ''
        }
    },
    components:{
      boardDialog,
      boardetaDialog
    },
    filters:{
      Type(val){
          return val==1 ? "通知" : "公告"
      },
      sta(val){
          return val==0 ? "正常" : "关闭"
      },
    },
    methods: {
        news(){
            this.newboard=true
        },
        closeboardDialog(){
            this.newboard=false
        },
        closedetaDialog(){
            this.boardeta=false
        },
      //   查看按钮
        //   handleEdit(row) {
           
        //     var siteId=row.siteId
        //     this.$router.push({path:'/markdown', query:{sid:siteId}})
        // },
//    编辑修改按钮
         handlemodify(row){
             this.nid=this.tableData[row].noticeId
            this.boardeta=true
            
         },
         get(){
             var url=this.global.url+"/notice/list"
             this.$axios.post(url).then((res)=>{
                 console.log(res)
                 if(res.data.status==200){
                     this.tableData=res.data.data
                 }
             })
         },
        //  关闭按钮
         handleClose(row){
             console.log(row)
             var nid=this.tableData[row].noticeId
            this.$confirm(this.$t('notice.nore1'), this.$t('notice.notishi'), {
                    confirmButtonText: this.$t('notice.noyes'),
                    cancelButtonText: this.$t('notice.nono'),
                    type: 'warning'
                }).then(() => {
             var url=this.global.url+"/notice/del?id="+nid
             this.$axios.post(url).then((res)=>{
                 console.log(res)
                 if(res.data.status==200){
                     this.$message({
                        type: 'success',
                        message: this.$t('notice.nosuccess')
                    });
                    this.get();
                 }
              })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('notice.nodeaft')
                    });          
                });
             },
        // 删除按钮
      handleDelete(id){
          var url=this.global.url+"/notice/remove?ids="+id
          this.$axios.post(url).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.$message({
                        type: 'success',
                        message: this.$t('notice.nosuccess1')
                    });
                  this.get()
              }else{
                  this.$message.error(this.$t('notice.noerro1'));
                  
              }
          })
      }
    },
    created(){
       this.get();

        var role=sessionStorage.getItem("role")
        this.role=role
        if(role==4){
            this.save=true
        }
    }
}
</script>
<style scoped>
  .tab{
      padding: 0 8px;
      width:100%;
      color: #909399;
      text-align:left;
      font-size: 12px;
      font-family: 'PingFang SC';
      border-collapse:collapse;
      margin-bottom: 100px;
  }
  tr:hover{
      background:#F5F7FA;
  }
  th{
       height:50px;
      border-bottom:1px solid #EBEEF5;
      padding:8px 0;
  }
  td{
      height:50px;
      border-bottom:1px solid #EBEEF5;
      padding:1px 0 ;
  }
.el-button--mini{
    padding:7px 8px;
}
</style>

