<script setup>

let url = 'http://localhost/vuejs-server/api.php/products';
let urlCategory = 'http://localhost/vuejs-server/api.php/categories';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref("");
const price = ref("");
const description = ref("");
const category_id = ref("");
const image = ref(null);
const nameError = ref("");
const priceError = ref("");
const descriptionError = ref("");
const category_idError = ref("");
const handleChange = (event) => {
    const file = event.target.files[0];
    image.value = file;
}
const handleSubmit = async () => {
    checkEmpty('name');
    checkEmpty('price');
    checkEmpty('description');
    checkEmpty('category_id');
    if (nameError.value == '' && priceError.value == '' && descriptionError.value == '' && category_idError.value == '') {
        try {
            let formData = new FormData();
            formData.append("name", name.value);
            formData.append("price", price.value);
            formData.append("image", image.value);
            formData.append("description", description.value);
            formData.append("category_id", category_id.value);
            

            let response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert("Thêm Mới Sản Phẩm thành công");
                router.push('/admin/product');
            }
        } catch (error) {
            alert('call API lỗi')
        }
    }


}

let listCategory = ref([])
const callAPICategory = async ()=>{
    const response = await axios.get(urlCategory);
    listCategory.value = response.data;
}
onMounted(()=>{
    callAPICategory();
})

const checkEmpty = (field) => {
    switch (field) {
        case 'name': {
            if (name.value == '') {
                nameError.value = 'Không được để trống name';
            } else {
                nameError.value = '';
            }
            break;
        }
        case 'price': {
            if (price.value == '') {
                priceError.value = 'Không được để trống price';
            } else {
                priceError.value = '';
            }
            break;
        }
        case 'description': {
            if (description.value == '') {
                descriptionError.value = 'Không được để trống description';
            } else {
                descriptionError.value = '';
            }
            break;
        }
        case 'category_id': {
            if (category_id.value == '') {
                category_idError.value = 'Không được để trống category_id';
            } else {
                category_idError.value = '';
            }
            break;
        }
        default: {
            break;
        }
    }
}
</script>
<template>
    <div class="col-10">
        <div class="container p-3">
            <div class="row mt-3">
                <h3>Trang Thêm mới Sản Phẩm</h3>
            </div>
            <div class="row">
                <form @submit.prevent="handleSubmit">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3 mt-3">
                                <label for="name" class="form-label">Name:</label>
                                <input type="text" class="form-control" id="name" placeholder="Enter Full Name"
                                    v-model="name" @keyup="checkEmpty('name')">
                                <p v-if="nameError != ''" class="text-danger">{{ nameError }}</p>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="price" class="form-label">price:</label>
                                <input type="text" class="form-control" id="price" placeholder="Enter Full price"
                                    v-model="price" @keyup="checkEmpty('price')">
                                <p v-if="priceError != ''" class="text-danger">{{ priceError }}</p>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="categories" class="form-label">categories:</label>
                                <select id="category_id" class="form-control" v-model="category_id">
                                    <option value="" hidden>--Chọn tất cả</option>
                                    <option v-for="(category, index) in listCategory" :key="index" :value="category.id">{{ category.name }}</option>
                                </select>
                                <p v-if="category_idError != ''" class="text-danger">{{ category_idError }}</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3 mt-3">
                                <label for="description" class="form-label">description:</label>
                                <input type="text" class="form-control" id="description"
                                    placeholder="Enter Full description" v-model="description"
                                    @keyup="checkEmpty('description')">
                                <p v-if="descriptionError != ''" class="text-danger">{{ descriptionError }}</p>
                            </div>
                            <div class="mb-3 mt-3">
                                <label for="image" class="form-label">image:</label>
                                <input type="file" @change="handleChange" class="form-control" id="image"
                                    accept="image/*">
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Tạo Mới</button>
                </form>

            </div>
        </div>
    </div>

</template>