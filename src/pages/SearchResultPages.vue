<template>
<!--  {{ JSON.stringify(route.query) }}-->
  <van-card v-for="user in userList" :key="user.id" :icon="user.avatarUrl"
            :desc="user.profile"
            :title="`${user.username} (${user.plantCode})`"
            :thumb="user.avatarUrl"

  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 10px;margin-top: 10px">{{ tag }}
      </van-tag>
    </template>
    <template #footer style="margin-top: 10px">
      <van-button size="mini">联系我</van-button>
      <van-button size="mini">按钮</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList||userList.length<1" description="暂无符合要求的舍友" />
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/axios.ts";

import qs from "qs";
import {showToast} from "vant";

const route = useRoute();

const {tags} = route.query;

const mockUser = {
  id: 1,
  username: '罗汉',
  userAccount: "doglh",
  avatarUrl: "https://lhwaimai.oss-cn-beijing.aliyuncs.com/logo/logo.jpg",
  profile: "阿巴阿巴,阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴",
  gender: 1,
  phone: 123,
  email: 123,
  userStatus: 0,
  userRole: 1,
  plantCode: 1234,
  createTime: Date.now(),
  tags: ["java", "c++", "Python"],
}
const userList = ref([])
onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagsNameList: tags
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, {indices: false});
    },
  }).then(function (res) {
    showToast('请求成功');
    return res.data?res.data:null;
  }).catch(function (err) {
    console.log("err", err)
  })
  console.log("userListData",userListData)
  if (userListData) {
    userListData.forEach(user=>{
        if (user.tags){
          user.tags=JSON.parse(user.tags)
        }
    })
    userList.value = userListData;
  }
})


</script>

<style scoped>

</style>