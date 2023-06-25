import { Link } from "react-router-dom";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";

const ProductList = () => {
  const { mutate } = useSWRConfig();
  const fetcher = async () => {
    const response = await axios.get(import.meta.env.VITE_API);
    return response.data;
  };

  const { data } = useSWR("products", fetcher);

  if (!data) {
    return <h2>Loading ...</h2>;
  }

  const deleteProduct = async (productId) => {
    await axios.delete(`${import.meta.env.VITE_API}${productId}`);
    mutate("products");
  };

  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <Link
          to="/add"
          className="bg-green-500 hover:bg-green-700 border transition border-slate-300 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add New
        </Link>
        <div className="relative shadow rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product) => {
                return (
                  <tr
                    key={`${product.name + product.id}`}
                    className="bg-white border-b"
                  >
                    <td className="py-3 px-1 text-center">1</td>
                    <td className="py-3 px-6 font-medium text-gray-900">
                      {product.name}
                    </td>
                    <td className="py-3 px-6">{product.price}</td>
                    <td className="py-3 px-1 text-center">
                      <Link
                        to={`/edit/${product.id}`}
                        className="font-medium bg-blue-400 transition hover:bg-blue-600 px-3 py-1 text-white rounded mr-1"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          deleteProduct(product.id);
                        }}
                        className="font-medium bg-red-400 transition hover:bg-red-600 px-3 py-1 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
