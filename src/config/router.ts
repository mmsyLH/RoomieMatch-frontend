// 1. 定义路由组件.
// 也可以从其他文件导入
import Index from "../pages/Index.vue"
import Team from "../pages/TeamPages.vue";
import User from "../pages/UserPages.vue";
import Talk from "../pages/TalkPages.vue";
import SearchPages from "../pages/SearchPages.vue";
import SearchResultPages from "../pages/SearchResultPages.vue";
import EditUserPages from "../pages/UserEditPages.vue";



// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {path: '/', component: Index},
    {path: '/team', component: Team},
    {path: '/user', component: User},
    {path: '/talk', component: Talk},
    {path: '/search', component: SearchPages},
    {path: '/user/list', component: SearchResultPages},
    {path: '/user/edit', component: EditUserPages},
]

export default routes;