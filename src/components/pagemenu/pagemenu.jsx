import { NavLink } from "react-router-dom"

const PageMenu = () => {

  return (
    <div>
      <nav className="mb-4 p-4 bg-primary rounded">
        <ul className="flex justify-center items-center list-none">
          <li className="ml-4 text-white">
            <NavLink to='/profile'>Profile</NavLink>
          </li>
          <li className="ml-4 text-white">
            <NavLink to='/wallet'>Wallet</NavLink>
          </li>
          <li className="ml-4 text-white">
            <NavLink to='/wishlist'>WishList</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
  
}

export default PageMenu

