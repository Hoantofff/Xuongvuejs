<script setup>
let urlOrderDetail = 'http://localhost/vuejs-server/api.php/order_detail';

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const route = useRoute();
console.log(route.params.order_id);

const orderDetail = ref([]);

const convertPrice = (number) => {
    return number.toLocaleString("vi-VN");
}

const cartDetail = ref([]);
const callAPI = async () => {
    try {
        let response = await axios.get(urlOrderDetail + "?order_id=" + route.params.order_id);

        if (response.status == 200) {
            orderDetail.value = response.data;
        }
    } catch (error) {
        console.log('Lỗi API');

    }
}

onMounted(() => {
    callAPI();
})

</script>

<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-10">
                <h4>Danh sách sản phẩm</h4>
                <table class="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên SP</th>
                            <th>Giá SP</th>
                            <th>Số Lượng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in orderDetail" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td><router-link :to="`/product-detail/${item.product_id}`" target="_blank" class="text-success">{{ item.product_name }}</router-link></td>
                            <td>{{ convertPrice(item.price) }} VNĐ</td>
                            <td>{{  item.quantity }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>