// import React, { useEffect } from 'react'
import { cardsData } from '../../Data/LocalData'
import { NavLink } from 'react-router'
import '../../assets/css/NewsAndArticles.css'


const ArticleListing = () => {
  // console.log(cardsData,'news')

  return (
    <>
      {cardsData.map((article) => (
        <div className="col-lg-4 col-md-6 col-12 mb-4" key={article.id}>
         <div className="card border-0 shadow-sm h-100 rounded-4 p-3">
           <img src={article.img} className="card-img-top " alt={article.title} />
           <div className="pt-3 article-list-content">
             <h4 className="fw-bold">{article.title}</h4>
             <p className=" small mb-1 light-color d-inline article-desc">{article.desc} </p>
             <NavLink className="country-card ms-4 fw-semi-bold read-more-btn  text-decoration-none d-inline"
               to={`${article.id}`} state={article}>
               Read More
              </NavLink>
            
           </div>
         </div> 
       </div>
      ))} 
    </>
  )
}

export default ArticleListing
