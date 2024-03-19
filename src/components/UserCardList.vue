<template>
  <van-card v-for="user in props.userList" :key="user.id" :icon="user.avatarUrl"
            :desc="user.profile"
            :title="`${user.username} (${user.plantCode})`"
            :thumb="user.avatarUrl"
  >
    <!-- 用户标签模板 -->
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" :key="tag" style="margin-right: 10px; margin-top: 10px">
        {{ tag }}
      </van-tag>
    </template>
    <!-- 卡片底部按钮模板 -->
    <template #footer style="margin-top: 10px">
      <van-button size="mini">联系我</van-button>
      <van-button size="mini">按钮</van-button>
    </template>
  </van-card>
</template>
<script setup lang="ts">
import {UserType} from "../model/user";

interface UserCardListPros {
  userList: UserType[];
}
const props = withDefaults(defineProps<UserCardListPros>(),{
    //@ts-ignore
    userList: [] as UserType[],
    // userList: [],
});
</script>
<style scoped>

</style>