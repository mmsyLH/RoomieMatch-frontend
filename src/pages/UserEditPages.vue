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
import {ref} from "vue";
//整个路由的信息
const router=useRouter()
//当前页面路由的信息
const route=useRoute()
console.log("query",route.query)

const editUser = ref({
  ediKey:route.query.ediKey,
  editName:route.query.editName,
  currentValue:route.query.currentValue,
})
const onSubmit = (values) => {
  //todo 提交到后台把ediKey editName  currentValue提交到后台
  console.log('submit', values);
};
</script>
<style scoped>

</style>