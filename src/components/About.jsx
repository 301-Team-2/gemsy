import React from 'react';

function About() {
  return (
    <div>
      <header>
        <h1>The Team</h1>
      </header>
      <div id="team">
        <div className="card">
          <img src="src/assets/alejandra.png" alt='alejandra'/>
          <p>Alejandra Altamirano</p>
          <ul>
            <li>insert text here</li>
            <li>insert text here</li>
            <li>insert text here</li>
          </ul>
          <div>
            <a href="insert github link here">GitHub</a>
            <a href="insert linkedin link here">LinkedIn</a>
          </div>
        </div>
        <div className="card">
          <img src="src/assets/josh.png" alt='joshua'/>
          <p>Joshua Shea</p>
          <ul>
            <li>insert text here</li>
            <li>insert text here</li>
            <li>insert text here</li>
          </ul>
          <div>
            <a href="insert github link here">GitHub</a>
            <a href="insert linkedin link here">LinkedIn</a>
          </div>
        </div>
        <div className="card">
          <img src="src/assets/samaad.png" alt='samaad'/>
          <p>Samaad Turner</p>
          <ul>
            <li>insert text here</li>
            <li>insert text here</li>
            <li>insert text here</li>
          </ul>
          <div>
            <a href="insert github link here">GitHub</a>
            <a href="insert linkedin link here">LinkedIn</a>
          </div>
        </div>
        <div className="card">
          <img src="./proj/team/sydney.jpeg" alt="sydney" />
          <p>Sydney Mae Pagalan</p>
          <ul>
            <li>Navy Vet & Medical Assistant - Software Developer</li>
            <li>Previous Experience: Work at Kaiser Permanente as an MA and served 6 years in the US Navy.</li>
            <li>I am deeply passionate about the intersection of the medical field and technology, as well as my love for gaming.</li>
          </ul>
          <div>
            <a href="https://github.com/sfpagalan">GitHub</a>
            <a href="https://www.linkedin.com/in/sfpagalan/">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
