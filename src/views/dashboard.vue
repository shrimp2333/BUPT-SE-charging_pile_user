<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover" class="mgb20" style="height: 252px">
					<div class="user-info">
						<el-avatar :size="120" :src="imgurl" />
						<div class="user-info-cont">
							<div class="user-info-name">{{ name }}</div>
							<div>{{ role }}</div>
						</div>
					</div>
					<div class="user-info-list">
						邮箱：
						<span>123456789@gmail.com</span>
					</div>
					<div class="user-info-list">
						车型：
						<span>教练车</span>
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
											<el-col :span="6">
												<el-form-item label="记录id">
													<span>{{ props.row.record_id }}</span>
												</el-form-item>
											</el-col>
											<el-col :span="6">
												<el-form-item label="请求id">
													<span>{{ props.row.request_id }}</span>
												</el-form-item>
											</el-col>
											<el-col :span="6">
												<el-form-item label="充电桩id">
													<span>{{ props.row.charging_station_id }}</span>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row style="margin-bottom: -4%;">
											<el-col :span="12">
												<el-form-item label="开始时间">
													<span>{{ props.row.start_time }}</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="结束时间">
													<span>{{ props.row.end_time }}</span>
												</el-form-item>
											</el-col>
										</el-row>
										<el-row style="margin-bottom: -4%;">
											<el-col :span="12">
												<el-form-item label="总费用">
													<span>{{ props.row.total_fee }}</span>
												</el-form-item>
											</el-col>
											<el-col :span="12">
												<el-form-item label="实际用电量">
													<span>{{ props.row.actual_power }}</span>
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
						<el-table-column label="订单号" prop="request_id" sortable> </el-table-column>
						<el-table-column label="充电量" prop="actual_power" sortable>
							<template #default="props">
								<el-tag type="success">{{ props.row.actual_power }}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="总费用" prop="total_fee" sortable>
							<template #default="props">
								<el-tag style="color: orange;">{{ props.row.charging_fee }}</el-tag>
							</template> </el-table-column>
						<el-table-column label="充电时间" prop="end_time" width="200%" sortable> </el-table-column>
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
									<div class="grid-num">TS1234</div>
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
									<div class="grid-num">321/KWH</div>
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
									<div class="grid-num">5000</div>
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
											<el-form-item label="充电时长">
												<el-input v-model.number="chargeForm.timeHour"
													:placeholder="chargeFormHoler.TimeHolder" :min="0" type="number"
													style="width: 100%" :disabled="!chargeForm.custom"
													@input="onChargeFormInput"><template #prepend>小时:</template></el-input>
												<el-input v-model.number="chargeForm.timeMinute"
													:placeholder="chargeFormHoler.TimeHolder" :min="0" :max="59"
													type="number" style="width: 100%" :disabled="!chargeForm.custom"
													@input="onChargeFormInput"><template #prepend>分钟:</template></el-input>
											</el-form-item>
											<el-form-item label="预计电量">
												<el-input v-model="chargeFormHoler.Quantity"
													:placeholder="chargeFormHoler.QuantityHolder" :disabled="true">
												</el-input>
											</el-form-item>
											<el-form-item>
												<el-switch v-model="chargeForm.custom" inactive-color="#13ce66"
													active-text="自定义充电时长" inactive-text="一键充满"
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
							<el-card shadow="hover">
								<el-row style="margin-bottom: 0%;">
									<el-col :span="8">订单号:
										<span style="color: blue;"> {{ 123465 }} </span>
									</el-col>
									<el-col :span="8">充电模式:
										<span style="color: red;">{{ "⚡快充模式" }}</span>
									</el-col>
									<el-col :span="8">充电时间:
										<span style="color: orange;">{{ 123465 }} min</span>
									</el-col>
								</el-row>
							</el-card>
							<el-steps :active="3" align-center finish-status="success" style="margin-top: 4%;">
								<el-step title="提交充电请求" description="提交充电请求等待进入排队"></el-step>
								<el-step title="等候区等待" description="在等待区等待叫号，准备进入充电区"></el-step>
								<el-step title="充电区等待" description="在充电区等待前方车辆充电完毕，准备进行充电"></el-step>
								<el-step title="充电区充电" description="在充电区进行进行充电，同时开始计费"></el-step>
								<el-step title="结束充电" description="充电结束，用户可以自行离开"></el-step>
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
	</div>
</template>

<script setup lang="ts" name="dashboard">
import Schart from 'vue-schart';
import { reactive, ref } from 'vue';
import imgurl from '../assets/img/img.jpg';
import { ElCard, ElMessage, ElMessageBox, ElTable } from "element-plus";


const chargeTabs = ref("first");
const name = localStorage.getItem("ms_username");
const role = "(等级:)" + (name === "admin" ? "超级管理员" : "普通用户");

interface ChargeForm {
	mode: string;
	timeHour: number | null;
	timeMinute: number | null;
	custom: boolean;
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
	custom: false,
});

const chargeSteps = reactive([
	{ step: "提交充电请求" },
	{ step: "等待系统分配排队号" },
	{ step: "进入等待区等待叫号" },
	{ step: "进入充电区进入待充电队列" },
]);
const costRules = reactive([
	{ rule: "总费用 = 充电费 + 服务费" },
	{ rule: "充电费 = 单位电价 * 充电度数" },
	{ rule: "服务费 = 服务费单价 * 充电度数" },
	{ rule: "  峰时(1.0 元/度 10:00~15:00 18:00~21:00)" },
	{ rule: "  平时(0.7 元/度 7:00~10:00 15:00~18:00 21:00~23:00)" },
	{ rule: "  谷时(0.4 元/度 23:00~次日7:00)" },
	{ rule: "服务费单价：0.8 元/度" },
]);

const chargeHistory = reactive([
	{
		record_id: "1",
		request_id: "1",
		charging_station_id: "1",
		start_time: "2021-05-01 12:00:00",
		end_time: "2021-05-01 12:00:00",
		actual_power: "100",
		service_fee: "10",
		charging_fee: "100",
		total_fee: "110",
	},
	{
		record_id: "2",
		request_id: "2",
		charging_station_id: "2",
		start_time: "2021-05-01 12:00:00",
		end_time: "2021-05-01 12:00:01",
		actual_power: "9100",
		service_fee: "10",
		charging_fee: "1100",
		total_fee: "1110",
	},
	{
		record_id: "3",
		request_id: "3",
		charging_station_id: "3",
		start_time: "2021-05-01 12:00:00",
		end_time: "2021-05-01 12:00:00",
		actual_power: "100",
		service_fee: "10",
		charging_fee: "100",
		total_fee: "110",
	},
	{
		record_id: "4",
		request_id: "4",
		charging_station_id: "4",
		start_time: "2021-05-01 12:00:00",
		end_time: "2021-05-01 12:00:00",
		actual_power: "100",
		service_fee: "10",
		charging_fee: "100",
		total_fee: "110",
	},
	{
		record_id: "5",
		request_id: "5",
		charging_station_id: "5",
		start_time: "2021-05-01 12:00:00",
		end_time: "2021-05-01 12:00:00",
		actual_power: "100",
		service_fee: "10",
		charging_fee: "100",
		total_fee: "110",
	},
	{
		record_id: "6",
		request_id: "6",
		charging_station_id: "6",
		start_time: "2021-05-01 12:00:00",
		end_time: "2021-05-01 12:00:00",
		actual_power: "100",
		service_fee: "10",
		charging_fee: "100",
		total_fee: "110",
	},
	{
		record_id: "7",
		request_id: "7",
		charging_station_id: "7",
		start_time: "2021-05-01 12:00:00",
		end_time: "2021-05-01 12:00:00",
		actual_power: "100",
		service_fee: "10",
		charging_fee: "100",
		total_fee: "110",
	},
	{
		record_id: "8",
		request_id: "8",
		charging_station_id: "8",
		start_time: "2021-05-01 12:00:00",
		end_time: "2021-05-01 12:00:00",
		actual_power: "100",
		service_fee: "10",
		charging_fee: "100",
		total_fee: "110",
	},
	{
		record_id: "9",
		request_id: "9",
		charging_station_id: "9",
		start_time: "2021-05-01 12:00:00",
		end_time: "2021-05-01 12:00:00",
		actual_power: "100",
		service_fee: "10",
		charging_fee: "100",
		total_fee: "110",
	}
]);

const chargeFormHoler: ChargeFormHoler = reactive({
	TimeHolder: chargeForm.custom ? "请输入充电时长" : "已选择一键充满",
	QuantityHolder: chargeForm.custom ? "请先选择充电模式和充电时长" : "已选择一键充满",
	Quantity: null,
})

const isEmpty = (str: any): boolean => {
	if (str === null || str === '' || str === undefined || str.length === 0) {
		return true;
	} else {
		return false;
	}
};

const onSwitchChange = (on: boolean) => {
	if (on) {
		chargeForm.timeHour = null;
		chargeForm.timeMinute = null;
		chargeFormHoler.Quantity = null;
		chargeFormHoler.TimeHolder = "请输入充电时长";
		chargeFormHoler.QuantityHolder = "请先选择充电模式和充电时长";
	} else {
		chargeForm.timeHour = null;
		chargeForm.timeMinute = null;
		chargeFormHoler.Quantity = null;
		chargeFormHoler.TimeHolder = "已选择一键充满";
		chargeFormHoler.QuantityHolder = "已选择一键充满";
	}
};

const onPostChargeRequest = () => {
	if (!isEmpty(chargeForm.mode) && (!chargeForm.custom || (!isEmpty(chargeForm.timeHour) && !isEmpty(chargeForm.timeMinute)))) {
		const info: string = "充电模式: " + (chargeForm.mode === "fast" ? "快充" : "慢充") +
			"<br/>充电时长: " + (chargeForm.custom ? chargeForm.timeHour + "小时" + chargeForm.timeMinute + "分钟" : "充满为止") +
			"<br/>预计电量: " + (chargeForm.custom ? chargeFormHoler.Quantity + "度" : "充满为止");
		ElMessageBox.confirm(info, '确认订单信息', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			dangerouslyUseHTMLString: true,
			type: 'warning',
		}).then(() => {
			ElMessage({
				type: 'success',
				message: '已发起充电请求',
			});
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

const onChargeFormInput = () => {
	if (!isEmpty(chargeForm.timeMinute) && chargeForm.timeMinute != null) {
		if (chargeForm.timeMinute > 59)
			chargeForm.timeMinute = 59;
		else if (chargeForm.timeMinute < 0)
			chargeForm.timeMinute = 0;
	}
	if (!isEmpty(chargeForm.timeHour) && chargeForm.timeHour != null) {
		if (chargeForm.timeHour > 23)
			chargeForm.timeHour = 23;
		else if (chargeForm.timeHour < 0)
			chargeForm.timeHour = 0;
	}
	if (chargeForm.mode === "fast") {
		if (!isEmpty(chargeForm.timeHour) && !isEmpty(chargeForm.timeMinute) && chargeForm.timeMinute != null && chargeForm.timeHour != null)
			chargeFormHoler.Quantity = (chargeForm.timeHour + chargeForm.timeMinute / 60) * 30;
		else
			chargeFormHoler.Quantity = null;
	} else if (chargeForm.mode === "slow") {
		if (!isEmpty(chargeForm.timeHour) && !isEmpty(chargeForm.timeMinute) && chargeForm.timeMinute != null && chargeForm.timeHour != null)
			chargeFormHoler.Quantity = (chargeForm.timeHour + chargeForm.timeMinute / 60) * 7;
		else
			chargeFormHoler.Quantity = null;
	}
};

const onChangeOrder = () => {
	ElMessageBox.confirm('还没写', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(() => {
		ElMessage({
			type: 'success',
			message: '已修改订单',
		});
	}).catch(() => {
		ElMessage({
			type: 'info',
			message: '未修改订单',
		});
	})
};
const onCancelOrder = () => {
	// cancelDialogVisible.value = true;
	ElMessageBox.confirm('取消订单后再次发出请求需要重新排队, 是否继续?', '警告', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(() => {
		ElMessage({
			type: 'success',
			message: '已取消订单',
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
