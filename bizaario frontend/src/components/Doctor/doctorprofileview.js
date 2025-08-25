
import React, { useState } from "react";
// import "../../styles/doctorprofileview.css";
import { Style } from "@mui/icons-material";
// import testvideo from "../icons/videoplayback (1).mp4"


export default function DoctorProfile() {
  const [activeTab, setActiveTab] = useState("About Us");

  const events = [
  {
    date: "30th July",
    services: [
      "ECG & Blood Pressure Check",
      "Doctor Consultation",
      "Basic Cardiac Screening",
      "Medication Assistance (if eligible)",
    ],
    location: "Fortis Hospital, Sector 62, Noida",
    doctor: "Dr. Stonehart | In Association with Fortis Heart Institute, Delhi",
  },
  // Repeat for as many events as needed (if you want the same 4 blocks, just fill the array with 4 identical items)
  {date: "30th July",
    services: [
      " ECG & Blood Pressure Check",
      "Doctor Consultation",
      "Basic Cardiac Screening",
      "Medication Assistance (if eligible)",
    ],
    location: "Fortis Hospital, Sector 62, Noida",
    doctor: "Dr. Stonehart | In Association with Fortis Heart Institute, Delhi",},
     {date: "30th July",
    services: [
      "ECG & Blood Pressure Check",
      "Doctor Consultation",
      "Basic Cardiac Screening",
      "Medication Assistance (if eligible)",
    ],
    location: "Fortis Hospital, Sector 62, Noida",
    doctor: "Dr. Stonehart | In Association with Fortis Heart Institute, Delhi",},
     {date: "30th July",
    services: [
      "ECG & Blood Pressure Check",
      "Doctor Consultation",
      "Basic Cardiac Screening",
      "Medication Assistance (if eligible)",
    ],
    location: "Fortis Hospital, Sector 62, Noida",
    doctor: "Dr. Stonehart | In Association with Fortis Heart Institute, Delhi",},
];
    const testimonials = [
  {
    name: "Simon Arpad",
    location: "Uttar Pradesh",
    message:
       "Dr. Stonehart is not only a great cardiologist but also a kind human being. He explained my condition clearly, eased my fears, and guided me through successful treatment. I now feel healthier and more confident about my heart.",
    video: "/videos/testimonial1.mp4",
  },
  {
    name: "Sarah Thomas",
    location: "Mumbai",
    message:
     "Dr.Stonehart treated my father during a critical time. His calm attitude, timely diagnosis, and deep knowledge gave us immense hope. He treats patients like family. Highly recommended!",
    video: "/videos/testimonial2.mp4",
  },
  {
    name: "Mrs. Anjali Sinha",
    location: "Gurgaon",
    message:
      "After years of struggling with hypertension, I finally found the right guidance with Dr. Stonehart. His lifestyle advice and medication plan worked wonders. I appreciate his care and patience.",
    video: "/videos/testimonial3.mp4",
  },

  {
    name: "Ravi N.",
    location: "New Delhi",
    message:
      "After years of struggling with hypertension, I finally found the right guidance with Dr. Stonehart. His lifestyle advice and medication plan worked wonders. I appreciate his care and patience.",
    video: "/videos/testimonial3.mp4" ,
  },
];



const TestimonialCard = ({ name, location, message, video }) => (
  <div className="testimonial-card">
    <div className="testimonial-content">
      <div className="testimonial-text">
        <p className="message">{message}</p>
        <h4 className="name">{name}</h4>
        <p className="location">{location}</p>
      </div>

      {video && (
        <div className="testimonial-video">
          <video controls preload="none" className="video-player">
            {/* <source src={testvideo} type="video/mp4" /> */}
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  </div>
);



 

const renderTabContent = () => {
    switch (activeTab) {
      case "About Us":
        return (
          <div>
            <p>
              Dr. Stonehart is a highly qualified and experienced Cardiologist with a strong commitment to patient care, clinical excellence, and ongoing medical innovation. With over 15 years of experience in the field of cardiology, Dr. Stonehart specializes in the prevention, diagnosis, and treatment of a wide range of heart conditions including coronary artery disease, heart failure, arrhythmias, and hypertension.
            </p>
            <p>
              Known for a patient-first approach, Dr. Stonehart combines evidence-based medicine with cutting-edge technologies to deliver personalized treatment. Also involved in continuing medical education and several medical publications.
            </p>

               {/* Bio Video */}
      <div className="bio-video-section">
        <h6  style={{marginTop:'30px', fontSize:'20px'}}>Bio Video</h6>
        <video controls width="100%" poster="video-thumbnail.jpg">
          <source src="doctor-bio-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>


           <h6 style={{marginTop:'30px', fontSize:'20px'}}>Digital CME Content</h6>
       <div className="digital-cmecontent" style={{gap:'5px'}}>

       <div className="cme-contents">
      <iframe
      width="200"
      height="150"
      src="https://www.youtube.com/embed/bwx2Z69S0YA"
      title="Doctor Checkup for Kids"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <p style={{ fontSize: "14px", marginTop: "8px",  }}>
    Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023
  </p>

  <div style={{ fontSize: "12px", color: "#666" }}>
    📅 20/07/2025, 02:03
  </div>
    {/* <p> */}
  </div>

       <div className="cme-contents">
    <iframe
     width="200"
      height="150"
      src="https://www.youtube.com/embed/bwx2Z69S0YA"
      title="Doctor Checkup for Kids"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <p style={{ fontSize: "14px", marginTop: "8px", }}>
    Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023
  </p>

  <div style={{ fontSize: "12px", color: "#666" }}>
    📅 20/07/2025, 02:03
  </div>
    {/* <p> */}
  </div>

      <div className="cme-contents">
    <iframe
     width="200"
      height="150"
      src="https://www.youtube.com/embed/bwx2Z69S0YA"
      title="Doctor Checkup for Kids"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <p style={{ fontSize: "14px", marginTop: "8px",  }}>
    Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023
  </p>

  <div style={{ fontSize: "12px", color: "#666" }}>
    📅 20/07/2025, 02:03
  </div>
    {/* <p> */}
  </div>

     <div className="cme-contents">
    <iframe
     width="200"
      height="150"
      src="https://www.youtube.com/embed/bwx2Z69S0YA"
      title="Doctor Checkup for Kids"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <p style={{ fontSize: "14px", marginTop: "8px", }}>
    Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023
  </p>

  <div style={{ fontSize: "12px", color: "#666" }}>
    📅 20/07/2025, 02:03
  </div>
    {/* <p> */}
  </div>

   <div className="cme-contents">
    <iframe
     width="200"
      height="150"
      src="https://www.youtube.com/embed/bwx2Z69S0YA"
      title="Doctor Checkup for Kids"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <p style={{ fontSize: "14px", marginTop: "8px", fontWeight: "500" }}>
    Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023
  </p>

  <div style={{ fontSize: "12px", color: "#666" }}>
    📅 20/07/2025, 02:03
  </div>
    {/* <p> */}
  </div>
      </div>
        <h6 style={{marginTop:'30px', fontSize:'20px'}}>Innovative Case Studies</h6>
        <div style={{gap:'5px'}} className="inovative-casestudie">
      <div className="case-studie1"><img src="https://tse2.mm.bing.net/th/id/OIP.WOVyXByfddCawMN5KVQN8AHaFz?pid=Api&P=0&h=180"></img>
      <p>Doctor Mike hosts the AMA Tribute to the Medical School Class of 2003</p>
      </div>
           <div className="case-studie1"><img src="https://tse2.mm.bing.net/th/id/OIP.WOVyXByfddCawMN5KVQN8AHaFz?pid=Api&P=0&h=180"></img>
      <p>Doctor Mike hosts the AMA Tribute to the Medical School Class of 2003</p>
      </div>
              <div className="case-studie1"><img src="https://tse2.mm.bing.net/th/id/OIP.WOVyXByfddCawMN5KVQN8AHaFz?pid=Api&P=0&h=180"></img>
      <p>Doctor Mike hosts the AMA Tribute to the Medical School Class of 2003</p>
      </div>
               <div className="case-studie1"><img src="https://tse2.mm.bing.net/th/id/OIP.WOVyXByfddCawMN5KVQN8AHaFz?pid=Api&P=0&h=180"></img>
      <p>Doctor Mike hosts the AMA Tribute to the Medical School Class of 2003</p>
      </div>
          <div className="case-studie1"><img src="https://tse2.mm.bing.net/th/id/OIP.WOVyXByfddCawMN5KVQN8AHaFz?pid=Api&P=0&h=180"></img>
      <p>Doctor Mike hosts the AMA Tribute to the Medical School Class of 2003</p>
      </div>
      </div>
      </div>
          </div>
        );
     case "Hospital Associations":
  return (
    <div style={{marginBottom:'50px'}}>
      <h4 className="mb-3 fw-semibold">Work Experience</h4>

      <div className="d-flex align-items-start mb-4">
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.Eut76tsSqqQblzePsQBQ9gHaHa?pid=Api&P=0&h=180"
          alt="AIIMS"
          style={{ width: 100, height: 80, objectFit: "contain", marginRight: 15 }}
        />
        <div>
          <h6 className="mb-1">AIIMS, New Delhi</h6>
          <p className="mb-0">Resident Cardiologist</p>
          <small className="text-muted">2012–2015</small>
        </div>
      </div>

      <div className="d-flex align-items-start mb-4">
        <img
          src="https://tse2.mm.bing.net/th/id/OIP._1vyZh0rMazZLU0EKzkUwgHaEK?pid=Api&P=0&h=180"
          alt="Fortis"
          style={{ width: 100, height: 80, objectFit: "contain", marginRight: 15 }}
        />
        <div>
          <h6 className="mb-1">Fortis Heart Institute, Delhi</h6>
          <p className="mb-0">Visiting Consultant</p>
          <small className="text-muted">2015–2017</small>
        </div>
      </div>

      <div className="d-flex align-items-start  mb-4">
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.3i5ifo6IJ7y8ZVrOuh1eMwHaIE?pid=Api&P=0&h=180"
          alt="Apollo"
          style={{ width: 100, height: 80, objectFit: "contain", marginRight: 15 }}
        />
        <div>
          <h6 className="mb-1">Apollo Hospitals, Chennai</h6>
          <p className="mb-0">Senior Cardiologist</p>
          <small className="text-muted">2017–Present</small>
        </div>
      </div>
  {/* Gallery */}
      <h4 className="mb-3 fw-semibold">Our Gallery</h4>
      <div className="row">
        {[
          "https://tse1.mm.bing.net/th/id/OIP.QCX4aDm8TtTQoZSZr2Wn4gHaEK?pid=Api&P=0&h=180",
          "https://tse1.mm.bing.net/th/id/OIP.S-DOFHsyDeW8NN3V9ZkeKgHaEK?pid=Api&P=0&h=180",
          "https://tse1.mm.bing.net/th/id/OIP.5whI6K6J9QYNQ2jEXTzkxwHaCS?pid=Api&P=0&h=180",
          "https://tse2.mm.bing.net/th/id/OIP.o2HpGXjnXzUNcvOiYpNzWQHaGL?pid=Api&P=0&h=180",
          "https://tse3.mm.bing.net/th/id/OIP.2uWOKRynKNknUoZWPrpVJgHaEK?pid=Api&P=0&h=180",
          "https://tse1.mm.bing.net/th/id/OIP.dFElj3ERDWEw0H23Nqrf3wHaE8?pid=Api&P=0&h=180",
          "https://tse2.mm.bing.net/th/id/OIP.tJb87JR5bT0_qltxBiKJrgHaEn?pid=Api&P=0&h=180",
          "https://tse4.mm.bing.net/th/id/OIP.F7O5YBfuwhrLw49Tjm9RNAHaEj?pid=Api&P=0&h=180",
          "https://tse4.mm.bing.net/th/id/OIP.F7O5YBfuwhrLw49Tjm9RNAHaEj?pid=Api&P=0&h=180      ",
        ].map((img, index) => (
          <div className="col-6 col-md-4 mb-3" key={index}>
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
  

case "Awards & Certificates":
 return (
  <div  className="award-cirtificates"  style={{gap:'50px'}}>
  <div className="award-container" style={{display:'flex', padding:'20px 0'}}>
    <div className="award-img">
      <img src="https://tse4.mm.bing.net/th/id/OIP.QqaMf3wXwNjRkxNw77rt8AHaE7?pid=Api&P=0&h=180"
      style={{width:'700px'}}
      />
    </div>
    <div className="award" style={{marginLeft:'20px'}}>
      <h4>🏅 Best Cardiologist 2022</h4>
      <h6>Indian Medical Association</h6>
      <p> I have received multiple awards for excellence in cardiology and patient care,
              including recognition for clinical innovation and compassionate service. His
              work continues to be honored by leading medical associations.</p>
              <div className="flex items-center gap-1" style={{marginTop:'-10px'}}>
              📅 15/05/2022
            </div>
            <a
              href="#"
              className="text-blue-600 hover:underline flex items-center gap-1" style={{color:'blue'}}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 View Certificate
            </a>
    </div>
  </div>

  <div  className="award-container" style={{display:'flex',padding:'20px 0'}}>
    <div  className="award-img">
      <img 
      src="https://tse4.mm.bing.net/th/id/OIP.5wVS1lPP5EYrITthpqAM9QAAAA?pid=Api&P=0&h=180"
      style={{width:'700px'}}
      />
     
    </div>
    <div className="award"  style={{marginLeft:'20px'}}>
      <h4>🏅 Best Cardiologist 2022</h4>
      <h6>Indian Medical Association</h6>
      <p> I have received multiple awards for excellence in cardiology and patient care,
              including recognition for clinical innovation and compassionate service. His
              work continues to be honored by leading medical associations.</p>
              <div className="flex items-center gap-1" style={{marginTop:'-10px'}}>
              📅 15/05/2022
            </div>
            <a
              href="#"
              className="text-blue-600 hover:underline flex items-center gap-1" style={{color:'blue'}}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 View Certificate
            </a>
    </div>
  </div>
  <div  className="award-container" style={{display:'flex', padding:'20px 0'}}>
    <div  className="award-img">
      <img src="https://tse1.mm.bing.net/th/id/OIP.A5WeqBX4qm3mhZ3MSMu5dAAAAA?pid=Api&P=0&h=180"
      style={{width:'700px'}}
      />
    </div >
    <div className="award"  style={{marginLeft:'20px'}}>
      <h4>🏅 Best Cardiologist 2022</h4>
      <h6>Indian Medical Association</h6>
      <p> I have received multiple awards for excellence in cardiology and patient care,
              including recognition for clinical innovation and compassionate service. His
              work continues to be honored by leading medical associations.</p>
              <div className="flex items-center gap-1" style={{marginTop:'-10px'}}>
              📅 15/05/2022
            </div>
            <a
              href="#"
              className="text-blue-600 hover:underline flex items-center gap-1" style={{color:'blue'}}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 View Certificate
            </a>
    </div>
  </div>
    <div  className="award-container" style={{display:'flex', padding:'20px 0'}}>
    <div  className="award-img">
      <img src="https://tse4.mm.bing.net/th/id/OIP.wCWp4-TExWxtMIz1epS4HgHaFj?pid=Api&P=0&h=180"
      style={{width:'700px'}}
      />
    </div>
    <div className="award"  style={{marginLeft:'20px'}}>
      <h4>🏅 Best Cardiologist 2022</h4>
      <h6>Indian Medical Association</h6>
      <p> I have received multiple awards for excellence in cardiology and patient care,
              including recognition for clinical innovation and compassionate service. His
              work continues to be honored by leading medical associations.</p>
              <div className="flex items-center gap-1" style={{marginTop:'-10px'}}>
              📅 15/05/2022
            </div>
            <a
              href="#"
              className="text-blue-600 hover:underline flex items-center gap-1" style={{color:'blue'}}
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 View Certificate
            </a>
    </div>
  </div>
</div>
  );
  case "Upcoming Event":
   return(
  <div className="events-list">
        {events.map((event, idx) => (
          <div className="event-card" key={idx}>
            <div className="event-info">
              <h3>Free Heart Check-up & Treatment Camp</h3>
              <p className="doctor">{event.doctor}</p>
              <p><strong>Free Services Include:</strong></p>
              <ul style={{listStyleType:"disc"}}>
                {event.services?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <p className="location"><span>📍</span> {event.location}</p>
            </div>
            <div className="event-side">
              <div className="event-date">
                <span>30<sup>th</sup></span>
                <span className="july">July</span>
              </div>
              <img src="https://www.pngmart.com/files/21/Male-Doctor-PNG-Isolated-File.png" alt="Doctor" className="doctor-image" />
            </div>
          </div>
        ))}
      </div>
   );

    case "Patient Testimonials":
  return (
     <div className="max-w-5xl mx-auto px-2 md:px-4 py-6" >
    <div className="space-y-2">
      {testimonials.map((item, index) => (
        <TestimonialCard
          key={index}
          name={item.name}
          location={item.location}
          message={item.message}
          video={item.video}
        />
      ))}
    </div>
  </div>
  );

      default:
        return null;
    }
  };

  return (
    <div className="doctor-profile-card">
        <h4>Doctor Profile</h4>
      <div className="profile-header">
         <img
          src="https://www.visualsstock.com/details_watermark.php?filename=42893"
          alt="Dr. Dominic Stonehart"
          className="doctor-img"
        />
        <div className="social-row" >
          <a href="#"><i  className="bi bi-linkedin fs-5 text-primary"></i></a>
          <a href="#"><i className="bi bi-envelope-fill fs-5 text-danger"></i></a>
          <a href="#"><i className="bi bi-x-circle-fill fs-5 text-secondary"></i></a>

           {/* <a    href="#" type="button" className="g" style={{color:'blue', border:'1px solide'}}>
              G
            </a> */}
         </div>
        <div><a
      href="/pdfs/Dr_Dominic_Stonehart_Profile.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="text-decoration-none"
      // style={{ position: "absolute", top: 140,right:320, fontSize: "14px", color: "#4374e0", fontWeight: 500 }}
    >
      <i className="bi bi-download me-1"></i>Doctor Profile PDF
    </a></div>
        <div className="profile-info">
          <h1>Dr. Dominic Stonehart</h1>
          <p className="doctor-qual">MBBS [Consultant Cardiologist]</p>
          <p className="specializes">
            Specializes in : Interventional Cardiology, Heart Failure Management, Preventive Cardiology
          </p>
          <p className="about-snippet">
            Dr. Stonehart is a qualified and experienced Cardiologist with a strong commitment to patient care and clinical excellence. With 15+ years of experience, they focus on accurate diagnosis, personalized treatment, and overall well-being of patients.
          </p>
          <button className="book-appointment-btn">Book Appointment</button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="profile-tabs">
        {[
          "About Us",
          "Hospital Associations",
          "Awards & Certificates",
          "Upcoming Event",
          "Patient Testimonials"
        ].map(tab => (
          <button
            key={tab}
            className={`tab${activeTab === tab ? " active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
      
    </div>
  );
}
