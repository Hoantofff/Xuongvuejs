<script setup>
let url = 'http://localhost/vuejs-server/api.php/categories';
import { ref,onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const name = ref("");
const description = ref("");

onMounted( async ()=>{
    let response = await axios.get(url + "/" + route.params.idCategory);
    
    if(response){
        name.value = response.data.name;
        description.value = response.data.description;
    }
})
const handleSubmit = async () => {
    checkValidate();
    if (nameError.value == '' && descriptionError.value == '') {
        let formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", name.value);
        formData.append("description", description.value);

        let response = await axios.post(
            url + '/' + route.params.idCategory, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response) {
            alert(response.data.message);
            router.push('/admin/category');
        }
    }

}


const nameError = ref("");
const descriptionError = ref("");
const checkValidate = () => {
    if (name.value == '') {
        nameError.value = 'Không được để trống tên danh mục';
    } else{
        nameError.value = "";
    }
    if (description.value == '') {
        descriptionError.value = 'Không được để trống mô tả';
    }else{
        descriptionError.value = '';
    }
}
</script>
<template>
    <div class="col-10">
        <div class="container p-3">
            <div class="row mt-3">
                <h3>Trang Sửa Danh mục</h3>
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
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 mt-3">
                                <label for="description" class="form-label">description:</label>
                                <input type="text" class="form-control" id="description"
                                    placeholder="Enter Full description" v-model="description">
                                <span class="text-danger" v-if="descriptionError != ''">{{ descriptionError }}</span>

                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Cập Nhật</button>
                </form>

            </div>
        </div>
    </div>

</template>