/**
 * ============================================================
 *  PORTFOLIO CONFIGURATION
 *  Edit this file to update your personal information,
 *  projects, skills, and social links across the entire site.
 * ============================================================
 */

const portfolioConfig = {

  /* ── Personal Information ────────────────────────────── */
  name: "Tapajyoti Nath",
  shortName: "TN",
  title: "Computer Science Student & Aspiring Software Developer",
  email: "tapajyoti07@gmail.com",
  location: "India",
  university: "Lovely Professional University (LPU)",
  degree: "B.Tech Computer Science & Engineering",
  graduationYear: "2029",
  enrollmentYear: "2025",
  careerGoal: "Software Development / SDE",

  heroDescription:
    "Computer Science student passionate about programming, software development, problem solving, and building real-world projects.",

  aboutDescription: [
    "I am pursuing B.Tech in Computer Science and Engineering at Lovely Professional University.",
    "I enjoy programming, building projects, learning new technologies, and improving my problem-solving skills.",
    "My current focus areas include C++, Data Structures & Algorithms, Web Development, Python, Java, and Database Management."
  ],

  /* ── Social / External Links ─────────────────────────── */
  social: {
    github:   "https://github.com/tapajyoti07-hub",
    linkedin: "https://www.linkedin.com/in/tapajyoti-nath-35644a278/",
    leetcode:   "",    // ← Add your LeetCode profile URL when ready
    codechef:   "",    // ← Add your CodeChef profile URL when ready
    hackerrank: "",    // ← Add your HackerRank profile URL when ready
    gfg:        "",    // ← Add your GeeksforGeeks profile URL when ready
  },

  /* ── GitHub API Configuration ────────────────────────── */
  githubUsername: "tapajyoti07-hub",

  /* ── Resume ──────────────────────────────────────────── */
  resumePath: "assets/resume/resume.pdf",

  /* ── Quick Stats (Hero area) ─────────────────────────── */
  stats: [
    { number: "3+",   label: "Projects" },
    { number: "10+",  label: "Technologies" },
    { number: "500+", label: "Coding Hours" },  // ← Update with your actual estimate
    { number: "2029", label: "Graduation" },
  ],

  /* ── Typing Animation Strings ────────────────────────── */
  typingStrings: [
    "CSE Student",
    "Software Developer",
    "Web Developer",
    "Problem Solver",
    "Tech Enthusiast",
  ],

  /* ── Info Badges (About section) ─────────────────────── */
  infoBadges: [
    { icon: "🎓", text: "B.Tech CSE" },
    { icon: "📍", text: "India" },
    { icon: "💻", text: "Developer" },
    { icon: "🚀", text: "Always Learning" },
  ],

  /* ── Skills ──────────────────────────────────────────── */
  skills: [
    {
      category: "Programming",
      items: [
        { name: "C",    icon: "devicon-c-plain",         level: "Intermediate" },
        { name: "C++",  icon: "devicon-cplusplus-plain",  level: "Intermediate" },
        { name: "Python", icon: "devicon-python-plain",   level: "Intermediate" },
        { name: "Java", icon: "devicon-java-plain",       level: "Intermediate" },
      ],
    },
    {
      category: "Web Development",
      items: [
        { name: "HTML",       icon: "devicon-html5-plain",       level: "Comfortable" },
        { name: "CSS",        icon: "devicon-css3-plain",        level: "Comfortable" },
        { name: "JavaScript", icon: "devicon-javascript-plain",  level: "Learning" },
      ],
    },
    {
      category: "Database",
      items: [
        { name: "MySQL", icon: "devicon-mysql-plain", level: "Learning" },
      ],
    },
    {
      category: "Tools",
      items: [
        { name: "Git",     icon: "devicon-git-plain",              level: "Intermediate" },
        { name: "GitHub",  icon: "devicon-github-original",        level: "Intermediate" },
        { name: "VS Code", icon: "devicon-vscode-plain",           level: "Comfortable" },
      ],
    },
    {
      category: "IoT",
      items: [
        { name: "ESP32",      icon: "fas fa-microchip",   level: "Learning" },
        { name: "ThingSpeak", icon: "fas fa-chart-line",   level: "Learning" },
      ],
    },
  ],

  /* ── Projects ────────────────────────────────────────── */
  projects: [
    {
      id: "jarvis",
      title: "JARVIS",
      shortDescription: "A Python-based voice assistant / audio bot.",
      fullDescription:
        "JARVIS is a voice-controlled audio bot built with Python. It uses speech recognition and text-to-speech to interact with users, perform tasks, and provide information through voice commands.",
      category: "python",
      technologies: ["Python"],
      features: [
        "Voice command recognition",
        "Text-to-speech responses",
        "Task automation through voice",
      ],
      challenges: [
        // ← Add your challenges here
      ],
      learned: [
        // ← Add what you learned here
      ],
      github: "https://github.com/tapajyoti07-hub/Jarvis_audio-bot.git",
      demo: "",
      image: "",            // ← Add screenshot: "assets/projects/jarvis.png"
      futureImprovements: [
        // ← Add future plans here
      ],
    },
    {
      id: "smart-footstep-energy",
      title: "Smart Footstep Energy Harvesting & IoT Monitoring",
      shortDescription:
        "An IoT-based system designed to harvest energy from footsteps and monitor the generated data.",
      fullDescription:
        "An Internet-of-Things system that harvests kinetic energy generated by footsteps using piezoelectric sensors. The ESP32 microcontroller collects data from the sensors and transmits it to ThingSpeak for real-time monitoring and visualization.",
      category: "iot",
      technologies: ["ESP32", "Piezo Sensors", "ThingSpeak"],
      features: [
        "Energy harvesting from footsteps using piezo sensors",
        "Real-time data monitoring via ThingSpeak dashboard",
        "ESP32-based wireless data transmission",
        "Energy output visualization and analytics",
      ],
      challenges: [
        "Calibrating piezoelectric sensors for accurate readings",
        "Establishing reliable Wi-Fi connectivity with ESP32",
        "Optimizing energy harvesting circuit design",
      ],
      learned: [
        "IoT system architecture and sensor integration",
        "ESP32 programming and Wi-Fi communication",
        "Cloud-based data visualization with ThingSpeak",
        "Electronics prototyping and circuit design",
      ],
      github: "https://github.com/tapajyoti07-hub/Footstep_energy_harvesting.git",
      demo: "",
      image: "",            // ← Add project photo: "assets/projects/footstep-energy.png"
      futureImprovements: [
        "Increase energy harvesting efficiency",
        "Add battery storage system",
        "Implement mobile app for monitoring",
        "Scale to larger floor areas",
      ],
    },
    {
      id: "gym-tracker",
      title: "Gym Tracker",
      shortDescription: "A web-based gym/workout tracking interface.",
      fullDescription:
        "A responsive web application for tracking gym workouts and fitness progress. Built with vanilla HTML, CSS, and JavaScript, it allows users to log exercises, sets, reps, and track their fitness journey.",
      category: "web",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: [
        "Workout logging interface",
        "Exercise tracking with sets and reps",
        "Clean and responsive UI design",
        "Progress tracking functionality",
      ],
      challenges: [
        "Designing an intuitive workout logging interface",
        "Managing workout data on the client side",
      ],
      learned: [
        "Frontend development with HTML, CSS, and JavaScript",
        "Responsive web design techniques",
        "DOM manipulation and event handling",
      ],
      github: "",           // ← Add GitHub URL when available
      demo: "",
      image: "",
      futureImprovements: [
        "Add data persistence with localStorage or a backend",
        "Implement workout history and charts",
        "Add exercise library with descriptions",
      ],
    },
  ],

  /* ── Project Filter Categories ───────────────────────── */
  projectFilters: [
    { label: "All",    value: "all" },
    { label: "Web",    value: "web" },
    { label: "Python", value: "python" },
    { label: "IoT",    value: "iot" },
  ],

  /* ── Currently Learning ──────────────────────────────── */
  currentlyLearning: [
    { name: "C++ & DSA",            progress: 40, icon: "devicon-cplusplus-plain" },
    { name: "Web Development",      progress: 35, icon: "devicon-html5-plain" },
    { name: "JavaScript",           progress: 25, icon: "devicon-javascript-plain" },
    { name: "Database Management",  progress: 20, icon: "devicon-mysql-plain" },
  ],

  /* ── Education Timeline ──────────────────────────────── */
  education: [
    {
      degree: "B.Tech Computer Science & Engineering",
      institution: "Lovely Professional University (LPU)",
      period: "2025 – 2029",
      description:
        "Currently pursuing Bachelor of Technology in Computer Science and Engineering. Focused on programming, algorithms, web development, and IoT.",
      current: true,
    },
    {
      degree: "School Education",
      institution: "Sri Sri Ravishankar Vidya Mandir",
      period: "2023 – 2025",
      description: "Completed my school education with a strong foundation in Mathematics, Science, English, and Computer Science. Developed an early interest in technology, problem-solving, and programming while actively participating in academic and extracurricular activities.",
      current: false,
    },
  ],

  /* ── Achievements ────────────────────────────────────── */
  achievements: [
    // Add your real achievements here. Example format:
    // { title: "Achievement Title", description: "Description", icon: "fas fa-trophy", date: "2025" },
  ],

  /* ── Certifications ──────────────────────────────────── */
  certifications: [
    // Add your real certifications here. Example format:
    // {
    //   name: "Certificate Name",
    //   issuer: "Issuing Organization",
    //   date: "Month Year",
    //   credentialId: "ID-12345",
    //   link: "https://certificate-link.com",
    // },
  ],

  /* ── Coding Profiles ─────────────────────────────────── */
  codingProfiles: [
    {
      name: "GitHub",
      icon: "devicon-github-original",
      url: "https://github.com/tapajyoti07-hub",
      username: "@tapajyoti07-hub",
      stats: "View Profile",
    },
    {
      name: "LeetCode",
      icon: "fas fa-code",
      url: "",                                  // ← Add your LeetCode URL
      username: "@your_leetcode",               // ← Replace with your username
      stats: "View Profile",
    },
    {
      name: "CodeChef",
      icon: "fas fa-utensils",
      url: "",                                  // ← Add your CodeChef URL
      username: "@your_codechef",               // ← Replace with your username
      stats: "View Profile",
    },
    {
      name: "HackerRank",
      icon: "fab fa-hackerrank",
      url: "",                                  // ← Add your HackerRank URL
      username: "@your_hackerrank",             // ← Replace with your username
      stats: "View Profile",
    },
    {
      name: "GeeksforGeeks",
      icon: "fas fa-laptop-code",
      url: "",                                  // ← Add your GFG URL
      username: "@your_gfg",                    // ← Replace with your username
      stats: "View Profile",
    },
  ],

  /* ── Contact Form Configuration ──────────────────────── */
  contactForm: {
    // Set to "none" for UI-only, or "formspree", "emailjs", "resend", "custom"
    backend: "emailjs",

    // Formspree endpoint (if using Formspree)
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",  // ← Replace

    // EmailJS config (if using EmailJS)
    emailjs: {
      serviceId:  "service_ikh6mib",
      templateId: "template_qd81z3k",
      publicKey:  "lhspj24QHRfiDz9T9",
    },
  },
};
