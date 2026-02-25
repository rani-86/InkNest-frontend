import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const services = [
  {
    title: "Magazine Printing",
    img: "/images/magazine.jpg",
    desc: "High-quality custom magazine printing for events, portfolios, and more.",
    path: "/services/magazine",
  },
  {
    title: "Passport Size Photos",
    img: "/images/passport.jpg",
    desc: "Quick and perfect passport-size photo prints.",
    path: "/services/passport",
  },
  {
    title: "Photo Albums",
    img: "/images/album.jpg",
    desc: "Beautifully designed albums to preserve your special memories.",
    path: "/services/album",
  },
  {
    title: "Polaroid Prints",
    img: "/images/polaroid.jpg",
    desc: "Trendy polaroid-style photo prints for every vibe.",
    path: "/services/polaroid",
  },
  {
    title: "Bestie Box",
    img: "/images/bestiebox.jpg",
    desc: "Custom printed surprise box to gift your bestie with memories.",
    path: "/services/bestie-box",
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to InkNest</h1>
      <p className="home-subtitle">Every memory deserves a page ❤️</p>
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            className="service-card"
            key={index}
            onClick={() => navigate(service.path)}
            style={{ cursor: "pointer" }}
          >
            <img src={service.img} alt={service.title} className="service-img" />
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
