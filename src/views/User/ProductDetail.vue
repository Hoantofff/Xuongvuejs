<script setup>
let urlProductDetail = 'http://localhost/vuejs-server/api.php/product-detail';
let urlCart = 'http://localhost/vuejs-server/api.php/cart';
let urlUpload = "http://localhost/vuejs-server/uploads/product/";


import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const product = ref('');
const callAPI = async () => {
    try {
        let url = urlProductDetail + '?product_id=' + route.params.idProduct
        let response = await axios.get(url)
        if (response.data.status) {
            product.value = response.data.products
        }
    } catch (error) {
        console.log(error);

    }
}
const convertPrice = (number) => {
    return number.toLocaleString("vi-VN");
}
onMounted(() => {
    callAPI();
})

const quantity = ref(1);
const addCart = async () => {
    if (quantity.value >= 1) {

        try {
            let url = urlCart
                + '/'
                + '?product_id='
                + product.value.id + '&quantity='
                + quantity.value + "&user_id="
                + JSON.parse(localStorage.getItem('userLogin')).id;
            let response = await axios.get(url)
            alert(response.data.message);
            router.push('/cart');
            
        } catch (error) {
            console.log('Lỗi API');

        }

    }
}
</script>
<template>
    <div class="main">
        <div class="container mt-5">
            <div class="row border-bottom py-2">
                <div class="d-flex justify-content-start">
                    <div class="me-3">
                        <h5 class="fw-bold">{{ product.name }}</h5>
                    </div>
                    <div class="text-warning fs-6 me-2">
                        <font-awesome-icon :icon="['fas', 'star']" />
                        <font-awesome-icon :icon="['fas', 'star']" />
                        <font-awesome-icon :icon="['fas', 'star']" />
                        <font-awesome-icon :icon="['fas', 'star']" />
                        <font-awesome-icon :icon="['fas', 'star']" />
                    </div>
                    <div>
                        <p>52 lượt xem</p>
                    </div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-md-7 ">
                    <div class="row bg-danger bg-gradient bg-opacity-75 text-white ps-3 py-5 rounded-4">
                        <div class="col-5 bg-white rounded-3 py-2 px-2 my-4">
                            <img :src="urlUpload + product.image" v-if="product.image != null" class="w-100">
                            <img v-else
                                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
                                class="w-100 ">
                        </div>
                        <div class="col-7 px-4 py-2 my-4 ">
                            <h5>Tính năng nổi bật</h5>
                            <ul>
                                <li>{{ product.description }}</li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div class="col-md-5 ">
                    <div class="row">
                        <div class="d-flex justify-content-around">
                            <a href="#"
                                class="text-dark text-decoration-none text-center border px-5 py-1 rounded-2 shadow-sm">
                                <b class="text-secondary-emphasis " style="font-size: 0.9rem;">12GB 1TB</b><br>
                                <span style="font-size: 0.8rem;">38.490.000 đ</span>
                            </a>
                            <a href="#"
                                class="text-dark text-decoration-none text-center border px-5 py-1 rounded-2 shadow-sm">
                                <b class="text-secondary-emphasis">12GB 1TB</b><br>
                                <span style="font-size: 0.8rem;">38.490.000 đ</span>
                            </a>
                            <a href="#"
                                class="text-dark text-decoration-none text-center border px-5 py-1 rounded-2 shadow-sm">
                                <b class="text-secondary-emphasis">12GB 1TB</b><br>
                                <span style="font-size: 0.8rem;">38.490.000 đ</span>
                            </a>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <p class="text-secondary-emphasis fw-bold ms-1">Chọn màu để xem giá và chi nhánh có hàng</p>
                    </div>
                    <div class="row">
                        <div class="d-flex justify-content-around">
                            <a href="#"
                                class="text-dark text-decoration-none text-center border px-5 py-1 rounded-2 shadow-sm">
                                <b class="text-secondary-emphasis " style="font-size: 0.9rem;">Xám</b><br>
                                <span style="font-size: 0.8rem;">38.490.000 đ</span>
                            </a>
                            <a href="#"
                                class="text-dark text-decoration-none text-center border px-5 py-1 rounded-2 shadow-sm">
                                <b class="text-secondary-emphasis">Vàng</b><br>
                                <span style="font-size: 0.8rem;">38.490.000 đ</span>
                            </a>
                            <a href="#"
                                class="text-dark text-decoration-none text-center border px-5 py-1 rounded-2 shadow-sm">
                                <b class="text-secondary-emphasis">Tím</b><br>
                                <span style="font-size: 0.8rem;">38.490.000 đ</span>
                            </a>
                        </div>
                    </div>
                    <div class="row bg-body-secondary ms-1 mt-2 p-2 rounded-2">
                        <div class="col-6 d-flex align-items-center justify-content-center">
                            <div class="fs-3 me-2">
                                <font-awesome-icon :icon="['fas', 'hand-holding-dollar']" />
                            </div>
                            <div class="ms-5">
                                <strong class="trade-price">Số Lượng</strong>
                                <br>
                                <input type="number" v-model="quantity" class="form-control w-50" id="">
                            </div>
                        </div>
                        <div class="col-6 border-danger border rounded-2 shadow-sm p-1">
                            <div class="text-center">
                                <strong class="trade-price">{{ convertPrice(Number(product.price)) }} VNĐ</strong>
                                <br>
                                <span class="" style="font-size: 0.8rem;">Khi thu cũ lên đời</span>
                            </div>
                        </div>
                    </div>
                    <div class="row bg-danger  bg-opacity-10 ms-1 mt-2 p-2 rounded-2">
                        <div>
                            <span style="font-size: 0.9rem;">Tiết kiệm thêm đến <b
                                    class="text-danger fw-bold">290.000đ</b> cho Smember</span><br>
                            <span style="font-size: 0.9rem;">hoặc <b class="text-danger fw-bold">600.000đ</b> cho
                                S-Student</span><br>
                            <a class="text-danger" style="font-size: 0.8rem;" href="#">Kiểm Tra giá cuối cùng của
                                bạn</a>
                        </div>
                    </div>
                    <div class="row mt-2 ">
                        <div class="col ms-3 p-0">
                            <div id="carouselExample" class="carousel slide ">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:120/q:90/plain/https://dashboard.cellphones.com.vn/storage/iPhone-product-banner-v1.png"
                                            class="d-block w-100 rounded-2">
                                    </div>
                                    <div class="carousel-item">
                                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:120/q:90/plain/https://dashboard.cellphones.com.vn/storage/iPhone-product-banner-v1.png"
                                            class="d-block w-100 rounded-2">
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
                    <div class="row mt-2">
                        <div class="col-10">
                            <button class="btn w-100" style="background-image: linear-gradient(#f52f32, #e11b1e);">
                                <span class="fw-bold">Mua Ngay</span> <br>
                                <span style="font-size: 0.9rem;">(Giao nhanh chỉ từ 2 giờ hoặc nhận tại cửa hàng)</span>
                            </button>
                        </div>
                        <div class="col-2 px-0">
                            <button @click="addCart"
                                class="btn border-danger border-2 d-flex align-items-center justify-content-center flex-column w-100 h-100"
                                style="border: linear-gradient(#f52f32, #e11b1e);">
                                <font-awesome-icon class="text-danger fs-4 " :icon="['fas', 'cart-shopping']" />
                                <span style="font-size: 0.4rem;">Thêm vào giỏ</span>
                            </button>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-6">
                            <button class="btn w-100 bg-primary ">
                                <span class="fw-bold text-white">Trả Góp</span> <br>
                                <span class=" text-white" style="font-size: 0.9rem;">Trả trước chỉ từ 2.300.000 đ</span>
                            </button>
                        </div>
                        <div class="col-6">
                            <button class="btn w-100 bg-primary ">
                                <span class="fw-bold text-white">Trả Góp 0% qua thẻ</span> <br>
                                <span class=" text-white" style="font-size: 0.9rem;">Không phí chuyển đổi</span>
                            </button>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <button class="btn w-100 bg-warning bg-gradient">
                            <span class="fw-bold text-white">Thu Cũ Đổi Mới</span> <br>
                            <span class=" text-white" style="font-size: 0.9rem;">Không phí chuyển đổi</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="row border-top mt-5">
                <div class="row mt-2">
                    <div class="col-4">
                        <a
                            class="bg-danger btn text-decoration-none bg-opacity-10 p-1 px-2 text-danger fw-bold border-danger ">Sản
                            Phẩm Tương Tự</a>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-4">
                        <p class="text-secondary fs-4">SẢN PHẨM TƯƠNG TỰ</p>
                    </div>
                </div>
                <div class="row d-flex mt-4 justify-content-between px-5">
                    <a href="#" class="card shadow rounded-4 border text-decoration-none mb-3" style="width: 18rem;">
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png"
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
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-10-9-inch-2022.png"
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
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-plus_1__1.png"
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
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_redmi_14c_5_.png"
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
            <div class="row mt-5 border shadow bg-body-secondary px-4 py-3">
                <div class="row ">
                    <span class="fs-4 text-secondary">Đánh Giá</span>
                </div>
                <div class="row border rounded-3 bg-white p-2">
                    <div class="col-1">
                        <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:55:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/chibi2.png"
                            alt="">
                    </div>
                    <div class="col-11">
                        <textarea class="w-100 border border border-0 h-100"
                            placeholder="Xin mời để lại câu hỏi, CellphoneS sẽ trả lời lại trong 1h, các câu hỏi sau 22h - 8h sẽ được trả lời vào sáng hôm sau"></textarea>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>
<style scoped lang="css"></style>