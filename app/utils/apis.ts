import axios from '@app/hooks/useAxios';

export const updateBrand = async (body) => {
  try {
    const response = await axios.post('brands/update_brand', body);
    return response.data;
  } catch (e: any) {
    return {
      error: e.response ? e.response.data.error : e.message,
    };
  }
};

export const deleteBrand = async (body) => {
  try {
    const response = await axios.post('brands/delete_brand', body);
    return response.data;
  } catch (e: any) {
    return {
      error: e.response ? e.response.data.error : e.message,
    };
  }
};

export const updateUser = async (body) => {
  try {
    const response = await axios.post('user/update_user', body);
    return response.data;
  } catch (e: any) {
    return {
      error: e.response ? e.response.data.error : e.message,
    };
  }
};

export const removeCustomer = async (body) =>{
  try {
    const response = await axios.post('user/removeCustomer_Shopkeeper', body);
    return response.data;
  } catch (e: any) {
    return {
      error: e.response ? e.response.data.error : e.message,
    };
  }
}

export const addCustomer = async (body) =>{
  try {
    const response = await axios.post('user/addCustomer_Shopkeeper', body);
    return response.data;
  } catch (e: any) {
    return {
      error: e.response ? e.response.data.error : e.message,
    };
  }
}

export const logoutUser = async (body) => {
  try {
    const response = await axios.post('user/logout', body);
    return response.data;
  } catch (e: any) {
    return {
      error: e.response ? e.response.data.error : e.message,
    };
  }
};

export const updateProduct = async (body) => {
  try {
    const response = await axios.post('product/update', body);
    return response.data;
  } catch (e: any) {
    return {
      error: e.response ? e.response.data.error : e.message,
    };
  }
};

export const deleteProdouct = async (body) => {
  try {
    const response = await axios.post('product/delete', body);
    return response.data;
  } catch (e: any) {
    return {
      error: e.response ? e.response.data.error : e.message,
    };
  }
};

export const expoPushToken = async (body) => {
  try {
    const response = await axios.post('user/notification/register', body);
    return response.data;
  } catch (e: any) {
    return {
      error: e.response ? e.response.data.error : e.message,
    };
  }
};

export const updateOrder = async (body) => {
  try {
    const response = await axios.post('order/update', body);
    return response.data;
  } catch (e: any) {
    return {
      error: e.response ? e.response.data.error : e.message,
    };
  }
};