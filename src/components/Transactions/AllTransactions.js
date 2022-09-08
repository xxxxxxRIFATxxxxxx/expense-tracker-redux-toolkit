import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, updateFilterMode, updatePage, updateTotalTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function AllTransactions() {
    const [ searchText, setSearchText ] = useState("");
    const [ searchMode, setSearchMode ] = useState(false);

    const { transactions, page, limit, totalTransactions, filterMode, isLoading, isError } = useSelector(
        (state) => state.transaction
    );

    const dispatch = useDispatch();

    const generatePaginationPage = () => {
        let pages = Math.ceil(totalTransactions / limit);
        let content = [];

        for (let i = 1; i <= pages; i++) {
            content.push((
                <button 
                    key={Math.random()} 
                    onClick={() => dispatch(updatePage(i))} 
                    className="custom-btn"
                    style={{marginRight: "10px"}}
                >
                    {i}
                </button>
            ))
        };
        
        return content;
    };

    const handleFilterMode = (e) => {
        dispatch(updatePage(1));
        setSearchText("");
        dispatch(updateFilterMode(e.target.value));
    };

    const handleSearchText = (e) => {
        setSearchText(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(updatePage(1));
        dispatch(updateFilterMode("search"));
        setSearchMode(!searchMode);
    };

    useEffect(() => {
        dispatch(fetchTransactions({
            page: page,
            limit: limit,
            filterMode: filterMode, 
            searchText: searchText,
        }))
            .then(data => dispatch(updateTotalTransactions(data.payload.totalCount)))
    }, [dispatch, filterMode, page, limit, totalTransactions, searchMode]);

    // decide what to render
    let content = null;
    if (isLoading) content = <p>Loading...</p>;
 
    if (!isLoading && isError)
        content = <p className="error">There was an error occured</p>;
 
    if (!isLoading && !isError && transactions?.length > 0) {
        content = transactions.map((transaction) => (
            <Transaction key={transaction.id} transaction={transaction} />
        ));
    }

    if (!isLoading && !isError && transactions?.length === 0) {
        content = <p>No transactions found!</p>;
    };

    return (
        <>
            <div style={{display: "flex"}}>
                <div style={{marginRight: "10px"}}>
                    <input onChange={handleFilterMode} type="radio" name="filterType" value="income" />
                    <span>Income</span>
                </div>

                <div style={{marginRight: "10px"}}>
                    <input onChange={handleFilterMode} type="radio" name="filterType" value="expense" />
                    <span>Expense</span>
                </div>

                <div style={{marginRight: "10px"}}>
                    <input checked={filterMode === "all" ? true : false} onChange={handleFilterMode} type="radio" name="filterType" value="all" />
                    <span>All</span>
                </div>
            </div>

            <div>
                <form onSubmit={handleFormSubmit}>
                    <input type="text" value={searchText} onChange={handleSearchText} />
                </form>
            </div>

            <div className="conatiner_of_list_of_transactions">
                <ul>{content}</ul>
            </div>

            <div>
                {generatePaginationPage()}
            </div>
        </>
    );
}
