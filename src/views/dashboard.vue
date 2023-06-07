<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="mgb20" style="height: 252px">
					<div class="user-info">
						<el-avatar :size="120" :src="imgurl" />
						<div class="user-info-cont">
							<div class="user-info-name">{{ user_data.user_name }}</div>
							<div>{{ role }}</div>
						</div>
					</div>
					<div class="user-info-list">
						邮箱：
						<span>{{ user_data.email }}</span>
					</div>
					<div class="user-info-list">
						车型：
						<span>{{ user_data.car_type }}</span>
					</div>
				</el-card>
				<el-card shadow="hover" style="height:500px;">
					<el-table :data="chargeHistory" height="460" style="width: 100%"
						:default-sort="{ prop: 'end_time', order: 'descending' }">
						<el-table-column type="expand">
							<template #default="props">
								<el-card shadow="hover" style="background-color: rgb(240, 250, 250);">
									<el-form label-position="left" inline class="demo-table-expand">
										<el-row style="margin-bottom: -4%;">
											<el-col :span="12">
												<el-form-item label="充电桩id  ">
													<span>{{ props.row.charging_pile_id }}</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<!-- <el-form-item label="  ">
													<span>{{ props.row.charging_pile_id }}</span>
												</el-form-item> -->
											</el-col>
										</el-row>
										<el-row style="margin-bottom: -4%;">
											<el-col :span="12">
												<el-form-item label="订单状态">
													<span>{{ (props.row.status === 1 ? "正在进行" : "已完成") }}</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="生成时间">
													<span>{{ formatUnixTimestamp(props.row.generate_time) }}</span>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row style="margin-bottom: -4%;">
											<el-col :span="12">
												<el-form-item label="开始时间">
													<span>{{ formatUnixTimestamp(props.row.start_time) }}</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="结束时间">
													<span>{{ formatUnixTimestamp(props.row.end_time) }}</span>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row style="margin-bottom: -4%;">
											<el-col :span="12">
												<el-form-item label="总费用  ">
													<span>{{ props.row.total_fee }}</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="充电量">
													<span>{{ props.row.charging_power }}</span>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row style="margin-bottom: -4%;">
											<el-col :span="12">
												<el-form-item label="充电费用">
													<span>{{ props.row.charging_fee }}</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="服务费用">
													<span>{{ props.row.service_fee }}</span>
												</el-form-item>
											</el-col>
										</el-row>
									</el-form>
								</el-card>
							</template>
						</el-table-column>
						<el-table-column label="充电桩号" prop="charging_pile_id" sortable> </el-table-column>
						<el-table-column label="充电量" prop="charging_power" sortable>
							<template #default="props">
								<el-tag type="success">{{ props.row.charging_power }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="总费用" prop="total_fee" sortable>
							<template #default="props">
								<el-tag style="color: orange;">{{ props.row.charging_fee }}</el-tag>
							</template> </el-table-column>
						<el-table-column label="充电时间" prop="end_time" width="200%" sortable>
							<template #default="props">
								{{ formatUnixTimestamp(props.row.end_time) }}
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-row :gutter="20" class="mgb20">
					<el-col :span="8">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-1">
								<i class="el-icon-user-solid grid-con-icon">
									<el-icon class="el-icon-s-goods grid-con-icon">
										<postcard />
									</el-icon>
								</i>
								<div class="grid-cont-right">
									<div class="grid-num">{{ user_data.license_plate }}</div>
									<div>车牌号</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-2">
								<i class="el-icon-message-solid grid-con-icon">
									<el-icon class="el-icon-user-solid grid-con-icon">
										<coin />
									</el-icon>
								</i>
								<div class="grid-cont-right">
									<div class="grid-num">{{ user_data.battery_capacity }}/KWH</div>
									<div>电池容量</div>
								</div>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card shadow="hover" :body-style="{ padding: '0px' }">
							<div class="grid-content grid-con-3">
								<i class="el-icon-s-goods grid-con-icon">
									<el-icon class="el-icon-s-goods grid-con-icon">
										<timer />
									</el-icon>
								</i>
								<div class="grid-cont-right">
									<div class="grid-num">{{ waittingNum }}</div>
									<div>排队号</div>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-card shadow="hover" style="height:403px;">
					<el-tabs v-model="chargeTabs" :stretch="true" tab-position="top">
						<el-tab-pane :label="`发起订单`" name="first">
							<div class="tab-container-charge">
								<div class="tab-container-charge-sub">
									<el-form label-width="80px" :model="chargeForm">
										<div class="form-content">
											<el-form-item label="模式" style="font-size: 20px;">
												<el-select v-model="chargeForm.mode" placeholder="请选择充电模式"
													@change="onChargeFormInput">
													<el-option label="⚡快充(30度/h)" value="fast"></el-option>
													<el-option label="🌞慢充(7度/h)" value="slow"></el-option>
												</el-select>
											</el-form-item>
											<el-form-item label="充电电量">
												<el-input v-model="chargeForm.quantity" :min="0" :max="9999999"
													:placeholder="chargeFormHoler.QuantityHolder" type="number"
													@input="onChargeFormInput" :disabled="!chargeForm.custom"><template
														#prepend>度数:</template>
												</el-input>
											</el-form-item>
											<el-form-item label="预计时长">
												<el-input v-model.number="chargeForm.timeHour"
													:placeholder="chargeFormHoler.TimeHolder" :min="0" type="number"
													style="width: 100%" :disabled="true"
													@input="onChargeFormInput"><template #prepend>小时:</template></el-input>
												<el-input v-model.number="chargeForm.timeMinute"
													:placeholder="chargeFormHoler.TimeHolder" :min="0" :max="59"
													type="number" style="width: 100%" :disabled="true"
													@input="onChargeFormInput"><template #prepend>分钟:</template></el-input>
											</el-form-item>
											<el-form-item>
												<el-switch v-model="chargeForm.custom" inactive-color="#13ce66"
													active-text="自定义充电电量" inactive-text="一键充满"
													@click="onSwitchChange(chargeForm.custom)"></el-switch>
											</el-form-item>
											<el-form-item>
												<el-button type="primary"
													style="margin-left: 0%; font-size: 20px; width: 50%;" size="large"
													@click="onPostChargeRequest">开充</el-button>
											</el-form-item>
										</div>
									</el-form>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane :label="`当前订单`" name="second">
							<!-- TODO: 完善逻辑 -->
							<el-card shadow="hover">
								<el-row style="margin-bottom: 0%;">
									<el-col :span="6">充电桩号:
										<span style="color: blue;">
											{{ curStatus.state === -1 ? "暂无进行中的订单" : curStatus.charging_pile_id }}
										</span>
									</el-col>
									<el-col :span="6">等待人数:
										<span style="color: rgba(2, 195, 47, 0.668);">
											{{ curStatus.state === -1 ? "暂无进行中的订单" : curStatus.cars_num_in_front }}
										</span>
									</el-col>
									<el-col :span="6">充电模式:
										<span style="color: red;">
											{{ curStatus.state === -1 ? "暂无进行中的订单" : curStatus.charging_type === 1 ?
												"⚡快充模式" : "慢充模式" }}
										</span>
									</el-col>
									<el-col :span="6">充电时间:
										<span style="color: orange;">
											{{ curStatus.state === -1 ? "暂无进行中的订单"
												: curStatus.charging_time === undefined ? "正在充电" :
													Math.round(curStatus.charging_time / 60) + " min" }}
										</span>
									</el-col>
								</el-row>
								<el-row style="margin-bottom: 0%; margin-top: 1%;">
									<el-col :span="6">充电电量:
										<span style="color: blue;">
											{{ curStatus.state === -1 ? "暂无进行中的订单" : curStatus.charging_time === undefined ?
												"正在充电" :
												(Math.round(curStatus.charging_time * (curStatus.charging_type === 0 ? 7 : 30))
													/ 3600).toFixed(2) + "度" }}
										</span>
									</el-col>
									<el-col :span="6">充电费用:
										<span style="color: blue;">
											{{ curStatus.state === -1 ? "暂无进行中的订单" :
												(curStatus.charging_time === undefined || curStatus.start_time === undefined
													|| curStatus.charging_type === undefined) ? "unknown" :
													CalculateCurrentCost(curStatus.start_time, curStatus.charging_time,
														curStatus.charging_type).toFixed(2) + "元" }}
										</span>
									</el-col>
								</el-row>
							</el-card>
							<el-steps :active="curStatus.state + (curStatus.state > 1 ? 1 : 1)" align-center
								finish-status="success" style="margin-top: 2%;"
								@change="onChargeStatusChange(curStatus.state + 1)">
								<el-step title="提交充电请求" description="提交充电请求等待进入排队"></el-step>
								<el-step title="等候区等待" description="在等待区等待叫号，准备进入充电区"></el-step>
								<!-- <el-step title="充电区等待" description="在充电区等待前方车辆充电完毕，准备进行充电"></el-step> -->
								<el-step title="等待充电" description="在充电区等待前方车辆充电完毕"></el-step>
								<el-step title="充电完成" description="充电结束，用户可以自行离开"></el-step>
							</el-steps>
							<el-row style="margin-top: 1%;"></el-row>
							<el-button type="primary" style="margin-left: 25%; font-size: 20px; width: 10%;" size="large"
								@click="onChangeOrder">修改订单</el-button>
							<el-button type="danger" style="margin-left: 25%; font-size: 20px; width: 10%;" size="large"
								@click="onCancelOrder">取消订单</el-button>
						</el-tab-pane>
					</el-tabs>
				</el-card>
				<el-Card style="text-align: center; margin-top: 1%; height:235px; ">
					<span style="color: orange;">计费规则</span>
					<div class="tab-container-charge-sub">
						<el-table :data="costRules" :show-header="false" height="200" style="width: 100%;">
							<el-table-column prop="rule" label="计费规则" header-align="center"></el-table-column>
						</el-table>
					</div>
				</el-Card>

			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-card shadow="hover" style="width: 100%;">
				<schart ref="bar" class="schart" canvasId="bar" :options="chargePrice"></schart>
			</el-card>
		</el-row>
		<!-- 对话框组件 -->
		<el-dialog title="提示" v-model="requestChangeDialog" width="30%" center>
			<el-form :model="changeChargeRequestForm">
				<el-form-item label="修改内容" style="font-size: 20px;">
					<el-select v-model="changeChargeRequestForm.changeContent" placeholder="请选择要修改的内容"
						@change="onChangeContentChange">
						<el-option label="充电模式" value="mode"></el-option>
						<el-option label="充电电量" value="time"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择模式" style="font-size: 20px;">
					<el-select v-model="changeChargeRequestForm.mode" placeholder="请选择充电模式"
						:disabled="!changeChargeRequestForm.isChangeMode">
						<el-option label="⚡快充(30度/h)" value="fast"></el-option>
						<el-option label="🌞慢充(7度/h)" value="slow"></el-option>
					</el-select>
				</el-form-item>
				<el-input v-model.number="changeChargeRequestForm.quantity" :placeholder="`请输入充电电量`" :min="0" :max="9999999"
					type="number" style="width: 100%" :disabled="changeChargeRequestForm.isChangeMode"
					@input="onChangeContentChange"><template #prepend>电量(度):</template></el-input>
			</el-form>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="requestChangeDialog = false">取 消</el-button>
					<el-button type="primary" @click="onChangeOrderPost">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="dashboard">
import Schart from 'vue-schart';
import { reactive, ref } from 'vue';
import imgurl from '../assets/img/img.jpg';
import { ElCard, ElMessage, ElMessageBox, ElTable } from "element-plus";
import { useData } from 'element-plus/es/components/table-v2/src/composables';
import { usePermissStore } from '../store/permiss';
import { GetBaseInfoWhenLogin } from '../store/baseinfo';
import { CalculateCurrentCost } from '../store/baseinfo';


interface ChargeForm {
	mode: string;
	timeHour: number | null;
	timeMinute: number | null;
	timeSecond: number | null;
	quantity: number | null;
	custom: boolean;
}

interface ChangeChargeRequestForm {
	mode: string;
	timeHour: number | null;
	timeMinute: number | null;
	quantity: number | null;
	changeContent: string;
	isChangeMode: boolean;
}


interface ChargePrice {
	type: string;
	title: {
		text: string;
	};
	labels: string[];
	datasets: {
		label: string;
		data: number[];
	}[];
	yEqual: number;
}

interface ChargeFormHoler {
	TimeHolder: string;
	QuantityHolder: string;
	Quantity: number | null;
}

interface UserData {
	user_id: string;
	user_name: string;
	email: string;
	license_plate: string;
	car_type: string;
	battery_capacity: number;
	created_at: number;
	updated_at: number;
}

interface Log {
	/**
	 * 充电经过的时间，充电经过的时间
	 */
	charging_duration: number;
	/**
	 * 充电费用，充电费用（电费）
	 */
	charging_fee: number;
	/**
	 * 充电桩id，充电桩id
	 */
	charging_pile_id: number;
	/**
	 * 充电量，充电量
	 */
	charging_power: number;
	/**
	 * 详单id，充电详单的id
	 */
	detail_id: number;
	/**
	 * 结束时间，结束时间
	 */
	end_time: number;
	/**
	 * 订单生成的时间，可以认为是用户提交充电请求的时间，存储为时间戳
	 */
	generate_time: number;
	/**
	 * 服务费用，服务费用
	 */
	service_fee: number;
	/**
	 * 充电开始的时间，充电开始的时间
	 */
	start_time: number;
	/**
	 * 订单当前的状态，如果是正在进行则为1，已经完成则为0
	 */
	status: number;
	/**
	 * 总费用
	 */
	total_fee: number;
	/**
	 * 用户id，用户id
	 */
	user_id: string;
}

interface CurChargeStatus {
	charging_pile_id?: number;
	charging_time?: number;
	charging_type?: number;
	created_at?: number;
	queue_num?: string;
	request_time?: number;
	start_time?: number;
	state: number;
	time_duration?: number;
	cars_num_in_front?: number;
}

const chargePrice: ChargePrice = {
	type: "line",
	title: {
		text: "不同时段的充电单价",
	},
	labels: [],
	datasets: [
		{
			label: "充电单价(元/度)",
			data: [],
		},
		{
			label: "服务费单价(元/度)",
			data: [],
		},
	],
	yEqual: 2,
};

for (let i = 0; i < 24; i++) {
	chargePrice.labels.push(i.toString() + ":00-" + i.toString() + ":59");
	chargePrice.datasets[0].data.push(i.valueOf() < 7 || i.valueOf() >= 23 ? 0.4 : i.valueOf() < 10 || i.valueOf() > 15 ? 0.7 : 1.0);
	chargePrice.datasets[1].data.push(0.8);
}

const chargeForm: ChargeForm = reactive({
	mode: "",
	timeHour: null,
	timeMinute: null,
	timeSecond: null,
	quantity: null,
	custom: true,
});

const changeChargeRequestForm: ChangeChargeRequestForm = reactive({
	mode: "",
	timeHour: null,
	timeMinute: null,
	changeContent: "",
	isChangeMode: false,
	quantity: null,
});

const costRules = reactive([
	{ rule: "总费用 = 充电费 + 服务费" },
	{ rule: "充电费 = 单位电价 * 充电度数" },
	{ rule: "服务费 = 服务费单价 * 充电度数" },
	{ rule: "  峰时(1.0 元/度 10:00~15:00 18:00~21:00)" },
	{ rule: "  平时(0.7 元/度 7:00~10:00 15:00~18:00 21:00~23:00)" },
	{ rule: "  谷时(0.4 元/度 23:00~次日7:00)" },
	{ rule: "服务费单价：0.8 元/度" },
]);

const chargeHistory = reactive<Log[]>([]);

const chargeFormHoler: ChargeFormHoler = reactive({
	QuantityHolder: chargeForm.custom ? "请输入充电电量" : "已选择一键充满",
	TimeHolder: chargeForm.custom ? "请先选择充电模式和充电电量" : "已选择一键充满",
	Quantity: null,
})

const user_data = reactive<UserData>({
	user_id: "1",
	user_name: "user007",
	email: "123@gmail.com",
	license_plate: "TS1234",
	car_type: "教练车",
	battery_capacity: 321,
	created_at: 123456789,
	updated_at: 123456789,
});


async function QueryChargeStatus(token: string) {
	// refreshUserInfo()
	if (localStorage.getItem("ms_token") === null || localStorage.getItem("ms_token") === undefined || localStorage.getItem("ms_token") === "") {
		return;
	}

	const resp = await fetch("/user/charge/info?token=" + token, {
		method: "GET",
	}).then(async res => JSON.parse(await res.text()));

	console.log(resp)
	if (resp.code !== 200) {
		ElMessage.error(resp.msg);
		return;
	}

	// console.log(resp)
	curStatus.state = resp.data.state;
	curStatus.charging_pile_id = resp.data.charging_pile_id;
	curStatus.charging_time = resp.data.charging_time;
	curStatus.charging_type = resp.data.charging_type;
	curStatus.created_at = resp.data.created_at;
	curStatus.queue_num = resp.data.queue_num;
	curStatus.request_time = resp.data.request_time;
	curStatus.start_time = resp.data.start_time;
	curStatus.time_duration = resp.data.time_duration;
	curStatus.cars_num_in_front = resp.data.cars_num_in_front;
}

function refreshUserInfo() {
	const user_info_str = localStorage.getItem("ms_user_info")
	if (user_info_str !== null) {
		const user_info = JSON.parse(user_info_str)
		user_data.user_id = user_info.user_id
		user_data.user_name = user_info.username
		user_data.email = user_info.email
		user_data.license_plate = user_info.license_plate
		user_data.car_type = user_info.car_type
		user_data.battery_capacity = user_info.battery_capacity
		user_data.created_at = user_info.created_at
		user_data.updated_at = user_info.updated_at
	}
}

async function refreshHistoryInfo(tokenStr: string) {
	if (localStorage.getItem("ms_token") === null || localStorage.getItem("ms_token") === undefined || localStorage.getItem("ms_token") === "") {
		return;
	}
	// 获取历史订单
	const resp_history = await fetch("/user/log/get?token=" + tokenStr, {
		method: "GET",
	}).then(async res => JSON.parse(await res.text()));
	console.log(resp_history)
	// console.log(resp_history.msg)
	if (resp_history.code != 200) {
		ElMessage.error(resp_history.msg);
		return false;
	}
	localStorage.setItem("ms_charge_history", JSON.stringify(resp_history.log))

	chargeHistory.splice(0, chargeHistory.length)
	const charge_history_json = resp_history.log
	if (charge_history_json.length === 0) {
		return
	}
	charge_history_json.forEach((item: any) => {
		chargeHistory.push(item)
	})
}

const chargeTabs = ref("first");
const name = localStorage.getItem("ms_username");
const role = "等级: " + (name === "admin" ? "超级管理员" : "普通用户");
const waittingNum = ref("尚未进入排队队列")
const tokenStr = localStorage.getItem("ms_token")
const curStatus = reactive<CurChargeStatus>({
	state: -1,
});
const timeInterval = 2000;
const requestChangeDialog = ref<boolean>(false);
const timeId = setInterval(() => QueryChargeStatus(tokenStr === null ? "" : tokenStr), timeInterval);
// const timeid = setInterval(() => refreshHistoryInfo(tokenStr === null ? "" : tokenStr), 5000);
refreshUserInfo();
refreshHistoryInfo(tokenStr === null ? "" : tokenStr);


function formatUnixTimestamp(unixTimestamp: number): string {
	const date = new Date(unixTimestamp * 1000); // 将 Unix 时间戳转换为毫秒级时间戳
	const formattedDate = date.toLocaleString(); // 使用默认的日期和时间格式进行格式化
	return formattedDate;
}

const isEmpty = (str: any): boolean => {
	if (str === null || str === '' || str === undefined || str.length === 0) {
		return true;
	} else {
		return false;
	}
};

const onChargeStatusChange = (status: number) => {
	if (status == 0) {
		waittingNum.value = "尚未进入排队队列"
	} else if (status == 1) {
		waittingNum.value = curStatus.queue_num === undefined ? "正在等待" : curStatus.queue_num
	}
	else if (status == 3) {
		waittingNum.value = "正在充电"
	} else if (status == 4) {
		waittingNum.value = "尚未进入排队队列"
	}
}

const onSwitchChange = (on: boolean) => {
	if (on) {
		chargeForm.timeHour = null;
		chargeForm.timeMinute = null;
		chargeFormHoler.Quantity = null;
		chargeFormHoler.QuantityHolder = "请输入充电电量";
		chargeFormHoler.TimeHolder = "请先选择充电模式和充电时长";
	} else {
		chargeForm.timeHour = null;
		chargeForm.timeMinute = null;
		chargeForm.quantity = null;
		chargeFormHoler.Quantity = null;
		chargeFormHoler.TimeHolder = "已选择一键充满";
		chargeFormHoler.QuantityHolder = "已选择一键充满";
	}
};


const onChargeFormInput = () => {
	if (!isEmpty(chargeForm.quantity) && chargeForm.quantity != null) {
		if (chargeForm.quantity < 0)
			chargeForm.quantity = 0;
		else if (chargeForm.quantity > 9999999)
			chargeForm.quantity = 9999999;
	}

	if (chargeForm.mode === "fast") {
		if (!isEmpty(chargeForm.quantity) && chargeForm.quantity != null) {
			chargeFormHoler.TimeHolder = "请输入充电时长";
			chargeFormHoler.QuantityHolder = "已选择充电电量";
			chargeForm.timeSecond = Math.ceil(chargeForm.quantity * 3600 / 30);
			chargeForm.timeHour = Math.floor(chargeForm.timeSecond / 3600);
			chargeForm.timeMinute = Math.floor((chargeForm.timeSecond - chargeForm.timeHour * 3600) / 60);
		} else {
			chargeFormHoler.TimeHolder = "请输入充电电量";
			chargeFormHoler.QuantityHolder = "请先选择充电模式和充电时长";
			chargeForm.timeHour = null;
			chargeForm.timeMinute = null;
		}
	} else if (chargeForm.mode === "slow") {
		if (!isEmpty(chargeForm.quantity) && chargeForm.quantity != null) {
			chargeFormHoler.TimeHolder = "请输入充电电量";
			chargeFormHoler.QuantityHolder = "已选择充电电量";
			chargeForm.timeSecond = Math.ceil(chargeForm.quantity * 3600 / 7);
			chargeForm.timeHour = Math.floor(chargeForm.timeSecond / 3600);
			chargeForm.timeMinute = Math.floor((chargeForm.timeSecond - chargeForm.timeHour * 3600) / 60);
		} else {
			chargeFormHoler.TimeHolder = "请先选择充电模式和充电时长";
			chargeFormHoler.QuantityHolder = "请输入充电电量";
			chargeForm.timeHour = null;
			chargeForm.timeMinute = null;
		}
	}
};

const onChangeContentChange = () => {
	changeChargeRequestForm.isChangeMode = changeChargeRequestForm.changeContent === 'mode';
	if (changeChargeRequestForm.isChangeMode) {
		changeChargeRequestForm.quantity = null;
	} else {
		changeChargeRequestForm.mode = "";
	}
	if (!isEmpty(changeChargeRequestForm.quantity) && changeChargeRequestForm.quantity != null) {
		if (changeChargeRequestForm.quantity > 9999999)
			changeChargeRequestForm.quantity = 9999999;
		else if (changeChargeRequestForm.quantity < 0)
			changeChargeRequestForm.quantity = 0;
	}
};

const onPostChargeRequest = () => {
	if (!isEmpty(chargeForm.mode) && (!chargeForm.custom || (!isEmpty(chargeForm.timeHour) && !isEmpty(chargeForm.timeMinute) && !isEmpty(chargeForm.quantity)))) {
		const info: string = "充电模式: " + (chargeForm.mode === "fast" ? "快充" : "慢充") +
			"<br/>充电时长: " + (chargeForm.custom ? chargeForm.timeHour + "小时" + chargeForm.timeMinute + "分钟" : "充满为止") +
			"<br/>预计电量: " + (chargeForm.custom ? chargeForm.quantity + "度" : "充满为止");
		ElMessageBox.confirm(info, '确认订单信息', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			dangerouslyUseHTMLString: true,
			type: 'warning',
		}).then(async () => {
			const data = new FormData();
			data.append("mode", chargeForm.mode === "slow" ? '0' : '1');

			if (chargeForm.custom && chargeForm.timeSecond != null)
				data.append("time", ((chargeForm.timeSecond.toString())));
			else
				data.append("time", "-1")

			const resp = await fetch("/user/charge/apply?token=" + tokenStr, {
				method: "POST",
				body: data,
			}).then(async res => JSON.parse(await res.text()));

			ElMessage({
				type: "success",
				message: resp.msg,
			});
			// waittingNum.value = resp.data
		}).catch(() => {
			ElMessage({
				type: 'info',
				message: '未发起充电请求',
			});
		})
	} else {
		ElMessageBox.confirm('请先填写订单信息', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning',
		})
	}
}

const onChangeOrder = () => {
	if (curStatus.state !== 0) {
		ElMessage({
			type: 'info',
			message: '暂无进行中的订单或已进入充电区，订单无法修改，只能取消',
		});
		return
	}
	requestChangeDialog.value = true;
};

const onChangeOrderPost = async () => {
	const data = new FormData();
	if (changeChargeRequestForm.isChangeMode)
		data.append("mode", changeChargeRequestForm.mode === "slow" ? '0' : '1');
	else if (changeChargeRequestForm.timeHour != null && changeChargeRequestForm.timeMinute != null)
		data.append("time", ((changeChargeRequestForm.timeHour * 60 + changeChargeRequestForm.timeMinute) * 60).toString());

	const resp = await fetch("/user/charge/modify?token=" + tokenStr, {
		method: "POST",
		body: data,
	}).then(async res => JSON.parse(await res.text()));

	if (resp.code !== 200) {
		ElMessage({
			type: 'error',
			message: resp.msg,
		});
		return
	}
	ElMessage({
		type: 'success',
		message: resp.msg,
	});
	requestChangeDialog.value = false;
	changeChargeRequestForm.mode = "";
	changeChargeRequestForm.quantity = null;
	changeChargeRequestForm.changeContent = "";

}

const onCancelOrder = () => {
	ElMessageBox.confirm('取消订单后再次发出请求需要重新排队, 是否继续?', '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(async () => {

		const resp = await fetch("/user/charge/cancel?token=" + tokenStr, {
			method: "POST",
		}).then(async res => JSON.parse(await res.text()));

		console.log(resp)
		if (resp.code !== 200) {
			ElMessage({
				type: 'error',
				message: resp.msg,
			});
			return
		}

		// waittingNum.value = "尚未进入排队队列"
		ElMessage({
			type: 'success',
			message: resp.msg,
		});
	}).catch(() => {
		ElMessage({
			type: 'info',
			message: '未取消订单',
		});
	});
};

</script>

<style scoped>
.tab-container-charge {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 300px;
	/* 可根据需要调整容器的高度 */
}

.tab-container-charge-sub {
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
}

.el-row {
	margin-bottom: 20px;
}

.grid-content {
	display: flex;
	align-items: center;
	height: 100px;
}

.grid-cont-right {
	flex: 1;
	text-align: center;
	font-size: 14px;
	color: #999;
}

.grid-num {
	font-size: 30px;
	font-weight: bold;
}

.grid-con-icon {
	font-size: 50px;
	width: 100px;
	height: 100px;
	text-align: center;
	line-height: 100px;
	color: #fff;
}

.grid-con-1 .grid-con-icon {
	background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
	color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
	background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
	color: rgb(100, 213, 114);
}

.grid-con-3 .grid-con-icon {
	background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
	color: rgb(242, 94, 67);
}

.user-info {
	display: flex;
	align-items: center;
	padding-bottom: 20px;
	border-bottom: 2px solid #ccc;
	margin-bottom: 20px;
}

.user-info-cont {
	padding-left: 50px;
	flex: 1;
	font-size: 14px;
	color: #999;
}

.user-info-cont div:first-child {
	font-size: 30px;
	color: #222;
}

.user-info-list {
	font-size: 14px;
	color: #999;
	line-height: 25px;
}

.user-info-list span {
	margin-left: 70px;
}

.mgb20 {
	margin-bottom: 20px;
}

.todo-item {
	font-size: 14px;
}

.todo-item-del {
	text-decoration: line-through;
	color: #999;
}

.schart {
	width: 100%;
	height: 300px;
}
</style>
