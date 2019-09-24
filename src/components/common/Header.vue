<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo">
            <img style="width:200px;height:30px;padding-top:10px;" src="../../assets/img/logo.png" alt="">
        </div>
        <div class="nav">
             <el-menu style="margin:0 auto;"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#242f42"
                @select="handleSelect"
                text-color="#c0c4cc"
                active-text-color="#3a8ee6">
                <el-menu-item  v-for="(item,i) of nav" :key="i" :index="item.menuId.toString()">{{en==true ? item.menuName : item.menuUs}}</el-menu-item>
            </el-menu>
        </div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <i class="el-icon-rank" :title="fullscreen?`取消全屏`:`全屏`"></i>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator"><img src="../../assets/img/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{name}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <span v-if="role=='1'" class="roles">{{$t('header.admin')}}</span>
                    <span v-else-if="role=='2'" class="roles">{{$t('header.registrar')}}</span>
                    <span v-else-if="role=='3'" class="roles">{{$t('header.assessor')}}</span>
                    <span v-else class="roles">{{$t('header.manager')}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="pars">{{$t('header.info')}}</el-dropdown-item>
                        <el-dropdown-item command="pass">{{$t('header.pass')}}</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">{{$t('header.quit')}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <pars-dialog :parsTagdialog="parsDialog" @closeTagDialog="closeTagDialog"></pars-dialog>
        <pass-dialog :passTagdialog="passDialog" @closepassDialog="closepassDialog"></pass-dialog>
    </div>
</template>
<script>
    import parsDialog from './pers.dialog.vue'
    import passDialog from './pass.dialog.vue'
    import bus from '../common/bus';
    export default {
        data() {
            return {
                //  activeIndex2: '1',
                nav:[],
                role:sessionStorage.getItem("role"),
                parsDialog:false,
                passDialog:false,
                collapse: false,
                fullscreen: false,
                en:true,
                name:sessionStorage.getItem("user"),
                // message: 2
            }
        },
        props:[
            "navlist"
        ],
        watch:{
            navlist(val){
                if(val=="zh"){
                    this.en=false
                }else{
                  this.en=true
                }
            }
        },
     components:{
        parsDialog,
        passDialog
    },
        methods:{
            closeTagDialog(){
                this.parsDialog=false;
            },
            closepassDialog(){
                this.passDialog=false;
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    sessionStorage.removeItem('user')
                    sessionStorage.removeItem('token')
                    sessionStorage.removeItem('usid')
                    sessionStorage.removeItem('role')
                    this.$router.push('/login');
                }else if(command == "pars"){
                    this.parsDialog=true
                }else if(command == "pass"){
                    this.passDialog=true
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
             handleSelect(i) {
                 bus.$emit('menuId',i);
                if(i==1){
                   this.$router.push({name:"2011"})
                }else if(i==3){
                    this.$router.push({name:"300"})
                }else if(i==5){
                    this.$router.push({name:"501"})
                }else if(i==6){
                    this.$router.push({name:"2022"})
                }else if(i==7){
                    this.$router.push({name:"2023"})
                }else{
                  this.$router.push({name:i})
                }
                
             },
             get(){
                    var url=this.global.url+"/role/listByRole?roleId="+this.role;
                    this.$axios.get(url).then((res)=>{
                        console.log(res)
                        if(res.data.status==200){
                            this.nav=res.data.data
                            this.$i18n.locale=="en-us" ? this.en=false : this.en=true
                        }
                    })
             }
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        },
        created(){
            this.get()
        }
    }
</script>
<style scoped>
    .en_zh{
        font-size: 15px;
        cursor: pointer;
    }
    .en_zh:hover{
        background: #303133;
    }
    
    .header {
        position: relative;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 5px 21px;
        cursor: pointer;
        line-height: 40px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 40px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 50px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 10px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .nav{
     width: 55%;
     display: flex;
     justify-content: center;
    }
    .el-icon-rank,.el-icon-menu{
        transition:all 0.8s linear;
    }
    .el-icon-rank:hover{
        transform:rotate(180deg);
    }
    .el-icon-menu:hover{
        transform:scale(1.2);
    }
    .roles{
        color:#fff;
        display:inline-block;
        padding-left:15px;
    }
</style>
