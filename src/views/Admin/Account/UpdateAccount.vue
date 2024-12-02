<script setup>
let url = 'http://localhost/vuejs-server/api.php/users';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("");
const note = ref("");

onMounted(async () => {
    let response = await axios.get(url + "/" + route.params.idAccount);
    console.log(response);
    
    if (response) {
        name.value = response.data.name;
        email.value = response.data.email;
        role.value = response.data.role;
        note.value = response.data.note;
        password.value = response.data.password;
    }
})
const handleSubmit = async () => {
    checkValidate();
    if (nameError.value == '' && emailError.value == '') {
        let formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", name.value);
        formData.append("email", email.value);
        formData.append("role", role.value);
        formData.append("note", note.value);
        if (password.value !== "") {
            formData.append("password", password.value);
        }

        let response = await axios.post(
            url + '/' + route.params.idAccount, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response) {
            alert(response.data.message);
            router.push('/admin/account');
        }
    }

}


const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const roleError = ref("");
const checkValidate = () => {
    if (name.value == '') {
        nameError.value = 'Không được để trống tên danh mục';
    } else {
        nameError.value = "";
    }
    if (email.value == '') {
        emailError.value = 'Không được để trống email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.value = 'email không đúng định dạng';
    } else {
        emailError.value = '';
    }
    if (password.value == '') {
        passwordError.value = 'Không được để trống password';
    } else {
        passwordError.value = '';
    }
    if (role.value == '') {
        roleError.value = 'Không được để trống role';
    } else {
        roleError.value = '';
    }
}
</script>
<template>
    <div class="col-10">
        <div class="container p-3">
            <div class="row mt-3">
                <h3>Trang Sửa Tài Khoản</h3>
            </div>
            <div class="row">
                <form @submit.prevent="handleSubmit">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3 mt-3">
                                <label for="name" class="form-label">Name:</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter Full Name"
                                    v-model="name">
                                <span class="text-danger" v-if="nameError != ''">{{ nameError }}</span>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="email" class="form-label">email:</label>
                                <input type="text" class="form-control" id="email" placeholder="Enter Full email"
                                    v-model="email">
                                <span class="text-danger" v-if="emailError != ''">{{ emailError }}</span>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="role" class="form-label">role:</label>
                                <select class="form-control" id="role" v-model="role">
                                    <option value="user">Client</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <span class="text-danger" v-if="roleError != ''">{{ roleError }}</span>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 mt-3">
                                <label for="note" class="form-label">note:</label>
                                <input type="text" class="form-control" id="note" placeholder="Enter Full note"
                                    v-model="note">
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="password" class="form-label">password:</label>
                                <input type="text" class="form-control" id="password" placeholder="Enter Full password"
                                    v-model="password">
                                <span class="text-danger" v-if="passwordError != ''">{{ passwordError }}</span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Cập Nhật</button>
                </form>

            </div>
        </div>
    </div>

</template>