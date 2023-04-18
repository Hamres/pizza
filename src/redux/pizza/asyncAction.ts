import {createAsyncThunk} from "@reduxjs/toolkit";
import {Pizza, SearchPizzaParams} from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>('pizza/fetchPizzasStatus', async (params) => {
        const {sortBy, order, category, search, currentPage} = params
        const {data} = await axios.get<Pizza[]>(
            `https://63c4126ba90856357530f9d5.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data
    }
)