<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="sidebar.collapse" background-color="#72d8c2"
            text-color="#2f4f4f" active-text-color="#20a0ff" unique-opened router>
            <!-- background-color="#324157" text-color="#bfcbd9"-->
            <template v-for="item in items">
                <template v-if="item.title">
                    <el-menu-item :index="item.index" :key="item.index" v-permiss="item.permiss">
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useSidebarStore } from '../store/sidebar';
import { useRoute } from 'vue-router';

const items = [
    {
        icon: 'Odometer',
        index: '/dashboard',
        title: '系统首页',
        permiss: '1',
    },
    {
        icon: 'Odometer',
        index: '/user',
        title: '个人中心',
        permiss: '1',
    },
];

const route = useRoute();
const onRoutes = computed(() => {
    return route.path;
});

const sidebar = useSidebarStore();
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
    width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}

.sidebar>ul {
    height: 100%;
}
</style>
