import "bootstrap/dist/css/bootstrap.min.css";
import AwardsSlider2 from './awards-certification/AwardsSlider2'; 
import AwardsSlider from "./awards-certification/AwardsSlider";
import AwardsSlider3 from "./awards-certification/AwardsSlider3";
const Awards = () => { 
     
  return (
    <>
      <section className="spacing-top awards-certification-section position-relative">
        <div className="container">
          <div className="row">
            <div className="mb-2 d-flex justify-content-between align-items-center">
              <div>
                <h2
                  style={{
                    // fontFamily:"Lora",
                    // fontSize:"36px",
                    fontWeight: 700,
                  }}
                >
                  Awards & Certification
                </h2>
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: "16px",
                    color: "#52677D",
                  }}
                >
                  Learn from leading doctors and specialists through focused,
                  digestible video content.
                </p>
              </div>
            </div>
          </div>
          <div className="award-slider ">
            <div className="row">
              {/* <AwardsSlider /> */}
              {/* <AwardsSlider2 /> */}
              <AwardsSlider3 />
            </div>
            {/* <div style={{height:'100px'}}></div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Awards