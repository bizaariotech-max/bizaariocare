import React from 'react'
import {
    useRouteError,
    NavLink,
    useNavigate,

} from 'react-router'

const ErrorComp = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    const backFun = () => {
        navigate(-1);
    } 
    if (error.status === 404) {
        return (
            <div className='bg-gray error'>
                <div className="container  bg-white d-flex justify-content-center align-items-center">
                    <div className='p-4 inner-err'>
                        <h1 className=' text-center text-denger' >404!</h1>
                        <h4 className='text-center'>PAGE NOT FOUND</h4>
                        <div className='d-flex justify-content-between items-center mt-3 btn-group1'>
                            <button className='btn btn-primary'> <NavLink to="/" className='text-decoration-none'><span className='text-white  '>Back to Home</span></NavLink></button> 
                            <button className='btn btn-warning text-white' onClick={backFun}>Back to previous</button>
                        </div> 
                    </div> 
                </div>
            </div>
        )
    }
    if (error.status === 401) {
        return <div>You aren't authorized to see this</div>;
    }
    if (error.status === 503) {
        return <div>Looks like our API is down</div>;
    }
}

export default ErrorComp