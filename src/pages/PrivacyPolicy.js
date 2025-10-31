import React from 'react'
import aboutBanner from '../assets/images/about/banner.png'
import CommonBanner from '../UI/CommonBanner'
import Footer from '../AppLayout/Footer'
import Header from '../AppLayout/Header'
const PrivacyPolicy = () => {
     const hospitalData = 
                {
                banner: aboutBanner,
                title: 'Privacy Policy',
                desc:'Empowering hospitals, physicians, and patients with real-time communication and clinical collaboration—because better care starts with better connection.'
            }
  return (
    <>
    <Header/>
         <section>
              <CommonBanner bannerData={hospitalData} />
          </section>
          <section className='spacing-top'>
              <div className="container ">
                  <div className="row g-4">
                       <div className="col-12">
                        <h2 className='fw-semibold '>Privacy Policy</h2>
                          <p className='light-color'>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          </p>
                          <p className='light-color'>
                              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Integer feugiat, nulla eu blandit hendrerit, turpis elit pellentesque urna, in tincidunt purus sapien non lacus. Curabitur nec lacus sed nunc sollicitudin aliquet. Suspendisse potenti. 
Sed vulputate, nisl nec bibendum feugiat, ligula nulla facilisis nunc, ut sollicitudin nulla justo nec enim. Nam suscipit justo nec elit fermentum tincidunt. Morbi in pulvinar neque. Nullam vel imperdiet risus. Integer congue dignissim nisi, ac eleifend orci tincidunt et. Etiam fermentum euismod velit, non dapibus risus iaculis nec. Proin dictum tincidunt ante, at gravida orci tempor vel. Aenean ut nisl vitae purus luctus convallis. Sed vel finibus sem. Morbi sagittis nisi at augue consequat, id interdum diam dictum.
                          </p>
                 
                        </div>
                       <div className="col-12">
                        <h2 className='fw-semibold '>Term Of Use</h2>
                          <p className='light-color'>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          </p>
                          <p className='light-color'>
                              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Integer feugiat, nulla eu blandit hendrerit, turpis elit pellentesque urna, in tincidunt purus sapien non lacus. Curabitur nec lacus sed nunc sollicitudin aliquet. Suspendisse potenti. 
Sed vulputate, nisl nec bibendum feugiat, ligula nulla facilisis nunc, ut sollicitudin nulla justo nec enim. Nam suscipit justo nec elit fermentum tincidunt. Morbi in pulvinar neque. Nullam vel imperdiet risus. Integer congue dignissim nisi, ac eleifend orci tincidunt et. Etiam fermentum euismod velit, non dapibus risus iaculis nec. Proin dictum tincidunt ante, at gravida orci tempor vel. Aenean ut nisl vitae purus luctus convallis. Sed vel finibus sem. Morbi sagittis nisi at augue consequat, id interdum diam dictum.
                          </p>
                   
                        </div>
                       <div className="col-12">
                        <h2 className='fw-semibold '>Legal</h2>
                          <p className='light-color'>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                          </p>
                          <p className='light-color'>
                              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Integer feugiat, nulla eu blandit hendrerit, turpis elit pellentesque urna, in tincidunt purus sapien non lacus. Curabitur nec lacus sed nunc sollicitudin aliquet. Suspendisse potenti. 
Sed vulputate, nisl nec bibendum feugiat, ligula nulla facilisis nunc, ut sollicitudin nulla justo nec enim. Nam suscipit justo nec elit fermentum tincidunt. Morbi in pulvinar neque. Nullam vel imperdiet risus. Integer congue dignissim nisi, ac eleifend orci tincidunt et. Etiam fermentum euismod velit, non dapibus risus iaculis nec. Proin dictum tincidunt ante, at gravida orci tempor vel. Aenean ut nisl vitae purus luctus convallis. Sed vel finibus sem. Morbi sagittis nisi at augue consequat, id interdum diam dictum.
                          </p>
                          <p className='light-color'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.  </p>
                   
                        </div>
                  </div> 
            </div>
          </section>
          <Footer/>
    </>
  )
}

export default PrivacyPolicy
