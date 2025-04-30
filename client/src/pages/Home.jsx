import React from 'react'
import HeroSection from '../Components/HeroSection'
import About from '../Components/About'
import Skills from '../Components/Skills'
import Resume from '../Components/Resume'
import Portfolio from '../Components/Portfolio'
import Service from '../Components/Services'
import Testimonial from '../Components/Testimonials'
import ContactUs from '../Components/ContactUs'
import Footer from '../Components/Footer'
import Achievement from '../Components/Achievement'
import Certificates from '../Components/Certificate'

export default function Home() {
  return (
    <>
    <HeroSection />
    <About />
    <Skills />
    <Resume />
    <Certificates />
    <Portfolio />
    <Testimonial />
    <Service />
    <Achievement />
    <ContactUs />
    <Footer />
    </>
  )
}
