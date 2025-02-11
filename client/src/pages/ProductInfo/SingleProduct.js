import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { SetLoader } from "../../redux/LoadersSlice";
import { GetProductById, getAllBids } from "../../Apicalls/products";
import Divider from "../../components/Divider";
import { useParams } from "react-router-dom";
import moment from "moment";
import BidModel from "./BidModel";

const SingleProduct = () => {
  const {user} = useSelector((state)=>state.users);
  const [selectedImagesIndex, setselectedImagesIndex] = useState(0);
  const [showAddNewBid, setshowAddNewBid] = useState(false);
  const [product, setproduct] = useState(null);
  const [filters, setfilters] = useState({
    status: "approved",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsResponse = await getAllBids({product:id});
        setproduct({
          ...response.data,
          bids:bidsResponse.data
        });
      } else {
        throw new Error("Product not fiilters");
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  },[]);

  return (
    product && (
      <div className="">
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImagesIndex]}
              alt="productImg"
              className="w-full h-96 object-cover rounded-md border border-solid"
            />
            <div className="flex gap-2">
              {product.images.map((image, index) => {
                return (
                  <img
                  key={index}
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer p-2" +
                      (selectedImagesIndex === index
                        ? "border-2 border-solid border-green-700"
                        : "")
                    }
                    src={image}
                    onClick={() => setselectedImagesIndex(index)}
                    alt="pics"
                  />
                );
              })}
            </div>
            <Divider />
            <div>
              <h1 style={{color:"#203A43" , letterSpacing:"1px"}}>Added On</h1>
              <span>
                {moment(product.createdAt).format("MMM D , YYYY hh:mm A")}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">

            <div>
              <h1 className="text-2xl font-semibold" style={{color:"#203A43" , letterSpacing:"1px"}}>
                {product.name}
              </h1>
              <span>{product.description}</span>
            </div>

            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold" style={{color:"#203A43", letterSpacing:"1px"}}>
                Product Details
              </h1>

              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>${product.price}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span>{product.category}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Purchase Invoice Available</span>
                <span>{product.billAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Plant Health Guarantee Available</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Gardening Accessories Included</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Pot Included</span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Plant Damage</span>
                <span>{product.productdamage ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Grown by Seller</span>
                <span>{product.firstowner ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Leaf or Stem Damage</span>
                <span>{product.scratches ? "Yes" : "No"}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>product age</span>
                <span>
                  {product.age} {product.monYears}
                </span>
              </div>

              {product.monYears === 'Months' ? (
               <div className="flex justify-between mt-2">
               <span>Purchased Month</span>
               <span>
               {moment().subtract(product.age,"Months").format('MMM-YYYY')}
               </span>
             </div>
              ):(
                <div className="flex justify-between mt-2">
                <span>Purchased Year</span>
                <span>
                   {moment().subtract(product.age,"years").format('YYYY')}
                </span>
              </div>
              )}
            </div>

            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold" style={{color:"#203A43" , letterSpacing:"1px"}}>
                Product Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Owner Name</span>
                <span>{product.seller.name}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
            </div>

            {/* bids */}

            <Divider />
            <div className="flex flex-col">

              <div className="flex justify-between mb-5">
                <h1 className="text-2xl font-semibold" style={{color:"#203A43", letterSpacing:"1px"}}>Bids</h1>
                <Button onClick={() => setshowAddNewBid(!showAddNewBid)}
                disabled={user._id === product.seller._id}
                >New Bid</Button>
              </div>

              {product.showBidsProductPage && product?.bids?.map((bid)=>{
                return <div className="border border-gray-300 border-solid p-2 rounded m-1">

                    <div className="flex justify-between text-gray-600">
                      <span>Name</span>
                      <span>{bid.buyer.name}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                    <span>Bid Amount</span>
                      <span>${bid.bidAmount}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Bid Place On</span>
                      <span>{moment(bid.createdAt).format("MMM D ,YYYY hh:mm A")}</span>
                    </div>

                  </div>
              })}
            </div>
          </div>
        </div>
        {showAddNewBid && (
          <BidModel
            product={product}
            reloadData={getData}
            showBidModel={showAddNewBid}
            setshowBidModel={setshowAddNewBid}
          />
        )}
      </div>
    )
  );
};

export default SingleProduct;
