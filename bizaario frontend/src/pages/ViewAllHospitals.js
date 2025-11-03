import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../AppLayout/Layout';
import api from '../api';
import locationIcon from '../assets/images/icons/location-pin-alt-1-svgrepo-com 1.png';
import clockIcon from '../assets/images/icons/clock.svg';
import webIcon from '../assets/images/icons/web.svg';
import aboutBanner from "../assets/images/about/banner.png";
import CommonBanner from '../UI/CommonBanner';

  const hospitalData = {
    banner: aboutBanner,
    title: "Hospitals Partners",
    desc: "Empowering hospitals, physicians, and patients with real-time communication and clinical collaboration—because better care starts with better connection.",
  };
const ViewAllHospitals = () => {
  const navigate = useNavigate();
  
  // State management
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [specialtiesLoading, setSpecialtiesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [medicalSpecialties, setMedicalSpecialties] = useState([]);
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [pageSize] = useState(12);

  // Fetch cities/stations from API
  const fetchCities = async () => {
    setCitiesLoading(true);
    try {
      const response = await api.post("api/v1/admin/StationList", {
        page: 1,
        limit: 20,
        OrgUnitLevel: "68affb77874340d8d79dbeaa",
      });

      if (response.data && response.data.data && response.data.data.list) {
        const cityList = response.data.data.list.map((station) => ({
          id: station._id,
          name: station.StationName || station.Name,
          displayName: station.StationName || station.Name,
        }));
        setCities(cityList);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      // Fallback to static cities if API fails
      setCities([
        { id: "", name: "Delhi NCR", displayName: "Delhi NCR" },
        { id: "", name: "Mumbai", displayName: "Mumbai" },
        { id: "", name: "Bengaluru", displayName: "Bengaluru" },
        { id: "", name: "Noida", displayName: "Noida" },
        { id: "", name: "Chennai", displayName: "Chennai" },
        { id: "", name: "Kolkata", displayName: "Kolkata" },
        { id: "", name: "Hyderabad", displayName: "Hyderabad" },
        { id: "", name: "Pune", displayName: "Pune" },
      ]);
    } finally {
      setCitiesLoading(false);
    }
  };

  // Cities for filtering (keeping as fallback)
  // const cities = [
  //   'Delhi NCR',
  //   'Mumbai',
  //   'Bengaluru',
  //   'Noida',
  //   'Chennai',
  //   'Kolkata',
  //   'Hyderabad',
  //   'Pune'
  // ];

  // Fetch hospitals with filters
  const fetchHospitals = async (
    page = 1,
    searchTerm = "",
    specialty = "",
    cityId = ""
  ) => {
    setLoading(true);
    try {
      const payload = {
        AssetCategoryLevel1: "68b00db063729ea39b28d0ef", // Hospital category ID
        page: page,
        limit: pageSize,
        StationId: cityId || "",
      };

      // Add filters if they exist
      if (specialty) {
        payload.MedicalSpecialties = specialty;
      }

      const response = await api.post("api/v1/admin/assetList", payload);

      if (response.data && response.data.data) {
        let hospitalList = response.data.data.list || [];

        // Client-side filtering for search (city filtering now handled by API)
        if (searchTerm) {
          hospitalList = hospitalList.filter(
            (hospital) =>
              hospital.AssetName?.toLowerCase().includes(
                searchTerm.toLowerCase()
              ) ||
              hospital.AddressLine1?.toLowerCase().includes(
                searchTerm.toLowerCase()
              ) ||
              hospital.AddressLine2?.toLowerCase().includes(
                searchTerm.toLowerCase()
              )
          );
        }

        // Remove city filtering since it's now handled by StationId in API
        // if (city) {
        //   hospitalList = hospitalList.filter(hospital =>
        //     hospital.AddressLine1?.toLowerCase().includes(city.toLowerCase()) ||
        //     hospital.AddressLine2?.toLowerCase().includes(city.toLowerCase())
        //   );
        // }

        const formattedHospitals = hospitalList.map((hospital, index) => ({
          id: hospital._id || index + 1,
          name: hospital.AssetName,
          specialties:
            hospital.MedicalSpecialties?.map((spec) => spec.lookup_value).join(
              ", "
            ) || "",
          location: `${hospital.AddressLine1 || ""} ${
            hospital.AddressLine2 || ""
          } ${hospital.PostalCode || ""}`.trim(),
          hours: hospital.WorkingHours || "24/7",
          website: hospital.Website || "",
          image: hospital.ProfilePicture || "/api/placeholder/400/300",
          logo: hospital.Logo || "/api/placeholder/100/100",
          phone: hospital.PhoneNumber || "",
          email: hospital.Email || "",
        }));

        setHospitals(formattedHospitals);
        setTotalHospitals(formattedHospitals.length);
        setTotalPages(Math.ceil(formattedHospitals.length / pageSize));
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch medical specialties for filter dropdown
  const fetchSpecialties = async () => {
    setSpecialtiesLoading(true);
    try {
      const response = await api.post("api/v1/admin/lookupList", {
        LookupType: "MedicalSpecialties",
      });

      if (response.data && response.data.data) {
        setMedicalSpecialties(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching specialties:", error);
    } finally {
      setSpecialtiesLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1);
    fetchHospitals(1, value, selectedSpecialty, selectedCityId);
  };

  // Handle specialty change
  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    setSelectedSpecialty(value);
    setCurrentPage(1);
    fetchHospitals(1, search, value, selectedCityId);
  };

  // Handle city change
  const handleCityChange = (e) => {
    const value = e.target.value;
    const selectedCityObj = cities.find((city) => city.id === value);
    setSelectedCityId(value);
    setSelectedCity(selectedCityObj ? selectedCityObj.name : "");
    setCurrentPage(1);
    fetchHospitals(1, search, selectedSpecialty, value);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchHospitals(page, search, selectedSpecialty, selectedCityId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearch("");
    setSelectedSpecialty("");
    setSelectedCity("");
    setSelectedCityId("");
    setCurrentPage(1);
    fetchHospitals(1, "", "", "");
  };

  // Initial data fetch
  useEffect(() => {
    fetchHospitals();
    fetchSpecialties();
    fetchCities();
  }, []);

  // Hospital card skeleton component
  const HospitalCardSkeleton = () => (
    <div className="relative flex flex-col h-full bg-white border border-gray-300 rounded-lg shadow animate-pulse">
      {/* Top Banner Image Skeleton */}
      <div className="relative w-full h-32 bg-gray-300 rounded-t-lg sm:h-52">
        {/* Logo Skeleton */}
        <div className="absolute z-50 w-20 h-20 bg-gray-400 border-4 border-white rounded-full -bottom-10 left-4 sm:left-6 sm:w-24 sm:h-24"></div>
      </div>

      {/* Name + Specialties Skeleton */}
      <div className="px-4 pt-2 sm:pt-2 sm:px-6">
        <div className="ml-24 sm:ml-32">
          <div className="w-3/4 h-5 mb-2 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 px-4 py-4 mt-auto space-y-3 sm:px-6">
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 bg-gray-300 rounded sm:w-6 sm:h-6"></div>
          <div className="w-full h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 bg-gray-300 rounded sm:w-6 sm:h-6"></div>
          <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-5 h-5 bg-gray-300 rounded sm:w-6 sm:h-6"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex flex-col gap-3 px-4 pb-4 mt-auto">
        <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
        <div className="w-full h-12 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );

  // Hospital card component
  const HospitalCard = ({ hospital }) => (
    <div className="relative flex flex-col h-full transition-shadow bg-white border border-gray-300 rounded-lg shadow hover:shadow-lg">
      {/* Top Banner Image */}
      <div className="relative w-full h-32 sm:h-52">
        <img
          src={hospital.image}
          alt="hospital"
          className="object-cover w-full h-full rounded-t-lg"
          onError={(e) => {
            e.target.src = "/api/placeholder/400/300";
          }}
        />

        {/* Hospital Logo overlapping bottom-left */}
        <img
          src={hospital.logo}
          alt="hospital logo"
          className="absolute z-50 object-cover w-20 h-20 border-4 border-white rounded-full shadow -bottom-10 left-4 sm:left-6 sm:w-24 sm:h-24"
          onError={(e) => {
            e.target.src = "/api/placeholder/100/100";
          }}
        />
      </div>

      {/* Name + Specialties */}
      <div className="px-4 pt-2 sm:pt-2 sm:px-6">
        <div className="ml-24 sm:ml-32">
          <h5 className="text-base font-bold text-black break-words sm:text-lg">
            {hospital.name}
          </h5>
          <p className="text-xs text-gray-700 break-words sm:text-sm">
            {hospital.specialties}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-4 mt-auto space-y-3 sm:px-6">
        <div className="flex items-start space-x-2">
          <img
            src={locationIcon}
            alt="location"
            className="flex-shrink-0 w-5 sm:w-6"
          />
          <span className="text-sm text-black break-words sm:text-base">
            {hospital.location}
          </span>
        </div>
        <div className="flex items-start space-x-2">
          <img
            src={clockIcon}
            alt="clock"
            className="flex-shrink-0 w-5 sm:w-6"
          />
          <span className="text-sm text-black sm:text-base">
            Hours: {hospital.hours}
          </span>
        </div>
        {hospital.website && (
          <div className="flex items-start space-x-2">
            <img src={webIcon} alt="web" className="flex-shrink-0 w-5 sm:w-6" />
            <span className="text-sm text-black break-words sm:text-base">
              Website: {hospital.website}
            </span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 px-4 pb-4 mt-auto">
        <button
          onClick={() => navigate(`/hospital/${hospital.id}`)}
          className="bg-[var(--button-back-color)] hover:bg-[var(--button-back-hover)] text-white rounded-lg py-3 text-sm sm:text-base font-semibold transition-colors"
        >
          Book An Appointment
        </button>
        <button
          onClick={() => navigate(`/hospital/${hospital.id}`)}
          className="bg-white text-[var(--button-back-color)] border border-[var(--button-back-color)] hover:bg-[var(--button-back-color)] hover:text-white rounded-lg py-3 text-sm sm:text-base font-semibold transition-colors"
        >
          Send Treatment Query
        </button>
      </div>
    </div>
  );

  return (
    <Layout>
      <section>
        <CommonBanner bannerData={hospitalData} />
      </section>
      <div className="container px-4 py-8 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 fw-semibold">All Partner Hospitals</h1>
          <p className="light-color">
            World-class healthcare institutions with advanced facilities and
            trusted care.
          </p>
        </div>

        {/* Filters */}
        <div className="p-6 mb-8 bg-white border rounded-lg shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Search Hospitals
              </label>
              <input
                type="text"
                placeholder="Search by name or location..."
                value={search}
                onChange={handleSearch}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--button-back-color)] focus:border-transparent"
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Medical Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={handleSpecialtyChange}
                disabled={specialtiesLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--button-back-color)] focus:border-transparent"
              >
                <option value="">
                  {specialtiesLoading ? "Loading..." : "All Specialties"}
                </option>
                {medicalSpecialties.map((specialty) => (
                  <option key={specialty._id} value={specialty._id}>
                    {specialty.lookup_value}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                City
              </label>
              <select
                value={selectedCityId}
                onChange={handleCityChange}
                disabled={citiesLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--button-back-color)] focus:border-transparent"
              >
                <option value="">
                  {citiesLoading ? "Loading..." : "All Cities"}
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.displayName}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-[var(--button-back-color)] bg-white border border-[var(--button-back-color)] rounded-md hover:bg-[var(--button-back-color)] hover:text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="fw-semibold">
              {loading ? "Loading..." : `${totalHospitals} Hospitals Found`}
            </h2>
            {(search || selectedSpecialty || selectedCity) && (
              <p className="mt-1 light-color">
                {search && `Search: "${search}"`}
                {search && (selectedSpecialty || selectedCity) && " • "}
                {selectedSpecialty &&
                  `Specialty: ${
                    medicalSpecialties.find((s) => s._id === selectedSpecialty)
                      ?.lookup_value
                  }`}
                {selectedSpecialty && selectedCity && " • "}
                {selectedCity && `City: ${selectedCity}`}
              </p>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: pageSize }, (_, index) => (
                <HospitalCardSkeleton key={index} />
              ))
            : hospitals.map((hospital) => (
                <HospitalCard key={hospital.id} hospital={hospital} />
              ))}
        </div>

        {/* No Results */}
        {!loading && hospitals.length === 0 && (
          <div className="py-12 text-center">
            <div className="mb-4 text-gray-500">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No hospitals found
            </h3>
            <p className="mb-4 text-gray-500">
              Try adjusting your search criteria or clearing the filters.
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-[var(--button-back-color)] text-white rounded-md hover:bg-[var(--button-back-hover)] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

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
    </Layout>
  );
};

export default ViewAllHospitals;