import React from 'react'
import eventImage from '../../../../../assets/images/hospital-profile/img10.jpg'
const UpcommingEventContent = ({ hospitalData }) => {
  // Use dynamic events from hospitalData or fallback to static data
  const events = hospitalData?.events || [
    {
      eventID: "LEUVG0",
      eventType: "OPD",
      eventTitle: "OPD Treatment",
      venue: "Venue",
      fees: "$100",
      dateFrom: "22/12/2025",
      dateTo: "22/12/2025",
      timeFrom: "10 AM",
      timeTo: "02 PM",
      instructions: "Instructions For Attendees Instructions For Attendees Instructions For Attendees Instructions For Attendees Instructions For Attendees Instructions For Attendees"
    },
    {
      eventID: "LEUVG0",
      eventType: "OPD",
      eventTitle: "OPD Treatment",
      venue: "Venue",
      fees: "$100",
      dateFrom: "22/12/2025",
      dateTo: "22/12/2025",
      timeFrom: "10 AM",
      timeTo: "02 PM",
      instructions: "Instructions For Attendees Instructions For Attendees Instructions For Attendees Instructions For Attendees Instructions For Attendees Instructions For Attendees"
    },
    {
      eventID: "LEUVG0",
      eventType: "OPD",
      eventTitle: "OPD Treatment",
      venue: "Venue",
      fees: "$100",
      dateFrom: "22/12/2025",
      dateTo: "22/12/2025",
      timeFrom: "10 AM",
      timeTo: "02 PM",
      instructions: "Instructions For Attendees Instructions For Attendees Instructions For Attendees Instructions For Attendees Instructions For Attendees Instructions For Attendees"
    },
  ];


  return (
    <div className='gap-6 '>
      {events.map((event, index) => (
        <div key={event._id || index} className="bg-[#f5f6f9] rounded-xl px-4 py-4 mb-5  ">
          <div className="flex flex-col gap-5 md:flex-row lg:gap-8">
            {/* Left blank area */}
            <div className="max-w-full" >
              <img src={event.image || eventImage} alt="img" className="max-w-[400px] h-auto" />
            </div>
            {/* Right details area */}
            <div className="flex flex-col gap-4 ">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#e9ebef] rounded-md px-4 py-2 text-sm ">
                  <span className="font-semibold">Event ID :</span> {event._id || event.eventID || "N/A"}
                </div>
                <div className="bg-[#e9ebef] rounded-md px-4 py-2 text-sm ">
                  <span className="font-semibold">Event Type :</span> {event.EventTypeId?.lookup_value || event.eventType || "N/A"}
                </div>
              </div>
              <div className="bg-[#e9ebef] rounded-md px-4 py-2 text-sm ">
                <span className="font-semibold">Event Title :</span> {event.EventTitle || event.eventTitle || "N/A"}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#e9ebef] rounded-md px-4 py-2 text-sm ">
                  <span className="font-semibold"><span className='lora'>Venue :</span></span> {event.EventVenue || event.venue || "N/A"}
                </div>
                <div className="bg-[#e9ebef] rounded-md px-4 py-2 text-md ">
                  <span className="font-semibold"><span className='lora'>Fees :</span> {event.RegistrationFee ? `${event.RegistrationFee}` : event.fees || "N/A"}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#e9ebef] rounded-md px-4 py-2 text-sm ">
                  <div className="font-semibold lora">Date</div>
                  <span>
                    <span className='lora'>From : </span>{event.dateFrom || "N/A"} &nbsp;&nbsp;|&nbsp;&nbsp; <span className='lora'>To : </span>  {event.dateTo || "N/A"}
                  </span>
                </div>
                <div className="bg-[#e9ebef] rounded-md px-4 py-2 text-sm ">
                  <div className="font-semibold lora">Time</div>
                  <span>
                    From : {event.timeFrom || "N/A"} &nbsp;&nbsp;|&nbsp;&nbsp;To : {event.timeTo || "N/A"}
                  </span>
                </div>
              </div>
              <div className="bg-[#e9ebef] rounded-md px-4 py-2 ">
                <h3 className="text-lg font-semibold">Instructions For Attendees</h3>
                <span className="font-normal text-md">
                  {event.instructions || "Please follow the event guidelines and arrive on time."}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}


    </div>
  )
}

export default UpcommingEventContent

