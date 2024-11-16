import FlexBetween from "../../components/flexBetween";
import HomeInfoBox from "../../components/home/HomeInfoBox";
import Slider from "../../components/slider/slider";
import ProductCarousel from "../../components/carousel/Carousel";
import CarousleItems from "../../components/carousel/CarousleItems";
import { productData } from "../../components/carousel/data";
import ProductCategory from "../../components/ProductCategory";
import FooterLinks from "../../components/footer/footerLinks";

const PageHeading = ({ heading, btnText }) => {
  return (
    <>
      <FlexBetween>
        <h1 className="text-sm md:text-lg lg:text-2xl">{heading}</h1>
        <button className="bg-gray-400 p-1 rounded">{btnText}</button>
      </FlexBetween>
      {/* <hr className="border-t border-gray-300 my-4" /> */}
    </>
  );
}
const ProductGrid = () => {
  return (
    <div className="flex flex-row w-full gap-4 scrollbar-hide">
      {productData.map((item) => {
        const { name, imageurl, price, description } = item;
        return (
          <div className="flex-shrink-0 border-2 rounded-md" key={item.id}>
            <CarousleItems
              name={name}
              url={imageurl}
              price={price}
              description={description}
            />
          </div>
        );
      })}
    </div>
  );
};


// Home Component
const Home = () => {
  return (
    <div className="w-full h-full">
      <Slider />
      <section className="w-full border border-gray-500 my-4 flex-col">
        <HomeInfoBox />
      </section>
      <section className="w-full border border-gray-500 my-4">
        <PageHeading heading={"Latest Products"} btnText={"shop now >>"} />
        <ProductCarousel products={<ProductGrid />} />
      </section>
      <section className="bg-gray-100 border border-gray-500 flex flex-col">
        <h2 className="text-black font-bold">Categories</h2>
        <div className="ml-4 mr-0 pr-0">
          <ProductCategory />
        </div>
      </section>
      <section className="w-full border border-gray-500 my-4">
        <PageHeading heading={"Mobile phone"} btnText={"shop now >>"} />
        <ProductCarousel products={<ProductGrid />} />
      </section>
      <FooterLinks/>
    </div>
  );
}

export default Home;
