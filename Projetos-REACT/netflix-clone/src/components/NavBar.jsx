import { useEffect, useState } from "react";
import "./NavBar.css";

const NavBar = () => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setShow(window.scrollY > 100)
        })
    })
  return (
    <div className={`nav-container ${show && "nav-container-black"}`}>
      <img className="nav-logo" alt="Netflix" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"/>
      <img className="nav-avatar" alt="Avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPsVAeFlYeYOEUzb3TV1ML91_LPkkFML5lRQcMdr9nQu2CqO-WzT-RLmkM5_cOKvkaBkI&usqp=CAU"/>
    </div>
  );
};

export default NavBar;
