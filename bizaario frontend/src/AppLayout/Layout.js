import React from 'react'

import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
    <Header />  
    {children}
    <Footer/>
</>
  )
}

export default Layout



// import React from 'react'

// import Footer from './Footer';
// import { Outlet, useNavigation } from 'react-router';
// import Header from './Header';
// import LoadingComp from './LoadingComp'
// const Layout = () => {
//     const loadingNavigation= useNavigation();
//     if(loadingNavigation.state=== 'loading'){
//       return(<LoadingComp/>)
//     }

//   return (
//     <>
//     <Header />  
//     <Outlet/>    
//     <Footer/>
// </>
//   )
// }

// export default Layout