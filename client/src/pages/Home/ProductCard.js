import moment from "moment";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  return (
    <>
      {products.map((product) => (
        <div
          className="cursor-pointer border border-solid rounded-lg"
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <div className="w-full rounded-lg shadow" style={{backgroundColor:"#203A43" }}>
             
             <div className="h-72">
              <img
                className="rounded-t-lg h-full w-full object-cover"
                src={product.images[0]}
                alt="productimg"
              />
             </div>
            <div className="p-5">
               <div className="h-6 overflow-hidden">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700 dark:text-white">
                  {product.name.charAt(0).toUpperCase()+product.name.slice(1)}
                </h5>
               </div>
              <div className=" h-24 overflow-hidden">
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
              </div>
              <div className="flex justify-between">
              <p className="mb-3 font-normal text-green-500">
              &#8377; {product.price}
                </p>
                <p className="text-white">
                 <span className=" text-gray-500  dark:text-gray-400">Year</span> {moment().subtract(product.age,"years").format('YYYY')}
                </p>
              </div>
              <span
                onClick={() => navigate(`/product/${product._id}`)}
                href="#@"
                className=" mt-1 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{backgroundColor:"#bdc3c7",color:"#203A43"}} >
                Read more
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
