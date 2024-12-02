<script setup>
let url= "http://localhost/vuejs-server/api.php/users";
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const listAccount = ref([]);
onMounted(async ()=>{
    try {
        let response = await axios.get(url);
        listAccount.value= response.data;
        
    } catch (error) {
        console.log('call API không thành công');
    }

})
const handelDelete = async (idAccount)=>{
    const check = confirm('Bạn Có Muốn xóa không?');
    if(check){
        let response = await axios.delete(url + '/' + idAccount);
        if(response){
            alert(response.data.message);

            let response2 = await axios.get(url);
            listAccount.value= response2.data;
        }
    }
}

</script>
<template>
    <div class="col-10">
        <div class="container p-3">
            <div class="row mt-3">
                <h3>Trang Danh Mục Tài Khoản</h3>
            </div>
            <div class="row">
                <div class="table-responsive rounded-3 shadow-sm">
                    <router-link to="/admin/add-account" class="btn btn-secondary my-3" >Tạo Mới</router-link>
                    <table class="table table-hover table-striped table-bordered align-middle">
                        <thead class="">
                            <tr>
                                <th class="border" scope="col">STT</th>
                                <th class="border" scope="col">Họ Tên</th>
                                <th class="border" scope="col">Email </th>
                                <th class="border" scope="col">role</th>
                                <th class="border" scope="col">note</th>
                                <th class="border" scope="col">Created At</th>
                                <th class="border" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(Account, index) in listAccount" :key="index">
                                <th class="border" scope="row">{{ index + 1 }}</th>
                                <td class="border">{{ Account.name }}</td>
                                <td class="border">{{ Account.email }}</td>
                                <td class="border">{{ Account.role }}</td>
                                <td class="border">{{ Account.note }}</td>
                                <td class="border">{{ Account.created_at }}</td>
                                <td class="border">
                                    <router-link :to="`/admin/update-Account/${Account.id}`" class="btn btn-success">Sửa</router-link>
                                    <button class="btn btn-danger" @click="handelDelete(Account.id)" href="">Xóa</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>