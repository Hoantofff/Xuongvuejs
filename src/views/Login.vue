<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import axios from 'axios';
let url = 'http://localhost/vuejs-server/api.php/login';
const router = useRouter();
const email = ref('');
const password = ref('');
const emailError = ref("");
const passwordError = ref('');



const handelSubmit = async () => {
    try {
        let data = {
            email: email.value,
            password: password.value
        }
        let response = await axios.post(url, data);
        let message = response.data;
        console.log(message);

        if (message.status == true) {
            localStorage.removeItem("userLogin");
            let userLogin = {
                id: message.data.id,
                name: message.data.name,
                email: message.data.email,
                role: message.data.role
            };
            localStorage.setItem("userLogin", JSON.stringify(userLogin));

            if (message.data.role == 'user') {
                router.push('/');
            } else if (message.data.role == 'admin') {
                router.push('/admin');
            }
        } else {
            alert('Tài Khoản Hoặc Mật Khẩu Không Đúng!');
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
                    <small>Chưa có tài khoản <RouterLink to="/register">Đăng Ký</RouterLink></small>
                </div>
            </form>
        </div>
    </div>
</template>