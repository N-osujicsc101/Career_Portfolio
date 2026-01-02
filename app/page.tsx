'use client';

import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Container, Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface StatusState {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function Home(): JSX.Element {
  const [displayText, setDisplayText] = useState<string>('');
  const words: string[] = ['Data Scientist', 'Software Developer', 'Designer', 'Writer'];
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const fullText: string = words[currentWordIndex];

  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<StatusState>({
    type: 'idle',
    message: ''
  });


  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setDisplayText('');
        }, 2000);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentWordIndex, fullText]);


  useEffect(() => {
    emailjs.init('_83w0olw6emY2U7Nf');
  }, []);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending...' });

    try {
      await emailjs.send(
        "service_wzsku1p",
        "template_626cj0d",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'mosujinneoma@gmail.com',
        }
      );

      setStatus({
        type: 'success',
        message: 'Email sent successfully! I will get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setStatus({ type: 'idle', message: '' });
      }, 5000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setStatus({
        type: 'error',
        message: 'Failed to send email. Please try again.'
      });
      console.error('EmailJS error:', errorMessage);
      console.error('Full error:', error);
    }
  };


  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b">
        <nav className="mx-auto max-w-6xl px-6 py-6 flex justify-center">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-10 text-gray-700">
            <li>
              <Link href="#about" className="hover:text-pink-500 transition">
                About Me
              </Link>
            </li>
            <li>
              <Link href="#experience" className="hover:text-pink-500 transition">
                Experience
              </Link>
            </li>
            <li>
              <Link href="#projects" className="hover:text-pink-500 transition">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#skills" className="hover:text-pink-500 transition">
                Skills
              </Link>
            </li>

          </ul>
        </nav>
      </header>

      <main className="bg-white">

        <section className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center">

            <div>
              <h1 className="text-4xl text-gray-600 mb-4">
                Hi, my name is Nneoma M. Osuji,
              </h1>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                I'm A <span className="typing bg-pink-300">{displayText}</span>
              </h1>

              <p className="max-w-md text-gray-700 leading-relaxed">
                My first name is Maria faustina but my preferred name is Nneoma
                <br />
               "Technology is neither good nor bad; nor is it neutral." – Melvin Kranzberg
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-end gap-6">
              <div className="relative mb-5">
                <div className="absolute -top-6 -right-6 h-72 w-56 rounded-3xl bg-pink-200"></div>

                <div className="relative z-10 h-72 w-56 rounded-3xl bg-gray-100 shadow-lg overflow-hidden">
                  <Image
                    src="/Profile_new.jpg"
                    alt="Profile photo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <a href="https://github.com/N-osujicsc101?tab=overview&from=2025-12-01&to=2025-12-30" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-500 transition">
                  <Github size={24} />
                </a>

                <a href="https://www.linkedin.com/in/nneoma-osuji-9a6370266" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-500 transition">
                  <Linkedin size={24} />
                </a>

                <button
                  onClick={() => {
                    const element = document.getElementById('contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="border border-gray-300 px-6 py-3 rounded-full text-gray-700 hover:bg-gray-100 transition"
                >
                  Contact Me
                </button>
              </div>
            </div>

          </div>
        </section>

        <section id="about" className="scroll-mt-24 bg-gray-50 py-32">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="page-title text-3xl font-bold mb-6">About Me</h2>
            <div className="container flow-text">
              <p className="max-w-2xl text-gray-700 leading-relaxed">
                I’m a Computer Science student at Pan-Atlantic University passionate about building practical, human-centered technology. 
                My work lives at the intersection of data science, software development, and design, 
                where thoughtful engineering meets real-world impact. Im naturally thoughful and deep as an individual.
                <br />
                <br />
                I’m particularly interested in using data and AI-driven systems to solve 
                meaningful problems and improve everyday experiences. 
                <br />
                <br />
                I enjoy breaking down complex ideas, designing intuitive solutions, 
                and turning them into tools that are both functional and intentional. 
                Through academic and personal projects, I’m constantly exploring how technology 
                can be used responsibly and creatively to make a positive difference 
                and I'm actively looking for opportunities to explore my interests.
                <br />
                <br />
                In my spare time I also enjoy reading
                playing video games and watching korean dramas.
              </p>
            </div>
          </div>
        </section>


        <section id="experience" className="scroll-mt-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="page-title text-3xl font-bold mb-12">Experience</h2>

            <div className="space-y-8 max-w-3xl">
              <div>
                <h3 className="font-semibold text-lg">
                  IT and communications support Intern
                </h3>
                <p className="text-sm text-gray-500">
                  CSAAE • 2025
                </p>
                <p className="mt-2 text-gray-700">
                  Provided necessary technological support to different departments
                  in the office. Assited in building functional automation applications to replace
                  manual tasks.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Software Developer Intern
                </h3>
                <p className="text-sm text-gray-500">
                  Wootlab • 2024
                </p>
                <p className="mt-2 text-gray-700">
                  Worked on building and maintaining web applications using Python,
                  Flask, and modern frontend technologies.
                </p>
              </div>
            </div>


            <div className="mt-10">
              <a
                href="/M_osujiResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-pink-500 font-medium underline underline-offset-4 hover:text-pink-600 transition"
              >
                View my full resume →
              </a>
            </div>
          </div>
        </section>


        <section id="projects" className="scroll-mt-24 bg-gray-50">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="page-title text-3xl font-bold mb-12">Projects</h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

              <a
                href="https://github.com/N-osujicsc101/Computer-graphics/tree/main/2dassignment"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border overflow-hidden hover:shadow-lg transition cursor-pointer group"
              >
                <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/render.png"
                    alt="Graphic rendering"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />

                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Graphic rendering
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Rendering sophisticated 2D images
                  </p>
                  <span className="inline-block text-pink-500 font-medium text-sm">
                    View details →
                  </span>
                </div>
              </a>

              <a
                href="https://github.com/N-osujicsc101/csc202-set2022"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border overflow-hidden hover:shadow-lg transition cursor-pointer group"
              >
                <div className="relative w-full h-48 flex items-center justify-center overflow-hidden">
                  <Image
                    src="/web app.png"
                    alt="Dental Web app"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />

                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Dental Web app
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Custom web app to manage files in a dental clinique.
                  </p>
                  <span className="inline-block text-pink-500 font-medium text-sm">
                    View details →
                  </span>
                </div>
              </a>


              <a
                href="https://1drv.ms/f/c/449e0ea3d6ec52ee/IgB9vPrvu-QdTYLy5GiEa-EkAazqLEhldUevWstLVDhrwvI?e=HlnyTd"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border overflow-hidden hover:shadow-lg transition cursor-pointer group"
              >
                <div className="relative w-full h-48  flex items-center justify-center overflow-hidden">
                  <Image
                    src="/apache.png"
                    alt="Staff Management App"
                    fill
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />

                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Staff Management App
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Staff management app for managing staff in PAU.
                  </p>
                  <span className="inline-block text-pink-500 font-medium text-sm">
                    View details →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>


        <section id="skills" className="scroll-mt-24 py-32">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="page-title text-3xl font-bold mb-4">
              Skills
            </h2>

            <p className="text-gray-600 max-w-2xl mb-12">
              Tools and technologies I use to turn ideas into thoughtful,
              functional products.
            </p>

            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">


              <div>
                <h3 className="font-semibold mb-4 text-gray-800">
                  Core Development and database administration
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Python", "JavaScript", "Flask", "React", "Next.js", "SQL"].map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-pink-50 text-pink-700 px-4 py-2 text-sm font-medium
                         hover:bg-pink-100 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>


              <div>
                <h3 className="font-semibold mb-4 text-gray-800">
                  Frontend & Styling
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["HTML", "CSS", "Tailwind CSS", "Streamlit", "Apache Netbeans"].map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-gray-100 text-gray-700 px-4 py-2 text-sm
                         hover:bg-gray-200 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>


              <div>
                <h3 className="font-semibold mb-4 text-gray-800">
                  Tools & Interests
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Git & GitHub", "AI / Generative Models", "Data Wrandling and Analysis"].map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-white border border-gray-200 px-4 py-2 text-sm
                         hover:border-pink-400 hover:text-pink-600 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>



        <section id="contact" className="scroll-mt-24 bg-gray-50 py-32">

          <div className="px-6">


            <div className="mx-auto max-w-6xl">
              <h2 className="page-title text-3xl font-bold mb-12">
                Contact Me
              </h2>
            </div>


            <div className="mx-auto w-full lg:max-w-5xl">
              <form onSubmit={handleFormSubmit} className="space-y-6">


                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Your name"
                    className="w-full max-w-none px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition"
                  />
                </div>


                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full max-w-none px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition"
                  />
                </div>


                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={6}
                    placeholder="Your message..."
                    className="w-full max-w-none px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 transition resize-none"
                  />
                </div>


                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="bg-pink-500 px-8 py-3 rounded-full text-white font-medium hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                </button>

                {status.message && (
                  <div
                    className={`p-4 rounded-lg ${status.type === 'success'
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-red-100 text-red-700 border border-red-300'
                      }`}
                  >
                    {status.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>



      </main>
    </>
  );
}