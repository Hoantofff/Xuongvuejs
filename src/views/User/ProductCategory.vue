<script setup>
let urlProduct= "http://localhost/vuejs-server/api.php/products";
let urlCategory= "http://localhost/vuejs-server/api.php/categories";
let urlUpload = "http://localhost/vuejs-server/uploads/product/";
import { ref,onMounted, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import axios from 'axios';

//Product
const route = useRoute();
const listProduct = ref([]);
const callAPIProduct = async ()=>{
    try {
        let response = await axios.get(urlProduct + '?idCategory=' + route.params.idCategory);
        listProduct.value= response.data;
        
    } catch (error) {
        console.log('call API không thành công');
    }
}

const convertPrice = (number) =>{
    return number.toLocaleString("vi-VN");
}

//Category
const listCategory = ref([]);
const callAPICategory = async ()=>{
    try {
        let response = await axios.get(urlCategory);
        listCategory.value= response.data;
        
    } catch (error) {
        console.log('call API không thành công');
    }
}
onMounted(async ()=>{
    callAPIProduct();
    callAPICategory();

})

watch(() => route.params.idCategory, (newCategoryId) =>{
    callAPIProduct();
})
</script>
<template>
    <div class="banner">
        <div class="container mt-3 ">
            <div class="row ">
                <div id="carouselExample" class="carousel slide w-100 p-0">
                    <div class="carousel-inner ">
                        <div class="carousel-item active">
                            <img src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/71/8e/718ed4d126404228697c4d09dbc7917b.jpg"
                                class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/8d/9e/8d9ed5adb0af60137b407b275c3e5484.png"
                                class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/69/44/6944a33de49906ed7fd02c8501d55323.png"
                                class="d-block w-100" alt="...">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="main">
        <div class="container mt-5">
            <div class="phone">
                <div class="row border-bottom py-3">
                    <div class="col-md-6">
                        <b class="fs-4 text-secondary">Điện thoại</b>
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <nav class="nav ">
                            <router-link 
                            v-for="(category, index) in listCategory" 
                            :key="index" 
                            class="ms-3  btn btn-outline-secondary " aria-current="page"
                            :class="{active: category.id == route.params.idCategory}"
                            :to="`/product-category/${category.id}`" >
                            {{category.name}}</router-link >
                        </nav>
                    </div>
                </div>
                <div class="row d-flex mt-4 justify-content-between px-5">
                    <a href="#" 
                    v-if="listProduct.length > 0"
                    v-for="(product, index) in listProduct" :key="index"
                    class="card shadow rounded-4 border text-decoration-none mb-3" style="width: 18rem;">
                        <img v-if="product.image != null" :src="urlUpload + product.image"
                            class="card-img-top p-3" alt="...">
                        <img v-else src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_4__7.png" class="card-img-top p-3" alt="">
                        <div class="card-body">
                            <p class="card-title fw-bold">{{ product.name }}</p>
                            <div class="mb-2"><b class="card-text text-danger fs-6">{{ convertPrice(Number(product.price)) }} VNĐ</b> <del
                                    class="text-secondary">35.000.000 VNĐ</del></div>
                            <p class="border rounded-1  p-1 fs-7 bg-body-secondary ">{{ product.description }}</p>
                            <div class="d-flex justify-content-between ">
                                <div class="text-warning fs-6">
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                </div>
                                <div class="text-danger fs-6">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                </div>

                            </div>
                        </div>
                    </a>
                    <div v-else>
                        <p class="alert alert-danger">Không Có Sản Phẩm</p>
                    </div>
                   
                </div>
            </div>

            <div class="laptop">
                <div class="row border-bottom py-3">
                    <div class="col-md-6">
                        <b class="fs-4 text-secondary">Laptop</b>
                    </div>
                    <div class="col-md-6 d-flex justify-content-end">
                        <nav class="nav ">
                            <a class="ms-3  btn btn-outline-secondary " aria-current="page" href="#">ASUS</a>
                            <a class="ms-3  btn btn-outline-secondary" aria-current="page" href="#">Del</a>
                            <a class="ms-3  btn btn-outline-secondary" aria-current="page" href="#">Acer</a>
                            <a class="ms-3  btn btn-outline-secondary " aria-current="page" href="#">HP</a>
                            <a class="ms-3  btn btn-outline-secondary " aria-current="page" href="#">Tuf </a>
                            <a class="ms-3  btn btn-outline-secondary " aria-current="page" href="#">Gamming</a>
                        </nav>
                    </div>
                </div>
                <div class="row d-flex mt-4 justify-content-between px-5">
                    <a href="#" class="card shadow rounded-4 border text-decoration-none mb-3" style="width: 18rem;">
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_4__7.png"
                            class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <p class="card-title fw-bold">Iphone 15 Promax 256GB Chính Hãng</p>
                            <div class="mb-2"><b class="card-text text-danger fs-6">34.000.000đ</b> <del
                                    class="text-secondary">35.000.000đ</del></div>
                            <p class="border rounded-1  p-1 fs-7 bg-body-secondary ">Không phí vận chuyển, trả góp 0%
                                qua thẻ tín dụng</p>
                            <div class="d-flex justify-content-between ">
                                <div class="text-warning fs-6">
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                </div>
                                <div class="text-danger fs-6">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href="#" class="card shadow rounded-4 border text-decoration-none mb-3" style="width: 18rem;">
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_7_1.png"
                            class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <p class="card-title fw-bold">Iphone 15 Promax 256GB Chính Hãng</p>
                            <div class="mb-2"><b class="card-text text-danger fs-6">34.000.000đ</b> <del
                                    class="text-secondary">35.000.000đ</del></div>
                            <p class="border rounded-1  p-1 fs-7 bg-body-secondary ">Không phí vận chuyển, trả góp 0%
                                qua thẻ tín dụng</p>
                            <div class="d-flex justify-content-between ">
                                <div class="text-warning fs-6">
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                </div>
                                <div class="text-danger fs-6">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href="#" class="card shadow rounded-4 border text-decoration-none mb-3" style="width: 18rem;">
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_633_1_.png"
                            class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <p class="card-title fw-bold">Iphone 15 Promax 256GB Chính Hãng</p>
                            <div class="mb-2"><b class="card-text text-danger fs-6">34.000.000đ</b> <del
                                    class="text-secondary">35.000.000đ</del></div>
                            <p class="border rounded-1  p-1 fs-7 bg-body-secondary ">Không phí vận chuyển, trả góp 0%
                                qua thẻ tín dụng</p>
                            <div class="d-flex justify-content-between ">
                                <div class="text-warning fs-6">
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                </div>
                                <div class="text-danger fs-6">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href="#" class="card shadow rounded-4 border text-decoration-none mb-3" style="width: 18rem;">
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_8__1_91.png"
                            class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <p class="card-title fw-bold">Iphone 15 Promax 256GB Chính Hãng</p>
                            <div class="mb-2"><b class="card-text text-danger fs-6">34.000.000đ</b> <del
                                    class="text-secondary">35.000.000đ</del></div>
                            <p class="border rounded-1  p-1 fs-7 bg-body-secondary ">Không phí vận chuyển, trả góp 0%
                                qua thẻ tín dụng</p>
                            <div class="d-flex justify-content-between ">
                                <div class="text-warning fs-6">
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                </div>
                                <div class="text-danger fs-6">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href="#" class="card shadow rounded-4 border text-decoration-none mb-3" style="width: 18rem;">
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_509_9__1.png"
                            class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <p class="card-title fw-bold">Iphone 15 Promax 256GB Chính Hãng</p>
                            <div class="mb-2"><b class="card-text text-danger fs-6">34.000.000đ</b> <del
                                    class="text-secondary">35.000.000đ</del></div>
                            <p class="border rounded-1  p-1 fs-7 bg-body-secondary ">Không phí vận chuyển, trả góp 0%
                                qua thẻ tín dụng</p>
                            <div class="d-flex justify-content-between ">
                                <div class="text-warning fs-6">
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                </div>
                                <div class="text-danger fs-6">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href="#" class="card shadow rounded-4 border text-decoration-none mb-3" style="width: 18rem;">
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_509_11__1.png"
                            class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <p class="card-title fw-bold">Iphone 15 Promax 256GB Chính Hãng</p>
                            <div class="mb-2"><b class="card-text text-danger fs-6">34.000.000đ</b> <del
                                    class="text-secondary">35.000.000đ</del></div>
                            <p class="border rounded-1  p-1 fs-7 bg-body-secondary ">Không phí vận chuyển, trả góp 0%
                                qua thẻ tín dụng</p>
                            <div class="d-flex justify-content-between ">
                                <div class="text-warning fs-6">
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                </div>
                                <div class="text-danger fs-6">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href="#" class="card shadow rounded-4 border text-decoration-none mb-3" style="width: 18rem;">
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/g/r/group_633_1_.png"
                            class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <p class="card-title fw-bold">Iphone 15 Promax 256GB Chính Hãng</p>
                            <div class="mb-2"><b class="card-text text-danger fs-6">34.000.000đ</b> <del
                                    class="text-secondary">35.000.000đ</del></div>
                            <p class="border rounded-1  p-1 fs-7 bg-body-secondary ">Không phí vận chuyển, trả góp 0%
                                qua thẻ tín dụng</p>
                            <div class="d-flex justify-content-between ">
                                <div class="text-warning fs-6">
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                </div>
                                <div class="text-danger fs-6">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                </div>

                            </div>
                        </div>
                    </a>
                    <a href="#" class="card shadow rounded-4 border text-decoration-none mb-3" style="width: 18rem;">
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/l/a/laptop-msi-modern-14-c13m-607vn.png"
                            class="card-img-top p-3" alt="...">
                        <div class="card-body">
                            <p class="card-title fw-bold">Iphone 15 Promax 256GB Chính Hãng</p>
                            <div class="mb-2"><b class="card-text text-danger fs-6">34.000.000đ</b> <del
                                    class="text-secondary">35.000.000đ</del></div>
                            <p class="border rounded-1  p-1 fs-7 bg-body-secondary ">Không phí vận chuyển, trả góp 0%
                                qua thẻ tín dụng</p>
                            <div class="d-flex justify-content-between ">
                                <div class="text-warning fs-6">
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                    <font-awesome-icon :icon="['fas', 'star']" />
                                </div>
                                <div class="text-danger fs-6">
                                    <font-awesome-icon :icon="['fas', 'heart']" />
                                </div>

                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <div class="banner-1">
                <div class="row py-2">
                    <b class="fs-4 text-secondary">Ưu Đãi Sinh Viên</b>
                </div>
                <div class="row d-flex mt-4 justify-content-between">
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/RightBanner-udsv-thang-10.png"
                            alt="">
                    </div>
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/RightBanner-udsv-thang-10.png"
                            alt="">
                    </div>
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/RightBanner-udsv-thang-10.png"
                            alt="">
                    </div>
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/RightBanner-udsv-thang-10.png"
                            alt="">
                    </div>
                </div>
            </div>
            <div class="banner-2">
                <div class="row py-2">
                    <b class="fs-4 text-secondary">Ưu Đãi Thanh Toán</b>
                </div>
                <div class="row d-flex mt-4 justify-content-between">
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/techcom-iphone-16-update-uu-dai-1-6%20(2).jpg"
                            alt="">
                    </div>
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/techcom-iphone-16-update-uu-dai-1-6%20(2).jpg"
                            alt="">
                    </div>
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/techcom-iphone-16-update-uu-dai-1-6%20(2).jpg"
                            alt="">
                    </div>
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/techcom-iphone-16-update-uu-dai-1-6%20(2).jpg"
                            alt="">
                    </div>
                </div>
            </div>
            <div class="banner-3">
                <div class="row py-2">
                    <b class="fs-4 text-secondary">Ưu Đãi Sinh Viên</b>
                </div>
                <div class="row d-flex mt-4 justify-content-between">
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/apple-chinh-hang-home.jpg"
                            alt="">
                    </div>
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/SIS%20asus.png"
                            alt="">
                    </div>
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/gian-hang-samsung-home.png"
                            alt="">
                    </div>
                    <div class="col-md-3">
                        <img class="w-100 border rounded-2"
                            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/xiaomi.png"
                            alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="css"></style>