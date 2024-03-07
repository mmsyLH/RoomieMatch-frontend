import myAxios from "../plugins/axios.ts";
import {getCurrentUserState, setCurrentUserState} from "../states/user.ts";

// 获取当前用户的登录信息
export const getCurrentUser = async () => {
    const currentUser = getCurrentUserState();
    if (currentUser){
        return currentUser;
    }
    //如果不存在 则从远程获取
    const res=await myAxios.get("/user/current");
    if (res.code===200){
        setCurrentUserState(res.data);
        return res.data;
    }
    //否者 返回Null
    return null;
}


