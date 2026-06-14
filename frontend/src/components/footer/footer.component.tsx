import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/logoNew.png";

const DEFAULT_GITHUB_ISSUES_URL =
  "https://github.com/ronisarkarexe/story-spark-ai/issues";

type StatusState = "idle" | "loading" | "success" | "error";

const FooterComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<StatusState>("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/newsletter/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("🎉 Subscribed successfully!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };


  const platformLinks = [
    { label: "About Us", to: "/about-us" },
    { label: "Careers", to: "/career" },
    { label: "Contact", to: "/contact-us" },
  ];


  const githubIssuesUrl =
    import.meta.env.VITE_GITHUB_REPO_ISSUES_URL ||
    DEFAULT_GITHUB_ISSUES_URL;


  const resourceLinks = [
    { label: "Blog", to: "/blog" },
    { label: "Help Center", to: "/help-center" },
    { label: "Community", to: "/dashboard/community" },
    { label: "Contributors", to: "/contributors" },
    { label: "Support / Feedback", to: "/contact-us" },
    { label: "GitHub Issues", to: githubIssuesUrl },
  ];


  const legalLinks = [
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Cookie Policy", to: "/cookie-policy" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Guidelines", to: "/guidelines" },
  ];


  const socialLinks = [
    {
      icon: "fa-linkedin",
      url: "https://www.linkedin.com/in/ronisarkar76/",
      label: "Connect with us on LinkedIn",
    },
    {
      icon: "fa-twitter",
      url: "https://x.com/ronisarkar_exe",
      label: "Follow us on X (Twitter)",
    },
    {
      icon: "fa-github",
      url: "https://github.com/ronisarkarexe",
      label: "Check out GitHub",
    },
    {
      icon: "fa-envelope",
      url: "mailto:ronichandrasarkar@gmail.com",
      label: "Email us",
    },
  ];


  const currentYear = new Date().getFullYear();


  return (
    <footer className="relative w-full bg-gradient-to-b from-[#090F24] via-[#080E22] to-[#060A18] overflow-hidden">

      <div className="relative z-10 max-w-[1450px] mx-auto px-6 sm:px-8 lg:px-10 pt-12 pb-10">

        <div className="grid grid-cols-12 gap-10">

          <div className="col-span-12 lg:col-span-4">

            <Link to="/">
              <img
                src={logo}
                alt="StorySparkAI"
                className="h-[38px]"
              />
            </Link>

            <p className="text-slate-300 mt-5 max-w-sm">
              Empowering voices through the art of writing.
              Connect, create, and inspire.
            </p>

          </div>


          <div className="col-span-6 lg:col-span-2">

            <h3 className="text-white mb-4">
              Platform
            </h3>

            {platformLinks.map((item)=>(
              <Link
                key={item.to}
                to={item.to}
                className="block text-slate-300 mb-3"
              >
                {item.label}
              </Link>
            ))}

          </div>


          <div className="col-span-6 lg:col-span-2">

            <h3 className="text-white mb-4">
              Resources
            </h3>

            {resourceLinks.map((item)=>(
              <Link
                key={item.label}
                to={item.to}
                className="block text-slate-300 mb-3"
              >
                {item.label}
              </Link>
            ))}

          </div>


          <div className="col-span-6 lg:col-span-2">

            <h3 className="text-white mb-4">
              Follow Us
            </h3>


            {socialLinks.map((item)=>(
              <a
                key={item.icon}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 text-slate-300 mb-3"
              >

                {
                  item.icon==="fa-x-twitter"
                  ?
                  <FaXTwitter/>
                  :
                  <i className={`fa-brands ${item.icon}`}/>
                }


                {item.label}

              </a>
            ))}


          </div>



          <div className="col-span-12 lg:col-span-2">

            <h3 className="text-white mb-4">
              Stay Updated
            </h3>


            <form onSubmit={handleSubscribe}>

              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="you@storyspark.ai"
                className="w-full p-2 rounded bg-slate-900 text-white"
              />


              <button
                type="submit"
                className="mt-3 px-4 py-2 bg-blue-500 rounded text-white"
              >
                {
                  status==="loading"
                  ?
                  "..."
                  :
                  "Subscribe"
                }

              </button>

            </form>


            <p className="text-sm mt-2">
              {message}
            </p>


          </div>

        </div>



        <hr className="my-8 border-white/10"/>



        <div className="flex justify-between flex-wrap text-sm text-slate-400">

          <span>
            © {currentYear} StorySparkAI. All rights reserved.
          </span>


          <div>

          {legalLinks.map((item,index)=>(
            <React.Fragment key={item.label}>

              <Link
                to={item.to}
                className="mx-2"
              >
                {item.label}
              </Link>


              {
                index !== legalLinks.length-1 &&
                "|"
              }


            </React.Fragment>
          ))}

          </div>

        </div>


      </div>

    </footer>
  );
};


export default FooterComponent;