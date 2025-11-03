import React from 'react'
import person1 from '../assets/images/about/team1.png'
import person2 from '../assets/images/about/team2.png'
import person3 from '../assets/images/about/team3.png'
import person4 from '../assets/images/about/team4.png'
import person5 from '../assets/images/about/team5.png'
import person6 from '../assets/images/about/team6.png'
import person7 from '../assets/images/about/team7.png'
import person8 from '../assets/images/about/team8.png'

export const teamMemberArr = [
    {
        id: 1,
        name: ' Jenny Wilson',
        deg: 'Viverra ut potenti',
        image: person1
    },
    {
        id: 2,
        name: ' Jenny Wilson',
        deg: 'Viverra ut potenti',
        image: person2
    },
    {
        id: 3,
        name: ' Jenny Wilson',
        deg: 'Viverra ut potenti',
        image: person3
    },
    {
        id: 4,
        name: ' Jenny Wilson',
        deg: 'Viverra ut potenti',
        image: person4
    },
    {
        id: 5,
        name: ' Jenny Wilson',
        deg: 'Viverra ut potenti',
        image: person5
    },
    {
        id: 6,
        name: ' Jenny Wilson',
        deg: 'Viverra ut potenti',
        image: person6
    },
    {
        id: 7,
        name: ' Jenny Wilson',
        deg: 'Viverra ut potenti',
        image: person7
    },
  
    {
        id: 8,
        name: ' Jenny Wilson',
        deg: 'Viverra ut potenti',
        image: person8
    },
  
]

const OurTeamCart = () => {
  return (
      <>
        { teamMemberArr.map((item)=>{
              return(
                     <div className="team-card" key={item.id}>
              <img src={item.image} alt="team" className='img-fluid mb-3'/>
              <div className="team-person">
                 {item.name}
              </div>
              <div className='deg '>
                          {item.deg}
                          
              </div>
          </div>
              )
         })
          }
      </>
  )
}

export default OurTeamCart