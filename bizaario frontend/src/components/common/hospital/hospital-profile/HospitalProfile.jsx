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

const HospitalProfile = ({ hospitalData }) => (
  <div className="">
    <h2 className="mb-5 text-3xl font-semibold">Hospital Profile</h2>
    <div className="bg-[#f2f3f6] rounded-lg ">
      <div className="flex flex-col gap-4 p-6 rounded-lg shadow ">
        <div className="flex flex-col gap-4 md:flex-row ">
          <div className="max-w-[200px]">
            <img
              src={hospitalData?.logo || hospitalData?.image || img1}
              alt="hospital"
              className="h-auto max-w-full rounded-md"
            />
          </div>
          <div>
            <div className="flex flex-col justify-between gap-4 mb-2 md:items-center md:flex-row">
              <h3 className="text-2xl font-semibold ">
                {hospitalData?.name || "Apollo Hospital"}
              </h3>
              <button className="border text-[var(--primary)] border-[var(--primary)] rounded-md py-3 px-4 flex items-center gap-2">
                <MdFileDownload
                  className="inline text-[var(--primary)]"
                  size={20}
                />
                Download Hospitals Profile
              </button>
            </div>
            <div className="flex items-center mb-1 text-[var(--primary)]">
              <FaMapMarkerAlt size={16} className="me-2" />
              <span>
                {hospitalData?.location || "Sector 62, Noida, Uttar Pradesh"}
              </span>
            </div>
            <p className="my-2 text-gray-700">
              {hospitalData?.description ||
                "Fortis Heart Institute is a leading center of excellence in cardiac care, known for its advanced technology, expert cardiologists, and patient-centric approach. With state-of-the-art facilities and a track record of successful treatments, the hospital offers comprehensive heart care services — from diagnostics to surgery — under one roof."}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div className="flex gap-3 mt-1">
            {hospitalData?.linkedInAccount && (
              <a
                href={hospitalData.linkedInAccount}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaLinkedin size={22} />
              </a>
            )}
            {hospitalData?.instagramAccount && (
              <a
                href={hospitalData.instagramAccount}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaInstagram size={22} />
              </a>
            )}
            {hospitalData?.facebookPage && (
              <a
                href={hospitalData.facebookPage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaFacebookF size={22} />
              </a>
            )}
            {hospitalData?.telegramChannel && (
              <a
                href={hospitalData.telegramChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaTelegram size={22} />
              </a>
            )}
            {hospitalData?.whatsAppCommunity && (
              <a
                href={hospitalData.whatsAppCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaWhatsapp size={22} />
              </a>
            )}
            {hospitalData?.youTubeChannel && (
              <a
                href={hospitalData.youTubeChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] p-1 shadow-card border bg-white border-gray-400  rounded-full h-10 w-10 grid items-center justify-center"
              >
                <FaYoutube size={22} />
              </a>
            )}
          </div>
          <div className="flex flex-col gap-4 mt-4 md:flex-row">
            <button className="btn-outline">Send Treatment Query</button>
            <div>
              <button className="w-full btn-fill">Book Appointment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HospitalProfile;
