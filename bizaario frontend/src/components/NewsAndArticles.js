
import "../assets/css/NewsAndArticles.css"; 

import React, { useEffect, useState } from "react";
import { cardsData } from "../Data/LocalData";
import { Link } from "react-router";
import { NavLink } from "react-router-dom";
import { doctorArr } from '../Data/LocalData';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../assets/css/Empowering.css'
import clock from '../assets/images/clock.png'
import calender from '../assets/images/calendar.png'
import eye from '../assets/images/eye.png'
import responsive from '../utils/responsive_carousel'
import api from '../api'
import { __postApiData } from "../utils/api";




const NewsAndArticles = () => {
  const [activeCategory, setActiveCategory] = useState("cardiology");

//  const cardsData = [
//      {
//         id: 1,
//       category: "cardiology",
//       img: news1,
//          title: "The trend was noticed during a survey by Bumble",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//       time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     },
//    {
//       id:2,
//       category: "cardiology",
//       img: news2,
//         title: "The trend was noticed during a survey by Bumble",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//             time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     },
//    {
//       id:3,
//       category: "cardiology",
//       img: news3,
//         title: "The trend was noticed during a survey by Bumble",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//             time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     },
//     {id:4,
//       category: "orthopedics",
//       img: news2,
//         title: "Orthopedics Breakthroughs",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//             time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     },
//    {
//       id:5,
//       category: "pediatrics",
//       img: news1,
//         title: "Pediatric Health Updates",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//             time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     },
//    {
//       id:6,
//       category: "obgyn",
//       img: news3,
//         title: "Pediatric Health Updates",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//             time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     },
//    {
//       id:7,
//       category: "obgyn",
//       img: news1,
//         title: "Pediatric Health Updates",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//             time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     },
//    {
//       id:8,
//       category: "ent",
//       img: news2,
//         title: "Pediatric Health Updates",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//             time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     },
//    {
//       id:9,
//       category: "plastic",
//       img: news1,
//         title: "Pediatric Health Updates",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//             time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     },
//    {
//       id:10,
//       category: "plastic",
//       img: news1,
//         title: "Pediatric Health Updates",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//             time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     },
//    {
//       id:11,
//       category: "neurology",
//       img: news1,
//         title: "Neurology Research",
//       desc:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est incidunt fuga odit recusandae aliquid aut nostrum placeat exercitationem, laborum quidem quasi. Vero quibusdam ullam numquam reiciendis porro, omnis consequuntur adipisci. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, voluptatem quis fugit labore velit ex doloremque, adipisci, voluptate illum iste modi. Rem molestias ab harum sint beatae error aliquam dolorum. ',
//             time:"20min",
//       date:"01/01.2025",
//       views:"2025"
//     }
//   ];

  const [contentList, setContentList] = useState([]);

const getContentList = async () => {
    try {
      const resp = await __postApiData("/api/v1/admin/ContentList", 
        {
            page: 1,
            limit: 100,
            ContentTypeId: "68afff04874340d8d79dbf4d"
            // "ContentPriority":"Medium"
        
        });
      
      if (resp.response.response_code === "200") {
        setContentList(resp.data.list || []);
      }
    } catch (error) {
      console.error("Error fetching content list:", error);
    }
  };

  useEffect(()=>
  {
    getContentList()

  },[])


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
  // console.log(filteredCards, 'filtercards');

   
        

           const responsive_tab = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, partialVisibilityGutter: 20 },
    tablet: { breakpoint: { max: 1024, min: 767 }, items: 2 },
    mobile: { breakpoint: { max: 767, min: 0 }, items: 1 },
  };

  return (
    <section className="mt-24 spacing-top news-section">
      <div className="container news-section">
        {/* Header */}
        <div className="row">
          <div className="col-lg-8 col-12">
            <h2 className="fw-semibold">News And Articles</h2>
            <p className="light-color">
              Learn from leading doctors and specialists through focused,
              digestible video content.
            </p>
          </div>
          <div className="col-lg-4 col-12 d-flex justify-content-lg-end align-items-start">
            <button className="view-all">View All &#8594;</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full px-0 mb-4 medical-tab-buttons">
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
                className={`cutom-tab-style  ${
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

        <Carousel
          //   removeArrowOnDeviceType={["tablet", "mobile"]}
          arrows={false}
          responsive={responsive_tab}
          // autoPlay={false}
          // autoPlaySpeed={3000}
          // transitionDuration={2000}
          //additionalTransfrom={-20}
          //  pauseOnHover={false}
          //  centerMode={false}
          containerClass=" carousel-container"
          itemClass="pe-md-4 px-1"
          //  showDots={true}
          infinite={true}
          renderDotsOutside={true}
          partialVisible={true}
        >
          {contentList.map((element) => {
            return (
              <NavLink
                key={element._id || element.id}
                to={`/news-articles/${element._id || element.id}`}
                state={{ article: element }}
                className="block h-full text-decoration-none"
              >
                <div className="rounded-2xl bg-[var(--white)] p-3 h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  {/* Image */}
                  <img
                    src={element.ContentImage}
                    alt="doctor"
                    className="w-full h-[257px] rounded-lg object-cover mx-auto"
                  />

                  {/* Info Row */}
                  <div className="flex gap-12 mt-2">
                    {/* Time */}
                    <div className="flex items-center gap-1.5">
                      <img
                        src={clock}
                        alt=""
                        className="w-[22px] h-[22px] object-contain"
                      />
                      <span className="text-[12px] font-normal text-black/70 leading-none">
                        {element?.time ? element.time : "00:20"}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-1.5">
                      <img
                        src={calender}
                        alt=""
                        className="w-[22px] h-[22px] object-contain"
                      />
                      <span className="text-[12px] font-normal text-black/70 leading-none">
                        {element?.Date
                          ? new Date(element.Date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "8 Oct 2025"}
                      </span>
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-1.5">
                      <img
                        src={eye}
                        alt=""
                        className="w-[22px] h-[22px] object-contain"
                      />
                      <span className="text-[12px] font-normal text-black/70 leading-none">
                        {element?.views ? element.views : "1980"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-4 content text-start">
                    <p className="text-black text-[20px] font-bold leading-normal mb-1">
                      {element.ContentTitle}
                    </p>
                    <p className="text-[#52677D] text-[16px] font-normal leading-normal mb-1">
                      {element.ShortDescription}
                    </p>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default NewsAndArticles;
