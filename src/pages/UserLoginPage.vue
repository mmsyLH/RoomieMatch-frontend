<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="账号"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from 'vue';
import {onMounted} from "vue";
import myAxios from "../plugins/axios.ts";
import {showFailToast, showSuccessToast, showToast} from "vant";

const router = useRouter()

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  if (res.code === 200 && res.data) {//当前用户登录成功
    showSuccessToast('登录成功');
    router.replace('/');//push是压入新的页面 例如这个时候用户点击后退就是回到刚刚的页面   replace是现在的页面把刚才的替换掉
  } else {
    showFailToast('登录失败');
  }
};
</script>
<style scoped>

</style>