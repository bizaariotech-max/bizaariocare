import {
  FaMapMarkerAlt,
  FaLinkedin,
  FaInstagram,
  FaFacebookF,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import img1 from "../../../../assets/images/hospital-profile/logo_1.png";

const DoctorProfile = ({ doctorData }) => (
  <div className="">
    <h2 className="mb-5 text-3xl font-semibold">Doctor Profile</h2>
    <div className="bg-[#f2f3f6] rounded-lg ">
      <div className="flex flex-col gap-4 p-6 rounded-lg shadow ">
        <div className="flex flex-col gap-4 md:flex-row ">
          <div className="max-w-[200px]">
            <img
              src={doctorData?.logo || doctorData?.image || img1}
              alt="doctor"
              className="h-auto max-w-full rounded-md"
            />
          </div>
          <div className="w-full">
            <div className="flex flex-col justify-between gap-2 mb-2 md:mb-0 md:flex-row">
              <h3 className="text-2xl font-semibold ">
                {doctorData?.name || "Dr. John Doe"}      
              </h3>
              <button className="border-2 text-[var(--primary)] border-[var(--primary)] rounded-md py-3 px-4 flex items-center gap-2">
                <MdFileDownload
                  className="inline text-[var(--primary)]"
                  size={20}
                />
                Download Doctor Profile
              </button>
            </div>
            <div className="flex items-center mb-1 text-[var(--primary)]">
              <FaMapMarkerAlt size={16} className="me-2" />
              <span>
                {doctorData?.location || "Sector 62, Noida, Uttar Pradesh"}
              </span>
            </div>
            <p className="my-2 text-gray-700">
              {doctorData?.description || 
                "Dr. John Doe is a renowned cardiologist with over 15 years of experience in providing top-notch cardiac care. Specializing in heart diagnostics, treatment, and prevention, he has helped thousands of patients improve their health and well-being. Dr. Doe's compassionate approach and advanced technology make him a trusted name in the industry."}     
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex gap-3 mt-1">
            {doctorData?.linkedInAccount && (
              <a
                href={doctorData.linkedInAccount}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaLinkedin size={22} />
              </a>
            )}
            {doctorData?.instagramAccount && (
              <a
                href={doctorData.instagramAccount}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaInstagram size={22} />
              </a>
            )}
            {doctorData?.facebookPage && (  
              <a
                href={doctorData.facebookPage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaFacebookF size={22} />
              </a>
            )}
            {doctorData?.telegramChannel && (
              <a
                href={doctorData.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaTelegram size={22} />
              </a>
            )}
            {doctorData?.whatsAppCommunity && (
              <a
                href={doctorData.whatsAppCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaWhatsapp size={22} />
              </a>
            )}
            {doctorData?.youTubeChannel && (
              <a
                href={doctorData.youTubeChannel}  
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaYoutube size={22} />
              </a>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4 md:flex-row">
            <button className="w-full px-3 bg-[var(--button-back-white-color)] text-[var(--button-back-color)] border border-gray-300 rounded-lg py-3 font-semibold text-center text-base hover:bg-gray-50 transition">
              Send Treatment Query
            </button>
            <div>
              <button className="lg:min-w-[200px] bg-[var(--button-back-color)] text-[var(--white)] rounded-lg py-3 font-semibold text-center text-base hover:bg-[var(--button-back-hover)] transition">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DoctorProfile;
