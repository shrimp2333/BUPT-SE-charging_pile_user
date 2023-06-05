<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="8">
				<el-card shadow="hover">
					<template #header>
						<div class="clearfix">
							<span>个人简介</span>
						</div>
					</template>
					<div class="info">
						<div class="info-image" @click="showDialog">
							<el-avatar :size="100" :src="avatarImg" />
							<span class="info-edit">
								<i class="el-icon-lx-camerafill"></i>
							</span>
						</div>
						<div class="info-name">{{ user_data.user_name }}</div>
						<div class="info-desc">一个普通的充电用户</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-card style="height: 344px;">
					<template #header>
						<div class="clearfix">
							<span>基础信息</span>
						</div>
					</template>
					<el-row>
						<el-col :span="24">
							<el-form label-position="top" inline class="demo-table-expand">
								<el-col :span="8">
									<el-form-item label="用户名" style="width: 100%;">
										<el-text>{{ user_data.user_name }}</el-text>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="邮箱" style="width: 100%;">
										<span>{{ user_data.email }}</span>
									</el-form-item>
								</el-col>
								<el-divider></el-divider>
								<el-col :span="8">
									<el-form-item label="车型" style="width: 100%;">
										<span>{{ user_data.car_type }}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="车牌号" style="width: 100%;">
										<span>{{ user_data.license_plate }}</span>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="电池容量" style="width: 100%;">
										<span>{{ user_data.battery_capacity }}/KWH</span>
									</el-form-item>
								</el-col>
							</el-form>
						</el-col>
					</el-row>

				</el-card>
			</el-col>
			<el-col :span="24">
				<el-collapse v-model="activeName">
					<el-collapse-item name="first">
						<template #title>
							<el-text style="margin-left: 2%; font-size: large;">修改密码</el-text>
						</template>
						<el-card shadow="hover">
							<el-form label-width="90px" :rules="rules" :model="new_password_form" ref="modify">
								<el-form-item label="用户名:"> {{ user_data.user_name }} </el-form-item>
								<!-- <el-form-item label="旧密码:" prop="old">
									<el-input v-model="new_password_form.old" type="password"
										placeholder="请输入旧密码"></el-input>
								</el-form-item> -->
								<el-form-item label="新密码:" prop="new">
									<el-input v-model="new_password_form.new" type="password"
										placeholder="请输入新密码"></el-input>
								</el-form-item>
								<el-form-item label="确认密码:" prop="check">
									<el-input v-model="new_password_form.check" type="password"
										placeholder="请再次输入密码"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="onChangePasswordSubmit(modify)">保存</el-button>
								</el-form-item>
							</el-form>
						</el-card>
					</el-collapse-item>
					<el-collapse-item name="second">
						<template #title>
							<el-text style="margin-left: 2%; font-size: large;">编辑基本信息</el-text>
						</template>
						<el-card shadow="hover">
							<el-form label-width="90px">
								<el-form-item label="用户名：">
									<el-tooltip class="item" effect="dark" content="用户名不可重复" placement="top-start">
										<el-input v-model="new_info_form.new_username" placeholder="输入新用户名"></el-input>
									</el-tooltip>
								</el-form-item>
								<el-form-item label="车牌号：">
									<el-input v-model="new_info_form.new_license" placeholder="输入车牌号"></el-input>
								</el-form-item>
								<el-form-item label="电池容量：">
									<el-input v-model="new_info_form.new_battery_capacity" placeholder="输入电池容量" :min="0"
										:max="59" type="number" @change="onBatteryCapacityChange"></el-input>
								</el-form-item>
								<el-form-item label="车型：">
									<el-input v-model="new_info_form.new_car_type" placeholder="输入车型"></el-input>
								</el-form-item>
								<el-form-item>
									<el-button type="primary" @click="onModifyInfoSubmit">保存</el-button>
								</el-form-item>
							</el-form>
						</el-card>
					</el-collapse-item>
				</el-collapse>
			</el-col>
		</el-row>
		<el-dialog title="裁剪图片" v-model="dialogVisible" width="600px">
			<vue-cropper ref="cropper" :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage"
				style="width: 100%; height: 400px"></vue-cropper>
			<template #footer>
				<span class="dialog-footer">
					<el-button class="crop-demo-btn" type="primary">选择图片
						<input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
					</el-button>
					<el-button type="primary" @click="saveAvatar">上传并保存</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="user">
import { reactive, ref } from 'vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import avatar from '../assets/img/img.jpg';
import user_data from './dashboard.vue';
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus';
import { GetBaseInfoWhenLogin } from '../store/baseinfo';

interface NewPasswordForm {
	old: string;
	new: string;
	check: string;
}

interface NewInfoForm {
	new_username: string;
	new_license: string;
	new_battery_capacity: number | null;
	new_car_type: string;
}

const rules: FormRules = {
	old: [{
		required: true, trigger: 'blur', validator: (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('密码长度不能小于6位'));
			} else {
				callback();
			}
		}
	}],
	new: [{
		required: true, trigger: 'blur', validator: (rule, value, callback) => {
			if (value.length < 6) {
				callback(new Error('密码长度不能小于6位'));
			} else {
				callback();
			}
		}
	}],
	check: [{
		required: true, trigger: 'blur', validator: (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== new_password_form.new) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
	}]
};

const new_password_form = reactive<NewPasswordForm>({
	old: '',
	new: '',
	check: ''
});

const new_info_form = reactive<NewInfoForm>({
	new_username: '',
	new_license: '',
	new_battery_capacity: null,
	new_car_type: ''
});

const form = reactive({
	old: '',
	new: '',
	desc: '不可能！我的代码怎么可能会有bug！'
});

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

const modify = ref<FormInstance>();
const tokenStr = localStorage.getItem("ms_token");

const onChangePasswordSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) {
		ElMessage.error('输入数据错误');
		return;
	}
	formEl.validate(async (valid: boolean) => {
		if (valid) {
			const data = new FormData();
			data.append("password", new_password_form.new);
			const resp = await fetch("/user/password/modify?token=" + tokenStr, {
				method: "POST",
				body: data,
			}).then(async res => JSON.parse(await res.text()));
			if (resp.code === 200) {
				new_password_form.old = '';
				new_password_form.new = '';
				new_password_form.check = '';
				ElMessage.success(resp.msg);
			} else {
				ElMessage.error(resp.msg);
			}
		} else {
			ElMessage.error('输入数据错误');
			return false;
		}
	})
};
const onModifyInfoSubmit = async () => {
	const data = new FormData();
	let flag = false;
	if (new_info_form.new_username != '') {
		data.append("username", new_info_form.new_username);
		flag = true;
	}
	if (new_info_form.new_license != '') {
		data.append("license_plate", new_info_form.new_license);
		flag = true;
	}
	if (new_info_form.new_battery_capacity != null) {
		data.append("battery_capacity", new_info_form.new_battery_capacity?.toString() || '');
		flag = true;
	}
	if (new_info_form.new_car_type != '') {
		data.append("car_type", new_info_form.new_car_type);
		flag = true;
	}
	if (!flag) {
		ElMessage.error('输入数据错误');
		return false;
	}

	const resp = await fetch("/user/info/modify?token=" + tokenStr, {
		method: "POST",
		body: data,
	}).then(async res => JSON.parse(await res.text()));

	console.log(resp);
	if (resp.code === 200) {
		ElMessage.success(resp.msg);

	} else {
		ElMessage.error(resp.msg);
	}
	new_info_form.new_username = '';
	new_info_form.new_license = '';
	new_info_form.new_battery_capacity = null;
	new_info_form.new_car_type = '';

	await GetBaseInfoWhenLogin(tokenStr || '');
};

const avatarImg = ref(avatar);
const imgSrc = ref('');
const cropImg = ref('');
const dialogVisible = ref(false);
const cropper: any = ref();
const activeName = ref(null);

const onBatteryCapacityChange = () => {
	if (new_info_form.new_battery_capacity !== null) {
		if (new_info_form.new_battery_capacity < 0)
			new_info_form.new_battery_capacity = 0
	}
}

const showDialog = () => {
	dialogVisible.value = true;
	imgSrc.value = avatarImg.value;
};

const setImage = (e: any) => {
	const file = e.target.files[0];
	if (!file.type.includes('image/')) {
		return;
	}
	const reader = new FileReader();
	reader.onload = (event: any) => {
		dialogVisible.value = true;
		imgSrc.value = event.target.result;
		cropper.value && cropper.value.replace(event.target.result);
	};
	reader.readAsDataURL(file);
};

const cropImage = () => {
	cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
};

const saveAvatar = () => {
	avatarImg.value = cropImg.value;
	dialogVisible.value = false;
};
</script>

<style scoped>
.info {
	text-align: center;
	padding: 35px 0;
}

.info-image {
	position: relative;
	margin: auto;
	width: 100px;
	height: 100px;
	background: #f8f8f8;
	border: 1px solid #eee;
	border-radius: 50px;
	overflow: hidden;
}

.info-edit {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	opacity: 0;
	transition: opacity 0.3s ease;
}

.info-edit i {
	color: #eee;
	font-size: 25px;
}

.info-image:hover .info-edit {
	opacity: 1;
}

.info-name {
	margin: 15px 0 10px;
	font-size: 24px;
	font-weight: 500;
	color: #262626;
}

.crop-demo-btn {
	position: relative;
}

.crop-input {
	position: absolute;
	width: 100px;
	height: 40px;
	left: 0;
	top: 0;
	opacity: 0;
	cursor: pointer;
}
</style>
