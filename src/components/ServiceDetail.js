import React from "react";
import { useParams } from "react-router-dom";
// import "./ServiceDetail.css";

const serviceContent = {
  magazine: {
    title: "Magazine Printing",
    img: "/images/magazine.jpg",
    desc: "We provide high-quality magazine prints with professional binding, suitable for portfolios, events, or branding needs.",
  },
  passport: {
    title: "Passport Size Photos",
    img: "/images/passport.jpg",
    desc: "Instant passport-size photos with perfect dimensions for official documentation.",
  },
  album: {
    title: "Photo Albums",
    img: "/images/album.jpg",
    desc: "Create custom photo albums with premium prints and elegant design.",
  },
  polaroid: {
    title: "Polaroid Prints",
    img: "/images/polaroid.jpg",
    desc: "Trendy polaroid-style prints, perfect for walls, scrapbooks, or gifts.",
  },
  "bestie-box": {
    title: "Bestie Box",
    img: "/images/bestiebox.jpg",
    desc: "Surprise gift box filled with printed memories, quotes, and cute items.",
  },
};

function ServiceDetail() {
  const { serviceId } = useParams();
  const service = serviceContent[serviceId];

  if (!service) return <p style={{ padding: 20 }}>Service not found.</p>;

  return (
    <div className="service-detail">
      <h2>{service.title}</h2>
      <img src={service.img} alt={service.title} />
      <p>{service.desc}</p>
    </div>
  );
}

export default ServiceDetail;
