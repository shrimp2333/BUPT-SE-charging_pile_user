import { ElMessage } from "element-plus";

const peak_rate = 1;
const normal_rate = 0.7;
const off_peak_rate = 0.4;
const server_fee = 0.8;
const fast_per_hour = 30
const slow_per_hour = 7

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
    // &start=
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

export function CalculateCurrentCost(start_at: number, time_duration: number, charge_type: number): number {
    if (time_duration <= 0) return 0;
    // console.log(start_at, time_duration, charge_type)
    const start = new Date(start_at * 1000);

    let cur_minute = 60 - start.getMinutes();
    if (time_duration < cur_minute * 60)
        cur_minute = Math.ceil(time_duration / 60);
    console.log(cur_minute)
    // 计算当前小时的费用
    let total_cost = GetCurrentPrice(start.getHours()) * (cur_minute) * (charge_type == 1 ? fast_per_hour : slow_per_hour) / 60;
    return total_cost + CalculateCurrentCost(start_at + cur_minute * 60, time_duration - cur_minute * 60, charge_type);
}

function GetCurrentPrice(current_time: number): number {
    if ((current_time >= 10 && current_time < 15) || (current_time >= 18 && current_time < 21))
        return peak_rate + server_fee
    else if ((current_time >= 7 && current_time < 10) || (current_time >= 15 && current_time < 18) || (current_time >= 21 && current_time < 23))
        return normal_rate + server_fee
    return off_peak_rate + server_fee
}


