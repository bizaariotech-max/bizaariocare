import React, { useState,useRef } from 'react';
import Doctorsidebar from './doctorsidebar';
import Doctorheader from './doctorheader';

// Simple cn utility for conditional class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// SVG Icon components

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="5,3 19,12 5,21" fill="currentColor"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="7,10 12,5 17,10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="5" x2="12" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);



export default function Doctordashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);




  return (
    <div className="min-h-screen bg-[#F6F7FF] font-sans">
  <Doctorsidebar/>
    <Doctorheader/>

     

      {/* Main Content */}
      <div className={cn("transition-all duration-300", "lg:ml-64")}>
     

        {/* Main Dashboard Content */}
        <main className="p-4 lg:p-8 space-y-12 lg:space-y-20">
          <KnowledgeBankSection />
          <MedaidBanner />
          <OverviewSection />
          <PatientDetailsSection />
          <MedicalBoardSection />
          <LiveSessionsSection />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}

// All other subcomponents below (exact code from your previous usage):

function KnowledgeBankSection() {
    const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };


  return (
    <div className="bg-[#525FE1] rounded-lg p-4 lg:p-6 text-white">
      <div className="mb-8 lg:mb-16">
        <h2 className="text-lg lg:text-xl font-medium mb-8 lg:mb-12">Knowledge Bank Data Filter</h2>

      <div className="flex flex-row items-center gap-2 sm:gap-3 mb-8 flex-nowrap ">
  <div className="flex flex-row gap-2 sm:gap-2 flex-1 min-w-0 flex-shrink-0">
    <FilterDropdown text="Select Medical Specialty" className="text-xs sm:text-sm" />
    <FilterDropdown text="Select Archive" className="text-xs sm:text-sm" />
    <FilterDropdown text="Select Doctor" className="text-xs sm:text-sm" />
  </div>

  <div className="flex flex-row items-center gap-2 sm:gap-4 flex-shrink-0">
    <div className="flex items-center gap-3 sm:gap-6">
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-white rounded-sm"></div>
        <span className="text-xs sm:text-sm">Digital CMEs</span>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-white rounded-sm"></div>
        <span className="text-xs sm:text-sm">Unique Case Studies</span>
      </div>
    </div>

    <button className="flex items-center gap-1 sm:gap-2 bg-[#F86F03] px-2 py-2 sm:px-4 sm:py-3 rounded-lg hover:bg-[#e5630a] transition-colors">
      <UploadIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="text-xs sm:text-sm font-normal">Publish New Content</span>
    </button>
  </div>
</div>

      </div>

      <div
      ref={sliderRef}
      className="flex gap-4 overflow-x-auto no-scrollbar select-none"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="min-w-[250px]">
          <VideoCard />
        </div>
      ))}
    </div>
    </div>
  );
}

function FilterDropdown({ text }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg px-4 lg:px-6 py-3 text-black/50 text-sm cursor-pointer hover:shadow-md transition-shadow min-w-0">
      <span className="flex-1 truncate">{text}</span>
      <ChevronDownIcon />
    </div>
  );
}

function VideoCard() {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative h-32 lg:h-36 bg-gradient-to-b from-black/15 to-black/15 rounded-lg overflow-hidden group cursor-pointer"
        style={{
          backgroundImage:
            "url('https://api.builder.io/api/v1/image/assets/TEMP/1cc1771cf7f3f680edd3d1eb43aca50bb12a8fe2?width=454')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center">
            <PlayIcon />
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-white text-xs font-normal line-clamp-2">Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023</p>
        <p className="text-white text-[10px] font-semibold">By Doctor Malik</p>
      </div>
    </div>
  );
}

function MedaidBanner() {
  return (
    <div
      className="relative bg-gradient-to-r from-black/40 to-black/40 rounded-lg overflow-hidden min-h-[200px] lg:h-72"
      style={{
        backgroundImage:
          "url('https://api.builder.io/api/v1/image/assets/TEMP/6dcfd183ca212769ccedd471b5dff2144e0df26f?width=1964')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 p-4 lg:p-6 h-full">
        <div className="flex-1 space-y-4 lg:space-y-6 text-center lg:text-left">
          <div className="bg-[#F8EADF] rounded-lg p-4 lg:p-6">
            <h3 className="text-black text-xl lg:text-3xl font-medium leading-tight lg:leading-[43px]">
              MEDAID - Seeking collaboration? Leverage our cutting-edge, AI-powered Collaborative Model for Diagnosis and Treatment Protocols.
            </h3>
          </div>
          <button className="bg-[#F86F03] text-white px-6 py-3 rounded-lg text-lg lg:text-2xl font-semibold hover:bg-[#e5630a] transition-colors">
            Get Support Now
          </button>
        </div>
        <div className="flex-shrink-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/14616d343c4333887b9bd572828e5db432baa4d7?width=464"
            alt="MEDAID Logo"
            className="w-32 h-32 lg:w-58 lg:h-60 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function OverviewSection() {
  const stats = [
    { title: 'Appointments', value: '150', change: '+11%', color: '#525FE1', chart: 'bar' },
    { title: 'Consultations', value: '22', change: '+6.5%', color: '#6A75EA', chart: 'donut' },
    { title: 'Cancelled', value: '03', change: '+0.6%', color: '#E85C43', chart: 'bar' },
    { title: 'Urgent Resolve', value: '05', change: '+51%', color: '#3EAD4B', chart: 'donut' },
  ];

  return (
    <div className="bg-black/10 rounded-lg p-4 lg:p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 lg:mb-8">
        <h2 className="text-black text-2xl lg:text-3xl font-medium">Overview</h2>
        <div className="bg-[#525FE1] rounded-lg p-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
          <div className="bg-white text-[#525FE1] px-3 py-2 rounded-lg text-base lg:text-lg font-normal">
            Patients referred to me
          </div>
          <div className="text-white border border-white/70 px-3 py-2 rounded-lg text-base lg:text-lg font-normal">
            Patients Referred by me
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, change, color, chart }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="px-4 lg:px-6 py-3 lg:py-4" style={{ backgroundColor: color }}>
        <h3 className="text-white text-lg lg:text-2xl font-semibold">{title}</h3>
      </div>
      <div className="p-4 lg:p-6 flex items-center gap-4 lg:gap-6">
        {chart === 'bar' ? (
          <div className="flex items-end gap-1 lg:gap-2">
            <div className="w-2 h-12 lg:h-14 bg-black/20 rounded"></div>
            <div className="w-2 h-16 lg:h-18 rounded" style={{ backgroundColor: color }}></div>
            <div className="w-2 h-8 lg:h-10 bg-black/20 rounded"></div>
            <div className="w-2 h-12 lg:h-14 bg-black/20 rounded"></div>
            <div className="w-2 h-14 lg:h-16 bg-black/20 rounded"></div>
          </div>
        ) : (
          <div className="relative w-16 h-16 lg:w-18 lg:h-18">
            <svg width="100%" height="100%" viewBox="0 0 74 74" className="transform -rotate-90">
              <circle cx="37" cy="37" r="30" stroke={color} strokeOpacity="0.2" strokeWidth="7" fill="none" />
              <circle
                cx="37"
                cy="37"
                r="30"
                stroke={color}
                strokeWidth="7"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 30 * 0.3} ${2 * Math.PI * 30}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-black text-lg lg:text-2xl font-medium">{value}</span>
              <span className="text-black text-sm lg:text-xl font-medium">%</span>
            </div>
          </div>
        )}
        <div className="space-y-2 lg:space-y-3">
          <div className="space-y-1 lg:space-y-3">
            <div className="text-black text-lg lg:text-2xl font-medium">{value}</div>
            <div className="text-black/50 text-base lg:text-xl font-medium">Todays</div>
          </div>
          <div className="text-black/50 text-xs font-medium">{change}</div>
        </div>
      </div>
    </div>
  );
}

function PatientDetailsSection() {
  
  return (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-black text-2xl lg:text-3xl font-medium">Patient Details</h2>

      <div className="flex flex-wrap gap-3 lg:gap-5">
        <FilterButton text="Hospitals" />
        <FilterButton text="Select Doctor (s)" />
        <FilterButton text="Country" />
      </div>

      <div className="bg-white rounded-lg overflow-x-auto shadow-sm">
          <div className="min-w-max" >
        <div className="bg-[#525FE1] px-4 lg:px-5 py-3 flex gap-3 lg:gap-5 text-white text-sm lg:text-lg font-medium ">
          <div className="min-w-12 lg:min-w-16 text-center">S.No.</div>
          <div className="min-w-24 lg:min-w-32">Patient Name</div>
          <div className="min-w-24 lg:min-w-32">Patient ID</div>
          <div className="min-w-24 lg:min-w-32">Nationality</div>
          <div className="min-w-24 lg:min-w-32">Referred Doctor</div>
          <div className="min-w-20 lg:min-w-24">VIL Issued</div>
          <div className="min-w-20 lg:min-w-24">Medical Via</div>
          <div className="min-w-20 lg:min-w-24">Travel Start</div>
          <div className="min-w-20 lg:min-w-24">Hospital</div>
          <div className="min-w-20 lg:min-w-24">Treatment</div>
          <div className="min-w-20 lg:min-w-24">Discharge</div>
          <div className="min-w-20 lg:min-w-24">Return Home</div>
          <div className="min-w-20 lg:min-w-24">Follow ups</div>
          <div className="min-w-20 lg:min-w-24">Case Closure</div>
        </div>
        </div>

        {Array.from({ length: 3 }, (_, i) => (
          <PatientRow key={i} />
        ))}
      </div>
    </div>
  );
}

function FilterButton({ text }) {
  return (
    <div className="flex items-center gap-3 bg-white shadow-md rounded-lg px-4 lg:px-5 py-3 cursor-pointer hover:shadow-lg transition-shadow">
      <span className="text-black/50 text-sm">{text}</span>
      <ChevronDownIcon />
    </div>
  );
}

function PatientRow() {
  return (
    <div className="bg-[rgba(82,95,225,0.03)] px-4 lg:px-5 py-3 flex gap-3 lg:gap-5 text-sm lg:text-lg ">
      <div className="min-w-12 lg:min-w-16 text-black text-center">1</div>
      <div className="min-w-24 lg:min-w-32 text-[#525FE1] underline cursor-pointer">John Doe</div>
      <div className="min-w-24 lg:min-w-32 text-[#525FE1] underline cursor-pointer">P001</div>
      <div className="min-w-24 lg:min-w-32 text-black">USA</div>
      <div className="min-w-24 lg:min-w-32 text-black">Dr. Smith</div>
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="min-w-20 lg:min-w-24">
          <TimelineStep completed={i < 4} />
        </div>
      ))}
    </div>
  );
}

function TimelineStep({ completed }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "w-4 h-4 lg:w-5 lg:h-5 rounded-full border",
          completed ? "border-[#19D351] bg-[#19D351]" : "border-[#19D351]"
        )}
      ></div>
      <div className="text-center">
        <div className="text-[rgba(18,18,18,0.85)] text-xs lg:text-sm">DD/MM/YYYY</div>
      </div>
      {completed && <div className="w-20 lg:w-24 h-px bg-[#19D351]"></div>}
    </div>
  );
}

function MedicalBoardSection() {
     const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };


  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="bg-[#525FE1] rounded-lg p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="bg-white text-[#525FE1] px-4 py-2 rounded-lg text-lg lg:text-2xl font-medium">Medical Board</div>
        <div className="text-white border border-white/70 px-4 py-2 rounded-lg text-lg lg:text-2xl font-medium">Partners Hospitals</div>
      </div>

      <div className="p-2 lg:p-4">
        <div className="flex flex-wrap gap-3 lg:gap-6 mb-6 lg:mb-8">
          <SpecialtyTag active>Cardiology</SpecialtyTag>
          <SpecialtyTag>Orthopedics</SpecialtyTag>
          <SpecialtyTag>Pediatrics</SpecialtyTag>
          <SpecialtyTag>Neurology</SpecialtyTag>
          <SpecialtyTag>Obstetrics & Gynecology</SpecialtyTag>
          <SpecialtyTag>Otorhinolaryngology</SpecialtyTag>
        </div>

        <div
      ref={sliderRef}
      className="flex gap-4 overflow-x-auto no-scrollbar select-none"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
          {Array.from({ length: 6 }, (_, i) => (
            <DoctorCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SpecialtyTag({ children, active = false }) {
  return (
    <div
      className={cn(
        "px-4 lg:px-6 py-2 lg:py-3 rounded-full text-sm lg:text-lg cursor-pointer transition-colors",
        active ? "bg-[rgba(82,95,225,0.78)] text-white" : "bg-[#E8E8E8] text-black opacity-60 hover:opacity-80"
      )}
    >
      {children}
    </div>
  );
}

function DoctorCard() {
  return (
    <div className="bg-[rgba(82,95,225,0.1)] rounded-2xl p-4 lg:p-5 hover:shadow-lg transition-shadow">
      <div className="space-y-4 lg:space-y-5 w-[300px] lg:w-[320px] ">
        <div className="h-48 lg:h-56 rounded-lg overflow-hidden">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/e4f27b47873f57f789a3f1f795c76b7f288a2b3e?width=754"
            alt="Doctor"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-4 lg:space-y-5">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <h3 className="text-black text-lg lg:text-2xl font-medium">Dr. Dominic Stonehart</h3>
              <p className="text-black/75 text-xs">Cardiologist | 15+ Years Experience</p>
            </div>
            <button className="text-[#525FE1] text-xs font-semibold px-2 py-1 hover:bg-[#525FE1]/10 rounded transition-colors">View Profile</button>
          </div>

          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-black/20 rounded"></div>
              <span className="text-black text-sm lg:text-lg">Fortis Hospital, Mumbai</span>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 bg-black/20 rounded flex-shrink-0 mt-1"></div>
              <div className="text-sm lg:text-lg leading-6">
                <span className="text-black">Specializes in : </span>
                <span className="text-black/50">Interventional Cardiology, Heart Failure Management, Preventive Cardiology</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button className="flex-1 bg-[#F86F03] text-white py-3 px-3 rounded-lg text-sm lg:text-base font-semibold hover:bg-[#e5630a] transition-colors">Book an Appointments</button>
          <button className="flex-1 border border-[#F86F03] text-[#F86F03] py-3 px-3 rounded-lg text-sm lg:text-base font-semibold hover:bg-[#F86F03]/10 transition-colors">Send Medical Query</button>
        </div>
      </div>
    </div>
  );
}

function LiveSessionsSection() {
  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="bg-[#525FE1] rounded-lg p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="bg-white text-[#525FE1] px-4 py-2 rounded-lg text-base lg:text-lg">Live Sessions</div>
        <div className="text-white border border-white/70 px-4 py-2 rounded-lg text-base lg:text-lg">Online Clinic</div>
      </div>

      <div className="space-y-4 lg:space-y-6">
        <div className="relative">
          <div className="h-64 lg:h-[400px] xl:h-[500px] rounded-2xl overflow-hidden relative group cursor-pointer">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/53a9a00f30c9ef8d766a4548fa7080ef24d62731?width=2312"
              alt="Live Session"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center">
                <PlayIcon />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 space-y-3 lg:space-y-4">
              <div className="space-y-2">
                <div className="w-full h-1 bg-white/50 rounded-full">
                  <div className="w-2/5 h-1 bg-white rounded-full"></div>
                </div>
                <div className="text-white text-sm lg:text-base">00:28:03 / 00:48:00</div>
              </div>

              <div className="flex items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-4 lg:gap-6">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 lg:h-5 bg-white"></div>
                    <div className="w-1 h-4 lg:h-5 bg-white"></div>
                  </div>
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>

                <div className="ml-auto">
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-black text-xl lg:text-2xl font-semibold">Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023</h3>
          <p className="text-black text-sm lg:text-base font-medium">By Doctor Malik</p>
        </div>

        <div className="flex justify-end">
          <button className="bg-[#F86F03] text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-[#e5630a] transition-colors">Join Now</button>
        </div>
      </div>
    </div>
  );
}
