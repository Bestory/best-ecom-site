import {
  BsCartCheck,
  BsClockHistory,
  BsFillCreditCardFill,
} from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";


const data = [
  {
    icon: <FaShippingFast size={30} className="text-blue-600"/>,
    heading: "Free shiping",
    text: "We offer free shipping on some special product"
  },
  {
    icon: <BsFillCreditCardFill size={30} className="text-yellow-700"/>,
    heading: "Secure payment",
    text: "Make secure payment to your product"
  },
  {
    icon: <BsCartCheck size={30} className="text-pink-700"/>,
    heading:"Quality products",
    text: "we sell only products from tested and proven brands"
  },
  {
    icon: <BsClockHistory size={30}  className="text-green-700"/>,
    heading: "24/7",
    text: "Get access to support from our expert support team."
  }
];
const HomeInfoBox = () => {
  return (
    <div className="flex flex-wrap justify-center items-center mb-2">
      {data.map((item, index) => { 
        const {icon,heading,text} = item;
        return (
          <div className="w-96 h-auto border-2 mt-4 font-bold p-4 flex cursor-pointer text-gray-500" key={index}>
            <div className="w-[15%]">{icon}</div>
            <div className="flex flex-col">
              <h1 className="text-sm md:text-lg lg:text-2xl">{heading}</h1>
              <p className="text-sm md:text-base lg:text-lg">{text}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HomeInfoBox