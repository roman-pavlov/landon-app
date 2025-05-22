import React, { useState, useEffect } from 'react';
// import menuLinksData from './data/menu_links.json'

const Header = () => {
  const [menuLinksData, setMenuLinksData] = useState([]);

  const ApiUrl = process.env.AWS_SAM_LOCAL ? 'http://localhost:3000' :
    'https://azgzlatc9d.execute-api.eu-west-2.amazonaws.com/Prod'

  const loadMenuLinksData = async() => {
    // Query the API Gateway
    const resp = await fetch(`${ApiUrl}/menu-links`);
    let jsonData = await resp.json();

    // Assign response data to our state variable
    setMenuLinksData(jsonData);
  }

  useEffect(() => {
    // Load the menu links data from the API Gateway
    loadMenuLinksData();
  }, []);

  return (
    <header id="intro">
      <article className="fullheight">
        <div className="hgroup">
          <h1>Landon Hotel</h1>
          <h2>West London</h2>
          <p><a href="#welcome"><img src="https://landonhotel.com/images/misc/arrow.png" alt="down arrow" /></a></p>
        </div>
      </article>

      <nav id="nav">
        <div className="navbar">
          <div className="brand"><a href="#welcome">Landon <span>Hotel</span></a></div>
          <ul>
            {
              menuLinksData.map((link) =>
                <li><a className={`icon ${link.class}`} href={link.href}><span>{link.text}</span></a></li>
              )
            }
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;