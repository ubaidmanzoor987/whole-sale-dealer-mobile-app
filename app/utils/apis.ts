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
