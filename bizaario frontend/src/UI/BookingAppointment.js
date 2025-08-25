import React, { useMemo, useState, useCallback } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import dayjs from 'dayjs';
import '../assets/css/bookingAppointment.css';

/**
 * DateTimeSlotPicker
 * - Calendar powered by react-day-picker (modern, accessible)
 * - Time slots appear only after the user selects a date
 * - Emits the final selection via onConfirm(selectedDateISO, selectedTime)
 */
export default function DateTimeSlotPicker({
  onConfirm,
  initialDate,
  slots: inputSlots,
  doctorName = 'Dr. Gaurav Pandey',
  mode = 'In-clinic',
}) {
  const today = React.useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(initialDate || undefined);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState('select'); // 'select' | 'details'
  const [appointmentId, setAppointmentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [fee, setFee] = useState('$2000');

  // Default slots if not provided
  const slots = inputSlots || [
    '08:30 AM - 09:00 AM',
    '09:00 AM - 09:30 AM',
    '09:30 AM - 10:00 AM',
    '10:00 AM - 10:30 AM',
    '10:30 AM - 11:00 AM',
    '11:00 AM - 11:30 AM',
    '11:30 AM - 12:00 PM',
    '12:00 PM - 12:30 PM',
    '12:30 PM - 01:00 PM',
    '01:00 PM - 01:30 PM',
    '01:30 PM - 02:00 PM',
    '02:00 PM - 02:30 PM',
    '02:30 PM - 03:00 PM',
    '03:00 PM - 03:30 PM',
  ];

  // Example: disable weekends and past dates
  const disabled = useMemo(() => [
    { before: today },
    { daysOfWeek: [0] }, // Sundays
  ], [today]);

  // Helper: seeded random for deterministic weekly unavailability
  const seededRandom = useCallback((seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }, []);

  const getUnavailableDatesForMonth = useCallback((monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDayWeekday = new Date(year, month, 1).getDay(); // 0..6
    const totalDays = new Date(year, month + 1, 0).getDate();

    const weekIndexToDays = new Map();
    for (let day = 1; day <= totalDays; day += 1) {
      const weekIndex = Math.floor((firstDayWeekday + (day - 1)) / 7);
      if (!weekIndexToDays.has(weekIndex)) weekIndexToDays.set(weekIndex, []);
      weekIndexToDays.get(weekIndex).push(day);
    }

    const unavailable = [];
    weekIndexToDays.forEach((daysInWeek, weekIndex) => {
      // exclude Sundays from random pool
      const candidates = daysInWeek.filter((d) => new Date(year, month, d).getDay() !== 0);
      if (candidates.length === 0) return;

      // pick two distinct days deterministically
      const seedBase = year * 10000 + month * 100 + weekIndex;
      const firstIdx = Math.floor(seededRandom(seedBase + 1) * candidates.length);
      let secondIdx = Math.floor(seededRandom(seedBase + 7) * candidates.length);
      if (candidates.length > 1 && secondIdx === firstIdx) {
        secondIdx = (secondIdx + 1) % candidates.length;
      }

      const chosen = [candidates[firstIdx]];
      if (candidates.length > 1) chosen.push(candidates[secondIdx]);

      chosen.forEach((d) => {
        const date = new Date(year, month, d);
        // skip past dates
        if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
        unavailable.push(date);
      });
    });

    return unavailable;
  }, [seededRandom, today]);

  // Track visible month to compute modifiers
  const [month, setMonth] = useState(today);
  const unavailableDates = useMemo(() => getUnavailableDatesForMonth(month), [month, getUnavailableDatesForMonth]);

  const sameDay = useCallback((a, b) => {
    return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }, []);
  const containsDate = useCallback((list, date) => {
    return !!list.find((d) => sameDay(d, date));
  }, [sameDay]);

  const availableDates = useMemo(() => {
    const year = month.getFullYear();
    const m = month.getMonth();
    const totalDays = new Date(year, m + 1, 0).getDate();
    const arr = [];
    for (let day = 1; day <= totalDays; day += 1) {
      const date = new Date(year, m, day);
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSunday = date.getDay() === 0;
      if (isPast || isSunday) continue;
      if (!containsDate(unavailableDates, date)) arr.push(date);
    }
    return arr;
  }, [month, unavailableDates, today, containsDate]);

  const isSelectedUnavailable = selectedDate ? containsDate(unavailableDates, selectedDate) : false;

  function handleContinue() {
    if (!selectedDate || !selectedTime) return;
    // simple ID
    const id = Math.random().toString(36).slice(2, 14).toUpperCase();
    setAppointmentId(id);
    setStep('details');
  }

  function handleConfirm() {
    if (!selectedDate || !selectedTime) return;
    const isoDate = dayjs(selectedDate).format('YYYY-MM-DD');
    if (onConfirm) onConfirm({ isoDate, selectedTime, fullName, phone, fee, appointmentId });
    else alert(`Appointment confirmed for ${dayjs(selectedDate).format('DD/MM/YYYY')} at ${selectedTime}. ID: ${appointmentId}`);
  }

  return (
      <>
          
      <div className="container  p-2 px-lg-5 booking-appointment-container">
         
      {step === 'select' && (
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <div className="p-3 py-4   calander-card" style={{background: '#fff',  }}>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(d) => { setSelectedDate(d); setSelectedTime(null); }}
                disabled={disabled}
                showOutsideDays
                captionLayout="dropdown-buttons"
                month={month}
                onMonthChange={setMonth}
                fromYear={today.getFullYear()}
                toYear={today.getFullYear() + 2}
                styles={{
                  caption: { textAlign: 'center', fontWeight: 600 },
                  day_selected: { backgroundColor: '#000000', color: '#fff' },
                }}
                modifiers={{
                  available: availableDates,
                  unavailable: unavailableDates,
                }}
                modifiersStyles={{
                  available: { backgroundColor: '#1DB954', color: '#fff' },
                  unavailable: { backgroundColor: '#E53935', color: '#fff' },
                }}
              />
            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="px-2 px-md-3">
              {!selectedDate && (
                <div className="text-muted">Select a date to view available time slots.</div>
              )} 
              {selectedDate && (
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="select-date f-flex">
                      {/* {dayjs(selectedDate).format('dddd, DD MMM YYYY')} */}
                    </div>
                  </div>

                  {isSelectedUnavailable && (
                    <div className="alert alert-danger py-2" role="alert">
                      No slots available for the selected date. Please choose another date.
                    </div>
                  )}

                  <div className="row g-2 g-md-3">
                    {slots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <div className="col-12 col-md-6" key={slot}>
                          <button
                            type="button"
                            className="w-100 btn"
                            style={{
                              background: isSelected ? '#4F56E3' : '#F1F2FE',
                              color: isSelected ? '#fff' : '#0A0A0A',
                              border: '1px solid',
                              borderColor: isSelected ? '#4F56E3' : '#e5e7eb',
                              padding: '12px 16px',
                              textAlign: 'left',
                            }}
                            disabled={isSelectedUnavailable}
                            onClick={() => setSelectedTime(slot)}
                          >
                            {slot}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="button"
                      className="btn px-4"
                      style={{ background: '#FF7A00', color: '#fff' }}
                      disabled={!selectedTime || isSelectedUnavailable}
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 'details' && (
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="mb-3">
              <input className="form-control form-control-lg mb-3" placeholder="Full Name" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
              <input className="form-control form-control-lg mb-3" placeholder="Phone No." value={phone} onChange={(e)=>setPhone(e.target.value)} />
              <input className="form-control form-control-lg" placeholder="$2000" value={fee} onChange={(e)=>setFee(e.target.value)} />
            </div>

            <div className="text-center fw-semibold mb-2">Appointment Preview</div>
            <div className="p-3 rounded-3" style={{ background: '#F3F3F3' }}>
              <div className="mb-1"><strong>Doctor</strong> : {doctorName}</div>
              <div className="mb-1"><strong>Date</strong> : {dayjs(selectedDate).format('DD/MM/YYYY')} <span className="ms-3"><strong>Time</strong> : {selectedTime}</span></div>
              <div className="mb-1"><strong>Mode</strong> : {mode}</div>
              <div className="mb-0"><strong>Appointment ID</strong> : {appointmentId}</div>
            </div>

            <div className="text-muted mt-3">You'll receive a notification 24 hours before your appointment.</div>

            <div className="d-flex justify-content-center mt-4">
              <button
                type="button"
                className="btn px-4"
                style={{ background: '#FF7A00', color: '#fff' }}
                onClick={handleConfirm}
              >
                Confirm Appointment
              </button>
            </div>

            <div className="d-flex justify-content-center mt-2">
              <button className="btn btn-link" onClick={()=>setStep('select')}>Back</button>
            </div>
          </div>
        </div>
      )}
          </div>
          </>
  );
}