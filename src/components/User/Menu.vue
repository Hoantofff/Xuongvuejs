<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
    <div class="menu">
        <div class="container">
            <div class="row bg-danger">
                <div class="col-md-3 text-white my-3">
                    <font-awesome-icon :icon="['fas', 'list']" />
                    <span class="p-2">Danh Mục Sản Phẩm</span>
                </div>
                <div class="col-md-9">
                    <nav class="navbar navbar-expand-lg bg-danger">
                        <div class="container-fluid">
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <router-link class="nav-link active text-white" aria-current="page" to="/">Trang Chủ</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link text-white" to="">Danh Mục</router-link>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle text-white" href="#" role="button"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            Sản Phẩm
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Điện Thoại Iphone</a></li>
                                            <li><a class="dropdown-item" href="#">Laptop</a></li>
                                            <li><a class="dropdown-item" href="#">Pc Gamming</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled text-white" aria-disabled="true">Tin Tức</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled text-white" aria-disabled="true">Tuyển Dụng</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled text-white" aria-disabled="true">Liên Hệ</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled text-white" aria-disabled="true">Cửa Hàng</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="css"></style>