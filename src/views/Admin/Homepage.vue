<script setup>
import { RouterView, useRoute } from 'vue-router';
import { watch } from 'vue';
import Header from '@/components/Admin/Header.vue';
import Footer from '@/components/Admin/Footer.vue';
import Sidebar from '@/components/Admin/Sidebar.vue';
import router from '@/router';
const route = useRoute();
watch(
    () => route.name,
    (newRouteName) => {
        switch (newRouteName) {
            case "dashboard": {
                document.title = 'Trang chủ';
                break;
            }
            case "category": {
                document.title = 'Trang Danh Mục';
                break;
            }
            case "product": {
                document.title = 'Trang Sản Phẩm';
                break;
            }
            case "account": {
                document.title = 'Trang người dùng';
                break;
            }
            case "order": {
                document.title = 'Trang giỏ hàng';
                break;
            }
        }
    }, {
    immediate: true
})
</script>
<template>
    <div class="container-fluid p-0">
        <Header />
    </div>
    <div class="sidebar-main">
        <div class="container-fluid">
            <div class="row">
                <Sidebar />
                <RouterView />
            </div>
        </div>
    </div>
    <div class="footer py-4 bg-light-subtle mt-auto">
        <div class="container-fluid px-4">
            <Footer/>
        </div>
    </div>
</template>