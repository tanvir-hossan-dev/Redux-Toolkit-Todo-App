import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import {
  editActive,
  deleteTransaction,
} from "../../Redux/features/transaction/transactionsSlice";

export default function Transaction({ transaction }) {
  const dispatch = useDispatch();
  const { name, amount, type, id } = transaction;

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(deleteTransaction(id));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button onClick={handleEdit} className="link">
          <img alt="Edit" className="icon" src={editImage} />
        </button>
        <button onClick={handleDelete} className="link">
          <img alt="Delete" className="icon" src={deleteImage} />
        </button>
      </div>
    </li>
  );
}
