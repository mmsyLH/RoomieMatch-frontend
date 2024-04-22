<template>
  <user-card-list :user-list="userList" />
  <!-- 当用户列表为空时显示空状态组件 -->
  <van-empty v-if="!userList || userList.length < 1" description="数据为空~"/>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import myAxios from "../plugins/axios.ts";
import { showToast } from "vant";
import UserCardList from "../components/UserCardList.vue";

// 定义用户列表的响应式引用
const userList = ref([]);

// 在组件挂载后获取用户列表数据
onMounted(async () => {
  try {
    const response = await myAxios.get('/user/recommend', {
      params: {
        pageNo: 1,
        pageSize: 5
      },
    });

    const { data } = response;
    if (data && data.records) {
      userList.value = data.records.map(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
        return user;
      });
    }
    showToast('请求成功');
  } catch (err) {
    console.error("请求失败", err);
    showToast('请求失败');
  }
});
</script>

<style scoped>

</style>
