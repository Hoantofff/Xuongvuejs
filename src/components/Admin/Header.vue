<script setup>
import { RouterLink } from 'vue-router';
import { pushScopeId, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';


const router = useRouter();
let userLogin = reactive({});
if(localStorage.getItem("userLogin") != null){
    userLogin = JSON.parse(localStorage.getItem("userLogin"));
    console.log(userLogin);
    
}
const handelLogout = ()=>{
    localStorage.removeItem("userLogin");
    router.push('/login')
}
</script>
<template>
    <div class="row bg-secondary text-white p-2">
            <div class="col-2 ">
                <h5>Trang Chủ: {{ userLogin.name }}</h5>
            </div>
            <div class="col-10 bg-secondary text-white d-flex justify-content-end">
                <div class="input-group w-25">
                    <input type="text" class="form-control" placeholder="Username">
                    <span class="input-group-text" id="basic-addon1"><font-awesome-icon
                            :icon="['fas', 'magnifying-glass']" /></span>
                </div>
                <div class="dropdown mx-3 d-flex align-items-center">
                    <a class="text-white dropdown-toggle" href="#" data-bs-toggle="dropdown">
                        <font-awesome-icon :icon="['fas', 'user']" />
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Chi Tiết</a></li>
                        <li><a class="dropdown-item" @click="handelLogout">Đăng Xuất</a></li>
                    </ul>
                </div>
            </div>
        </div>
</template>
<style scoped lang="css"></style>