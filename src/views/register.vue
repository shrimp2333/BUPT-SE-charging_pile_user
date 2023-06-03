<template>
    <div class="login-wrap">
        <div class="ms-register">
            <div class="ms-title">用户注册</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content" label-position="top">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="param.username" placeholder="username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="10">
                        <el-form-item label="邮箱" prop="email">
                            <el-input type="email" placeholder="email" v-model="param.email"
                                @keyup.enter="submitForm(login)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="param.password" placeholder="username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="10">
                        <el-form-item label="确认密码" prop="enpassword">
                            <el-input type="password" v-model="param.enpassword" placeholder="ensure password"
                                @keyup.enter="submitForm(login)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="车牌号" prop="license">
                            <el-input v-model="param.license" placeholder="license"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4"></el-col>
                    <el-col :span="10">
                        <el-form-item label="电池容量" prop="battery">
                            <el-input placeholder="battery capacity" v-model="param.battery"
                                @keyup.enter="submitForm(login)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-checkbox v-model="isAgreement">注册即代表同意<a style="color: rgb(99, 99, 232);">服务条款</a></el-checkbox>
                <div class="login-btn" style="display: flex;">
                    <el-button type="primary" style="width: 100%;" @click="submitForm(login)">注册</el-button>
                </div>
                <div class="login-tips" style="text-align: center;">" 已经有账号? "
                    <a href="#/login" style="color: rgb(99, 99, 232);">👉马上登录</a>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTagsStore } from '../store/tags';
import { usePermissStore } from '../store/permiss';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { GetBaseInfoWhenLogin } from '../store/baseinfo';

interface RegisterInfo {
    username: string;
    email: string;
    password: string;
    enpassword: string;
    license: string;
    battery: number | null;
}

const router = useRouter();
const isAgreement = ref<boolean>(false);
const param = reactive<RegisterInfo>({
    // username: "test",
    // email: 'test@test.com',
    // password: "123456",
    // enpassword: "123456",
    // license: "123456",
    // battery: 123456,
    username: '',
    email: '',
    password: '',
    enpassword: '',
    license: '',
    battery: null,
});

const rules: FormRules = {
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
        },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    password: [{
        required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码长度不能小于6位'));
            } else {
                callback();
            }
        }
    }],
    enpassword: [{
        required: true, trigger: 'blur', validator: (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== param.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
    }],
    license: [{ required: false, message: '请输入车牌号', trigger: 'blur' }],
    battery: [{ required: true, message: '请输入电池容量', trigger: 'blur' }],
};

const permiss = usePermissStore();
const login = ref<FormInstance>();

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    if (!isAgreement.value) {
        ElMessage.error('请先同意服务条款');
        return false;
    }
    formEl.validate(async (valid: boolean) => {
        if (valid) {
            const data = new FormData()
            data.append('username', param.username)
            data.append('email', param.email)
            data.append('password', param.password)
            data.append('enpassword', param.enpassword)
            data.append('license_plate', param.license)
            if (param.battery !== null)
                data.append('battery_capacity', param.battery.toString())
            console.log(data)
            const resp = await fetch("/u/register", {
                method: "POST",
                body: data,
            }).then(async res => JSON.parse(await res.text()));

            console.log(resp)
            console.log(resp.token)
            localStorage.setItem('ms_token', resp.token)
            // localStorage.setItem('ms_username', param.username);
            // const keys = permiss.defaultList[param.username == 'admin' ? 'admin' : 'user'];
            // permiss.handleSet(keys);
            // localStorage.setItem('ms_keys', JSON.stringify(keys));
            GetBaseInfoWhenLogin(resp.token);

            const keys = permiss.defaultList['admin'];
            permiss.handleSet(keys);
            localStorage.setItem('ms_keys', JSON.stringify(keys));

            ElMessage.success(resp.msg);
            router.push('/');
        } else {
            ElMessage.error('注册失败');
            return false;
        }
    });
};

const tags = useTagsStore();
tags.clearTags();
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}

.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}

.ms-register {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 700px;
    margin: -250px 0 0 -350px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}

.ms-content {
    padding: 30px 30px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}

.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
