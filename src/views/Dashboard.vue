<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{ name }}</div>
                            <div>{{ role }}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2019-11-01</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>东莞</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <template #header>
                        <div class="clearfix">
                            <span>充电记录</span>
                        </div>
                    </template>
                    Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-user-solid grid-con-icon"></i>
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
                                <i class="el-icon-message-solid grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>电池容量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-s-goods grid-con-icon"></i>
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
                        <el-tab-pane :label="`请求充电`" name="first">
                            <div class="tab-container-charge">
                                <div class="tab-container-charge-sub">
                                    <el-table :data="chargeSteps" :show-header="true" style="width: 100%;">
                                        <el-table-column prop="step" label="充电步骤" :align="`center`"></el-table-column>
                                    </el-table>
                                </div>
                                <div class="tab-container-charge-sub">
                                    <el-form :label-position="labelPosition" label-width="80px" :model="chargeForm">
                                        <div class="form-content">
                                            <el-form-item label="模式" style="font-size: 20px;">
                                                <el-select v-model="chargeForm.mode" placeholder="请选择充电模式">
                                                    <el-option label="⚡快充" value="fast"></el-option>
                                                    <el-option label="🌞慢充" value="slow"></el-option>
                                                </el-select>
                                            </el-form-item>
                                            <el-form-item label="充电量">
                                                <el-input v-model.number="chargeForm.quantity" placeholder="请输入充电电量"
                                                    :min="0" type="number" style="width: 100%"></el-input>
                                            </el-form-item>
                                            <el-form-item>
                                                <el-button type="primary"
                                                    style="margin-left: 25%; font-size: 20px; width: 50%;"
                                                    size="large">开充</el-button>
                                            </el-form-item>
                                        </div>
                                    </el-form>
                                </div>
                                <div class="tab-container-charge-sub">
                                    <el-table :data="costRules" :show-header="true" height="250" style="width: 100%;">
                                        <el-table-column prop="rule" label="计费规则" header-align="center"></el-table-column>
                                    </el-table>

                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="`修改请求`" name="second">
                            <div class="tab-container-charge">
                                <el-form :label-position="labelPosition" label-width="80px" :model="chargeForm">
                                    <div class="form-content">
                                        <el-form-item label="模式" style="font-size: 20px;">
                                            <el-select v-model="chargeForm.mode" placeholder="请选择充电模式">
                                                <el-option label="⚡快充" value="fast"></el-option>
                                                <el-option label="🌞慢充" value="slow"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="充电量">
                                            <el-input v-model.number="chargeForm.quantity" placeholder="请输入充电电量" :min="0"
                                                type="number" style="width: 100%"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" style="margin-left: 25%; font-size: 20px; width: 50%;"
                                                size="large">开充</el-button>
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane :label="`取消充电`" name="third">
                            <div class="tab-container-charge">
                                <el-form :label-position="labelPosition" label-width="80px" :model="chargeForm">
                                    <div class="form-content">
                                        <el-form-item label="模式" style="font-size: 20px;">
                                            <el-select v-model="chargeForm.mode" placeholder="请选择充电模式">
                                                <el-option label="⚡快充" value="fast"></el-option>
                                                <el-option label="🌞慢充" value="slow"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="充电量">
                                            <el-input v-model.number="chargeForm.quantity" placeholder="请输入充电电量" :min="0"
                                                type="number" style="width: 100%"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" style="margin-left: 25%; font-size: 20px; width: 50%;"
                                                size="large">开充</el-button>
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from "vue-schart";
import { ref, reactive } from "vue";
import { ElTable } from "element-plus";
export default {
    name: "dashboard",
    components: { Schart, ElTable },
    setup() {
        const chargeTabs = ref("first");
        const name = localStorage.getItem("ms_username");
        const role = name === "admin" ? "超级管理员" : "普通用户";

        const data = reactive([
            {
                name: "2018/09/04",
                value: 1083,
            },
            {
                name: "2018/09/05",
                value: 941,
            },
            {
                name: "2018/09/06",
                value: 1139,
            },
            {
                name: "2018/09/07",
                value: 816,
            },
            {
                name: "2018/09/08",
                value: 327,
            },
            {
                name: "2018/09/09",
                value: 228,
            },
            {
                name: "2018/09/10",
                value: 1065,
            },
        ]);
        const options = {
            type: "bar",
            title: {
                text: "最近一周各品类销售图",
            },
            xRorate: 25,
            labels: ["周一", "周二", "周三", "周四", "周五"],
            datasets: [
                {
                    label: "家电",
                    data: [234, 278, 270, 190, 230],
                },
                {
                    label: "百货",
                    data: [164, 178, 190, 135, 160],
                },
                {
                    label: "食品",
                    data: [144, 198, 150, 235, 120],
                },
            ],
        };
        const options2 = {
            type: "line",
            title: {
                text: "最近几个月各品类销售趋势图",
            },
            labels: ["6月", "7月", "8月", "9月", "10月"],
            datasets: [
                {
                    label: "家电",
                    data: [234, 278, 270, 190, 230],
                },
                {
                    label: "百货",
                    data: [164, 178, 150, 135, 160],
                },
                {
                    label: "食品",
                    data: [74, 118, 200, 235, 90],
                },
            ],
        };
        const todoList = reactive([
            {
                title: "今天要修复100个bug",
                status: false,
            },
            {
                title: "今天要修复100个bug",
                status: false,
            },
            {
                title: "今天要写100行代码加几个bug吧",
                status: false,
            },
            {
                title: "今天要修复100个bug",
                status: false,
            },
            {
                title: "今天要修复100个bug",
                status: true,
            },
            {
                title: "今天要写100行代码加几个bug吧",
                status: true,
            },
        ]);
        const chargeForm = reactive({
            mode: "",
            quantity: 0,
        });
        const chargeSteps = reactive([
            { step: "提交充电请求" },
            { step: "等待系统分配排队号" },
            { step: "进入等待区等待叫号" },
            { step: "进入充电区进入待充电队列" },
        ])
        const costRules = reactive([
            { rule: "总费用=充电费+服务费" },
            { rule: "充电费=单位电价*充电度数" },
            { rule: "服务费=服务费单价*充电度数" },
            // { rule: "单位电价：" },
            { rule: "  峰时(1.0 元/度 10:00~15:00 18:00~21:00)" },
            { rule: "  平时(0.7 元/度 7:00~10:00 15:00~18:00 21:00~23:00)" },
            { rule: "  谷时(0.4 元/度 23:00~次日7:00)" },
            { rule: "服务费单价：0.8 元/度" },
        ])

        return {
            name,
            data,
            options,
            options2,
            todoList,
            role,
            chargeForm,
            labelPosition: "right",
            chargeTabs,
            chargeSteps,
            costRules,
        };
    },
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

.form-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
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
    color: rgb(45, 140, 240);
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

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
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
