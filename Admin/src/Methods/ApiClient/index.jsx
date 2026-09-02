import axios from "axios";
import Environment from "../../Environment/script";
const config = {
    headers: { "Content-Type": "application/json" },
};
const baseUrl = Environment.api
const postApi = (url, payload) => {
    const newUrl = baseUrl + url
    return new Promise((resolve, reject) => {
        axios
            .post(newUrl, payload, config)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: "<a href=\"#\">Why do I have this issue?</a>"
                }));
            });
    });
};
const apimethods = { postApi };
export default apimethods