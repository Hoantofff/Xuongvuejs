<script setup>
let url = 'http://localhost/vuejs-server/api.php/products';
let urlUpload = "http://localhost/vuejs-server/uploads/product/";
let urlCategory = 'http://localhost/vuejs-server/api.php/categories';


import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const name = ref("");
const price = ref("");
const description = ref("");
const image = ref(null);
const category_id = ref("");
const imageOldUrl = ref("");
const nameError = ref("");
const priceError = ref("");
const descriptionError = ref("");
const category_idError = ref("");
let listCategory = ref([]);
const handleChange = (event) => {
    const file = event.target.files[0];
    image.value = file;
}
const callAPICategory = async ()=>{
    try {
        const response = await axios.get(urlCategory);
        listCategory.value = response.data;
    } catch (error) {
        console.log('Lỗi API');
        
    }
}
const callApiProduct = async ()=>{
    try {
        let response = await axios.get(url + "/" + route.params.idProduct);

    if (response) {
        name.value = response.data.name;
        price.value = response.data.price;
        description.value = response.data.description;
        imageOldUrl.value = response.data.image;
        category_id.value = response.data.category_id;
    }
    } catch (error) {
        console.log('Lỗi API');
    }
}

const handleSubmit = async () => {
    checkEmpty('name');
    checkEmpty('price');
    checkEmpty('description');
    checkEmpty('category_id');
    if (nameError.value == '' && priceError.value == '' && descriptionError.value == '' && category_idError.value == '') {
        try {
            let formData = new FormData();
            formData.append("_method", "PUT");
            formData.append("name", name.value);
            formData.append("price", price.value);
            formData.append("description", description.value);
            formData.append("image", image.value);
            formData.append("category_id", category_id.value);
            console.log(name.value);
            console.log(price.value);
            console.log(image.value);
            console.log(description.value);
            console.log(category_id.value);
            
            let response = await axios.post(
                url + '/' + route.params.idProduct, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response) {
                alert(response.data.message);
                router.push('/admin/product');
            }
        } catch (error) {
            alert('call API lỗi');
        }
    }

}

onMounted( () => {
callAPICategory();
callApiProduct();
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
                <h3>Trang Sửa Sản Phẩm</h3>
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
                                <div>
                                    <img v-if="imageOldUrl != null" :src="urlUpload + imageOldUrl" width="50px" alt="">
                                    <span v-else>Không Có Ảnh</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary">Cập Nhật</button>
                </form>

            </div>
        </div>
    </div>

</template>