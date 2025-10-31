import { useState, useEffect } from "react";
import CommonBanner from "../UI/CommonBanner";
import aboutBanner from "../assets/images/about/banner.png";
// import MedicalBoardContent from '../components/medical-boardPage/MedicalBoardContent';
// import NewsArticleList from '../components/news-article-page/ArticleListing';
import ArticleListing from "../components/news-article-page/ArticleListing";
import { cardsData } from "../Data/LocalData";
import { NavLink, useNavigate } from "react-router";
import Header from "../AppLayout/Header";
import Footer from "../AppLayout/Footer";
import responsive from "../utils/responsive_carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { __postApiData } from "../utils/api";

const NewsArticles = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [articlesData, setArticlesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch articles data from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const resp = await __postApiData("/api/v1/admin/ContentList", {
          page: 1,
          limit: 100,
          ContentTypeId: "68afff04874340d8d79dbf4d",
        });

        if (resp && resp.data) {
          // Ensure we always set an array
          const dataArray = Array.isArray(resp.data)
            ? resp.data
            : resp.data.list && Array.isArray(resp.data.list)
            ? resp.data.list
            : [];
          setArticlesData(dataArray);
        } else {
          setArticlesData([]);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        // Fallback to local data if API fails
        setArticlesData(Array.isArray(cardsData) ? cardsData : []);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const hospitalData = {
    banner: aboutBanner,
    title: "News & Articles",
    desc: "Empowering hospitals, physicians, and patients with real-time communication and clinical collaboration—because better care starts with better connection.",
  };
  const categories = [
    { key: "all", label: "All Articles" },
    { key: "cardiology", label: "Cardiology" },
    { key: "gastroenterology", label: "Gastroenterology" },
    { key: "endocrinology", label: "Endocrinology" },
    { key: "rheumatology", label: "Rheumatology" },
    { key: "orthopedics", label: "Orthopedics" },
    { key: "pediatrics", label: "Pediatrics" },
    { key: "neurology", label: "Neurology" },
    { key: "obgyn", label: "Obstetrics & Gynecology" },
    { key: "ent", label: "Otorhinolaryngology" },
    { key: "plastic", label: "Plastic & Reconstructive" },
  ];
  const filteredCards =
    activeCategory === "all"
      ? articlesData
      : Array.isArray(articlesData)
      ? articlesData.filter((card) => card.category === activeCategory)
      : [];

  return (
    <>
      <Header />
      <section>
        <CommonBanner bannerData={hospitalData} />
      </section>
      <section className="spacing-top">
        <div className="container ">
          <div className="row">
            <div className="col-lg-8 col-12">
              <h2 className="fw-semibold ">Read News & Articles</h2>
              <p className="light-color">
                Empowering hospitals, physicians, and patients with real-time
                communication and clinical collaboration—because better care
                starts with better connection.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {/* Tabs */}
              <div className="flex-wrap gap-3 mb-4 d-flex gap-md-4">
                <Carousel
                  arrows={false}
                  responsive={responsive}
                  containerClass="carousel-container w-full"
                  itemClass="px-2"
                  infinite
                  partialVisible
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      className={`cutom-tab-style ${
                        activeCategory === cat.key
                          ? "activeTab "
                          : "tab-btn-style gray-btn-style"
                      }`}
                      onClick={() => setActiveCategory(cat.key)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
          <div className="content-style">
            {loading ? (
              <div className="py-5 text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading articles...</p>
              </div>
            ) : (
              <div className="row g-3">
                {filteredCards.map((card) => (
                  <div
                    className="mb-3 col-lg-4 col-md-6 col-12"
                    key={card.id || card._id}
                  >
                    <div className="p-3 border-0 shadow-sm card h-100 rounded-4">
                      <img
                        src={card.img || card.ContentImage || card.image}
                        className="rounded card-img-top"
                        alt={card.title || card.ContentTitle}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="pt-3 article-list-content d-flex flex-column">
                        <h4 className="mb-2 fw-bold">
                          {card.title || card.ContentTitle}
                        </h4>
                        <p className="mb-3 text-muted flex-grow-1">
                          {(
                            card.desc ||
                            card.ShortDescription ||
                            card.description ||
                            ""
                          ).substring(0, 120)}
                          {(
                            card.desc ||
                            card.ShortDescription ||
                            card.description ||
                            ""
                          ).length > 120
                            ? "..."
                            : ""}
                        </p>
                        <div className="mt-auto">
                          <NavLink
                            to={`/news-articles/${card.id || card._id}`}
                            state={card}
                            className="btn btn-outline-primary btn-sm text-decoration-none"
                          >
                            Read More →
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default NewsArticles;
