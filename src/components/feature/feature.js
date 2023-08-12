import React from "react";
import { Link } from "react-router-dom";

const feature = ({ cards = [1, 2, 3] }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h2 className="text-sm text-indigo-600 tracking-widest font-medium font-semibold title-font mb-2">
            CATEGORIES
          </h2>
          <h1 className="sm:text-3xl text-2xl font-semibold title-font text-gray-900 text-center mb-1">
            Explore Our Categories
          </h1>
        </div>
        <div className="flex flex-wrap -m-4">
          {cards?.map((card) => {
            return (
              <Link
                to={`/categories/${card}`}
                className="p-1 md:w-1/5 cursor-pointer"
              >
                <div className="flex rounded-xl h-full bg-indigo-100 p-2 flex-col border border-fuchsia-400 shadow-lg hover:shadow-lg hover:bg-violet-300 transition duration-300">
                  <div className="flex items-center mb-2">
                    <h2 className="text-indigo-900 text-xl  title-font-serif capitalize">
                      {card || "Example card"}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default feature;
