import PropTypes from 'prop-types';

const teamMembers = [
  {
    name: 'Alejandra Altamirano',
    imageSrc: 'src/assets/alejandra.png',
    githubLink: 'https://github.com/alejandraa0208',
    linkedinLink: 'https://www.linkedin.com/in/aaaltamirano/',
    bio: [
      'Army Veteran & previous Fraud Analyst turned Software Developer',
      'Looking to incorporate my new found skills to help clients with designing products such as websites or anything related to their profession'
    ],
  },
  {
    name: 'Joshua Shea',
    imageSrc: 'src/assets/josh.png',
    githubLink: 'https://github.com/jshea44',
    linkedinLink: 'https://www.linkedin.com/in/joshshea44/',
    bio: [
      
    ],
  },
  {
    name: 'Samaad Turner',
    imageSrc: 'src/assets/samaad.png',
    githubLink: 'https://github.com/SamaadTurner',
    linkedinLink: 'https://www.linkedin.com/in/samaad-turner/',
    bio: [

    ],
  },
  {
    name: 'Sydney Mae Pagalan',
    imageSrc: 'src/assets/sydney.jpg',
    githubLink: 'https://github.com/sfpagalan',
    linkedinLink: 'https://www.linkedin.com/in/sfpagalan/',
    bio: [
      'Navy Vet & Medical Assistant - Software Developer',
      'Previous Experience: Work at Kaiser Permanente as an MA and served 6 years in the US Navy.',
      'I am deeply passionate about the intersection of the medical field and technology, as well as my love for gaming.',
    ],
  },
];

function TeamMemberCard({ member }) {
  return (
    <div className="about-card">
      <img src={member.imageSrc} className="about-pic" alt={member.name} />
      <p
        style={{
          fontWeight: 'bold', 
          fontSize: '30px', 
          fontFamily: 'Great Vibes, cursive',
          margin: '0' 
        }}>{member.name}</p>
      {member.bio && (
        <ul 
          style={{
            fontSize: '15px', 
            fontFamily: 'Quintessential, cursive' 
          }}
        >
          {member.bio.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      )}
      <div>
        <span 
          style={{ 
            fontWeight: 'bold', 
            fontSize: '20px', 
            fontFamily: 'Quintessential, cursive' 
          }}>
          Links: 
        </span>
        <a 
          href={member.githubLink} 
          className='links'
          style={{ 
            textDecoration: 'none', 
            color: 'black', 
            fontSize: '15px', 
            fontFamily: 'Quintessential, cursive',
            margin: '5px'
          }} 
            target="_blank" 
            rel="noopener noreferrer">
          GitHub
        </a>
        <a 
          href={member.linkedinLink} 
          className='links'
          style={{ 
            textDecoration: 'none', 
            color: 'black', 
            fontSize: '15px', 
            fontFamily: 'Quintessential, cursive', 
            margin: '5px' 
          }} 
            target="_blank" 
            rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  );
}

TeamMemberCard.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    githubLink: PropTypes.string.isRequired,
    linkedinLink: PropTypes.string.isRequired,
    bio: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

function About() {
  return (
    <div>
      <header>
        <h1>The Team</h1>
      </header>
      <div id="team">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}

export default About;
