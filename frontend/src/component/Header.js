import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assest/dnklogo.jpg";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux, logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import decode from 'jwt-decode';
import { useEffect } from "react";
import { sellerRedux } from "../redux/userSlice";
import {deleteAllCartItem} from "../redux/productSlice"



const Header = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const userData=useSelector((state)=>state.user.userdetail);
  const dispatch = useDispatch();
  const sellerData = useSelector((state)=>state.user.sellerdetail);
const checkToken=async ()=>{

  const token = localStorage.getItem('token');
  if (!token)
  {
    dispatch(logoutRedux());
    navigate("/login");
    return true;
  }
  const decodedToken = decode(token);
  dispatch(loginRedux(decodedToken));


  if(userData.type==="seller")
  {
    const email = userData.email;
    const fetchData = await fetch(`http://localhost:8000/getSellerData/${email}`,{
      method:"GET",
      headers:{
        "content-type":"application/json",
      }
    });
    const response = await fetchData.json();
    if(response.mes==="sellerdetail")
    {
      console.log(response.data);
      dispatch(sellerRedux(response.data));
      toast("seller data recieved");
    }
    else{
      toast("didnt recieve seller data");
    }
  }
}

useEffect(() => {
  checkToken();
}, [])



  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(deleteAllCartItem());
    dispatch(logoutRedux());
    localStorage.removeItem('token');
    toast("Logout successfully");
    navigate("/");
  };

  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}

      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-12">
            <img src={logo} className="h-full" />
          </div>
        </Link>

        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"menu/652d38bdf91e69262204a0d6"}>Menu</Link>
            {userData.type==="seller" && (<Link to={"Dashboard"}>Dashboard</Link>)}
            {userData.type==="user" && (<Link to={"BecomeSeller"}>Become Seller</Link>)}
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center ">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New product
                  </Link>
                )}
                {userData.image ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-red-500"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link
                    to={"menu/63f0fdbb3bcc2f97fa53d25d"}
                    className="px-2 py-1"
                  >
                    Menu
                  </Link>
                  {userData.type==="user" && (<Link to={"BecomeSeller"} className="px-2 py-1">
                    Become Seller
                  </Link>)}
                  {userData.type==="seller" && (<Link to={"Dashboard"} className="px-2 py-1">
                     Dashboard
                  </Link>)}
                  <Link to={"contact"} className="px-2 py-1">
                    Contact
                  </Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
    </header>
  );
};

export default Header;

