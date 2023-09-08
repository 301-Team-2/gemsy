import PropTypes from 'prop-types';

const teamMembers = [
  {
    name: 'Alejandra Altamirano',
    imageSrc: './assets/alejandra.png',
    githubLink: 'https://github.com/alejandraa0208',
    linkedinLink: 'https://www.linkedin.com/in/aaaltamirano/',
    bio: [
      'Army Veteran & previous Fraud Analyst turned Software Developer',
      'Looking to incorporate my new found skills to help clients with designing products such as websites or anything related to their profession'
    ],
  },
  {
    name: 'Joshua Shea',
    imageSrc: './assets/josh.png',
    githubLink: 'https://github.com/jshea44',
    linkedinLink: 'https://www.linkedin.com/in/joshshea44/',
    bio: [
      
    ],
  },
  {
    name: 'Samaad Turner',
    imageSrc: './assets/samaad.png',
    githubLink: 'https://github.com/SamaadTurner',
    linkedinLink: 'https://www.linkedin.com/in/samaad-turner/',
    bio: [

    ],
  },
  {
    name: 'Sydney Mae Pagalan',
    imageSrc: './assets/sydney.jpg',
    githubLink: 'https://github.com/sfpagalan',
    linkedinLink: 'https://www.linkedin.com/in/sfpagalan/',
    bio: [
      'Navy Vet & Medical Assistant - Software Developer', 
      'Worked at Kaiser Permanente as an MA and served 6 years in the US Navy.',
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
            width: '350px',
            fontSize: '15px', 
            fontFamily: 'Quintessential, cursive',
            listStyle: 'none',
            padding: '0',
          }}
        >
          {member.bio.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      )}
      <div>
        <a 
          href={member.githubLink} 
          className='links'
            target="_blank" 
            rel="noopener noreferrer">
          GitHub |
        </a>
        <a 
          href={member.linkedinLink} 
          className='links'
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
