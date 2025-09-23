import TestimonialCard2 from './testimonial/TestimonialCard2'
// import TestimonialCard from '../UI/TestimonialCard'


const Testimonial = () => {
  return(
        <>
          <section className='spacing-top testmonial-section '>
            <div className='testimonial-card'>
              <div className="container ">
                <div className="row">
                  <div className="col-12">
                    <h2 className='fw-semibold '>Patients Testimonials</h2>
                    <p className='light-color mb-0'>Learn from leading doctors and specialists through focused,
                      digestible video content.</p>
                  </div>
                </div> 
                <div className="row">
                  <TestimonialCard2/>
                </div>
              </div>
            </div>
          </section>
        </>
  )
}
export default Testimonial