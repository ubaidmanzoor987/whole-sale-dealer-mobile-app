import axios from '@app/hooks/useAxios';

export const updateBrand = async (body) => {
  try {
    const response = await axios.post('brands/shopkeeper/update_brand', body);
    return response.data;
  } catch (e: any) {
    return { 
      error : e.response ? e.response.data.error :  e.message
    }
  }
};

export const deleteBrand = async (body) => {
    try {
      const response = await axios.post('brands/shopkeeper/delete_brand', body);
      return response.data;
    } catch (e: any) {
      return { 
        error : e.response ? e.response.data.error :  e.message
      }
    }
  };