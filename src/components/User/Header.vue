<script setup>
import { RouterLink } from 'vue-router';
import { pushScopeId, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
let userLogin = reactive({});
if (localStorage.getItem("userLogin") != null) {
    userLogin = JSON.parse(localStorage.getItem("userLogin"));

}
const handelLogout = () => {
    localStorage.removeItem("userLogin");
    router.push('/login')
}


</script>
<template>
    <div class="header">
        <div class="container">
            <div class="row bg-flight">
                <div class="col-md-3 mt-2">
                    <img class="card-img-top py-2 img-fluid w-50 "
                        src="https://cdn2.fptshop.com.vn/unsafe/360x0/filters:quality(100)/small/logo_main_3ac5b2c28d.png"
                        alt="logo">
                </div>
                <div class="col-md-4">
                    <div class="input-group mt-2 py-2">
                        <input type="text" class="form-control" placeholder="Tìm kiếm tại đây"
                            aria-label="Tìm kiếm tại đây" aria-describedby="basic-addon2">
                        <span class="input-group-text" id="basic-addon2"><font-awesome-icon
                                :icon="['fas', 'magnifying-glass']" /></span>
                    </div>
                </div>
                <div class="col-3 d-flex">
                    <div class="row mt-2 py-2 mx-1">
                        <div class="col-md-3 fs-4 text-danger"><font-awesome-icon :icon="['fas', 'phone']" /></div>
                        <div class="col-md-9">Hỗ Trơ <br>
                            <strong class="text-danger fs-6 text">0911666</strong>
                        </div>
                    </div>
                    <div v-if="userLogin.id" class="row mt-2 py-2">
                        <div class="col-md-3 fs-4 text-danger"><font-awesome-icon :icon="['fas', 'user']" /></div>
                        <div class="col-md-9 ">{{ userLogin.name }}
                            <a @click="handelLogout" class=" text-decoration-none fw-bold text-danger text">Đăng
                                Xuất</a>
                        </div>
                    </div>
                    <div v-else class="row mt-2 py-2">
                        <div class="col-md-3 fs-4 text-danger"><font-awesome-icon :icon="['fas', 'user']" /></div>
                        <div class="col-md-9 ">Xin Chào <br>
                            <router-link to="/login" class=" text-decoration-none fw-bold text-danger text">Đăng
                                Nhập</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="row mt-3">
                        <div class="col-4">
                            <a href="#" class=" position-relative">
                                <span class="fs-3 text-danger"><font-awesome-icon :icon="['fas', 'heart']" /></span>
                            </a>
                        </div>
                        <div class="col-4">
                            <router-link to="/cart" class=" position-relative">
                                <span class="fs-3 text-danger"><font-awesome-icon
                                        :icon="['fas', 'bag-shopping']" /></span>
                                <span
                                    class="position-absolute top-50 start-50 translate-middle badge rounded-pill text-flight">
                                    99
                                    <span class="visually-hidden">unread messages</span>
                                </span>
                            </router-link>
                        </div>
                        <div class="col-4">
                            <a href="#" class=" position-relative">
                                <span class="fs-3 text-danger"><font-awesome-icon
                                        :icon="['fas', 'location-dot']" /></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="css"></style>