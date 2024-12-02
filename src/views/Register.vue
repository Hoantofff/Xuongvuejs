<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import axios from 'axios';
let url = 'http://localhost/vuejs-server/api.php/register';
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const nameError= ref('');
const emailError = ref("");
const passwordError = ref('');



const handelSubmit = async () => {
    try {
        let data = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        let response = await axios.post(url, data);
        
        if(response.data.message){
            alert('đăng ký thành công!');
            router.push('/login');
        }

    } catch (error) {
        console.log('Lỗi API');

    }

}

const handleValidate = (filed) => {
    switch (filed) {
        case 'email': {
            if (email.value == '') {
                emailError.value = 'Email không được để trống';
            } else {
                emailError.value = '';
            }
            break;
        }
        case 'name': {
            if (name.value == '') {
                nameError.value = 'name không được để trống';
            } else {
                nameError.value = '';
            }
            break;
        }
        case 'password': {
            if (password.value == '') {
                passwordError.value = 'Password không được để trống';
            } else {
                passwordError.value = '';
            }
            break;
        }
    }
}


</script>

<template>
    <div class="container d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow" style="width: 400px;">
            <h3 class="text-center mb-4">Đăng Nhập</h3>
            <form @submit.prevent="handelSubmit">
                <div class="mb-3">
                    <label for="name" class="form-label">name</label>
                    <input type="name" id="name" class="form-control" name="name" v-model="name"
                        placeholder="Nhập name" @keyup="handleValidate('name')">
                    <span class="text-danger" v-if="nameError != ''">{{ nameError }}</span>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="text" class="form-control" id="email" name="email" v-model="email" placeholder="Nhập email"
                        @keyup="handleValidate('email')">
                    <span class="text-danger" v-if="emailError != ''">{{ emailError }}</span>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" class="form-control" name="password" v-model="password"
                        placeholder="Nhập password" @keyup="handleValidate('password')">
                    <span class="text-danger" v-if="passwordError != ''">{{ passwordError }}</span>
                </div>
                <button type="submit" class="btn btn-primary w-100">Đăng Nhập</button>
                <div class="text-center mt-3">
                    <small>Đã có tài khoản <RouterLink to="/login">Đăng nhập</RouterLink ></small>
                </div>
            </form>
        </div>
    </div>
</template>