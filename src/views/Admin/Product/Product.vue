<script setup>
let url= "http://localhost/vuejs-server/api.php/products";
let urlUpload = "http://localhost/vuejs-server/uploads/product/";
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const listProduct = ref([]);
onMounted(async ()=>{
    try {
        let response = await axios.get(url);
        listProduct.value= response.data;
        // console.log(listProduct.image);debugger;
        
    } catch (error) {
        console.log('call API không thành công');
    }

})
const handelDelete = async (idProduct)=>{
    const check = confirm('Bạn Có Muốn xóa không?');
    if(check){
        let response = await axios.delete(url + '/' + idProduct);
        if(response.status === 200){
            alert(response.data.message);
            let response2 = await axios.get(url);
            listProduct.value= response2.data;
        }
    }
}
</script>
<template>
    <div class="col-10">
        <div class="container p-3">
            <div class="row mt-3">
                <h3>Trang product</h3>
            </div>
            <div class="row">
                <div class="table-responsive rounded-3 shadow-sm">
                    <router-link class="btn btn-secondary my-3" to="/admin/add-product">Thêm Mới</router-link>

                    <table class="table table-hover table-striped table-bordered align-middle">
                        <thead class="">
                            <tr>
                                <th class="border" scope="col">Id</th>
                                <th class="border" scope="col">Tên Sản Phẩm</th>
                                <th class="border" scope="col">Giá sản phẩm</th>
                                <th class="border" scope="col">Danh Mục Sản phẩm</th>
                                <th class="border" scope="col">Mô tả sản phẩm</th>
                                <th class="border" scope="col">Ảnh Sản phẩm</th>
                                <th class="border" scope="col">Chức Năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in listProduct" :key="index">
                                <th class="border" scope="row">{{ index + 1 }}</th>
                                <td class="border">{{ product.name }}</td>
                                <td class="border">{{ product.price }}</td>
                                <td class="border">{{ product.categoryName }}</td>
                                <td class="border">{{ product.description }}</td>
                                <td class="border">
                                    <img v-if="product.image != null" :src="urlUpload + product.image" width="50px" alt="">
                                    <span v-else>Không Có Ảnh</span>
                                </td>
                                <td class="border">
                                    <router-link class="btn btn-success" :to="`/admin/update-product/${product.id}`">Sửa</router-link>
                                    <button class="btn btn-danger"  @click="handelDelete(product.id)" href="">Xóa</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>