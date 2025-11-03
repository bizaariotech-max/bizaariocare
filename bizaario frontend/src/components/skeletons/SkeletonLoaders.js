import React from 'react';

// Base Skeleton Component
const Skeleton = ({ className = "", style = {} }) => (
  <div
    className={`animate-pulse bg-gray-300 rounded ${className}`}
    style={style}
  />
);

// Medical Board Skeleton (Doctor Cards)
export const MedicalBoardSkeleton = () => (
  <div className="flex gap-4 overflow-hidden">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="relative flex flex-col h-full max-w-sm bg-white rounded-lg shadow-md min-w-[300px]"
      >
        {/* Header Section */}
        <div className="relative flex items-center px-1 py-1 bg-gray-200 rounded-t-lg sm:px-1">
          {/* Doctor Image overlapping bottom-left */}
          <Skeleton className="absolute object-cover w-20 h-20 border-4 border-white rounded-full shadow -bottom-12 left-4 sm:left-6 sm:w-24 sm:h-24" />

          {/* Name + Exp aligned next to image */}
          <div className="flex flex-col justify-center flex-1 mt-4 ml-24 space-y-2 sm:ml-32">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>

        {/* Location & Specialization */}
        <div className="px-4 py-3 mt-16 space-y-3">
          <div className="flex items-start">
            <Skeleton className="w-5 h-5 mr-2" />
            <Skeleton className="w-40 h-4" />
          </div>
          <div className="flex items-start">
            <Skeleton className="w-5 h-5 mr-2" />
            <div className="flex-1 space-y-1">
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 px-4 pb-4 mt-auto">
          <Skeleton className="w-full h-12 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

// Hospital Partners Skeleton
export const HospitalPartnersSkeleton = () => (
  <div className="flex gap-4 overflow-hidden">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="relative flex flex-col h-full max-w-sm bg-white rounded-lg shadow-md min-w-[300px]"
      >
        <div className="relative flex flex-col h-full bg-white border border-gray-300 rounded-lg shadow">
          {/* Top Banner Image */}
          <div className="relative w-full h-32 sm:h-52">
            <Skeleton className="w-full h-full" />
            {/* Hospital Logo overlapping bottom-left */}
            <Skeleton className="absolute z-50 w-20 h-20 border-4 border-white rounded-full shadow -bottom-10 left-4 sm:left-6 sm:w-24 sm:h-24" />
          </div>

          {/* Name + Exp */}
          <div className="px-4 pt-2 sm:pt-2 sm:px-6">
            <div className="ml-24 space-y-2 sm:ml-32">
              <Skeleton className="w-40 h-5" />
              <Skeleton className="w-32 h-4" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-4 py-4 mt-auto space-y-3 sm:px-6">
            <div className="flex items-start space-x-2">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-48 h-4" />
            </div>
            <div className="flex items-start space-x-2">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="w-24 h-4" />
            </div>
            <div className="flex items-start space-x-2">
              <Skeleton className="w-5 h-5" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 px-4 pb-4 mt-auto">
            <Skeleton className="w-full h-12 rounded-lg" />
            <Skeleton className="w-full h-12 rounded-lg" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// International Collaborations Skeleton (Stats Cards)
export const InterCollabsSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="p-4 text-white rounded-lg stats-card">
        <div className="space-y-3">
          <Skeleton className="w-24 h-4 bg-gray-400" />
          <div className="flex items-center justify-between">
            <Skeleton className="w-12 h-8 bg-gray-400" />
            <Skeleton className="w-12 h-12 bg-gray-400" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Live Sessions Skeleton
export const LiveSessionsSkeleton = () => (
  <div className="relative w-full h-[561px] bg-gray-300 animate-pulse rounded-lg flex items-center">
    <div className="container px-4 mx-auto">
      <div className="max-w-2xl space-y-4">
        <Skeleton className="h-10 bg-gray-400 w-80" />
        <Skeleton className="h-4 bg-gray-400 w-96" />
        <Skeleton className="h-4 bg-gray-400 w-72" />
        
        {/* Session Card */}
        <div className="max-w-md p-4 rounded-lg bg-white/20 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-16 h-16 bg-gray-400 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="w-32 h-4 bg-gray-400" />
              <Skeleton className="w-24 h-3 bg-gray-400" />
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4 bg-gray-400" />
              <Skeleton className="w-16 h-3 bg-gray-400" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4 bg-gray-400" />
              <Skeleton className="w-20 h-3 bg-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Awards Skeleton
export const AwardsSkeleton = () => (
  <div className="flex gap-4 overflow-hidden">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="flex flex-col justify-between rounded-2xl bg-[#BDC4D44D] p-3 h-full min-w-[300px]"
      >
        {/* Image */}
        <Skeleton className="w-full h-[257px] rounded-lg" />

        {/* Content */}
        <div className="mt-4 space-y-2 text-start">
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>

        {/* View Certificate Link */}
        <Skeleton className="w-32 h-5 mt-4" />
      </div>
    ))}
  </div>
);

// News and Articles Skeleton
export const NewsAndArticlesSkeleton = () => (
  <div className="flex gap-4 overflow-hidden">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="rounded-2xl bg-[#BDC4D44D] p-3 h-full min-w-[300px]"
      >
        {/* Image */}
        <Skeleton className="w-full h-[257px] rounded-lg" />

        {/* Info Row */}
        <div className="flex gap-12 mt-2">
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-[22px] h-[22px]" />
            <Skeleton className="w-8 h-3" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-[22px] h-[22px]" />
            <Skeleton className="w-16 h-3" />
          </div>
          <div className="flex items-center gap-1.5">
            <Skeleton className="w-[22px] h-[22px]" />
            <Skeleton className="w-8 h-3" />
          </div>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-2">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      </div>
    ))}
  </div>
);

// Testimonial Skeleton
export const TestimonialSkeleton = () => (
  <div className="relative max-w-4xl mx-auto">
    <div className="flex items-center justify-center gap-8">
      {/* Side Cards */}
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="relative h-64 p-6 bg-white shadow-lg rounded-2xl w-80 opacity-60"
        >
          <div className="absolute transform -translate-x-1/2 -top-8 left-1/2">
            <Skeleton className="w-16 h-16 border-4 border-white rounded-full shadow-lg" />
          </div>
          <div className="mt-12 space-y-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
            <div className="mt-4 space-y-1">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-24 h-3" />
              <Skeleton className="w-20 h-3" />
            </div>
          </div>
        </div>
      ))}

      {/* Center Card */}
      <div className="relative z-10 p-8 bg-white shadow-xl rounded-2xl w-96 h-80">
        <div className="absolute transform -translate-x-1/2 -top-8 left-1/2">
          <Skeleton className="w-20 h-20 border-4 border-white rounded-full shadow-lg" />
        </div>
        <div className="mt-12 space-y-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-4" />
          <div className="mt-6 space-y-2">
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-24 h-3" />
          </div>
        </div>
      </div>
    </div>

    {/* Navigation */}
    <div className="flex items-center justify-center gap-4 mt-8">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex gap-2">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="w-2 h-2 rounded-full" />
        ))}
      </div>
      <Skeleton className="w-10 h-10 rounded-full" />
    </div>
  </div>
);

// Generic Section Skeleton for components without specific cards
export const GenericSectionSkeleton = ({ title = true, content = true }) => (
  <div className="space-y-6">
    {title && (
      <div className="space-y-2 text-center">
        <Skeleton className="w-64 h-8 mx-auto" />
        <Skeleton className="h-4 mx-auto w-96" />
      </div>
    )}
    {content && (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-6 space-y-4 bg-white rounded-lg shadow">
            <Skeleton className="w-full h-40 rounded" />
            <Skeleton className="w-3/4 h-6" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-2/3 h-4" />
          </div>
        ))}
      </div>
    )}
  </div>
);

// CSS for animations (add to your global CSS or component)
export const skeletonStyles = `
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;