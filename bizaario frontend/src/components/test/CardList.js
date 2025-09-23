import React from 'react'
import { Link, NavLink } from 'react-router';

const CardList = () => {
    const blogs = [
  {
    id: 1,
    title: "The Future of Web Development",
    author: "John Doe",
    date: "2025-08-01",
    image: "https://via.placeholder.com/600x400",
    excerpt: "Explore upcoming trends and technologies shaping the future of web development.",
    content: "Full blog content goes here..."
  },
  {
    id: 2,
    title: "10 Tips for Better UI/UX Design",
    author: "Jane Smith",
    date: "2025-07-25",
    image: "https://via.placeholder.com/600x400",
    excerpt: "Learn how to improve your design skills with these 10 practical tips.",
    content: "Full blog content goes here..."
  },
  {
    id: 3,
    title: "React vs Vue: Which One to Choose?",
    author: "Michael Lee",
    date: "2025-07-18",
    image: "https://via.placeholder.com/600x400",
    excerpt: "A detailed comparison between React and Vue to help you decide.",
    content: "Full blog content goes here..."
  },
  {
    id: 4,
    title: "Boosting Performance in JavaScript Apps",
    author: "Emily Johnson",
    date: "2025-07-10",
    image: "https://via.placeholder.com/600x400",
    excerpt: "Techniques and best practices to make your JS apps faster.",
    content: "Full blog content goes here..."
  },
  {
    id: 5,
    title: "The Rise of AI in Everyday Life",
    author: "David Wilson",
    date: "2025-07-02",
    image: "https://via.placeholder.com/600x400",
    excerpt: "How artificial intelligence is transforming industries and our daily routines.",
    content: "Full blog content goes here..."
  },
  {
    id: 6,
    title: "Mastering CSS Grid & Flexbox",
    author: "Sophia Brown",
    date: "2025-06-25",
    image: "https://via.placeholder.com/600x400",
    excerpt: "A beginner-friendly guide to mastering modern CSS layouts.",
    content: "Full blog content goes here..."
  },
  {
    id: 7,
    title: "How to Build Scalable APIs",
    author: "Chris Evans",
    date: "2025-06-15",
    image: "https://via.placeholder.com/600x400",
    excerpt: "Best practices and strategies for building scalable RESTful APIs.",
    content: "Full blog content goes here..."
  },
  {
    id: 8,
    title: "Top 5 JavaScript Frameworks in 2025",
    author: "Olivia Martinez",
    date: "2025-06-08",
    image: "https://via.placeholder.com/600x400",
    excerpt: "An overview of the most popular JS frameworks you should know.",
    content: "Full blog content goes here..."
  },
  {
    id: 9,
    title: "Remote Work: Pros and Cons",
    author: "Daniel White",
    date: "2025-06-01",
    image: "https://via.placeholder.com/600x400",
    excerpt: "Analyzing the advantages and challenges of remote work culture.",
    content: "Full blog content goes here..."
  },
  {
    id: 10,
    title: "Cybersecurity Basics Everyone Should Know",
    author: "Emma Taylor",
    date: "2025-05-25",
    image: "https://via.placeholder.com/600x400",
    excerpt: "Stay safe online with these essential cybersecurity practices.",
    content: "Full blog content goes here..."
  }
];



  return (
    <>
          <div className="container  p-4 bg-light">
              <div className="row">
              {blogs.map((el) => {
              return (
              
                  <div className='col-lg-4 col-md-6 col-12 mb-4'key={el.id}>
                      <div className="card p-4 bg-white" >
                          <h3>{el.title}</h3>
                          <p>{el.excerpt}</p>
                          <Link to={`${el.id}`} state={el}>read more</Link>
                           <NavLink to={`${el.id}`} state={el}> more</NavLink>
                      </div> 
              </div>
              )
              })}
                   </div>
          </div>
    </>
  )
}

export default CardList
