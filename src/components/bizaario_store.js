import { bizaario_store } from '../Data/LocalData';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../assets/css/Empowering.css'
import clock from '../assets/images/clock.png'
import calender from '../assets/images/calendar.png'
// import '../assets/css/empowring.css'


const Bizaariostore = () => {


  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 20
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,

    }
  };


  return (
    <>
      <section className=" empoering-section spacing-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <h2 className="fw-semibold">Bizaario Store</h2>
              <p className="light-color">
                Shop smarter for your health-curated medical supplies and welness
                products at your fingertips.
              </p>
            </div>
            <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start">
              <button className="view-all">View All &#8594;</button>
            </div>
          </div>

          <div className="row">
            <div className="mt-4 doctor-slider position-relative">
              <Carousel
                //   removeArrowOnDeviceType={["tablet", "mobile"]}
                arrows={false}
                responsive={responsive}
                // autoPlay={false}
                // autoPlaySpeed={3000}
                // transitionDuration={2000}
                //additionalTransfrom={-20}
                //  pauseOnHover={false}
                //  centerMode={false}
                containerClass=" carousel-container pb-3"
                itemClass="pe-3 ps-1 pb-2"
                //    showDots={true}
                infinite={true}
                renderDotsOutside={true}
                partialVisible={true}
              >
                {bizaario_store.map((element) => {
                  return (
                    <div
                      key={element.id}
                      className="w-full  hover:shadow-lg p-4 rounded-lg bg-white relative transition-all border"
                    >
                      <img
                        src={element.image}
                        alt="doctor"
                        className="mx-auto img-fluid"
                        style={{ width: "100%", height: "363px" }}
                      />

                      <div className="mt-4 content">
                        <p
                          className="mb-1 text-gray-700 text-start"
                          style={{
                            color: "#000000",
                            fontFamily: "sans-serif",
                            fontSize: "20px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "normal",
                          }}
                        >
                          {element.title}
                        </p>

                        <p
                          style={{
                            color: "#52677D",
                            fontFamily: "sans-serif",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "normal",
                            marginBottom: "4px", // to replace mb-1 from Tailwind
                            textAlign: "start",
                          }}
                        >
                          {element.dsc}
                        </p>
                      </div>

                      <div style={{ width: "100%", marginTop: "10px" }}>
                        <button
                          style={{
                            // background: "#52677D",
                            background: "var(--primary)",
                            width: "100%",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            padding: "12px 24px",
                            fontSize: "16px",
                            fontFamily: "sans-serif",
                            fontWeight: 600,
                            cursor: "pointer",
                            textAlign: "center",
                          }}
                        >
                          Request a Quote
                        </button>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Bizaariostore
