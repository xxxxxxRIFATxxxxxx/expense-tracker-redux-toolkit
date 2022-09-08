import axios from "../../utils/axios";

export const getTransactions = async ({page, limit, filterMode, searchText}) => {
    let queryString;

    if (page === "" && limit === "" && filterMode === "" && searchText === "") {
        queryString = "/transactions";
    }

    else if (page && limit && filterMode === "all" && searchText === "") {
        queryString = `/transactions?_page=${page}&_limit=${limit}`;
    }

    else if (page && limit && filterMode === "income" && searchText === "") {
        queryString = `/transactions?type=income&_page=${page}&_limit=${limit}`;
    }

    else if (page && limit && filterMode === "expense" && searchText === "") {
        queryString = `/transactions?type=expense&_page=${page}&_limit=${limit}`;
    }

    else if (page && limit && filterMode === "search" && searchText) {
        const data = searchText;
        const dataArray = data.split(" ");
        const searchString = dataArray.map(word => `name_like=${word}`).join("&");
        queryString = `/transactions?${searchString}&_page=${page}&_limit=${limit}`;
    };

    const response = await axios.get(queryString);

    return {
        data: response.data,
        totalCount: response.headers["x-total-count"]
    };
};

export const addTransaction = async (data) => {
    const response = await axios.post("/transactions", data);
    return response.data;
};

export const editTransaction = async (id, data) => {
    const response = await axios.put(`/transactions/${id}`, data);
    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = axios.delete(`/transactions/${id}`);
    return response.data;
};
