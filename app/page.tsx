import HeroCarousel from "@/components/HeroCarousel";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <section className="px-6 py-24 ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping starts here :
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              <span className="text-primary"> EasyPeasy</span> - Shop like a BTS
              member on a budget (kind of)!
            </h1>
            <p className="mt-6">
              Hey Jeengar! Ready to conquer your shopping sprees with the power
              of EasyPeasy? Even RM approves of wise shopping decisions!
            </p>
            <SearchBar />
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">
          Your shopping cart says ‘Take my money,’ but EasyPeasy says, ‘Wait,
          let’s find it cheaper first!’
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {["Array", "Book", "Sneakers"].map((product, i) => {
            return (
              <div key={i} className="product-card">
                {product}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
