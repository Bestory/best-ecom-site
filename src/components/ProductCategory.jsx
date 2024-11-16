import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Gadgets",
    image: "https://i.ibb.co/5GVkd3m/c1.jpg",
  },
  {
    id: 2,
    title: "Womens Fashion",
    image: "https://i.ibb.co/nQKLjrW/c2.jpg",
  },
  {
    id: 3,
    title: "Sport Sneakers",
    image: "https://i.ibb.co/fNkBYgr/c3.jpg",
  },
];
const Category = ({ title, image }) => { 
  const navigate = useNavigate();
  return (
    <div className="w-[25rem] h-[24rem] border-2 mt-4 font-bold shadow-sm mb-1 overflow-hidden p-4 bg-white rounded-md">
      <h1 className="text-sm md:text-lg lg:text-2xl p-2">{title}</h1>
      <img src={image} alt="image" className="w-full h-full" />
      <button onClick={() => navigate("/shop-now")}>
        {"Shop Now >>"}
      </button>
    </div>
  );
}

const ProductCategory = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mr-2 ml-2">
      {categories.map((item) => { 
        return (
          <div key={item.id}>
            <Category title={ item.title} image={item.image} />
          </div>
        )
      })}
    </div>
  )
}

export default ProductCategory