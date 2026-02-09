import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Github, ExternalLink, Linkedin, Trophy, Mail, Phone, Award, Menu, X, Eye, Folder, Code2, PhoneCall,Copy } from "lucide-react";


/* ---------- Simple UI Components ---------- */

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl ${className}`}>{children}</div>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button = ({ className = "", children, size, ...props }) => {
  const sizeClass =
    size === "sm" ? "px-2 py-1 text-xs" : "px-4 py-2 text-sm";
  return (
    <button className={`rounded-xl ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

/* ---------- Data ---------- */

const sections = ["home","projects","achievements","certifications","skills","contact"];
const projects = [
  {
    title: "LearnNet - Learning Management System",
    desc: "Full-stack LMS with session-based authentication, role-based access, course enrollment, and progress tracking.",
    img: "/projects/lms.png",
    github: "https://github.com/Puneetsethiya/LearnNet",
    live: "https://learnnet-web.onrender.com/",
    tech: ["HTML","CSS","JS","MongoDB", "Express.js", "Node.js",  "REST API"],
    demo: {
      email: "demo@user.com",
      password: "demo123"
    }
  },
  {
    title: "URL Shortener",
    desc: "Scalable URL shortener supporting link creation, redirection, and management using MongoDB-backed REST APIs.",
    img: "/projects/url.png",
    github: "https://github.com/Puneetsethiya/URL-Shortener",
    live: "https://url-shortener-9dhg.onrender.com/",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Session-Based Auth"],
    demo: {
      email: "demo@user.com",
      password: "demo123"
    }
  },
  {
    title: "College Event Management System",
    desc: "Campus event management system with role-based access, event scheduling, and registration workflows.",
    img: "/projects/event.png",
    github: "https://github.com/Puneetsethiya/Samskruthi",
    live: "https://samskruthi.onrender.com/",
    tech: ["HTML","CSS","JS","MongoDB", "Express.js", "Node.js", "REST API"],
      demo: {
      email: "demo@user.com",
      password: "demo123"
    }
  }
];



const achievements = [
  { 
    title: "7 Competition Wins (5× 1st, 2× 2nd)", 
    detail: "National & inter-college technical competitions across 5+ institutions (2025)",
    highlight: true
  },

  { title: "Active Competitive Programming Participant", detail: "Regular participation in inter-college coding contests" },
  { title: "Hackathon Participant", detail: "Experience working in team-based development challenges" },
  { title: "Developed 3+ Full-Stack Applications", detail: "Production-ready MERN apps with authentication and dashboards" },
  
];

const certifications = [
  { title: "Full Stack Web Development", issuer: "Apna College", link: "/certificates/web.pdf" },
  { title: "DSA with Java", issuer: "Apna College", link: "/certificates/dsa.pdf" }
];

/* ---------- Navbar ---------- */

function Navbar({ active, setActive, onNavigate, showUnderline }) {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  useEffect(() => {
  if (aboutOpen || imageOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [aboutOpen, imageOpen]);



  const linkClass = (id) =>
    `relative cursor-pointer px-2 py-1 hover:text-white transition ${
      active===id ? "text-white font-semibold":"text-gray-300"
    }`;

  const handleNav = (id) => {
    setOpen(false);
    setActive(id);
    onNavigate(id);
    const el = document.getElementById(id);
    if (el) {
      const NAV_OFFSET = 96;
      const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="fixed w-full z-50 bg-black/60 backdrop-blur-xl border-b border-zinc-800">
        <div className="p-4 md:p-6 flex justify-between items-center">

          {/* PROFILE + NAME */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={()=>setAboutOpen(true)}
          >
            {/* <img
              src="/profile.jpeg"
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-white-600 object-cover hover:scale-105 transition"
            /> */}

            <h1 className="section-title-glow text-2xl md:text-3xl font-extrabold tracking-wide">
              Puneet Sethiya
            </h1>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8 text-base">
            {sections.map(id => (
              <span key={id} onClick={() => handleNav(id)} className={linkClass(id)}>
                {id.charAt(0).toUpperCase()+id.slice(1)}
                {active===id && showUnderline && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 h-[2px] w-full bg-red-600"
                  />
                )}
              </span>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X/> : <Menu/>}
          </button>
        </div>

        {/* MOBILE NAV */}
        {open && (
          <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-sm bg-black/80">
            {sections.map(id => (
              <span key={id} onClick={()=>handleNav(id)} className={linkClass(id)}>
                {id.charAt(0).toUpperCase()+id.slice(1)}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ABOUT ME MODAL */}
      {aboutOpen && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-zinc-900 p-10 rounded-2xl max-w-4xl w-full relative border border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.4)]">

      <button
        onClick={()=>setAboutOpen(false)}
        className="absolute top-4 right-4 text-white hover:text-red-500"
      >
        <X/>
      </button>

      <div className="flex items-center gap-4 mb-6">

        <img
          src="/profile.jpeg"
          onClick={()=>setImageOpen(true)}
          className="w-16 h-16 rounded-full border-2 border-white-500 cursor-pointer"
        />

        <div>
          <h2 className="text-3xl font-semibold text-red-500">
            Puneet Sethiya
          </h2>
        </div>

      </div>

      <div className="space-y-4 text-lg text-gray-300">

        <p className=" font-medium">
          MERN Stack Developer | MongoDB, Express.js, React, Node.js | Building Scalable Web Applications
        </p>

        <div>
          <h3 className="text-red-500 font-semibold">Education :</h3>

          <div>
            <h3 className="text-red-500 font-semibold">Degree (CGPA : 8.83)</h3>
            <p>Bachelor of Computer Application (BCA 2022-25) — BMSCCM, Bengaluru, India</p>
          </div>

          <br/>

          <div>
            <h3 className="text-red-500 font-semibold">Schooling</h3>
            <p>12th (PUC 2020-22) — Jain College, Bengaluru, India</p>
            <p>10th (ICSE 2020) — St Josephs Boys High School, Bengaluru, India</p>
          </div>
        </div>

      </div>

    </div>

  </div>
)}

      {imageOpen && (
  <div
    onClick={()=>setImageOpen(false)}
    className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]"
  >
    <img
      src="/profile.jpeg"
      className="max-h-[50vh] max-w-[50vw] rounded-3xl"
    />
  </div>
)}

    </>
  );
  
}

/* ---------- Section Wrapper ---------- */

function SectionWrapper({ id, focusSection, children }) {
  const dimmed = focusSection && focusSection !== id;
  return (
<div
  id={id}
  className={`scroll-mt-32 overflow-visible transition-all duration-300 ${dimmed ? "opacity-30 blur-[1px]" : "opacity-100"}`}
>

      {children}
    </div>
  );
}
/* ---------- Hero ---------- */

function Hero({ focusSection }) {
  return (
    <SectionWrapper id="home" focusSection={focusSection}>
      <div
        className="relative min-h-[100dvh] pt-24 md:pt-28 bg-cover bg-center md:bg-[center_5%] flex items-end p-6 md:p-10"
        style={{ backgroundImage: "url(/assets/hero.png)" }}
      >

        {/* Top blend so image isn't cut under navbar */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/90 to-transparent" />

        {/* Main dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl relative z-10"
        >
          <p className="text-base md:text-xl mb-2 text-white drop-shadow-lg">
            MERN Stack Developer (MongoDB • ExpressJs • React • NodeJs)
          </p>

          <p className="text-sm text-gray-300 mb-6">
            3+ Full-Stack Apps • 7 Competition Wins • Active Competitive Programmer
          </p>

          <div className="flex gap-2">
            <a href="/resume.pdf" target="_blank" rel="noreferrer">
              <Button className="bg-red-600 text-white hover:bg-red-700 flex items-center gap-1 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm">
                <Play size={16}/>
                  <span className="sm:hidden">Resume</span>
                  <span className="hidden sm:inline">View Resume</span>
              </Button>
            </a>

            <a href="https://www.linkedin.com/in/puneet-sethiya-" target="_blank" rel="noreferrer">
              <Button className="bg-zinc-900 text-white border border-zinc-700 hover:shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:border-white transition-all flex items-center gap-1 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm">
                <Linkedin size={16}/>LinkedIn
              </Button>
            </a>

            <a href="https://github.com/Puneetsethiya" target="_blank" rel="noreferrer">
              <Button className="bg-zinc-900 text-white border border-zinc-700 hover:shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:border-white transition-all flex items-center gap-1 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm">
                <Github size={16}/>GitHub
              </Button>
            </a>
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  );
}



/* ---------- Projects ---------- */
function ProjectCard({ p }) {

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -10 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-full relative hover:z-50"


    >
      <Card className="bg-zinc-900 transition-shadow duration-300 hover:shadow-2xl overflow-hidden">

        {/* IMAGE */}
        <div className="relative group overflow-hidden">

          <img
            src={p.img}
            alt={p.title}
            className="h-48 md:h-56 w-full object-cover bg-black transition duration-500 group-hover:scale-105"
          />

          {/* DEMO CREDENTIALS OVERLAY */}
          {p.demo && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">

              <div className="absolute bottom-3 left-3 space-y-2">

                <p className="text-md font-bold text-white">
                  Demo Credentials : 
                </p>

                <div className="flex items-center gap-2 whitespace-nowrap text-md">
                 <span><span className="text-red-500 font-medium">Email :</span> {p.demo.email}</span>

                  <button
                    onClick={()=>copyToClipboard(p.demo.email)}
                    className="bg-red-600 p-1.5 rounded hover:bg-red-700"
                  >
                    <Copy size={14}/>
                  </button>
                </div>

                <div className="flex items-center gap-2 whitespace-nowrap text-md">
                 <span><span className="text-red-500 font-medium">Password :</span> {p.demo.password}</span>

                  <button
                    onClick={()=>copyToClipboard(p.demo.password)}
                    className="bg-red-600 p-1.5 rounded hover:bg-red-700"
                  >
                    <Copy size={14}/>
                  </button>
                </div>

              </div>

            </div>
          )}





        </div>

        {/* CONTENT */}
        <CardContent className="space-y-3">

          <h4 className="font-bold text-lg text-red-500">
            {p.title}
          </h4>

          <p className="text-sm text-gray-300">{p.desc}</p>

          {/* TECH STACK BADGES */}
          <div className="flex flex-wrap gap-2">
            {p.tech.map((tech, i) => (
              <span
                key={i}
                className="bg-zinc-800 px-1.5 py-0.5 text-[10px] rounded-md border border-zinc-700"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">

            <a href={p.github} target="_blank" rel="noreferrer">
              <Button className="bg-white text-black hover:bg-zinc-200 flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition">
                <Github size={18}/>
                GitHub
              </Button>
            </a>

            <a href={p.live} target="_blank" rel="noreferrer">
              <Button className="bg-red-600 text-white hover:bg-red-700 px-3 py-2 flex items-center gap-1 rounded-lg shadow-[0_0_8px_rgba(255,0,0,0.4)]">
                <ExternalLink size={16}/> Live
              </Button>
            </a>

          </div>

        </CardContent>

      </Card>
    </motion.div>
  );
}




function ProjectsRow({ focusSection }) {

  const isFew = projects.length <= 3;

  return (
    <SectionWrapper id="projects" focusSection={focusSection}>
      <div className="w-full px-4 md:px-10 mt-8 relative overflow-x-hidden">


      <h3 className="text-xl md:text-2xl mb-4 font-semibold flex items-center gap-2 section-title-glow">
  <Folder size={20}/> Projects
</h3>


        {isFew ? (

          /* GRID LAYOUT (3 or less projects) */
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 pb-8">


            {projects.map((p,i)=><ProjectCard key={i} p={p}/>)}

          </div>

        ) : (

          /*ROW (4+ projects) */
          <div className="flex gap-8 overflow-x-auto overflow-y-visible pt-6 pb-8 pl-4 md:pl-8 hide-scrollbar">

            {projects.map((p,i)=><ProjectCard key={i} p={p}/>)}

          </div>

        )}

      </div>
    </SectionWrapper>
  );
}




/* ---------- Other Sections ---------- */

function AchievementsRow({ focusSection }) {

  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const achievementImages = [
    "/achievements/1.jpeg",
    "/achievements/4.jpeg",
    "/achievements/2.jpeg",
    "/achievements/3.jpeg",
    "/achievements/5.jpeg",
    "/achievements/6.jpeg",
  ];
  useEffect(() => {
  if (openModal || selectedImage) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [openModal, selectedImage]);


  return (
    <SectionWrapper id="achievements" focusSection={focusSection}>
      <div className="w-full px-4 md:px-10 mt-10">

        <h3 className="text-xl md:text-2xl mb-4 font-semibold flex items-center gap-2 section-title-glow">
          <Trophy size={20}/> Achievements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">


          {achievements.map((a,i)=>(

            <Card key={i} className="bg-zinc-800 border border-zinc-700">

              <CardContent className="flex items-center justify-between">

                <div>
                  <h4 className="font-semibold">{a.title}</h4>
                  <p className="text-sm text-gray-400">{a.detail}</p>
                </div>

                {a.highlight && (
                  <Button
                    onClick={()=>setOpenModal(true)}
                    className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-1"
                  >
                    <Trophy size={16}/>
                  </Button>
                )}

              </CardContent>

            </Card>

          ))}

        </div>
      </div>

      {/* GALLERY MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-zinc-900 p-6 rounded-2xl max-w-5xl w-full relative border border-red-600 shadow-[0_0_20px_rgba(255,0,0,0.4)] overflow-x-hidden">

            <button
              onClick={()=>setOpenModal(false)}
              className="absolute top-4 right-4 text-white hover:text-red-500 hover:scale-110 transition"
            >
              <X/>
            </button>

            <h3 className="text-xl mb-4 font-semibold text-red-500">
              Achievements Gallery
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto">

              {achievementImages.map((img,i)=>(
                <img
                  key={i}
                  src={img}
                  alt="achievement"
                  onClick={()=>setSelectedImage(img)}
                  className="w-full h-64 object-cover rounded-lg border border-red-600 hover:scale-105 transition cursor-pointer"
                />
              ))}

            </div>

          </div>

        </div>
      )}

      {/* FULLSCREEN IMAGE VIEW */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]">

          <button
            onClick={()=>setSelectedImage(null)}
            className="absolute top-6 right-6 text-white bg-black/50 p-2 rounded-full hover:bg-red-600 hover:scale-110 transition"
          >
            <X size={28}/>
          </button>

          <img
            src={selectedImage}
            className="max-h-[85vh] max-w-[95vw] rounded-xl border border-red-600 shadow-[0_0_25px_rgba(255,0,0,0.6)]"
          />

        </div>
      )}

    </SectionWrapper>
  );
}




function CertificationsRow({ focusSection }) {
  return (
    <SectionWrapper id="certifications" focusSection={focusSection}>
      <div className="w-full px-4 md:px-10 mt-10">
        <h3 className="text-xl md:text-2xl mb-4 font-semibold flex items-center gap-2 section-title-glow">
  <Award size={20}/> Certifications
</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

          {certifications.map((c,i)=>(
            <a key={i} href={c.link} target="_blank" rel="noreferrer">
              <Card className="bg-zinc-800 border border-zinc-700 hover:bg-zinc-700">
  <CardContent className="flex items-center justify-between">

    <div>
      <h4 className="font-semibold">{c.title}</h4>
      <p className="text-sm text-gray-400">{c.issuer}</p>
    </div>

  <Button
  className="bg-red-600 text-white hover:bg-red-700 flex items-center gap-2 px-4 py-2 rounded-lg shadow-[0_0_8px_rgba(255,0,0,0.4)]"
>
  <ExternalLink size={16}/>
</Button>


  </CardContent>
</Card>

            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function SkillsRow({ focusSection }) {

  const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "React.js",
      "React Hooks",
      "Responsive Design",
      "Form Handling"
    ]
  },
  {
    title: "Backend & APIs",
    skills: [
      "Node.js",
      "Express.js",
      "REST API Development",
      "JWT Authentication",
        "CRUD Operations",
    ]
  },
  {
    title: "Database",
    skills: [
      "MongoDB",
      "Schema Design",
      "Data Modeling"
    ]
  },
  {
    title: "Tools & Deployment",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "Deployment",
      "Environment Variables (.env)"
    ]
  }
];


  return (
    <SectionWrapper id="skills" focusSection={focusSection}>
      <div className="w-full px-4 md:px-10 mt-10">

        <h3 className="text-xl md:text-2xl mb-6 font-semibold flex items-center gap-2 section-title-glow">
          <Code2 size={20}/> Skills
        </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">


  {skillGroups.map((group, i) => (
    <motion.div
      key={i}
      whileHover={{ scale: 1.05, y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5"
    >
      <h4 className="text-base md:text-lg text-red-500 font-semibold mb-3">

  {group.title}
</h4>


      <div className="flex flex-wrap gap-2">
        {group.skills.map((s, j) => (
          <span
            key={j}
           className="bg-zinc-800 px-3 py-1.5 rounded-lg text-xs md:text-sm hover:bg-red-600 transition"

>
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  ))}

</div>


      </div>
    </SectionWrapper>
  );
}



function ContactSection({ focusSection }) {
  const [reveal,setReveal]=useState(false);

  return (
    <SectionWrapper id="contact" focusSection={focusSection}>
      <div className="px-4 md:px-8 mt-16 pb-40">

        <h3 className="text-xl md:text-2xl mb-6 font-semibold flex items-center gap-2 section-title-glow">
  <PhoneCall size={20}/> Contact
</h3>


        <div className="grid sm:grid-cols-2 gap-4 ">

          <a href="mailto:puneetsethiya16@gmail.com">
            <Card className="bg-zinc-800 border border-zinc-700">
              <CardContent className="flex items-center gap-3">
                <Mail className="text-red-500"/>
                <div>
                  <h4 className="text-sm text-gray-400">Email</h4>
                  <p className="font-medium text-white">puneetsethiya16@gmail.com</p>
                </div>
              </CardContent>
            </Card>
          </a>

          {/* Phone Reveal */}
          <Card className="bg-zinc-800 border border-zinc-700">
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="text-red-500"/>
                <div>
                  <h4 className="text-sm text-gray-400">Phone</h4>

                  {reveal ? (
                    <a href="tel:+919019377748" className="text-white font-medium">
                      +91-9019377748
                    </a>
                  ) : (
                    <p className="blur-sm select-none">+91-9019377748</p>
                  )}
                </div>
              </div>

              {!reveal && (
                <button
                  onClick={()=>setReveal(true)}
                  className="text-sm flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
>
                  <Eye size={14}/> Reveal
                </button>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </SectionWrapper>
  );
}

function Footer() {
  return (
    <div className="px-4 md:px-8 mt-16 py-10 border-t border-zinc-800">

      <div className="flex items-center gap-5 text-gray-400">

        <h2 className="text-lg font-semiboldtext-gray-300">
          ©  Puneet Sethiya
        </h2>
        <a
          href="mailto:puneetsethiya16@gmail.com"
          className="hover:text-red-500 transition"
        >
          <Mail size={22}/>
        </a>
        <a
          href="https://www.linkedin.com/in/puneet-sethiya-"
          target="_blank"
          rel="noreferrer"
          className="hover:text-red-500 transition"
        >
          <Linkedin size={22}/>
        </a>

       

        <a
          href="https://github.com/Puneetsethiya"
          target="_blank"
          rel="noreferrer"
          className="hover:text-red-500 transition"
        >
          <Github size={22}/>
        </a>

      </div>


    </div>
  );
}



/* ---------- Main ---------- */

export default function App() {
  const [active,setActive]=useState("home");
  const [focusSection,setFocusSection]=useState(null);
  const [showUnderline]=useState(true);
  const isNavigatingRef=useRef(false);

  const handleNavigate=(id)=>{
    isNavigatingRef.current=true;
    setFocusSection(id);
    setTimeout(()=>{
      setFocusSection(null);
      isNavigatingRef.current=false;
    },1200);
  };

  
  useEffect(() => {
    const block = (e) => e.preventDefault();
    const blockKeys = (e) => {
      if ((e.ctrlKey || e.metaKey) && ["c","x","u"].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("contextmenu", block);
    document.addEventListener("keydown", blockKeys);
    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

useEffect(() => {
  const handleScroll = () => {

    let currentSection = "home";

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();

      if (rect.top <= window.innerHeight * 0.35 && rect.bottom >= 100) {
        currentSection = id;
      }
    });

    // FORCE last underline to reach Contact when at very bottom
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 5;

    if (atBottom) {
      currentSection = "contact";
    }

    if (!isNavigatingRef.current) {
      setActive(currentSection);
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);




  return (
    <div className="bg-black text-white min-h-screen select-none overflow-x-hidden">

      <Navbar active={active} setActive={setActive} onNavigate={handleNavigate} showUnderline={showUnderline}/>
      <Hero focusSection={focusSection}/>
      <ProjectsRow focusSection={focusSection}/>
      <AchievementsRow focusSection={focusSection}/>
      <CertificationsRow focusSection={focusSection}/>
      <SkillsRow focusSection={focusSection}/>
      <ContactSection focusSection={focusSection}/>
      <Footer/>
    </div>
  );
}
