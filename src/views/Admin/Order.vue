<script setup>

import axios from 'axios';
import { ref,onMounted, reactive } from 'vue';
let urlOrderAll = 'http://localhost/vuejs-server/api.php/show_order_admin';
let urlChangeStatus = 'http://localhost/vuejs-server/api.php/change-status';

const statusOrder = reactive([])
let orderList = ref([]);
const callAPI = async ()=>{
    try {
        let response = await axios.get(urlOrderAll);
        if(response.status == 200){
            orderList.value= response.data;
            orderList.value.forEach(item=>{
                statusOrder[item.order_id] = item.status;
            });
        }
    } catch (error) {
        console.log(error);
        
    }
}
onMounted(()=>{
    callAPI();
})
const handelStatusChange = async (orderId, newStatus)=>{
    try {
        let response = await axios.get(urlChangeStatus + "?order_id=" + orderId + "&status_code=" + newStatus);
        console.log(response);
        
        if(response.status == 200){
            alert('Cập nhật thành công');
            callAPI();
        }
    } catch (error) {
        console.log(error);
         
    }
}
</script>
<template>
    <div class="col-10">
        <div class="container p-3">
            <div class="row mt-3">
                <h3>Trang Order</h3>
            </div>
            <div class="row">
                <div class="table-responsive rounded-3 shadow-sm">
                    <a class="btn btn-secondary my-3" href="">Tạo Mới</a>

                    <table class="table table-hover table-striped table-bordered align-middle">
                        <thead class="">
                            <tr>
                                <th class="border" scope="col">Id</th>
                                <th class="border" scope="col">Tên Khách hàng</th>
                                <th class="border" scope="col">Email</th>
                                <th class="border" scope="col">Số điện Thoại</th>
                                <th class="border" scope="col">Ngày Đặt</th>
                                <th class="border" scope="col">Tổng tiền</th>
                                <th class="border" scope="col">Trạng Thái</th>
                                <th class="border" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index) in orderList" :key="index">
                                <th class="border" scope="row">{{ index + 1 }}</th>
                                <td class="border">{{ item.customer_name }}</td>
                                <td class="border">{{ item.email }}</td>
                                <td class="border">{{ item.phone }}</td>
                                <td class="border">{{ item.order_date }}</td>
                                <td class="border">{{ item.total_price }}</td>
                                <td class="border">
                                    <select class="form-control" v-model="statusOrder[item.order_id]" @change="handelStatusChange(item.order_id, statusOrder[item.order_id])">
                                        <option value="1">Chưa xác nhận</option>
                                        <option value="2">đã xác nhận</option>
                                        <option value="3">Đã Hủy</option>
                                        <option value="4">Đang Giao Hàng</option>
                                        <option value="5">đã nhận</option>
                                    </select></td>
                                <td class="border">
                                    <RouterLink :to="`order-admin-detail/${item.order_id}`" class="btn btn-info" href="">Xem chi tiết</RouterLink>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>