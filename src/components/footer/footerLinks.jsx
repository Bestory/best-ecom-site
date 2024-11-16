import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const customClass  = {
  icon:"text-white text-4xl border-2 border-red-500 p-4 w-20 h-20 text-center rounded-full cursor-pointer transform transition-transform duration-300 hover:-translate-y-4", 
}

const FooterMenu = ({href, title, links}) => {
  return (
    <div className="footer-menu">
      <p className="text-white relative mb-4 before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-6 before:h-px before:bg-white">
        {title}
      </p>
      <ul className="flex flex-col list-none p-0">
        {links.map((link, index) => (
          <li className="pb-4" key={index}>
            <a href={href} className="text-gray-400 text-base hover:text-white">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FooterLinks = () => {
  return (
    <>
      <section className="w-full bg-[#222831] pt-32 relative z-0 overflow-hidden mb-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <FaFacebookF className={customClass.icon} />
          <FaTwitter className={customClass.icon} />
          <FaInstagram className={customClass.icon} />
          <FaYoutube className={customClass.icon} />
        </div>
        <h2 className="text-white text-5xl font-bold">We Can Discuss!</h2>
        <a
          href="#home"
          className="inline-block text-2xl font-bold text-white border-2 border-red-500 py-6 px-12 relative overflow-hidden before:absolute before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] before:transform before:-translate-x-full before:transition-transform before:duration-400 hover:before:translate-x-0"
        >
          Make an Inquiry
        </a>
      </div>
      </section>
      <section className="bg-[#222831] py-20">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-y-8">
          <div className="w-1/2">
            <img src={""} alt="log" className="w-full" />
          </div>
          <FooterMenu href= "#home" title="Features" links={["link", "Brands", "Analytics", "Blog"]} />
          <FooterMenu href= "#home" title="Resource" links={["Blog", "Developer", "Support","Docs"]} />
          <FooterMenu href= "#home" title="Company" links={["About", "Our Team", "Career", "Contact"]} />
        </div>
      </section>

    </>
  );
}

export default FooterLinks;
