<template>
<!-- 下载文件 -->
    <div>
      <el-dialog title="病例附加文件" :visible.sync="filedia" :before-close="closeDialog" style="text-align:center;">
        <!-- <el-table
            :data="gridData"
            style="width: 100%">
            <el-table-column
            label="文件名称"
            prop="fileName">
            </el-table-column>
            <el-table-column
            label="上传时间">
                <template slot-scope="scope">
                     <p>{{scope.row.time | formDate}}</p>
                </template>
            </el-table-column>
        
            <el-table-column align="right">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.row)">下载</el-button>
                <el-button
                size="mini"
                @click="handle(scope.row)">查看</el-button>
            </template>
            </el-table-column>
        </el-table> -->
        <ul>
            <li v-for="(item,i) of gridData" :key="i" style="height:60px;display:flex;line-height:30px;">
                <div style="width:45px;height:45px;margin-right:20px;">
                    <i class="el-icon-s-marketing" v-if="item.fileName.substring(item.fileName.length-3)=='jpg'"></i>
                    <i class="el-icon-s-marketing" v-else-if="item.fileName.substring(item.fileName.length-3)=='png'"></i>
                    <i class="el-icon-document" v-else></i>
                </div>
                <div style="width:500px;text-align:left;margin-bottom:15px;" >
                    <a href="#" style="color:#000000;" class="file">
                        <p style="margin-bottom:5px;font-size:15px;" title="查看下载">{{item.fileName}}</p>
                        <p style="color:#999;">时间：{{item.time | filterTime}}</p>
                    </a>
                    
                </div>
                 <el-button style="height:30px;margin:15px 10px 0 0;" size="mini" @click="handle(i)">查看</el-button>   
                 <el-button style="height:30px;margin:15px 10px 0 0;" type="danger" v-show="lock"  size="mini" @click="del(item.id)">删除</el-button>   
            </li>
        </ul>
        <div style="font-size: 13px;float: left;margin: 27px;color: gray">
				<span>共{{total}}条</span>
		</div>
         <div style="margin:20px;text-align:center;">
               <el-pagination
                    :page-size="10"
                     @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout=" prev, pager, next"
                    :total="total">
              </el-pagination>
          </div>
      </el-dialog>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          gridData:[],
           currentPage:1,
          total:0,
          pages:'',
      };
    },
    props:[
        "filedia",
        "caseId",
        "lock"
    ],
    watch:{
      filedia:function(val){
          if(val){
              this.gets()
          }
      }
    },
    methods:{
        closeDialog(){
            this.$parent.closefileDialog()
        },  
        handleCurrentChange(){
           var url=this.global.url+"/user/selectAllFile?caseId="+this.caseId;
               url+="&page="+this.currentPage
          this.$axios.get(url).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                  this.gridData=res.data.data.list
              }
          })
        },
    //     handleEdit(i){
    //        var filePath=this.gridData[i].id
    //        var row=this.gridData[i]
    //        var url=this.global.url+"/user/download?"
    //        var postData=this.qs.stringify({
    //             fileId:filePath
    //        })
    //        this.$axios.post(url+postData).then((res)=>{
    //            this.download(res.data,row)
    //        })
    //     },
    //     download (data,row) {
    //         console.log(data)
    //     if (!data) {
    //         return
    //     }
    //     let url = window.URL.createObjectURL(new Blob([data]))
    //     let link = document.createElement('a')
    //     link.href = url
    //     // 获取文件名
    //     // download 属性定义了下载链接的地址而不是跳转路径
    //     link.setAttribute('download', row.fileName)
    //     link.click()
    // },
    handle(i){
        var filePath=this.gridData[i].filePath
        console.log(filePath)
        var url=this.global.file
         window.open(url+filePath)
    },
    del(i){
        console.log(i)
        var url=this.global.url+"/user/delete?fileId="+i
        this.$axios.post(url).then((res)=>{
            console.log(res)
            if(res.data.status==200){
                this.$message({
                    type: 'success',
                    message: '删除成功!',
                });
                this.gets()
            }else{
                this.$message.error("删除失败，数据传输错误！")
            }
        })
    },
        gets(){
        
          var url=this.global.url+"/user/selectAllFile?caseId="+this.caseId;
          this.$axios.get(url).then((res)=>{
              console.log(res)
              if(res.data.status==200){
                   this.total=res.data.data.total
                  this.gridData=res.data.data.list
              }
          })
        }
    }
  };
</script>
<style scoped>
.el-dialog{
    width:40%;
}
ul{
    list-style: none;
    color: #909399;
      font-size: 12px;
      font-family: 'PingFang SC';
}
.file{
    width:400px;
    display: inline-block;
}
.file:hover>p{
    color:#cccccc;
}
li:hover{
    background: #F5F7FA;
}
.el-icon-document {
    font-size: 32px;
    margin:15px 10px 0 10px; 
}
.el-icon-s-marketing{
    font-size: 32px;
    margin:15px 10px 0 10px; 
}
</style>


