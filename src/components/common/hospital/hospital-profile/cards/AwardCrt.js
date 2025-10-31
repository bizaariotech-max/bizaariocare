import { Link } from 'lucide-react'
import { CiLink } from "react-icons/ci";
import img1 from "../../../../../assets/images/hospital-profile/award.jpg"
import React from 'react'

const AwardCrt = ({ award }) => {
  return (
    <div className='px-4 bg-[#eceef3] py-4 rounded-xl'>
      <div>
        <img src={img1} alt="" className='w-full rounded-lg' />
      </div>
      <h2 className='my-3 text-xl font-semibold'>
        {award?.ContentTitle || "Best Cardiologist 2022"}
      </h2>
      <p className='pb-3'>
        {award?.GrantingBody || "Indian Medical Association"}
      </p>
      <p>
        {award?.ShortDescription || "I has received multiple awards for excellence in cardiology and patient care, including recognition for clinical innovation and compassionate service."}
      </p>

      <button className='flex items-center mt-4 hover:text-blue-800'>
        <CiLink className='inline text-3xl pe-2' />
        View Certificate
      </button>

    </div >
  )
}

export default AwardCrt

