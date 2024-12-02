<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="col-2 bg-body-secondary vh-100">
        <div class="row border-bottom ">
            <router-link to="/admin" class="p-3 text-decoration-none text-dark hover-text">
                <font-awesome-icon :icon="['fas', 'gauge']" />
                <span class=" ms-2 fs-6 ">Dashboard</span>
            </router-link>
        </div>
        <div class="row">
            <ul class="list-group p-0">
                <router-link to="/admin/product" class="text-decoration-none text-dark border-bottom w-100 hover-text">
                    <li
                        class="list-group-items list-unstyled fs-6 p-3 d-flex align-items-center justify-content-between text-secondary-emphasis text-secondary">
                        <div>
                            <font-awesome-icon :icon="['fas', 'store']" />
                            <span class="ms-2">Product</span>
                        </div>
                        <font-awesome-icon class="me-2" :icon="['fas', 'angle-right']" />
                    </li>
                </router-link>
                <router-link to="/admin/account" class="text-decoration-none text-dark border-bottom w-100 hover-text">
                    <li
                        class="list-group-items list-unstyled fs-6 p-3 d-flex align-items-center justify-content-between text-secondary-emphasis">
                        <div>
                            <font-awesome-icon :icon="['fas', 'user']" />
                            <span class="ms-2">Account</span>
                        </div>
                        <font-awesome-icon class="me-2" :icon="['fas', 'angle-right']" />
                    </li>
                </router-link>
                <router-link to="/admin/category" class="text-decoration-none text-dark border-bottom w-100 hover-text">
                    <li
                        class="list-group-items list-unstyled fs-6 p-3 d-flex align-items-center justify-content-between text-secondary-emphasis">
                        <div>
                            <font-awesome-icon :icon="['fas', 'rectangle-list']" />
                            <span class="ms-2">Category</span>
                        </div>
                        <font-awesome-icon class="me-2" :icon="['fas', 'angle-right']" />
                    </li>
                </router-link>
                <router-link to="/admin/order-admin" class="text-decoration-none text-dark border-bottom w-100 hover-text">
                    <li
                        class="list-group-items list-unstyled fs-6 p-3 d-flex align-items-center justify-content-between text-secondary-emphasis">
                        <div>
                            <font-awesome-icon :icon="['fas', 'box']" />
                            <span class="ms-2">Order</span>
                        </div>
                        <font-awesome-icon class="me-2" :icon="['fas', 'angle-right']" />
                    </li>
                </router-link>
            </ul>
        </div>
    </div>
    <!-- <div class="col-3 bg-info position-fixed top-0 start-0" style="height: 100vh;">
        <h3 class="mt-4 text-center text-light">Admin - Hoàn</h3>
        <div class="list-group mt-4">
            <router-link to="/admin" class="list-group-item ">Dashboard</router-link>
            <router-link to="/admin/category" class="list-group-item ">Quản Lý Danh Mục</router-link>
            <router-link to="/admin/product" class="list-group-item ">Quản Lý Sản Phẩm</router-link>
            
        </div>
    </div> -->
</template>
<style scoped lang="css"></style>