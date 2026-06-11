/**
 * Personal Portfolio Website Configuration
 * 
 * Customize your portfolio content by modifying the object below.
 * No HTML/CSS editing required for text or link changes!
 */

const portfolioConfig = {
  // General Profile Information
  profile: {
    name: "Alex Morgan",
    designation: "Full Stack Developer & UI/UX Designer",
    typingRoles: [
      "Full Stack Engineer",
      "UI/UX Designer",
      "Open Source Contributor",
      "Problem Solver"
    ],
    avatar: "assets/images/profile.png",
    shortIntro: "I build high-performance, modern web applications with beautiful glassmorphism interfaces and clean, scalable code. Bridging the gap between engineering and creative design.",
    cta: {
      viewProjects: "#projects",
      contactMe: "#contact",
      downloadResume: "assets/documents/resume-sample.pdf"
    },
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      dribbble: "https://dribbble.com"
    }
  },

  // About Section
  about: {
    heading: "About Me",
    subHeading: "Who I Am & What I Do",
    bio: "Hello! I'm Alex, a passionate software engineer and designer based in San Francisco. I specialize in building elegant, performant, and responsive digital products. With a strong foundation in both frontend design principles and backend system architecture, I enjoy transforming complex problems into simple, intuitive web experiences. Whether designing a clean user interface or optimizing database queries, I strive for excellence in every line of code.",
    careerObjective: "To leverage my technical and creative expertise in a challenging engineering role, contributing to innovative projects while continuously mastering cutting-edge web technologies.",
    
    // Education Timeline
    education: [
      {
        degree: "M.S. in Computer Science",
        institution: "Stanford University",
        duration: "2022 - 2024",
        details: "Specialized in Software Engineering and Human-Computer Interaction. GPA: 3.9/4.0."
      },
      {
        degree: "B.S. in Computer Science & Engineering",
        institution: "University of California, Berkeley",
        duration: "2018 - 2022",
        details: "Graduated with Honors. Core coursework: Data Structures, Database Systems, Web Development, Computer Security."
      }
    ],

    // Experience Timeline
    experience: [
      {
        role: "Software Engineering Intern",
        company: "TechCorp Solutions",
        duration: "June 2023 - Sept 2023",
        details: "Developed features for a high-traffic cloud platform using React and Node.js. Optimized database queries, reducing page load times by 24%. Collaborated in an agile team of 6 engineers."
      },
      {
        role: "Web Development Lead",
        company: "Berkeley Creative Lab",
        duration: "Sept 2020 - May 2022",
        details: "Led a team of student developers to design and deploy 15+ client websites. Implemented responsive frontend layouts and integrated content management systems."
      }
    ]
  },

  // Interactive Stats Counter (Shown in About/Experience area)
  stats: [
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Projects Completed", value: 25, suffix: "+" },
    { label: "Certifications Earned", value: 12, suffix: "" },
    { label: "Happy Clients", value: 18, suffix: "+" }
  ],

  // Skills Section
  skills: {
    heading: "My Skills",
    subHeading: "Expertise & Technologies",
    
    // Technical Skills (displays as progress bars)
    technical: [
      { name: "Frontend: HTML5, CSS3, ES6 JS", level: 95 },
      { name: "Frameworks: React.js, Next.js", level: 90 },
      { name: "Backend: Node.js, Express, Python", level: 85 },
      { name: "Database: PostgreSQL, MongoDB", level: 80 },
      { name: "UI/UX: Figma, Glassmorphism, CSS Grids", level: 90 },
      { name: "DevOps & Tools: Git, Docker, AWS", level: 75 }
    ],

    // Soft Skills (displays as grid cards)
    soft: [
      {
        icon: "fa-comments",
        title: "Effective Communication",
        desc: "Able to articulate complex technical concepts clearly to both technical and non-technical stakeholders."
      },
      {
        icon: "fa-users",
        title: "Team Collaboration",
        desc: "Experienced working in cross-functional agile teams, participating in daily standups and code reviews."
      },
      {
        icon: "fa-lightbulb",
        title: "Creative Problem Solving",
        desc: "Thrive on analytical challenges, troubleshooting architectural issues, and finding optimized solutions."
      },
      {
        icon: "fa-hourglass-half",
        title: "Time Management",
        desc: "Skilled in breaking down milestones, estimating tasks accurately, and meeting strict delivery deadlines."
      }
    ]
  },

  // Projects Section (Filterable)
  projects: {
    heading: "Featured Projects",
    subHeading: "Some of My Recent Works",
    categories: ["All", "Web", "App", "Design"],
    items: [
      {
        title: "Glassy Analytics Dashboard",
        category: "Web",
        description: "A premium real-time data visualization dashboard featuring extensive financial charts, system health metrics, and dark/light mode toggle with custom glassmorphism panels.",
        technologies: ["React", "Chart.js", "CSS3 Grid", "Framer Motion"],
        image: "assets/images/project-web.png",
        githubUrl: "https://github.com",
        liveUrl: "https://example.com"
      },
      {
        title: "FitLife Tracker App",
        category: "App",
        description: "A mobile-first fitness tracking application containing workout plan generators, calorie counters, and step trackers with vibrant gradient cards and interactive charts.",
        technologies: ["JavaScript", "HTML5 Canvas", "Local Storage", "Sass"],
        image: "assets/images/project-app.png",
        githubUrl: "https://github.com",
        liveUrl: "https://example.com"
      },
      {
        title: "E-Commerce Landing Page UI",
        category: "Design",
        description: "An elegant, minimalist UI design mockup for a luxury ecommerce brand focusing on high-quality visuals, spacious typography layouts, and fluid hover animations.",
        technologies: ["Figma", "UI/UX Design", "Responsive Web Design"],
        image: "assets/images/project-design.png",
        githubUrl: "https://github.com",
        liveUrl: "https://example.com"
      }
    ]
  },

  // Achievements & Certifications Section
  achievements: {
    heading: "Achievements",
    subHeading: "Certifications, Awards & Workshops",
    items: [
      {
        title: "Advanced React & Redux Certification",
        issuer: "Udemy / Meta",
        date: "Nov 2023",
        icon: "fa-certificate",
        description: "Deep dive into React hooks, state management patterns, React Router, testing with Jest, and build optimizations."
      },
      {
        title: "First Place - Berkeley Hackathon 2022",
        issuer: "UC Berkeley CSE",
        date: "April 2022",
        icon: "fa-trophy",
        description: "Awarded first place among 80+ teams for creating a decentralised local donation tracking platform for non-profits."
      },
      {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "Aug 2024",
        icon: "fa-cloud",
        description: "Validates overall understanding of AWS Cloud platform, covering basic cloud services, security, architecture, and pricing models."
      },
      {
        title: "UI/UX Masterclass & Design Systems Workshop",
        issuer: "Interaction Design Foundation",
        date: "Jan 2023",
        icon: "fa-laptop-code",
        description: "Intensive 4-week training on design system construction, grid systems, atomic design, typography, and interactive prototyping."
      }
    ],
    certificateMockup: "assets/images/certificate.png"
  },

  // Resume Section
  resume: {
    heading: "My Resume",
    subHeading: "Download or Review My Credentials",
    previewTitle: "Curriculum Vitae",
    previewSubtitle: "Alex Morgan - Full Stack Engineer",
    highlights: [
      "Master of Science in Computer Science from Stanford University",
      "Proficient in modern JavaScript (ES6+), React, Node.js, and CSS Grid/Flexbox",
      "Hands-on experience developing enterprise cloud solutions and SaaS products",
      "Strong background in responsive, accessible (WCAG compliant) web design"
    ],
    downloadUrl: "assets/documents/resume-sample.pdf"
  },

  // Contact Section
  contact: {
    heading: "Contact Me",
    subHeading: "Get In Touch",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA, USA",
    socialLinks: [
      { name: "github", icon: "fa-github", url: "https://github.com" },
      { name: "linkedin", icon: "fa-linkedin-in", url: "https://linkedin.com" },
      { name: "twitter", icon: "fa-twitter", url: "https://twitter.com" },
      { name: "instagram", icon: "fa-instagram", url: "https://instagram.com" }
    ]
  }
};
