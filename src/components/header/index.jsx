import { Link, NavLink ,useNavigate} from "react-router-dom"; // Importing Link and NavLink for navigation
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // Importing shopping cart icon from react-icons/fa
import { useState,useEffect } from "react"; // Importing useState hook from React
import { HiOutlineMenu } from "react-icons/hi"; // Importing menu icon from react-icons/hi
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { logout, RESET_USER } from "../../redux/users/userSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ShowLogOut,ShowLogin } from "../hiddenLinks.jsx";
import { UserName } from "../../pages/profile/profile.jsx";


// Logo component
export const logo = (
  <div className="text-white cursor-pointer">
    <Link to='/shop'>
      <h2 className="text-xl"> {/* Text size can be adjusted as needed */}
        Shop<span className="text-orange-500">Online</span> {/* Tailwind class for orange text */}
      </h2>
    </Link>
  </div>
);

// Custom NavLink component
const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to} // Destination URL
      className= {({ isActive }) =>
        `relative text-xl ${isActive ? 'border-b-2 border-white' : ''} hover:text-orange-500 w-full`
      }
    >
      {children} {/* Children elements */}
    </NavLink>
  );
};

// Cart component
const cart = (
  <span className="flex text-white relative hover:text-orange-500 pl-0">
    <Link to="/cart" className="flex items-center relative">
      cart
      <FaShoppingCart size={25} className="ml-0" />
      <p className="absolute top-[-1rem] left-[3rem] font-bold p-0">0</p>
    </Link>
  </span>
);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false); // State to manage the menu visibility
  const [scrollPage, setScrollPage] = useState(false);
  const { loggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fixNavBar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true)
    } else { 
      setScrollPage(false)
    }
  }
  
  useEffect(() => {  
  window.addEventListener('scroll', fixNavBar);
  return () => {
    window.removeEventListener('scroll', fixNavBar);
  };
}, [loggedIn, navigate]);

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle the showMenu state
  };

// Function to toggle menu visibility
  const hideMenu = () => {
    setShowMenu(false);
  };

  const logOutUser = async () => { 
    await dispatch(logout())
      .unwrap()
      .then(() => {
        dispatch(RESET_USER()); // Resets form after successful submission
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  
  return (
    <header className={`bg-dark-blue text-white ${scrollPage ? "w-full fixed top-0 transition-all duration-[500ms] z-[9]" : "relative"}`}>
      <div className="w-full h-20 border-t-2 flex items-center justify-between">
        {logo}
        <div className="flex-row flex justify-between space-x-8">
          <div className ="p-2 justify-start">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `text-white ${isActive ? 'text-danger relative after:block after:absolute after:left-0 after:bottom-[-3px] after:w-full after:h-1 ' : 'hover:text-orange-500  after:bg-white'}`
              }
            >
              Shop
            </NavLink>
          </div>
          <div className="flex p-2 space-x-4 pr-6 justify-end">
            <ShowLogin>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-white ${isActive ? 'text-danger relative after:block after:absolute after:left-0 after:w-full after:h-1 ' : 'hover:text-orange-500  after:bg-white'}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `text-white ${isActive ? 'text-danger relative after:block after:absolute after:left-0 after:w-full after:h-1' : 'hover:text-orange-500  after:bg-white'}`
                }
              >
                Register
              </NavLink>
            </ShowLogin>
            <ShowLogOut>
              <NavLink to="/profile"
                className={({ isActive }) =>
                    `flex items-center text-white ${isActive ? 'text-danger relative after:block after:absolute after:left-0 after:w-full after:h-1' : 'hover:text-orange-500 after:bg-white'}`
                   }
              >
                <FaUserCircle size='20px' color="#ff7722"  className="pr-1" />
                <UserName/>
              </NavLink>
              <NavLink
                  to="/myorder"
                  className={({ isActive }) =>
                    `text-white ${isActive ? 'text-danger relative after:block after:absolute after:left-0 after:w-full after:h-1' : 'hover:text-orange-500  after:bg-white'}`
                  }
                >
                My Order
              </NavLink> 
              <NavLink onClick={logOutUser}
                className={({ isActive }) =>
                    `text-white ${isActive ? 'text-danger relative after:block after:absolute after:left-0 after:w-full after:h-1' : 'hover:text-orange-500 after:bg-white'}`
                  }
              >
                logout
              </NavLink>
              {cart}
            </ShowLogOut>
          </div>
          <HiOutlineMenu size={28} onClick={toggleMenu} className="md:hidden text-white cursor-pointer" />
        </div>
      </div>
      {showMenu && (
        <div className="md:hidden border-t-2 absolute top-0 left-0 h-full  flex">
          <nav className="flex flex-auto gap-2 divide-y-2 divide-white w-full border-white flex-col items-start p-4 bg-blue-950 z-20">
            <div className="flex mb-6 gap-4 w-full">
              {logo}
              <FaTimes size={30} className="cursor-pointer"  onClick= {hideMenu} />
            </div>
            <CustomNavLink to="/shop">Shop</CustomNavLink>
            <CustomNavLink to="/login">Login</CustomNavLink>
            <CustomNavLink to="/register">Register</CustomNavLink>
            <div className="w-full pt-3">
              {cart}
            </div>
          </nav>
          <div 
            onClick={hideMenu} 
            className="flex-auto w-full h-full opacity-50 z-10"
          ></div>
        </div>
      )}
    </header>
  );
};

export default Header;
