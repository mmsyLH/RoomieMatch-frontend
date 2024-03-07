<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.ediKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
          :rules="[{ required: true, message: '请填写信息' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        修改
      </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/axios.ts";
import {showFailToast, showSuccessToast, Toast} from "vant";
import {getCurrentUser} from "../services/user.ts";
//整个路由的信息
const router = useRouter()
//当前页面路由的信息
const route = useRoute()
console.log("query", route.query)

const currentUser = getCurrentUser();


const editUser = ref({
  ediKey: route.query.ediKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,
})
const onSubmit = async () => {
  if (!currentUser){
    showFailToast('用户未登录');

    return;
  }
  const res = await myAxios.post("/user/update", {
    'id': currentUser.id,
    [editUser.value.ediKey]: editUser.value.currentValue,//动态语法
  })
  console.log("res", res);
  if (res.code === 200 && res.data > 0) {
    showSuccessToast('更新成功');
    router.back();//返回之前的页面
  } else {
    showFailToast('修改失败');
  }
};
</script>
<style scoped>

</style>