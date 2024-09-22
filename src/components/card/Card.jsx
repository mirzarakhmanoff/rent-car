import React, { memo } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addcart } from "../../redux/slices/cartSlices";

const Card = ({ car }) => {
  const dispatch = useDispatch();

  return (
    <div className="max-w-sm mx-auto mb-10">
      <div
        className="bg-white-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl relative"
        key={car._id}
      >
        {/* Car Image */}
        <Link to={`/products/${car._id}`}>
          <div className="w-full h-60 overflow-hidden group">
            <img
              className="w-full h-full object-contain transition duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.src =
                  "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg";
              }}
              src={
                car.thumbnail ??
                "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg"
              }
              alt={car.name}
            />
          </div>
        </Link>

        <div className="p-4">
          <p className="text-gray-400 text-sm">{car.model}</p>
          <p className="text-lg font-bold text-white">{car.name}</p>

          <div className="flex items-center gap-2 mt-2">
            <FaStar className="text-purple-400" />
            <span className="text-gray-300 text-sm">Seats: {car.seats}</span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div>
              <p className="text-gray-400 text-sm">By {car.transmission}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-purple-500 text-xl font-bold">
                  ${car.price}
                </span>
                {car.rent_price && (
                  <span className="line-through text-gray-400 text-sm">
                    ${car.rent_price}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => dispatch(addcart(car))}
              className="bg-purple-700 text-white py-1 px-3 rounded-lg flex items-center gap-2 transition duration-300 hover:bg-purple-800"
            >
              <IoCartOutline />
              <span className="text-sm font-semibold">Add</span>
            </button>
          </div>
        </div>

        <button className="absolute top-4 right-4 bg-purple-500 text-white p-2 rounded-full transition duration-300 hover:bg-purple-600">
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default memo(Card);
