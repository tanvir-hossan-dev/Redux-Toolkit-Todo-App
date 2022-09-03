import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTran,
  editInActive,
  updateTran,
} from "../Redux/features/transaction/transactionsSlice";

export default function Form() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const { error, editing } = useSelector((state) => state.transactions);

  const reset = () => {
    setAmount("");
    setType("");
    setName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTran({ name, type, amount: Number(amount) }));
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTran({ id: editing.id, tranData: { name, type, amount } }));
    reset();
    dispatch(editInActive());
  };

  const handleCancel = () => {
    setEditMode(false);
    reset();
  };

  useEffect(() => {
    const { id, name, type, amount } = editing;
    if (id) {
      setEditMode(true);
      setName(name);
      setAmount(amount);
      setType(type);
    } else {
      setEditMode(false);
    }
  }, [editing]);

  return (
    <div className="form">
      <h3>Add new transaction</h3>
      <form onSubmit={editMode ? handleUpdate : handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="transaction_name"
            placeholder="Enter Title"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              required
              checked={type === "income"}
              onChange={(e) => setType(e.target.value)}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              required
              placeholder="Expense"
              checked={type === "expense"}
              onChange={(e) => setType(e.target.value)}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter Amount"
            name="transaction_amount"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>

      <p className="error">{error}</p>

      {editMode && (
        <button onClick={handleCancel} className="btn cancel_edit">
          Cancel Edit
        </button>
      )}
    </div>
  );
}
