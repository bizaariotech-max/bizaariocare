import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../AppLayout/Header";
import Footer from "../AppLayout/Footer";
import api from "../api";
import { __getCommenApiDataList } from "../utils/api/commonApi";
import locationIcon from "../assets/images/icons/location-pin-alt-1-svgrepo-com 1.png";
import workIcon from "../assets/images/icons/work.png";
import CommonBanner from "../UI/CommonBanner";
import aboutBanner from "../assets/images/about/banner.png";


   const hospitalData = 
            {
            banner: aboutBanner,
            title: 'Medical Board',
            desc:'Empowering hospitals, physicians, and patients with real-time communication and clinical collaboration—because better care starts with better connection.'
        }
        
const ViewAllDoctors = () => {
  const navigate = useNavigate();
  
  const [state, setState] = useState({
    doctors: [],
    MedicalSpecialties: [],
    loading: false,
    specialtiesLoading: false,
    currentPage: 1,
    totalPages: 1,
    totalDoctors: 0,
    limit: 12,
    search: "",
    selectedSpecialty: null,
  });

  const {
    doctors,
    MedicalSpecialties,
    loading,
    specialtiesLoading,
    currentPage,
    totalPages,
    totalDoctors,
    limit,
    search,
    selectedSpecialty,
  } = state;

  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  // Fetch doctors with filters
  const fetchDoctors = async (page = 1, searchTerm = "", specialty = null) => {
    try {
      updateState({ loading: true });
      
      const payload = {
        AssetCategoryLevel1: "68b0104063729ea39b28d0fb", // doctor
        page: page,
        limit: limit,
      };

      if (searchTerm.trim()) {
        payload.search = searchTerm.trim();
      }

      if (specialty) {
        payload.MedicalSpecialties = specialty._id;
      }

      const resp = await api.post("api/v1/admin/assetList", payload);
      
      const formattedData = resp.data.data.list.map((doc, index) => ({
        id: doc._id || index + 1,
        name: doc.AssetName,
        exp: `${doc.MedicalSpecialties?.[0]?.lookup_value || "General"} | ${
          doc.experience || 5
        } Years Experience`,
        location: `${doc.AddressLine1 || ""} ${doc.AddressLine2 || ""} ${doc.PostalCode || ""}`.trim() || "Location not specified",
        Specializes: `${(doc.MedicalSpecialties || [])
          .map((item) => item.lookup_value)
          .join(", ")} `,
        image: doc.ProfilePicture || null,
        phone: doc.PhoneNumber || "",
        email: doc.Email || "",
      }));

      updateState({
        doctors: formattedData,
        totalDoctors: resp.data.data.totalCount || 0,
        totalPages: Math.ceil((resp.data.data.totalCount || 0) / limit),
      });
    } catch (error) {
      console.error("Error fetching doctors:", error);
      updateState({ doctors: [] });
    } finally {
      updateState({ loading: false });
    }
  };

  // Fetch medical specialties
  const fetchSpecialties = async () => {
    try {
      updateState({ specialtiesLoading: true });
      const data = await __getCommenApiDataList({
        lookup_type: ["medical_speciality"],
        parent_lookup_id: null,
      });
      updateState({ MedicalSpecialties: data });
    } catch (error) {
      console.error("Error fetching specialties:", error);
    } finally {
      updateState({ specialtiesLoading: false });
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    updateState({ currentPage: 1 });
    fetchDoctors(1, search, selectedSpecialty);
  };

  // Handle specialty filter
  const handleSpecialtyChange = (specialty) => {
    updateState({ selectedSpecialty: specialty, currentPage: 1 });
    fetchDoctors(1, search, specialty);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    updateState({ currentPage: page });
    fetchDoctors(page, search, selectedSpecialty);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear filters
  const clearFilters = () => {
    updateState({ 
      search: "", 
      selectedSpecialty: null, 
      currentPage: 1 
    });
    fetchDoctors(1, "", null);
  };

  useEffect(() => {
    fetchSpecialties();
    fetchDoctors();
  }, []);

  // Loading skeleton component
  const DoctorCardSkeleton = () => (
    <div className="relative flex flex-col h-full max-w-sm bg-white rounded-lg shadow-md animate-pulse">
      {/* Header Section Skeleton */}
      <div className="relative flex items-center px-1 py-1 bg-gray-200 rounded-t-lg sm:px-1">
        {/* Doctor Image skeleton */}
        <div className="absolute object-cover w-20 h-20 bg-gray-300 border-4 border-white rounded-full shadow -bottom-12 left-4 sm:left-6 sm:w-24 sm:h-24"></div>
        
        {/* Name + Exp skeleton */}
        <div className="flex flex-col justify-center flex-1 mt-4 ml-24 space-y-2 sm:ml-32">
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Location & Specialization skeleton */}
      <div className="px-4 py-3 mt-16 space-y-2">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-5 h-5 mr-2 bg-gray-300 rounded"></div>
          <div className="flex-1 h-3 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-start">
          <div className="flex-shrink-0 w-5 h-5 mr-2 bg-gray-300 rounded"></div>
          <div className="flex-1 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Buttons skeleton */}
      <div className="flex flex-col gap-3 px-4 pb-4 mt-auto">
        <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
        <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );

  // Doctor card component
  const DoctorCard = ({ doctor }) => (
    <div className="relative flex flex-col h-full max-w-sm bg-white rounded-lg shadow-md">
      {/* Header Section */}
      <div className="relative flex items-center px-1 py-1 bg-gray-200 rounded-t-lg sm:px-1">
        {/* Doctor Image */}
        <img
          src={doctor.image || "/api/placeholder/100/100"}
          alt="doctor"
          className="absolute object-cover w-20 h-20 border-4 border-white rounded-full shadow -bottom-12 left-4 sm:left-6 sm:w-24 sm:h-24"
          onError={(e) => {
            e.target.src = "/api/placeholder/100/100";
          }}
        />

        {/* Name + Exp */}
        <div className="flex flex-col justify-center flex-1 mt-4 ml-24 sm:ml-32 overflow-wrap">
          <h5 className="text-base font-bold text-black truncate sm:text-lg">
            {doctor.name}
          </h5>
          <p className="text-xs text-gray-700 break-words sm:text-sm">
            {doctor.exp}
          </p>
        </div>
      </div>

      {/* Location & Specialization */}
      <div className="px-4 py-3 mt-16 space-y-2">
        <div className="flex items-start text-sm text-black">
          <img
            src={locationIcon}
            alt="location"
            className="flex-shrink-0 w-5 h-5 mr-2"
          />
          <span className="break-words">{doctor.location}</span>
        </div>
        <div className="flex items-start text-sm">
          <img
            src={workIcon}
            alt="work"
            className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
          />
          <span className="break-words">
            <strong>Specializes in:</strong>{" "}
            <span className="text-gray-600">{doctor.Specializes}</span>
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 px-4 pb-4 mt-auto">
        <button className="bg-[var(--button-back-color)] text-[var(--white)] rounded-lg py-3 font-semibold text-center text-base hover:bg-[var(--button-back-hover)] transition">
          Send Medical Query
        </button>
        <button
          onClick={() => navigate(`/doctor/${doctor.id}`)}
          className="bg-[var(--button-back-white-color)] text-[var(--button-back-color)] border border-gray-300 rounded-lg py-3 font-semibold text-center text-base hover:bg-gray-50 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );

  // Pagination component
  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center mt-8 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={page === '...'}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              page === currentPage
                ? 'text-white bg-blue-600 border border-blue-600'
                : page === '...'
                ? 'text-gray-400 cursor-default'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section>
        <CommonBanner bannerData={hospitalData} />
      </section>
      <div className="container px-4 py-8 mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Our Medical Experts
          </h1>
          <p className="text-gray-600">
            Find the right doctor for your healthcare needs
          </p>
        </div>

        {/* Filters Section */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <div className="grid items-end grid-cols-1 gap-4 md:grid-cols-3">
            {/* Search */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Search Doctors
              </label>
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => updateState({ search: e.target.value })}
                  placeholder="Search by name, specialty..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[var(--button-back-color)] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-[var(--button-back-color)] rounded-r-md hover:bg-[var(--button-back-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--button-back-color)]"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Medical Specialty
              </label>
              <select
                value={selectedSpecialty?._id || ""}
                onChange={(e) => {
                  const specialty = MedicalSpecialties.find(
                    (s) => s._id === e.target.value
                  );
                  handleSpecialtyChange(specialty || null);
                }}
                disabled={specialtiesLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--button-back-color)] focus:border-transparent"
              >
                <option value="">
                  {specialtiesLoading ? "Loading..." : "All Specialties"}
                </option>
                {MedicalSpecialties.map((specialty) => (
                  <option key={specialty._id} value={specialty._id}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div>
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-[var(--button-back-color)] bg-gray-100 rounded-md hover:bg-[var(--button-back-color)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--button-back-color)] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="light-color">
            {loading ? (
              <div className="w-48 h-4 bg-gray-300 rounded animate-pulse"></div>
            ) : (
              <span className="fw-semibold">
                {/* Showing {((currentPage - 1) * limit) + 1}-{Math.min(currentPage * limit, totalDoctors)} of {totalDoctors} doctors */}
              </span>
            )}
          </div>

          {(search || selectedSpecialty) && !loading && (
            <div className="flex items-center space-x-2">
              <span className="text-sm light-color">Active filters:</span>
              {search && (
                <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full">
                  Search: "{search}"
                </span>
              )}
              {selectedSpecialty && (
                <span className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                  {selectedSpecialty.name}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 12 }).map((_, index) => (
              <DoctorCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : doctors.length > 0 ? (
            // Doctor cards
            doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            // No results
            <div className="py-12 text-center col-span-full">
              <div className="mb-4 text-6xl text-gray-400">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-600">
                No doctors found
              </h3>
              <p className="mb-4 text-gray-500">
                Try adjusting your search criteria or filters
              </p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-[var(--button-back-color)] bg-white border border-[var(--button-back-color)] rounded-md hover:bg-[var(--button-back-color)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-[var(--button-back-color)] bg-white border border-[var(--button-back-color)] rounded-md hover:bg-[var(--button-back-color)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ViewAllDoctors;