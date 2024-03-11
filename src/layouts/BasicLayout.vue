<template>
  <van-nav-bar
      title="标题"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>
  <van-tabbar route>
    <!-- replace 是否支持回到前一个页面   -->
    <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" name="team" to="/team">队伍页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="talk" to="/talk">聊天</van-tabbar-item>
    <van-tabbar-item icon="setting-o" name="user" to="/user">用户</van-tabbar-item>
  </van-tabbar>

</template>
<script setup>

import {useRouter} from "vue-router";
import {ref} from "vue";

const active = ref('talk');
const router = useRouter()
const onClickLeft = () => history.back();
const onClickRight = () => {
  router.push("/search");
};


</script>
<style scoped>
#content {
  padding-bottom: 60px;
}
</style>