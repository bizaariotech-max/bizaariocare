import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import doctorimage from "../../assets/images/doctor-2337835_1920 1.png";
import { __postApiData } from "../../utils/api";



export default function TestimonialsSection() {

  //============================ get patient testimonials==========================================

  const [patient_testimonial, setpatient_testimonial] = useState([])

  const getContentList = async () => {
    try {
      const resp = await __postApiData("/api/v1/admin/ContentList",
        {
          page: 1,
          limit: 100,
          ContentTypeId: "68c8f5fab5cf101deca56536"
          // "ContentPriority":"Medium"

        }
      );

      if (resp.response.response_code === "200") {
        setpatient_testimonial(resp.data.list || []);
      }
    } catch (error) {
      console.error("Error fetching content list:", error);
    }
  };

  useEffect(() => {
    getContentList()

  }, [])

  console.log(patient_testimonial);


  //   const testimonials = [
  //   {
  //     id: 1,
  //     name: "Dr. Malik",
  //     title: "Senior Cardiologist",
  //     hospital: "Apollo Hospitals",
  //     review:
  //       "Traveling from Kenya for my heart surgery felt overwhelming at first, but the hospital team guided me through every step. The doctors explained everything clearly, and after my procedure, I felt safe and well cared for. I'm truly grateful for the warmth and professionalism I experienced.",
  //     image: doctorimage,
  //   },
  //   {
  //     id: 2,
  //     name: "Dr. Sarah Johnson",
  //     title: "Chief of Neurology",
  //     hospital: "Mayo Clinic",
  //     review:
  //       "The comprehensive care and attention to detail provided by this medical team exceeded all my expectations. From diagnosis to recovery, every aspect was handled with utmost professionalism and compassion.",
  //     image: doctorimage,
  //   },
  //   {
  //     id: 3,
  //     name: "Dr. Michael Chen",
  //     title: "Orthopedic Surgeon",
  //     hospital: "Johns Hopkins",
  //     review:
  //       "Having worked in medicine for over 20 years, I can confidently say this facility represents the gold standard in patient care. The innovative treatments and dedicated staff make all the difference.",
  //     image: doctorimage,
  //   },
  // ];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % patient_testimonial.length);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(
      (prev) => (prev - 1 + patient_testimonial.length) % patient_testimonial.length
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + patient_testimonial.length) % patient_testimonial.length;
      visible.push({ ...patient_testimonial[index], position: i });
    }
    return visible;
  };





  return (
    <section className="px-4 pt-10 pb-2">
      <div className="mx-auto max-w-full">
        <div className="relative w-full">
          <div className="flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-in-out md:flex-row md:gap-8">
            {getVisibleTestimonials().map((testimonial, index) => {
              const isCenter = testimonial.position === 0;
              const isLeft = testimonial.position === -1;
              const isRight = testimonial.position === 1;

              return (
                <div
                  key={`${testimonial.id}-${currentIndex}-${index}`}
                  className={`relative transition-all duration-300 flex flex-col items-center border rounded-lg p-3 hover:shadow-lg ${isCenter
                    ? "scale-100 opacity-100 z-20"
                    : "scale-75 opacity-80 z-10 hidden md:flex"
                    } ${isCenter ? "" : "hover:opacity-80 cursor-pointer"}`}
                  onClick={() => {
                    if (!isCenter && !isAnimating) {
                      setIsAnimating(true);
                      if (isLeft) {
                        setCurrentIndex(
                          (prev) =>
                            (prev - 1 + patient_testimonial.length) %
                            patient_testimonial.length
                        );
                      } else if (isRight) {
                        setCurrentIndex(
                          (prev) => (prev + 1) % patient_testimonial.length
                        );
                      }
                    }
                  }}
                  style={{
                    width: isCenter ? "100%" : "350px",
                    maxWidth: "475px",
                    minHeight: "350px",
                    padding: "30px",
                    borderRadius: "10px",
                    // background: "rgba(189, 196, 212, 0.30)",
                    background: "var(--white)",
                    position: "relative",
                    alignSelf: "stretch", // ✅ keep all cards aligned
                  }}
                >
                  {/* Avatar */}
                  <div className="absolute transform -translate-x-1/2 -top-8 left-1/2">
                    <div className="relative">
                      <img
                        src={testimonial?.ContentImage || "/placeholder.svg"}
                        alt={testimonial?.ContentTitle}
                        className={`${isCenter ? "w-20 h-20" : "w-16 h-16"
                          } rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300`}
                      />
                      <div
                        className={`absolute -top-1 -right-1 bg-blue-600 rounded-full p-1 ${isCenter ? "scale-100" : "scale-75"
                          } transition-transform duration-300`}
                      >
                        <Quote
                          className={`${isCenter ? "w-3 h-3" : "w-2 h-2"
                            } text-white`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-center justify-start w-full mt-12 text-left">
                    <blockquote
                      className={`text-gray-700 leading-relaxed mb-4 text-left italic w-full ${isCenter ? "text-base" : "text-sm"
                        }`}
                      style={
                        !isCenter
                          ? {
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            margin: "0", // ✅ no margin top
                          }
                          : {}
                      }
                    >
                      "{testimonial?.LongDescription}"
                    </blockquote>

                    <div className="w-full text-left">
                      <h4
                        className={`font-semibold text-gray-900 mb-1 ${isCenter ? "text-lg" : "text-base"
                          }`}
                      >
                        {testimonial?.AssetId?.AssetName}
                      </h4>
                      <p
                        className={`text-gray-600 ${isCenter ? "text-sm" : "text-xs"
                          }`}
                      >
                        {testimonial?.AssetId?.MedicalSpecialties?.map(
                          (item) => item.lookup_value
                        ).join(",")}
                      </p>
                      <p
                        className={`text-gray-500 mt-1 ${isCenter ? "text-xs" : "text-xs"
                          }`}
                      >
                        {testimonial.hospital}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevTestimonial}
            disabled={isAnimating}
            className="p-2 transition-colors bg-transparent border-2 border-gray-300 rounded-full hover:border-blue-600 hover:bg-blue-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {patient_testimonial.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            disabled={isAnimating}
            className="p-2 transition-colors bg-transparent border-2 border-gray-300 rounded-full hover:border-blue-600 hover:bg-blue-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
