import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../utils/config';

// Acción para agregar una categoría
export const categoryAdd = createAsyncThunk(
    'category/categoryAdd',
    async ({ name, image }, { rejectWithValue, fulfillWithValue, getState }) => {
        const { token } = getState().auth; // Obtén el token del estado global
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        };
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);
            const { data } = await axios.post(`${base_url}/api/category-add`, formData, config);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Acción para obtener categorías
export const get_category = createAsyncThunk(
    'category/get_category',
    async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue, getState }) => {
        const { token } = getState().auth; // Obtén el token del estado global
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        };
        try {
            const { data } = await axios.get(
                `${base_url}/api/category-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
                config
            );
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Acción para eliminar una categoría
export const delete_category = createAsyncThunk(
    'category/delete_category',
    async (categoryId, { rejectWithValue, fulfillWithValue, getState }) => {
        const { token } = getState().auth; // Obtén el token del estado global
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        };
        try {
            const { data } = await axios.delete(`${base_url}/api/category-delete/${categoryId}`, config);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Reducer de categorías
export const categoryReducer = createSlice({
    name: 'category',
    initialState: {
        successMessage: '',
        errorMessage: '',
        loader: false,
        categorys: [],
        totalCategory: 0,
    },
    reducers: {
        messageClear: (state) => {
            state.errorMessage = '';
            state.successMessage = '';
        },
    },
    extraReducers: {
        [categoryAdd.pending]: (state) => {
            state.loader = true;
        },
        [categoryAdd.rejected]: (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        },
        [categoryAdd.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            state.categorys = [...state.categorys, payload.category];
        },
        [get_category.pending]: (state) => {
            state.loader = true;
        },
        [get_category.rejected]: (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        },
        [get_category.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.totalCategory = payload.totalCategory;
            state.categorys = payload.categorys;
        },
        [delete_category.pending]: (state) => {
            state.loader = true;
        },
        [delete_category.rejected]: (state, { payload }) => {
            state.loader = false;
            state.errorMessage = payload.error;
        },
        [delete_category.fulfilled]: (state, { payload }) => {
            state.loader = false;
            state.successMessage = payload.message;
            // Filtrar la categoría eliminada del estado
            state.categorys = state.categorys.filter((category) => category._id !== payload.categoryId);
        },
    },
});

export const { messageClear } = categoryReducer.actions;
export default categoryReducer.reducer;
