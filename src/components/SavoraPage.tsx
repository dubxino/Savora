"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const categories = [
  ["Rice & grains", "Everyday staples selected for retail supply and commercial trading.", "/images/savora-rice-atelier-v2.png"],
  ["Pulses & lentils", "Essential beans, lentils and legumes for diverse food traditions.", "/images/savora-pulses.png"],
  ["Spices & seasoning", "Traditional ingredients for homes, retailers and food businesses.", "/images/savora-spices-editorial.png"],
  ["Coconut products", "Coconut and selected derivatives sourced to market requirements.", "/images/savora-coconut.png"],
  ["Nuts & dry foods", "Natural dry ingredients and everyday grocery products.", "/images/savora-nuts.png"],
  ["More groceries", "Additional categories based on sourcing availability and buyer demand.", "/images/savora-groceries.png"],
];

const slides = [
  ["Food sourcing & wholesale", "Food sourcing and wholesale trading for retailers, distributors and commercial buyers.", "/images/savora-product-still-v2.png", "Explore products", "#products"],
  ["From Kerala to the UAE", "Our grocery trading journey began in Kerala in 2000 and now supports a licensed business presence in the UAE.", "/images/savora-rice-fields.png", "Read our story", "#story"],
  ["Source with Savora", "Talk to us about product availability, wholesale requirements or a sourcing partnership.", "/images/savora-rice-sourcing.png", "Discuss your requirements", "#contact"],
  ["Everyday essentials", "Explore rice, pulses and grocery products for retail and commercial supply.", "/images/savora-groceries.png", "View products", "#products"],
  ["Spices with character", "Discover traditional spices and seasonings for food businesses and retailers.", "/images/savora-spices-editorial.png", "Explore our range", "#products"],
  ["Growing together", "Connect with a trading partner grounded in experience and focused on lasting relationships.", "/images/savora-market-journey.png", "Work with Savora", "#work"],
];

const pillars = [
  ["Sourcing", "Working with farmers, producers and suppliers to connect food products with market requirements."],
  ["Wholesale supply", "Supporting retailers, traders and commercial buyers with bulk purchasing requirements."],
  ["Retail grocery", "Serving households through Vrendavan Store in Kerala, with direct connections to everyday customer needs."],
];

function Mark() { return <span className="mark"><b>SAVORA</b><small>TRADING FZE LLC</small></span>; }
function Arrow() { return <span aria-hidden="true">↗</span>; }

export function SavoraPage() {
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [interest, setInterest] = useState(categories[0][0]);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPlaying(!motion.matches);
    const updateMotion = () => setPlaying(!motion.matches);
    motion.addEventListener("change", updateMotion);
    return () => motion.removeEventListener("change", updateMotion);
  }, []);

  useEffect(() => {
    if (!playing || carouselPaused || menu) return;
    const timer = window.setInterval(() => {
      setSlide(current => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [playing, carouselPaused, menu]);

  useEffect(() => {
    const reveal = new IntersectionObserver(items => items.forEach(item => item.isIntersecting && item.target.classList.add("seen")), { threshold: .12 });
    document.querySelectorAll("[data-reveal]").forEach(node => reveal.observe(node));
    const onScroll = () => setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight));
    addEventListener("scroll", onScroll, { passive: true });
    return () => { reveal.disconnect(); removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenu(false);
    addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; removeEventListener("keydown", close); };
  }, [menu]);

  const [title, description, photo, action, destination] = slides[slide];
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hello SAVORA, I would like to enquire.",
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Interest: ${interest}`,
      `Requirement: ${data.get("requirement")}`,
    ].join("\n");
    window.open(`https://wa.me/971582978653?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return <>
    <a href="#main" className="skip">Skip to content</a>
    <div className="page-progress" style={{ transform: `scaleX(${progress})` }} />
    <header className="topbar">
      <a href="#home" aria-label="SAVORA home"><Mark /></a>
      <nav aria-label="Primary"><a href="#story">About</a><a href="#products">Products</a><a href="#work">Services</a></nav>
      <div className="top-actions"><a href="#contact">Business enquiry <Arrow /></a><button onClick={() => setMenu(true)} aria-expanded={menu} aria-controls="mobile-navigation">Menu <i /><i /></button></div>
    </header>

    <aside id="mobile-navigation" inert={!menu} className={`drawer ${menu ? "open" : ""}`} aria-hidden={!menu}><div className="drawer-head"><Mark /><button onClick={() => setMenu(false)} aria-label="Close menu">Close ×</button></div><nav>{[["home","Home"],["story","Our story"],["products","Products"],["work","Services"],["contact","Contact"]].map(([id,label],i)=><a href={`#${id}`} key={id} onClick={()=>setMenu(false)}><span>0{i+1}</span>{label}<Arrow /></a>)}</nav><div className="drawer-foot"><p>Kerala, India<br />United Arab Emirates</p><a href="tel:+971582978653">+971 58 297 8653</a></div></aside>

    <main id="main">
      <section className="hero-atelier hero-carousel" id="home" aria-label="Savora highlights" onMouseEnter={() => setCarouselPaused(true)} onMouseLeave={() => setCarouselPaused(false)} onFocusCapture={() => setCarouselPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setCarouselPaused(false); }}>
        <div className="hero-full-image" key={photo}>
          <Image src={photo} alt="" fill priority={slide === 0} sizes="100vw" />
        </div>
        <div className="hero-overlay" />
        <div className="hero-full-content" aria-live={playing && !carouselPaused ? "off" : "polite"}>
          <div key={title} className="slide-content">
            <p className="hero-eyebrow">Savora Trading · India & UAE</p>
            <h1>{title}</h1>
            <div className="hero-intro">
              <p>{description}</p>
              <div className="hero-actions"><a href={destination}>{action} <Arrow /></a></div>
            </div>
          </div>
        </div>
        <div className="slide-controls" role="group" aria-label="Slideshow controls">
          {slides.map(([label], index) => (
            <button type="button" key={label} aria-label={label} aria-current={slide === index ? "true" : undefined} onClick={() => setSlide(index)}>
              <span className="slide-dot" />
            </button>
          ))}
          <button type="button" className="play-toggle" onClick={() => setPlaying(current => !current)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>{playing ? "Ⅱ" : "▶"}</button>
        </div>
      </section>

      <section className="story-atelier" id="story">
        <div className="chapter">About Savora</div>
        <div className="story-lead" data-reveal><h2>Grocery trade experience.<br /><em>From Kerala to the UAE.</em></h2></div>
        <div className="story-aside" data-reveal><p>SAVORA Trading builds on a journey that began in Kerala, India, in 2000—shaped by retail, wholesale, farmer sourcing, supplier networks and daily customer relationships.</p><p>Today, that experience supports a licensed business presence in the United Arab Emirates and a forward-looking approach to commercial partnership.</p></div>
        <div className="story-image" data-reveal><Image src="/images/savora-cardamom-source-v2.png" alt="Hands examining fresh cardamom pods above a woven basket" fill sizes="(max-width: 800px) 92vw, 45vw" /><div className="caption">Sourcing relationships</div></div>
      </section>

      <section className="timeline-atelier">
        <div className="journey-heading">
          <div><div className="chapter">Our journey</div><h2>Built over time.<br /><em>Grounded in trust.</em></h2></div>
          <p>From everyday grocery trading in Kerala to a licensed presence in the UAE, relationships have shaped every step.</p>
        </div>
        <div className="journey-layout">
        <figure className="journey-photo">
          <Image src="/images/savora-market-journey.png" alt="Illustrative produce market with sacks of grains and spices" fill sizes="(max-width: 900px) 100vw, 55vw" />
          <figcaption><strong>2000</strong><span>The beginning of our broader trading journey in Kerala, India</span></figcaption>
        </figure>
        <div className="timeline-track">
          <article data-reveal><b>01 / Roots</b><h3>Learning the trade</h3><p>Experience grows through grocery retail, wholesale and local supplier relationships.</p></article>
          <article data-reveal><b>02 / Kerala</b><h3>Vrendavan Store</h3><p>A direct connection to households and everyday grocery needs.</p></article>
          <article data-reveal><b>03 / UAE</b><h3>A wider outlook</h3><p>SAVORA’s licensed presence opens the next chapter of commercial partnership.</p></article>
        </div>
        </div>
      </section>

      <section className="products-atelier" id="products">
        <div className="chapter">Our products</div>
        <div className="products-heading"><h2>Food products we trade</h2><p>Availability and specifications depend on sourcing and commercial requirements.</p></div>
        <div className="product-gallery">
          {categories.map(([name, summary, image]) => (
            <article className="product-card" key={name}>
              <div className="product-card-image">
                <Image src={image} alt="" fill sizes="(max-width: 540px) 92vw, (max-width: 900px) 45vw, 30vw" />
              </div>
              <div className="product-card-copy">
                <h3>{name}</h3>
                <p>{summary}</p>
                <a href="#contact" aria-label={`Enquire about ${name}`} onClick={() => setInterest(name)}>Enquire <Arrow /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work-atelier" id="work">
        <div className="services-heading">
          <div><div className="chapter">Our services</div><h2>Good trading starts<br />with a good connection.</h2></div>
          <p>From finding the right products to understanding buyer needs, we build relationships around practical requirements.</p>
        </div>
        <div className="services-showcase">
          <div className="services-photo"><Image src="/images/savora-cardamom-source-v2.png" alt="Illustrative photograph of cardamom being examined by hand" fill sizes="(max-width: 900px) 100vw, 42vw" /></div>
          <div className="services-cards">{pillars.map(([title, description], index) => (
            <article key={title}>
              <span className="service-index">0{index + 1}</span>
              <div><h3>{title}</h3><p>{description}</p><a href="#contact">Start a conversation <Arrow /></a></div>
            </article>
          ))}</div>
        </div>
      </section>

      <section className="contact-atelier" id="contact"><div className="contact-title"><div className="chapter inverse">Contact</div><h2>Bring us your<br /><em>next requirement.</em></h2><p>Products, supply, sourcing or partnership—we’ll begin with a clear conversation.</p><a href="tel:+971582978653">+971 58 297 8653 <Arrow /></a></div><form onSubmit={submit}><label>Name<input required name="name" autoComplete="name" /></label><label>Email<input required type="email" name="email" autoComplete="email" /></label><label>Company<input name="company" autoComplete="organization" /></label><label>Interest<select value={interest} onChange={event => setInterest(event.target.value)}>{categories.map(c=><option key={c[0]}>{c[0]}</option>)}</select></label><label className="full">Requirement<textarea required name="requirement" rows={4} /></label><div className="form-action"><button>Continue to WhatsApp <Arrow /></button><small>Your details will be prepared in WhatsApp for you to review and send.</small></div></form></section>
    </main>

    <footer className="footer-atelier"><Mark /><p>Connecting Markets.<br />Moving Opportunities.</p><nav><a href="#home">Top ↑</a><a href="#products">Products</a><a href="#contact">Contact</a></nav><small>© {new Date().getFullYear()} SAVORA Trading FZE LLC · United Arab Emirates</small></footer>
  </>;
}
