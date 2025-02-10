import axios from "axios"

export const getAllUserAPI = (idUsers) => {
return axios({
    method: 'GET',
    url: `https://maternitycare.azurewebsites.net/api/users/${idUsers}`,
    headers: {
        'Content-Type': 'application/json',
    }
})
}

export const getUserByIdAPI =(id) => {
return axios({
    method: 'GET',
    url: `https://maternitycare.azurewebsites.net/api/users/${id}`,
    headers: {
        'Content-Type': 'application/json',
    }
})
} 

export const updateUserAPI = (id, data) => {
return axios({
    method: 'PUT',
    url: `https://maternitycare.azurewebsites.net/api/users/${id}`,
    headers: {
        'Content-Type': 'application/json',
    },
    data: data
})
}



export const  activeUserAPI = (id) => {
return axios({
    method: 'PUT',
    url: `https://maternitycare.azurewebsites.net/api/users/active/${id}`,
    headers: {
        'Content-Type': 'application/json',
    }
})
}