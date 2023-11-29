import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:3007",
})

const getProduct = (pageSize = 3, pageIndex = 1) => {
    return axiosInstance.get(`/product/get-paging?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

export {
    getProduct
}