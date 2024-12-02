<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

let url = 'http://localhost/vuejs-server/api.php/cart-detail';
let urlCartUpdate = 'http://localhost/vuejs-server/api.php/cart-update';

const cart = ref({});
const cartDetail = ref([]);
const callAPI = async () => {
    let user_id = JSON.parse(localStorage.getItem('userLogin')).id;
    try {
        let response = await axios.get(url + '/?user_id=' + user_id);
        if (response.data.status) {
            cart.value = response.data.cart;
            cartDetail.value = response.data.cart_details;
        }

    } catch (error) {
        console.log('Lỗi API');

    }
}

onMounted(() => {
    callAPI();
})
const convertPrice = (number) => {
    return number.toLocaleString("vi-VN");
}

const totalPrice = computed(() =>{
    let total = 0;
    cartDetail.value.forEach(item =>{
        total = total + item.price * item.quantity;
    })
    return total;
})

const handelUpdateCart = async (action, product_id) =>{
    try {
        let link = urlCartUpdate + "?cart_id=" + cart.value.id + "&action=" + action + "&product_id=" + product_id
        let response = await axios.get(link);
                
        if(response.status == 200){
            callAPI();
        }
        
    } catch (error) {
        console.log(error);
        
    }
}
</script>

<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Giá SP</th>
                    <th>Số Lượng</th>
                    <th>Thành Tiền</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="cartDetail.length == 0">
                    <td colspan="6">Không có sản phẩm trong giỏ hàng <RouterLink to="/">Tiếp tục mua hàng</RouterLink></td>
                </tr>
                <tr v-else v-for="(item, index) in cartDetail" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.product_name }}</td>
                    <td>{{ convertPrice(Number(cartDetail.price)) }} VNĐ</td>
                    <td>
                        <div class="d-flex">
                            <button class="btn btn-sm btn-info" 
                            @click="handelUpdateCart('decrease', item.product_id)"
                            >-</button>
                            <span>{{ item.quantity }}</span>
                            <button class="btn btn-sm btn-info" 
                            @click="handelUpdateCart('increase', item.product_id)"
                            >+</button>
                        </div></td>
                    <td>{{ convertPrice(Number(item.price) * Number(item.quantity)) }}</td>
                    <td>
                        <button @click="handelUpdateCart('delete', item.product_id)" class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
                <tr>
                    <td colspan="4"></td>
                    <td>Tổng Tiền: {{ convertPrice(totalPrice) }} VNĐ</td>
                    <td>
                        <RouterLink to="/pay-ment" class="btn btn-secondary"> Thanh Toán</RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
         
    </div>
</template>