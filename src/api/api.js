import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

/* 🔐 Get Token */
export const getToken = async () => {
  const { data } = await axios.post(
    `${BASE_URL}/public/token`,
    {
      studentId: "E0123008",
      password: "445291",
      set: "A"
    }
  );

  return data.token;
};

/* 📊 Get Dataset */
export const getDataset = async (token) => {
  const { data } = await axios.get(
    `${BASE_URL}/private/data`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return data.data;
};