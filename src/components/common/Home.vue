<template>
    <div class="wrapper">
        <div class="cem" v-if="cems">
             <div style="display:inline;">
                   <i class="el-icon-chat-dot-round"></i>
                   <span >{{tit.noticeType | Type}}：</span>
                    &nbsp;&nbsp;&nbsp;
                   <span style="font-size:14px">{{tit.noticeContent}}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>时间：</span>
                    <span style="font-size:14px">{{tit.createTime | filterTime}}</span>
             </div>
             <span class="close" @click="cem">x</span>
        </div>
        <!-- 头部导航栏 -->
        <v-head :navlist="navlist"></v-head>
        <!-- 中英文切换按钮 -->
        <div class="en_zh"> <span style="zIndex:1001;" @click="changeLanguage"  v-loading.fullscreen.lock="fullscreenLoading">{{$t('login.btn')}}</span></div>
        <!-- 主页导航栏 -->
        <v-sidebar v-show="!navleft" :navlist="navlist"></v-sidebar>
        <!-- 病例导航栏 -->
        <v-sidebars v-show="navleft" :navlist="navlist"></v-sidebars>
        <!-- 公告 -->
        <v-Cement  :cement="cement" :list='list' @closeTagDialog="closecementDialog"></v-Cement>
        <!-- 公告 -->
        <div class="flexs"  @click="flexs" title="打开公告">
            <i class="el-icon-bell" style="font-size:30px;"></i>
        </div>
        <!-- 标签 -->
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags :navlist="navlist"></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
        </div>                                                                         
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vSidebars from './Sidebars.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    import vCement from './cement.dialog';
    export default {
        data(){
            return {
                cement:false,
                tit:{},
                cems:'true',
                navlist:"",  //左侧导航栏
                tagsList: [],
                collapse: false,
                navleft:'',
                list:[],
                newList:true,  
                fullscreenLoading: false
            }
        },
        watch:{
            //  是否为中英文
            navleft(val){
                if(val!==undefined){
                    this.newList=false
                }
            },
            // 监听事件，如果newList为true,显示左侧主页导航栏
            newList(val){
                if(val){
                    this.navleft=''
                }
            }
        },
          filters:{
       Type(val){
          return val==1 ? "通知" : "公告"
      }
    },
        methods:{
            cem(){
                this.cems=false
            },
    // 中英文切换按钮
              changeLanguage () {
                  const loading = this.$loading({
                            lock: true,
                            text: 'Loading',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        setTimeout(() => {
                        loading.close();
                           if (this.$i18n.locale == 'en-us') {
                                this.$i18n.locale = 'zh-cn'
                                this.navlist="en"
                            } else {
                                this.$i18n.locale = 'en-us'
                                this.navlist="zh"
                            }
                        }, 1000);                
            },
            flexs(){
                this.cement=true;
            },
            closecementDialog(){
                this.cement=false;
            },
        get2(){
            var url=this.global.url+'/notice/listByOpen';
            this.$axios.post(url).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    this.list=res.data.data
                    if(this.list.length==0){
                        this.cement=false
                    }
                }
            })

            var u=this.global.url+"/notice/noticeList"
            this.$axios.get(u).then((res)=>{
                console.log(res)
                if(res.data.status==200){
                    if(res.data.data.length==0){
                        this.cems=false
                    }else{
                       this.tit=res.data.data[0]
                    }     
                }
            })
          }
        },
        components:{
            vHead, vSidebar, vSidebars,vTags,vCement
        },
        created(){
            this.get2()
            var user=sessionStorage.getItem("user")
            var role=sessionStorage.getItem("role")
            this.cement= user!==undefined ? true :false
             this.cement= role==1 ? false : true
            bus.$on('collapse', msg => {
                this.collapse = msg; 
            })
            bus.$on("nav",msg => {
                this.navleft = msg
            })
            // 左侧主导航栏与病例导航按切换
            bus.$on("newList",msg => {
                this.newList=msg 
            })
     
            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for(let i = 0, len = msg.length; i < len; i ++){
                   msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            })
        }
    }
</script>
<style>
.cem{
    width: 100%;
    height:25px;
   position: absolute;
   z-index: 1000;
   background: #ffeeb6;
   text-align: center;
   
}
.close{
    float:right;padding-right:20px;
    cursor: pointer;
}
.close:hover{
    opacity: .5;
}
 .en_zh{
     /* z-index: 1000; */
     font-size: 15px;
     color:cyan;
     cursor: pointer;
     height:50px;
     position: absolute;
    top: 15px;
    right: 20px;
 }
 .flexs{
     width:50px;
     height:50px;
     border-radius: 50%; 
     background: #ffffff;
     opacity: 0.7;
     position: fixed;
     z-index: 1001;
     top:80%;right: 20px;
     text-align: center;
     line-height: 60px;
 }
  .flexs:hover{
     cursor: pointer;
     box-shadow: 0 0 10px rgba(0,0,0,.2);
  }
</style>

