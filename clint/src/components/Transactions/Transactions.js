import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrans } from "../../Redux/features/transaction/transactionsSlice";
import Transaction from "./Transaction";

export default function Transactions() {
  const dispatch = useDispatch();
  const { isLoading, isError, error, transactions } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTrans());
  }, [dispatch]);

  let content = null;

  if (isLoading) {
    content = <h1>...Loading</h1>;
  }

  if (!isLoading && isError) {
    content = <p className="error">{error}</p>;
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    content = <p className="error">No Item found</p>;
  }

  if (!isLoading && !isError && transactions?.length > 0) {
    content = transactions.map((item) => (
      <Transaction transaction={item} key={item.id} />
    ));
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
}
