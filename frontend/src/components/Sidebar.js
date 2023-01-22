import React from "react";
import { Link } from "react-router-dom";


const Sidebar = ({Title, Items, ...rest}) => { 
  return (
    <>
      <h5>{Title}</h5>
      {
        Items.map((item, index) => {
          return (
            
            <Link to={item.route} key={index}>
              <div>
                {item.name}
              </div>
            </Link>
          )
        })
      }
    
    </>


  );
};

export default Sidebar;