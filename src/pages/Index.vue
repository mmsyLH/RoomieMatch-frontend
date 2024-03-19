<template>
  <user-card-list :user-list=userList />
  <!-- 当用户列表为空时显示空状态组件 -->
  <van-empty v-if="!userList || userList.length < 1" description="数据为空~"/>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/axios.ts";
import qs from "qs";//处理请求参数的一个库  例如前端有时候传一个List的时候 如果是get那么后端不识别这个[]
// 比如a=1 b=2解析成 {a:1,b:2}
import {showToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

// 使用 useRoute 获取当前路由对象
const route = useRoute();

// 从查询参数中获取标签
const {tags} = route.query;

// 模拟用户数据
const mockUser = {
  id: 1,
  username: '罗汉',
  userAccount: "doglh",
  avatarUrl: "https://lhwaimai.oss-cn-beijing.aliyuncs.com/logo/logo.jpg",
  profile: "阿巴阿巴,阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴",
  gender: 1,
  phone: 123,
  email: 123,
  userStatus: 0,
  userRole: 1,
  plantCode: 1234,
  createTime: Date.now(),
  tags: ["java", "c++", "Python"],
}

// 定义用户列表的响应式引用
const userList = ref([]);

// 在组件挂载后获取用户列表数据
onMounted(async () => {//dom元素渲染出来后
  try {
    const userListData = await myAxios.get('/user/recommend', {
      params: {},
    }).then(function (res) {
      console.log("/user/recommend res", res);
      userList.value = res.data.map(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
        return user;
      });
    }).catch(function (err) {
      console.log("/user/recommend err", err);

    });
    showToast('请求成功');
    // 如果返回了用户列表数据，则处理并赋值给 userList
    if (userListData && userListData.data) {
      userList.value = userListData.data.map(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
        return user;
      });
    }
  } catch (err) {
    console.log("err", err);
  }
});
</script>

<style scoped>

</style>
