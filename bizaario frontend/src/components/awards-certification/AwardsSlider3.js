import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { awardSliderData } from "../../Data/LocalData";

const AwardsSlider2 = () => {
  const NextArrow = ({ onClick }) => (
    <div className="slick-next-btn" onClick={onClick}>
      <MdOutlineNavigateNext size={20} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="slick-prev-btn" onClick={onClick}>
      <MdOutlineNavigateBefore size={20} />
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true, // ✅ keeps card centered
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {awardSliderData.map((element) => (
        <div
          key={element.id}
          style={{
            padding: "10px", // spacing between cards
          }}
        >
          {/* Outer Card */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%", // ✅ responsive width
              maxWidth: "400px", // prevents card from being too wide
              margin: "0 auto", // center card in slide
              padding: "20px",
              gap: "12px",
              borderRadius: "20px",
              background: "rgba(189, 196, 212, 0.30)",
              height: "100%", // ✅ stretch card height naturally
            }}
          >
            {/* Card Image */}
            <img
              src={element.image}
              alt={element.title}
              style={{
                width: "100%", // ✅ full responsive
                height: "auto",
                maxHeight: "300px",
                borderRadius: "12.8px",
                objectFit: "cover",
              }}
            />

            {/* Content */}
            <div style={{ width: "100%", textAlign: "start" }}>
              <p
                style={{
                  color: "#000",
                  fontFamily: "Lora",
                  fontSize: "20px",
                  fontWeight: 700,
                  margin: "8px 0 4px",
                }}
              >
                {element.title}
              </p>

              <p
                style={{
                  color: "rgba(0, 0, 0, 0.70)",
                  fontFamily: "Poppins",
                  fontSize: "14px",
                  fontWeight: 400,
                  margin: "0 0 8px",
                }}
              >
                {element.desc}
              </p>
            </div>

            {/* ✅ View Certificate Link */}
            <a
              href={element.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#1667ED",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: "32px",
                textDecoration: "underline",
                marginTop: "auto",
                display: "inline-block",
                textAlign: "left",
                alignSelf: "flex-start",
              }}
            >
              View Certificate
            </a>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default AwardsSlider2;
