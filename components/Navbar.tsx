import Image from "next/image";
import Link from "next/link";

const navIcons = [
  { src: "/assets/icons/search.svg", alt: "Search" },
  { src: "/assets/icons/black-heart.svg", alt: "Heart" },
  { src: "/assets/icons/user.svg", alt: "User" },
];

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            height={27}
            width={27}
            alt="EasyPeasy Logo"
          />

          <p className="nav-logo">
            Easy <span className="text-primary">Peasy</span>
          </p>
        </Link>

        <div className="flex items-center gap-5">
          {navIcons.map((icon, index) => (
            <Image
              key={icon.alt}
              src={icon.src}
              height={28}
              width={28}
              alt={icon.alt}
              className="object-contain"
            />
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
