import axios from "axios";
import Environment from "../../Environment/script";
import Swal from 'sweetalert2'
const config = {
    headers: { "Content-Type": "application/json" },
};
const imageConfig = {
    headers: { "Content-Type": "multipart/form-data" },
};
const baseUrl = Environment.api
const postApi = (url, payload) => {
    const newUrl = baseUrl + url
    return new Promise((resolve, reject) => {
        axios
            .post(newUrl, payload, imageConfig)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error || "Something went wrong");
            });
    });
};
const apimethods = { postApi };
export default apimethods