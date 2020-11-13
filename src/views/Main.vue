<template>
  <el-container class="mainContainer">
<!--    头部布局-->
    <el-header>
<!--      logo-->
      <div class="leftBox">
      <img src="../assets/logo.png">
        <span>标题</span>
      </div>
<!--      标题-->
      <div class="rightBox">

        <el-dropdown>
          <img src="../assets/logo.png">
<!--          下拉菜单-->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-lock">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!--    头部布局-->
    <el-container>
      <!--      侧边栏-->
      <el-aside :width="isCollapse?'64px':'200px'">
<!--        展开收起-->
        <div class="toggle_box" @click="toggleCollapse">|||</div>
        <!--        展开收起-->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="black"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          unique-opened
          router
          >
          <MenuTree :menuList="this.MenuList"></MenuTree>
        </el-menu>
      </el-aside>
      <!--      侧边栏-->
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>©Fsn 2012-2020</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  import MenuTree from '../components/MenuTree'
  export default {
    name: 'Main',
    components: { MenuTree },
    data(){
      return{
        isCollapse:true,
        MenuList:[
            {
              "id": 1,
              "parentId": 0,
              "menuName": "系统管理",
              "url": "",
              "icon": "el-icon-setting",
              "orderNum": 1,
              "open": 1,
              "disabled": false,
              "perms": null,
              "type": 0,
              "children": [
                {
                  "id": 253,
                  "parentId": 1,
                  "menuName": "欢迎页面",
                  "url": "/welcome",
                  "icon": "el-icon-star-off",
                  "orderNum": 1,
                  "open": 0,
                  "disabled": false,
                  "perms": "welcome:view",
                  "type": 0,
                  "children": []
                },
                {
                  "id": 226,
                  "parentId": 1,
                  "menuName": "用户管理",
                  "url": "/users",
                  "icon": "el-icon-user",
                  "orderNum": 2,
                  "open": 0,
                  "disabled": false,
                  "perms": "users",
                  "type": 0,
                  "children": []
                },
                {
                  "id": 321,
                  "parentId": 1,
                  "menuName": "擂台报名",
                  "url": "/signUpContest",
                  "icon": "el-icon-picture-outline",
                  "orderNum": 2,
                  "open": 1,
                  "disabled": false,
                  "perms": "",
                  "type": 0,
                  "children": []
                },
                {
                  "id": 4,
                  "parentId": 1,
                  "menuName": "菜单权限",
                  "url": "/menus",
                  "icon": "el-icon-help",
                  "orderNum": 3,
                  "open": 0,
                  "disabled": false,
                  "perms": null,
                  "type": 0,
                  "children": []
                },
                {
                  "id": 235,
                  "parentId": 1,
                  "menuName": "角色管理",
                  "url": "/roles",
                  "icon": "el-icon-postcard",
                  "orderNum": 3,
                  "open": 0,
                  "disabled": false,
                  "perms": "",
                  "type": 0,
                  "children": []
                },
                {
                  "id": 261,
                  "parentId": 1,
                  "menuName": "部门管理",
                  "url": "/departments",
                  "icon": "el-icon-s-home",
                  "orderNum": 3,
                  "open": 0,
                  "disabled": false,
                  "perms": "",
                  "type": 0,
                  "children": []
                },
                {
                  "id": 319,
                  "parentId": 1,
                  "menuName": "公告管理",
                  "url": "/notices",
                  "icon": "el-icon-s-flag",
                  "orderNum": 4,
                  "open": 0,
                  "disabled": true,
                  "perms": "",
                  "type": 0,
                  "children": []
                }
              ]
            },
          {
            "id": 321,
            "parentId": 1,
            "menuName": "附件管理",
            "url": "",
            "icon": "el-icon-picture-outline",
            "orderNum": 2,
            "open": 1,
            "disabled": false,
            "perms": "",
            "type": 0,
            "children": []
          }
          ],


        props: ["menuList","tagList"],

      }
    },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        toggleCollapse(){
          this.isCollapse = !this.isCollapse;
        }
      }
  }
</script>

<style lang="less" scoped>

  .el-menu{
    background-color: black;
    border-right: none;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .mainContainer{
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    line-height: 60px;

    .leftBox{
      display: flex;
      align-items: center;
      img{
        width: 60px;
        height: 60px;
      }
    }
    .rightBox{

      align-items: center;
      .el-dropdown>img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: white;
        display: flex;
      }
      .el-dropdown{
        display: flex;
      }
    }
  }

  .el-aside {
    background-color: black;
    color: black;

    .toggle_box{
      background-color: black;
      font-size: 15px;
      text-align: center;
      font-weight: bold;
      color: white;
      cursor: pointer;
    }
  }

  .el-main {
    background-color: #E9EEF3;

  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
