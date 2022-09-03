import axios from "axios";

export const getTrans = async () => {
  const { data } = await axios.get("http://localhost:9000/transactions");
  return data;
};
export const createTran = async (tranData) => {
  const { data } = await axios.post(
    "http://localhost:9000/transactions",
    tranData
  );
  return data;
};
export const editTran = async (id, tranData) => {
  const { data } = await axios.put(
    `http://localhost:9000/transactions/${id}`,
    tranData
  );
  return data;
};
export const deleteTran = async (id) => {
  const { data } = await axios.delete(
    `http://localhost:9000/transactions/${id}`
  );
  return data;
};
