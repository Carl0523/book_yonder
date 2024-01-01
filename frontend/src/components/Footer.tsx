import { Link } from "react-router-dom";
import { logo } from "../assets";
import { FaDiscord, FaLinkedin } from "react-icons/fa";
import { AiOutlineInstagram, AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col justify-center items-center gap-5 bg-blue-100 pt-5">
      {/* 1. The logo */}
      <Link to="/">
        <img src={logo} alt="logo" className="w-32" />
      </Link>

      {/* 2. The navigation links */}
      <ul className="flex gap-5 text-primary">
        <Link to="/" className="hover:opacity-70">
          Home
        </Link>
        <Link to="/" className="hover:opacity-70">
          About
        </Link>
        <Link to="/" className="hover:opacity-70">
          Discover
        </Link>
        <Link to="/" className="hover:opacity-70">
          Term of Services
        </Link>
      </ul>

      {/* 3. The social medias  */}
      <ul className="flex gap-7 text-2xl text-primary">
        <a
          href="https://discordapp.com/users/626906285279019008"
          target="_blank"
          className="hover:text-[#738ADB]"
        >
          <FaDiscord />
        </a>

        <a
          href="https://www.linkedin.com/in/hong-yang-3b63b9203/"
          target="_blank"
          className="hover:text-[#0077b5]"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://www.instagram.com/hong_y_02/"
          target="_blank"
          className="hover:text-[#d62976]"
        >
          <AiOutlineInstagram />
        </a>

        <a
          href="https://github.com/Carl0523?tab=repositories"
          target="_blank"
          className="hover:text-black"
        >
          <AiFillGithub />
        </a>
      </ul>

      {/* 4. Copy right */}
      <div className="w-full text-center mt-10 p-2 bg-primary text-blue-100">
        All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
