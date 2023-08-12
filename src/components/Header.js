import React, { createContext, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsBag } from "react-icons/bs";
import Logo from "../img/logo.svg";
import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";
import BASE_URL from "../api_url";

export const searchResults = createContext();
export const searchTerm = createContext();

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchTerm) return;
    setIsLoading(true);
  
    try {
      const response = await axios.get(`${BASE_URL}products/search?q=${searchTerm}`);
      console.log("API response:", response.data); // Add this line
      const searchResults = response.data.products; // Adjust this line based on your response structure
      setIsLoading(false);
  
      navigate("/search", { state: { searchResults, searchTerm } });
    } catch (error) {
      console.error("Error searching:", error);
      setIsLoading(false);
    }
  };
  

  return (
    <header className={`bg-zinc-300 py-4 shadow-lg fixed w-full z-10 lg:px-8 transition-all`}>
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="w-[40px]">
            <img src={Logo} alt="" />
          </div>
        </Link>
        
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="px-2 py-1 border border-zink-400 rounded bg-zinc-300"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-violet-400 text-white px-3 py-1 rounded-xl hover:bg-fuchsia-300"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex relative"
        >
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
