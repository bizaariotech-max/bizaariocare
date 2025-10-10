
import React from 'react';
import { Plus, Edit } from 'lucide-react';
import { useEffect, useState,useRef } from 'react'
import { TextField, Select, MenuItem, FormControl, Button,CircularProgress  } from '@mui/material';
import api from '../../../../../api'
import Swal from 'sweetalert2';
import UniqueLoader from '../../../../loader';
import { customMenuProps } from '../../../../../utils/mui_select_scroll_bar';
import { Modal, } from 'react-bootstrap'; 
import PremiumDoctor from '../PremiumDoctor/PremiumDoctor';


const PatientReferralForSecondOpenioun = ({patientId,selected_case_file,case_file_data,onRefresh}) => {


   const doctordetails=JSON.parse(localStorage.getItem("user"))
  
  


const [second_opinion_query, setsecond_opinion_query] = useState({

            Second_Opinion_Query:[],
        
    });


   

const handleChiefComplaintsChange = (index, field, value, subField = null) => {
  setsecond_opinion_query(prev => {
    const updatedChiefComplaints = [...prev.ChiefComplaints];
    const complaint = { ...updatedChiefComplaints[index] };

    if (subField) {
      // For nested objects like Duration {Value, Unit}
      complaint[field] = {
        ...complaint[field],
        [subField]: value
      };
    } else {
      // For direct fields like SeverityGrade, Symptoms, AggravatingFactors
      complaint[field] = value;
    }

    updatedChiefComplaints[index] = complaint;

    return {
      ...prev,
      ChiefComplaints: updatedChiefComplaints
    };
  });
};

 const toggleArrayField = (index, field, item) => {
  setsecond_opinion_query(prev => {
    const updatedChiefComplaints = [...prev.ChiefComplaints];
    const complaint = { ...updatedChiefComplaints[index] };
    const currentArray = complaint[field] || [];

    const itemId = typeof item === "string" ? item : item?._id;

    // Check if item exists
    const exists = currentArray.some(s =>
      typeof s === "string" ? s === itemId : s?._id === itemId
    );

    if (exists) {
      // Remove item
      complaint[field] = currentArray.filter(s =>
        typeof s === "string" ? s !== itemId : s._id !== itemId
      );
    } else {
      // Add item
      complaint[field] = [...currentArray, item];
    }

    updatedChiefComplaints[index] = complaint;

    return {
      ...prev,
      ChiefComplaints: updatedChiefComplaints,
    };
  });
};







  //============================= all truma list==================================================

    const [loading_second_opinioun, setloading_second_opinioun] = useState(false);

       const[all_second_opinion_query_master,setall_second_opinion_query_master]=useState([])
      const getall_second_opinion_query_master=async()=>
      {
        try {
            setloading_second_opinioun(true)
            const resp=await api.post('api/v1/admin/LookupList/',{lookupcodes:"second_opinion_query_type"})
          console.log(resp);
          
          setall_second_opinion_query_master(resp.data.data)
          
        } catch (error) {
          console.log(error);
          
        }
        finally
        {
            setloading_second_opinioun(false)
        }
      }
    
               


      const[isloading,setisloading]=useState(false)
      
      const save_chif_complaints = async () => {
        setisloading(true);
        try {
          const payload=
          {...second_opinion_query,
            CaseFileId:patient_all_cheif_complaints[0].caseFileId._id,
            CreatedBy:doctordetails._id
            
          }
         
          
          const resp = await api.post(
            `api/v1/admin/medical-history/chief-complaints/add-multiple`,
            payload,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        
          
      
          const { response_code, response_message } = resp.data.response;
      
          if (response_code === "200") {
            Swal.fire({
              icon: "success",
              title: "Details Added",
              text: "Chief Complaints Added Successfully...",
              showConfirmButton: true,
              customClass: { confirmButton: "my-swal-button" },
            }).then(() => {
              // window.location.reload();
              onRefresh()
            });
          } else if (response_code === "400") {
            // Show server validation error here
            Swal.fire({
              icon: "error",
              title: response_message.errorType || "Error",
              text: response_message.error,
              showConfirmButton: true,
              customClass: { confirmButton: "my-swal-button" },
            });
          } else {
            // Optional: handle other response codes
            Swal.fire({
              icon: "warning",
              title: "Unexpected response",
              text: "Something went wrong. Please try again.",
              showConfirmButton: true,
              customClass: { confirmButton: "my-swal-button" },
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Request failed",
            text: error.message || "Something went wrong",
            showConfirmButton: true,
            customClass: { confirmButton: "my-swal-button" },
          });
        } finally {
          setisloading(false);
        }
      };


    const[patient_all_cheif_complaints,setpatient_all_cheif_complaints]=useState([])

 const getall_patient_medical_history = async () => {
   try {
    //  setLoadingSpeciality(true);
     const resp = await api.get(`api/v1/admin/medical-history/list?PatientId=${patientId}&Status=Ongoing`);
 
        const formatted = resp.data.data.list.map(item => ({
          caseFileId: item.CaseFileId,
          complaints: item.ChiefComplaints
        }));
        setpatient_all_cheif_complaints(formatted);

 
     
   } catch (error) {
     console.error(error);
   } finally {
    //  setLoadingSpeciality(false);
   }
 };
 
 useEffect(()=>
 {
 getall_patient_medical_history()
 },[])


  //========================== modal open or close start==========================================
    
    const [show, setShow] = useState(false)

    const handleShow =  () => {
        setShow(true)
    };

    const handleClose = () => setShow(false);


//====================== onchage event for ChiefComplaints start=================================



// ==============================edit chief complaints============================================

 const [showEdit, setShowEdit] = useState(false)

const handleShowEdit = () => {
  if (patient_all_cheif_complaints && patient_all_cheif_complaints.length > 0 && patient_all_cheif_complaints[0].complaints ) 

    {
      const normalizedComplaints = patient_all_cheif_complaints[0].complaints.map(
        ({ createdAt, updatedAt, _id, ...cc }) => ({
          ...cc,
          Symptoms: cc.Symptoms?.map((s) => (typeof s === "string" ? s : s?._id)),
          AggravatingFactors: cc.AggravatingFactors?.map((a) =>
            typeof a === "string" ? a : a._id
          ),
          Duration: {
            Value: cc.Duration?.Value || "",
            Unit:
              typeof cc.Duration?.Unit === "string"
                ? cc.Duration.Unit
                : cc.Duration?.Unit?._id || "",
          },
        })
      );

      setsecond_opinion_query((prev) => ({
        ...prev,
        ChiefComplaints: normalizedComplaints,
      }));
 
  }

  setShowEdit(true);
};


const handleCloseEdit = () => {
  setShowEdit(false);
  setsecond_opinion_query({
    ChiefComplaints: [
      {
        Symptoms: [],
        Duration: { Value: "", Unit: "" },
        SeverityGrade: "",
        AggravatingFactors: [],
      },
    ],
  });
};




      const update_chif_complaints = async () => {
        setisloading(true);
        try {
          const payload=
          {...second_opinion_query,
            CaseFileId:patient_all_cheif_complaints[0].caseFileId._id,
            UpdatedBy :doctordetails._id
          }
         
          
          const resp = await api.put(
            `api/v1/admin/medical-history/chief-complaints/edit-multiple`,
            payload,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        
          const { response_code, response_message } = resp.data.response;
      
          if (response_code === "200") {
            Swal.fire({
              icon: "success",
              title: "Details Added",
              text: "Chief Complaints Updated Successfully...",
              showConfirmButton: true,
              customClass: { confirmButton: "my-swal-button" },
            }).then(() => {
              // window.location.reload();
              onRefresh()
            });
          } else if (response_code === "400") {
            // Show server validation error here
            Swal.fire({
              icon: "error",
              title: response_message.errorType || "Error",
              text: response_message.error,
              showConfirmButton: true,
              customClass: { confirmButton: "my-swal-button" },
            });
          } else {
            // Optional: handle other response codes
            Swal.fire({
              icon: "warning",
              title: "Unexpected response",
              text: "Something went wrong. Please try again.",
              showConfirmButton: true,
              customClass: { confirmButton: "my-swal-button" },
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Request failed",
            text: error.message || "Something went wrong",
            showConfirmButton: true,
            customClass: { confirmButton: "my-swal-button" },
          });
        } finally {
          setisloading(false);
        }
      };








  return (
    <div className="space mt-4">


      {/* Header */}
      <div className="flex items-center justify-between mt-2  border-b border-gray-200">
        <h3 className="text-xxl font-semibold text-gray-900">
          Patient Referral For Second Opinioun
        </h3>
        {/* <div className="flex items-center space-x-4" style={{display:selected_case_file?"flex":"none"}}> */}
         <div className="flex items-center space-x-4" >
          <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
            <span className="text-sm font-medium underline" onClick={handleShow}>Add</span>
            <Plus className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-2 text-[var(--primary-color)] hover:text-blue-700 transition-colors">
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium underline" onClick={handleShowEdit}>Edit</span>
          </button>
        </div>
      </div>

      {/* Table */}
      
 {/* Show case_file_data section */}
{/* <div
  className="overflow-x-auto"
  style={{ display: selected_case_file ? "block" : "none" }}
>

  <div className="bg-[var(--button-back-color)] text-white">
    <div className="grid grid-cols-4 gap-4 p-2 text-[20px]">
      <h3 className="table-header">Chief Complaints</h3>
      <h3 className="table-header">Duration (Months)</h3>
      <h3 className="table-header">Severity Grade</h3>
      <h3 className="table-header">Aggravating Factor (s)</h3>
    </div>
  </div>


  <div className="divide-y divide-gray-200">
    {case_file_data?.length > 0 && case_file_data[0]?.Status === "Ongoing" &&
    case_file_data[0]?.ChiefComplaints?.map((item, index) => (
      <div
        key={item.id}
        className={`grid grid-cols-4 gap-4 p-4 ${
          index % 2 === 0 ? "bg-[#f2f3f6]" : "bg-white"
        }`}
      >
        <div className="text-sm text-gray-900 font-medium table-body">
            {item?.Symptoms?.map(sym => sym?.lookup_value).join(", ")}
        </div>
        <div className="text-sm text-gray-900">
          {item?.Duration?.Value} {item.Duration?.Unit?.lookup_value}
        </div>
        <div className="flex items-center">
          {renderSeverityGrade(item?.SeverityGrade)}
        </div>
        <div className="text-sm text-gray-900">
          {item?.AggravatingFactors?.map(ag => ag?.lookup_value).join(", ")}
        </div>
      </div>
    ))}
  </div>
</div> */}





      {/* Footer Note */}
      {/* <div className="p-4 bg-gray-50 border-t border-gray-200" style={{display:selected_case_file?"flex":"none"}}>
        <p className="text-xs text-gray-600">
          1. Added By Dr Gaurav Pande (Cardiology) (Regards M1234), (Contact 8373915529, Date/ Time 20 Sep 2025, 11:57 AM IST, Noida
        </p>
      </div> */}


  <Modal show={show} onHide={handleClose} centered size="lg">
        
              <Modal.Header closeButton>
                <Modal.Title className='form-title'>Add Patient Referral Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
      
         <div>
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
              
{/*======================== chief complaints============================================ */}

        <div className='col-span-2'>
          <h5 className='form-title'>Specific Questions for Second Opinion</h5>
      
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 border border-gray-300 rounded-lg p-4">
                
                 
                                 <FormControl fullWidth size="small">
                               <label className="form-label">Second Opinion Query</label>
                             <Select
                             multiple
                                   labelId="content-type-label"
                                   name="Accident"
                                  value={second_opinion_query.Second_Opinion_Query || []}
                                  onOpen={() => {
                                     if (all_second_opinion_query_master.length === 0) { // prevent multiple calls
                                     getall_second_opinion_query_master();
                                     }
                                 }}
                                //   onChange={handleChiefComplaintsChange}
                                   displayEmpty
                                   MenuProps={customMenuProps}
                                   renderValue={(selected) => {
                                     // Show placeholder if no items are selected
                                     if (!selected || selected.length === 0) {
                                       return <span className="text-gray-400">Select Second Opinion Query</span>;
                                     }
                 
                                     // Otherwise show selected items as comma-separated text
                                     const selectedLabels = selected
                                       .map((id) => all_second_opinion_query_master.find((item) => item._id === id)?.lookup_value)
                                       .filter(Boolean);
                                     return selectedLabels.join(", ");
                                   }}
                                 >
                                   <MenuItem value="">
                                     <em>Select Second Opinion Query </em>
                                   </MenuItem>
                                  {loading_second_opinioun ? (
                                     <MenuItem disabled>
                                     <CircularProgress size={20} />
                                     </MenuItem>
                                 ) : (
                                     all_second_opinion_query_master?.map((type) => (
                                     <MenuItem key={type._id} value={type._id}>
                                         {type.lookup_value}
                                     </MenuItem>
                                     ))
                                 )}
                                               
                   
                               </Select>
                               </FormControl>

                            <FormControl fullWidth size="small">
                            <label className="form-label">Question</label>
                             <TextField
                            placeholder='Question'
                            labelId="content-type-label"
                            name="Accident"
                            value={second_opinion_query.Second_Opinion_Query || []}
                        //   onChange={handleChiefComplaintsChange}
                                  />
                            </FormControl>

<div className='col-span-2'>
 <FormControl fullWidth>
  <label className="form-label mb-1">Additional Information</label>
  <textarea
    name="Second_Opinion_Query"
    placeholder="Enter additional Information..."
    value={second_opinion_query.Second_Opinion_Query || ""}
    onChange={handleChiefComplaintsChange} // your handler
    style={{
      width: "100%",
      minHeight: "120px", // start height
      maxHeight: "400px", // max height if needed
      padding: "10px",
      fontSize: "15px",
      borderRadius: "6px",
      border: "1px solid #c4c4c4",
      resize: "vertical", // allow user to resize
      overflow: "auto",
    }}
  />
</FormControl>
</div>



                   

                  

            

        </div> 
       
    </div> 

    </div> 

   
               
               <div className="flex justify-end mt-4">
           

              <Button
                style={{ backgroundColor: "#52677D", fontFamily: "Lora", color: "white" }}
                onClick={save_chif_complaints}
              >
                Save
              </Button>
            </div>

      
              </div> 
      
              </Modal.Body>
          
         
          </Modal>



{/* ====================================edit modal ============================================*/}




 {isloading && (
                      <div
                        style={{
                          position: 'fixed',
                          inset: 0,
                          background: 'rgba(255, 255, 255, 0.6)',
                          zIndex: 9999,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <UniqueLoader />
                      </div>
                    )}
                    


    </div>
  );
}

export default PatientReferralForSecondOpenioun

