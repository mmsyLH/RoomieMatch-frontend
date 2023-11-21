// 1. 定义路由组件.
// 也可以从其他文件导入
import Index from "../pages/Index.vue"
import Team from "../pages/Team.vue";
import User from "../pages/User.vue";
import Talk from "../pages/Talk.vue";
import SearchPages from "../pages/SearchPages.vue";


// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {path: '/', component: Index},
    {path: '/team', component: Team},
    {path: '/user', component: User},
    {path: '/talk', component: Talk},
    {path: '/search', component: SearchPages},
]

export default routes;