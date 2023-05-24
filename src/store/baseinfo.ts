import { ElMessage } from "element-plus";

export async function GetBaseInfoWhenLogin(token: string) {
    // 获取用户信息
    const resp_info = await fetch("/user/detail?token=" + token, {
        method: "GET",
    }).then(async res => JSON.parse(await res.text()));

    if (resp_info.code != 200) {
        ElMessage.error(resp_info.msg);
        return false;
    }
    console.log(resp_info.msg)
    localStorage.setItem("ms_user_info", JSON.stringify(resp_info.data))

    // 获取历史订单
    const resp_history = await fetch("/user/log/get?token=" + token, {
        method: "GET",
    }).then(async res => JSON.parse(await res.text()));
    console.log(resp_history)
    console.log(resp_history.msg)
    if (resp_history.code != 200) {
        ElMessage.error(resp_history.msg);
        return false;
    }
    localStorage.setItem("ms_charge_history", JSON.stringify(resp_history.log))
    ElMessage.success(resp_history.msg);
}


