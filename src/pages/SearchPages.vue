<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doclose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">已选标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />

  <van-button block type="primary" @click="doSearchResult">搜索2</van-button>
</template>

<script setup>
import {ref} from 'vue';
//路由
import {useRouter} from "vue-router";
import myAxios from "../plugins/axios.ts";
const router = useRouter();

//
const searchText = ref('');

const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
      {text: '女1', id: '女1'},
      {text: '女2', id: '女2'},
      {text: '女3', id: '女3'},
      {text: '女4', id: '女4'},
      {text: '女5', id: '女5'},
      {text: '女6', id: '女6'},
      {text: '女7', id: '女7'},
      {text: '女8', id: '女8'},
      {text: '女9', id: '女9'},
      {text: '女10', id: '女10'},
      {text: '女11', id: '女11'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大三', id: '大三'},
      {text: '大四', id: '大四'},
    ],
  },
  {
    text: '专业',
    children: [
      {text: '软件工程', id: '软件工程'},
      {text: '计算机应用', id: '计算机应用'},
    ],
  },
  {
    text: '是否抽烟',
    children: [
      {text: '抽烟', id: '抽烟'},
      {text: '不抽', id: '不抽'},
    ],
  },
  {
    text: '个人习惯',
    children: [
      {text: '裸睡', id: '裸睡'},
      {text: '打舍友', id: '打舍友'},
    ],
  },
  {
    text: '方向',
    children: [
      {text: '考研', id: '考研'},
      {text: '考公', id: '考公'},
      {text: '就业', id: '就业'},
      {text: 'java', id: 'java'},
      {text: 'python', id: 'python'},
    ],
  },
  {
    text: '竞赛',
    children: [
      {text: 'ACM', id: 'ACM'},
      {text: '蓝桥杯', id: '蓝桥杯'},
    ],
  },
];
//标签列表
let tagList = ref(originTagList);
/**
 *  搜索过滤
 * @param val
 */
const onSearch = (val) => {
  //1 取出来每个列表的children 拼接成大数组（flatMap）  然后再过滤
  // activeIds.value= tagItems
  //     .flatMap(parseTag=>parseTag.children)
  //     .filter(item=>item.text.includes(searchText.value))

  //2 使用forEach循环遍历tagItems数组中的每个parentTag对象。
  // 对于每个parentTag对象，它的children属性将被过滤。
  // 过滤的条件是对于children数组中的每个item对象，
  // 只保留item.text包含searchText.value的项。
  // 最终，parentTag的children属性将被更新为过滤后的结果。
  // tagItems
  //     .forEach(parentTag => {
  //       // 对每个parentTag的children进行过滤
  //       parentTag.children = parentTag.children.filter(
  //           item => item.text.includes(searchText.value)
  //       )
  //     })

  // 将原始的标签列表复制到一个临时变量中
  tagList.value = originTagList.map(parentTag => {
    // 复制父级标签对象
    const tempParentTag = {...parentTag};
    // 复制子级标签数组
    const tempChildren = [...parentTag.children];
    // 使用搜索关键字过滤子级标签数组
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  })
};

//取消  清空
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};


//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);


//关闭标签
const doclose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

//执行搜索
const doSearchResult = () => {
   router.push({
    path: "/user/list",
    query: {
      //已选中的标签
      tags:activeIds.value
    }
  })
}

</script>

<style scoped>

</style>