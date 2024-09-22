import React from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addcart, removeFromCart } from "../../../redux/slices/cartSlices";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.value);

  const totalAmount = items.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Ваш Корзина</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((el) => (
          <div
            key={el._id}
            className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            {/* Image Section */}
            <div className="w-full h-60 overflow-hidden">
              <img
                onError={(e) => {
                  e.target.src =
                    "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg";
                }}
                src={
                  el.thumbnail ??
                  "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg"
                }
                alt={el.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col gap-2">
              <p className="text-sm text-gray-500">{el.model}</p>
              <p className="text-lg font-bold text-gray-800">{el.name}</p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400">
                <FaStar />
                <p className="text-sm text-gray-500">({el.seats})</p>
              </div>

              {/* Wishlist Button */}
              <div className="absolute top-2 right-2">
                <button className="bg-red-500 text-white p-2 rounded-full">
                  <FaHeart />
                </button>
              </div>

              {/* Transmission */}
              <div className="flex items-center text-gray-500 text-sm">
                <p>By</p>
                <p className="text-green-500 font-medium ml-1">
                  {el.transmission}
                </p>
              </div>

              {/* Price and Add to Cart */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-2">
                  <p className="text-xl text-green-500 font-bold">
                    ${el.price}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(el._id))}
                  className="bg-red-500 text-white flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-600 transition"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Amount */}
      <div className="mt-6 text-lg font-bold">
        Общая сумма: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
