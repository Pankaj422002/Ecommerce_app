import axios from "axios"
import { apiUrl } from "./config"
import { getUserInfo } from "./localStorage";

export const getProducts = async ()=>{
    try{
        const response = await axios({
            url: `${apiUrl}/api/products`,
            method: "GET",
            Headers: {
                'Content-Type':'application/json'
            },
        });

        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }


    }catch(err){
        console.log(err);
        return {error : err.response.data.message ||  err.message};
    }
};

export const getProduct = async (id)=>{
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: "GET",
            Headers: {
                'Content-Type':'application/json'
            },
        });
        console.log(response);
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        console.log(err);
        return {error : err.response.data.message ||  err.message};
    }
};

export const signin = async ({email,password})=>{
    try{

        const response = await axios({
            url: `${apiUrl}/api/users/signin`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data:{
                email,
                password,
            },
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const register = async ({name,email,password,repassword})=>{
    try{

        if(password!=repassword){
            return {error: "password not match"};
        }
        const response = await axios({
            url: `${apiUrl}/api/users/register`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data:{
                name,
                email,
                password,
            },
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const update = async ({name,email,password})=>{
    try{
        const {_id, token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/users/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data:{
                name,
                email,
                password,
            },
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
}

export const createOrder = async (order)=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders`,
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
            data: order,
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        return { error: err.response ? err.response.data.message : err.message };
    }
    
}

export const getOrders = async ()=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url:`${apiUrl}/api/orders`,
            method:'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log('getoorders',response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        return {error : err.response.data.message ||  err.message};
    }

};

export const getOrder = async (id)=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${id}`,
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`,
            },
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }
    
        return response.data;
    }catch(err){
        return {error : err.message};
    }
}

export const deleteOrder = async(productId)=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url:`${apiUrl}/api/orders/${productId}`,
            method:'DELETE',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        return {error : err.response.data.message ||  err.message};
    }
}

export const deliverOrder = async(orderId,paymentResult)=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${orderId}/deliver`,
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        return { error: err.response ? err.response.data.message : err.message };
    }
   
}



export const getPaypalClientId = async()=>{
    const response = await axios({
        url: `${apiUrl}/api/paypal/clientId`,
        headers:{
            'Content-Type':'application/json'
        },
    });
    console.log(response);
    if(response.status >=200 && response.status <=300){
        return response.data.clientId;            
    }else{
        throw new Error(response.data.message);
    }

}

export const payOrder = async(orderId,paymentResult)=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/${orderId}/pay`,
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            data: paymentResult,
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        return { error: err.response ? err.response.data.message : err.message };
    }
   
}

export const getMyOrders = async ()=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url:`${apiUrl}/api/orders/mine`,
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        return { error: err.response ? err.response.data.message : err.message };
    }   
}

export const createProduct = async()=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url:`${apiUrl}/api/products`,
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('response createproduct',response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        return {error : err.response.data.message ||  err.message};
    }
}

export const updateProduct = async(product)=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url:`${apiUrl}/api/products/${product._id}`,
            method:'PUT',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: product
        });
        console.log('response',response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        return {error : err.response.data.message ||  err.message};
    }
}

export const updateProductImage = async (formData)=>{
    try{
        const {token} = getUserInfo();
        alert('hi');
        const response = await axios({
            url:`${apiUrl}/api/uploads`,
            method: 'POST',
            headers:{
                'Content-Type':'multipart/form-data',
                Authorization:`Bearer ${token}`,
            },
            data:formData,
        });
        alert('hi');
        console.log('updateproductimage',response);

        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        
        return {error: err.response || err.message};
    }
}

export const deleteProduct = async(productId)=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url:`${apiUrl}/api/products/${productId}`,
            method:'DELETE',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }

    }catch(err){
        return {error : err.response.data.message ||  err.message};
    }
}

export const getSummary = async ()=>{
    try{
        const {token} = getUserInfo();
        const response = await axios({
            url: `${apiUrl}/api/orders/summary`,
            headers: {
                Authorization:`Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        if(response.status >=200 && response.status <=300){
            return response.data;            
        }else{
            throw new Error(response.data.message);
        }


    }catch(err){
        return { error: err.response ? err.response.data.message : err.message };
    } 
}