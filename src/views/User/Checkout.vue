<script setup>
let urlCartDetail = 'http://localhost/vuejs-server/api.php/cart-detail';
let urlCheckOut = 'http://localhost/vuejs-server/api.php/check-out';

import { useRouter } from 'vue-router';
import axios from 'axios';
import { onMounted, ref } from 'vue';
const router = useRouter();
const name = ref('');
const address = ref('');
const phone = ref('');
const email = ref('');

const convertPrice = (number) => {
    return number.toLocaleString("vi-VN");
}

const cartDetail = ref([]);
const callAPI = async ()=>{
    try {
        let user_id = JSON.parse(localStorage.getItem('userLogin')).id;
        let response = await axios.get(urlCartDetail + "?user_id=" + user_id);
        console.log(response.data);
        
        if(response.status == 200){
            cartDetail.value = response.data.cart_details;
        }
    } catch (error) {
        
    }
}

onMounted(()=>{
    callAPI();
})

const handelSubmit = async()=>{
    try {
        let user_id = JSON.parse(localStorage.getItem('userLogin')).id;
        let formData = new FormData();
        formData.append("user_id", user_id);
        formData.append("name", name.value);
        formData.append("address", address.value);
        formData.append("phone", phone.value);
        formData.append("email", email.value);
        let response = await axios.post(urlCheckOut, formData);
        console.log(response.data);
        
        if(response.status == 200){
            alert('Thanh Toán Thành Công');
            router.push('/order')
        }
    } catch (error) {
        console.log('Lỗi API');
        
    }
}
</script>

<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-7">
                <h4>Thông Tin Thanh Toán</h4>
                <form @submit.prevent="handelSubmit">
                    <div class="mb-4">
                        <label for="">Name</label>
                        <input type="text" placeholder="Name" id="name" v-model="name" class="form-control">
                    </div>
                    <div class="mb-4">
                        <label for="">address</label>
                        <input type="text" placeholder="address" id="address" v-model="address" class="form-control">
                    </div>
                    <div class="mb-4">
                        <label for="">email</label>
                        <input type="text" placeholder="email" id="email" v-model="email" class="form-control">
                    </div>
                    <div class="mb-4">
                        <label for="">phone</label>
                        <input type="text" placeholder="phone" id="phone" v-model="phone" class="form-control">
                    </div>
                    <div class="mb-4">
                        <button class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
            <div class="col-5">
                <h4>Danh sách sản phẩm</h4>
                <table class="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên SP</th>
                            <th>Giá</th>
                            <th>Số Lượng</th>
                            <th>Thanh Tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in cartDetail" :key="index">
                            <td>{{ index +1 }}</td>
                            <td>{{ item.product_name }}</td>
                            <td>{{ item.price }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ convertPrice(Number(item.price) * Number(item.quantity)) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>