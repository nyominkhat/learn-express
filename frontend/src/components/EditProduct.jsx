import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API}${id}`);
      setName(res.data.name);
      setPrice(res.data.price);
    };

    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    await axios.patch(`${import.meta.env.VITE_API}${id}`, {
      name: name,
      price: parseInt(price),
    });
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <form onSubmit={updateProduct} className="my-10">
        <div className="flex flex-col">
          <div className="mb-5">
            <label htmlFor="name" className="font-bold text-slate-700">
              Product Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full py-3 mt-1 border transition border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="price" className="font-bold text-slate-700">
              Product Price
            </label>
            <input
              id="price"
              type="text"
              className="w-full py-3 mt-1 border transition border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-lg border-indigo-500 hover:shadow"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
