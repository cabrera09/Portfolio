import { useEffect, useRef, useState } from "react";
import "./App.css";

import profile from "./assets/images/profile.png";
import logo from "./assets/images/logo.png";
import facebook from "./assets/images/facebook.png";
import instagram from "./assets/images/instagram.png";
import github from "./assets/images/github.png";
import linkedin from "./assets/images/linkedin.png";

const skills = ["HTML5", "CSS3", "JavaScript", "React", "Git & GitHub", "Responsive Design"];

const projects = [
  { number: "01", title: "Portfolio Website", type: "Personal brand", description: "A focused portfolio designed to introduce my work, skills, and approach." },
  { number: "02", title: "Web Interface", type: "Responsive design", description: "A clean interface concept built around clarity, usability, and mobile-first layouts." },
  { number: "03", title: "Future Project", type: "In progress", description: "The next opportunity to turn an idea into a useful digital experience." },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [landingDismissed, setLandingDismissed] = useState(false);
  const landingRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      document.documentElement.style.setProperty("--logo-scroll-scale", String(1 - progress * 0.46));
      document.documentElement.style.setProperty("--logo-scroll-y", `${progress * -90}px`);
      document.documentElement.style.setProperty("--logo-scroll-opacity", String(1 - progress * 0.8));
      setHasScrolled(window.scrollY > 8);

      if (!landingDismissed && landingRef.current?.getBoundingClientRect().bottom < 80) {
        setLandingDismissed(true);
        setMenuOpen(false);
      }
    };
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, [landingDismissed]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`site-header${hasScrolled ? " is-scrolled" : ""}${landingDismissed ? " is-visible" : ""}`}>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="primary-navigation" className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
          <a href={landingDismissed ? "#about" : "#home"} onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#tools" onClick={closeMenu}>Tools</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main className={landingDismissed ? "landing-finished" : ""}>
        <div ref={landingRef} className={`landing${landingDismissed ? " is-dismissed" : ""}`}>
          <section className="mobile-logo-intro" aria-label="Jaylord Cabrera portfolio">
            <div className="logo-stage">
              <img src={logo} alt="Jaylord Cabrera logo" />
            </div>
            <a className="scroll-cue" href="#home" aria-label="Scroll to introduction">
              <span className="scroll-cue-mouse" aria-hidden="true"><i /></span>
              <span>Scroll to explore</span>
            </a>
          </section>
          <section className="hero section-shell" id="home">
          <div className="hero-copy hero-enter" data-reveal>
            <p className="eyebrow">Hello, I am</p>
            <h1>JAYLORD <span>CABRERA</span></h1>
            <p className="intro">An IT graduate creating modern, responsive, and user-friendly websites that make a strong first impression.</p>
            <div className="buttons">
              <a className="button button-primary" href="#projects">View my work <span aria-hidden="true">&#8599;</span></a>
              <a className="button button-secondary" href="#contact">Let&apos;s talk</a>
            </div>
            <div className="social" aria-label="Social media links">
              <a href="https://www.facebook.com/jaylord.cabrerawicas" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook" /></a>
              <a href="https://www.instagram.com/jilordd_?igsh=MWJ1MzIyNHZhOHNyYw==" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
              <a href="https://github.com/cabrera09" target="_blank" rel="noopener noreferrer"><img src={github} alt="GitHub" /></a>
              <a href="https://www.linkedin.com/in/jaylord-cabrera-a9953b331/?skipRedirect=true" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" /></a>
            </div>
          </div>
          <div className="hero-visual hero-enter hero-enter-delay">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <div className="profile-frame"><img src={profile} alt="Jaylord Cabrera" className="profile" /></div>
            <div className="availability"><span /> Available for opportunities</div>
          </div>
          </section>
        </div>

        <section className="about section-shell" id="about">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Get to know me</p>
            <h2>Building with <span>purpose.</span></h2>
          </div>
          <div className="about-grid" data-reveal>
            <p className="about-lead">I am Jaylord Cabrera, a Bachelor of Science in Information Technology graduate who enjoys bringing ideas to life on the web.</p>
            <div className="about-details">
              <p>I combine a love for clean visuals with a practical, user-first mindset. Every project is an opportunity to learn, solve a problem, and create something people enjoy using.</p>
              <a className="text-link" href="#contact">Start a conversation <span aria-hidden="true">&#8594;</span></a>
            </div>
          </div>
        </section>

        <section className="tools" id="tools">
          <div className="section-shell">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">My toolkit</p>
              <h2>Tools I use to <span>build.</span></h2>
            </div>
            <div className="skills-grid">
              {skills.map((skill, index) => <div className="skill" data-reveal key={skill} style={{ "--delay": `${index * 75}ms` }}><span>0{index + 1}</span>{skill}</div>)}
            </div>
          </div>
        </section>

        <section className="projects section-shell" id="projects">
          <div className="section-heading section-heading-row" data-reveal>
            <div><p className="eyebrow">Selected work</p><h2>Recent <span>projects.</span></h2></div>
            <p className="heading-copy">A growing collection of work shaped by thoughtful design and solid front-end foundations.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" data-reveal key={project.number} style={{ "--delay": `${Number(project.number) * 90}ms` }}>
                <div className="project-top"><span>{project.number}</span><span className="project-arrow">&#8599;</span></div>
                <div><p className="project-type">{project.type}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-shell contact-inner" data-reveal>
            <div><p className="eyebrow">Get in touch</p><h2>Have an idea?<br /><span>Let&apos;s build it.</span></h2></div>
            <div className="contact-actions">
              <a
                className="button button-light"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=cabrerajaylord%40gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Send me an email <span aria-hidden="true">&#8599;</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-shell">
        <p>© {new Date().getFullYear()} Jaylord Cabrera</p>
        <address>
          <a href="tel:09983099962">0998 309 9962</a>
          <span>Pagsanga-an, Pavia, Iloilo</span>
        </address>
        <a href="#home">Back to top &#8593;</a>
      </footer>
    </>
  );
}

export default App;
