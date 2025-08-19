import { useState } from 'react';
import CommonBanner from '../UI/CommonBanner'
import aboutBanner from '../assets/images/about/banner.png'
// import MedicalBoardContent from '../components/medical-boardPage/MedicalBoardContent';
// import NewsArticleList from '../components/news-article-page/ArticleListing';
import ArticleListing from '../components/news-article-page/ArticleListing';
import { cardsData } from '../Data/LocalData';
import { NavLink, useNavigate } from 'react-router';
import Header from '../AppLayout/Header';
import Footer from '../AppLayout/Footer';


const NewsArticles = () => {
    const [activeCategory, setActiveCategory] = useState("cardiology");
    const navigate=useNavigate()

    const hospitalData =
    {
        banner: aboutBanner,
        title: 'News & Articles',
        desc: 'Empowering hospitals, physicians, and patients with real-time communication and clinical collaboration—because better care starts with better connection.'
    }
    const categories = [
    { key: "cardiology", label: "Cardiology" },
    { key: "orthopedics", label: "Orthopedics" },
    { key: "pediatrics", label: "Pediatrics" },
    { key: "neurology", label: "Neurology" },
    { key: "obgyn", label: "Obstetrics & Gynecology" },
    { key: "ent", label: "Otorhinolaryngology" },
    { key: "plastic", label: "Plastic & Reconstructive" }
    ];
    const filteredCards =
        activeCategory === "all" ? cardsData : cardsData.filter((card) => card.category === activeCategory); 
    
    return (
        <>
        <Header/>
            <section>
                <CommonBanner bannerData={hospitalData} />
            </section>
            <section className='spacing-top'>
                <div className="container ">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <h2 className='fw-semibold '>Read News & Articles</h2>
                            <p className='light-color'>Empowering hospitals, physicians, and patients with real-time
                                communication and clinical collaboration—because better care starts with better
                                connection.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {/* Tabs */}
                            <div className="d-flex flex-wrap gap-md-4 gap-3 mb-4">
                                {categories.map((cat) => (
                                <button key={cat.key} className={`cutom-tab-style ${activeCategory===cat.key
                                    ? "activeTab " : "tab-btn-style gray-btn-style" }`} onClick={()=>
                                    setActiveCategory(cat.key)}
                                    >
                                    {cat.label}
                                </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="content-style">
                        <div className="row g-3">
                            {filteredCards.map((card) => (
                            <div className="col-lg-4 col-md-6 col-12 mb-md-0 mb-3" key={card.id}>
                                <div className="card border-0 shadow-sm h-100 rounded-4 p-3">
                                    <img src={card.img} className="card-img-top " alt={card.title} />
                                    <div className="pt-3 article-list-content ">
                                        <h4 className="fw-bold">{card.title}</h4>
                                        <p className=" small mb-1 light-color d-inline">{card.desc} </p>
                                        <NavLink 
                                            to={`/news-articles/${card.id}`} 
                                            state={card} 
                                            className="country-card ms-4 fw-semi-bold read-more-btn text-decoration-none d-inline"
                                            >
                                            Read More
                                            </NavLink>

                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
export default NewsArticles
