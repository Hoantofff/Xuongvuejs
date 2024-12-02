<script setup>
let url= "http://localhost/vuejs-server/api.php/categories";
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const listCategory = ref([]);
onMounted(async ()=>{
    try {
        let response = await axios.get(url);
        listCategory.value= response.data;
        
    } catch (error) {
        console.log('call API không thành công');
    }

})
const handelDelete = async (idCategory)=>{
    const check = confirm('Bạn Có Muốn xóa không?');
    if(check){
        let response = await axios.delete(url + '/' + idCategory);
        if(response){
            alert(response.data.message);

            let response2 = await axios.get(url);
            listCategory.value= response2.data;
        }
    }
}

</script>
<template>
    <div class="col-10">
        <div class="container p-3">
            <div class="row mt-3">
                <h3>Trang Danh Mục Sản Phẩm</h3>
            </div>
            <div class="row">
                <div class="table-responsive rounded-3 shadow-sm">
                    <router-link to="/admin/add-category" class="btn btn-secondary my-3" >Tạo Mới</router-link>
                    <table class="table table-hover table-striped table-bordered align-middle">
                        <thead class="">
                            <tr>
                                <th class="border" scope="col">STT</th>
                                <th class="border" scope="col">Tên Danh Mục</th>
                                <th class="border" scope="col">Mô tả </th>
                                <th class="border" scope="col">Chức Năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(category, index) in listCategory" :key="index">
                                <th class="border" scope="row">{{ index + 1 }}</th>
                                <td class="border">{{ category.name }}</td>
                                <td class="border">{{ category.description }}</td>
                                <td class="border">
                                    <router-link :to="`/admin/update-category/${category.id}`" class="btn btn-success">Sửa</router-link>
                                    <button class="btn btn-danger" @click="handelDelete(category.id)" href="">Xóa</button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>