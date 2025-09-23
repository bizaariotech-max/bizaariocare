import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import article1 from '../../../assets/images/articles/article1.png'
import { cardsData, relatedArticles } from "../../../Data/LocalData";
import { NavLink, useParams } from "react-router";

const ArticleLayout1 = ({articleSingleData}) => {

  // console.log(articleSingleData, 'articleSingleData');
  const { id } = useParams();
  const { relatedArticles } = require("../../../Data/LocalData");

  const articleData = relatedArticles.find(
    (a) => String(a.id) === String(id)
  );

  console.log(articleData, "articleData");

  return (
    <div className="container my-5">
      <div className="row">
        {/* Left Column - Blog Content */}
        <div className="col-lg-8 col-md-12 mb-4">
          <img
            src= {articleSingleData.img} style={{width:'100%'}}
            alt="Blog main"
            className="img-fluid rounded mb-3"
          />
          <h3 className="fw-bold mb-3">
            {articleSingleData.title}
          </h3>
          <div className="para">
            <p>{articleSingleData.desc}</p>
          </div>
          <div className="para">
            <p>{articleSingleData.desc}</p>
          </div>
          <div className="para">
            <p>{articleSingleData.desc}</p>
          </div>
        </div>

        {/* Right Column - Related Topics */}
        <div className="col-lg-4 col-md-12">
           <h5 className="fw-bold mb-3">Related to the topics</h5>
          <div style={{backgroundColor:'#dedfe6', borderRadius:'10px'}} className="p-3"> 
          {relatedArticles.map((article) => (
            <div key={article.id} className="card mb-3 border-0 shadow-sm">
              <img  src={article.img}
                alt={article.title}
                className="card-img-top rounded"
              />
              <div className="card-body">
                <h6 className="card-title fw-bold">{article.title}</h6>
                <p className="card-text text-muted" style={{ fontSize: "0.9rem" }}>
                  {article.desc}
                    <NavLink className="country-card ms-4 fw-semi-bold read-more-btn  text-decoration-none d-inline"
               to={`/news-articles/${article.id}`} state={article}>
               Read More
              </NavLink>
                </p>
              </div>
            </div>
          ))}
          </div> 
        </div>
      </div>
    </div>
  );
};

export default ArticleLayout1;
