import { Link } from 'react-router-dom';
import ShortenText from '../../utils';

const CarouselItems = ({ url, name, price, description }) => {
  return (
    <>
       <div className="flex-shrink-0 w-[300px] mt-2 font-bold shadow-sm overflow-hidden p-4 pb-0 bg-white">
      <Link to="/product-details" className="p-1">
        <img src={url} alt="product" className="w-full h-80 object-cover mb-2" />
        <p className="text-xl font-semibold text-gray-800 mb-2">${price}</p>
        <h1 className="text-lg font-bold text-gray-900 mb-2">{name}</h1>
        <p className="text-gray-600 mt-3 mb-2">
          {ShortenText(description, 100)}
        </p>
      </Link>
    </div>
    <button className="w-full bg-blue-500 text-white block py-2 px-4 rounded hover:bg-blue-600">
        Add to Cart
    </button>
    </>
  );
};

export default CarouselItems;
