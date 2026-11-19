import {
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-border/50 bg-background/80 border-t backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 md:grid-cols-2 md:gap-y-12 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 space-y-4 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg sm:h-11 sm:w-11 sm:rounded-2xl">
                <GraduationCap size={22} />
              </div>

              <div>
                <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">
                  Cognito
                </h2>

                <p className="text-muted-foreground text-xs">
                  Learn Beyond Limits
                </p>
              </div>
            </Link>

            <p className="text-muted-foreground max-w-sm text-sm leading-6">
              A modern learning platform designed to help students learn, grow,
              and achieve their goals through high-quality courses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h3 className="text-foreground mb-4 text-xs font-bold tracking-widest uppercase sm:text-sm">
              Quick Links
            </h3>

            <div className="text-muted-foreground flex flex-col items-start gap-3 text-sm">
              <Link
                to="/"
                className="transition-colors duration-200 hover:text-indigo-500"
              >
                Home
              </Link>

              <Link
                to="/my-learning"
                className="transition-colors duration-200 hover:text-indigo-500"
              >
                My Learning
              </Link>

              <Link
                to="/profile"
                className="transition-colors duration-200 hover:text-indigo-500"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div className="min-w-0">
            <h3 className="text-foreground mb-4 text-xs font-bold tracking-widest uppercase sm:text-sm">
              Platform
            </h3>

            <div className="text-muted-foreground flex flex-col items-start gap-3 text-sm">
              <Link
                to="/#courses"
                className="transition-colors duration-200 hover:text-indigo-500"
              >
                Courses
              </Link>

              <a
                href="https://dev.to/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-indigo-500"
              >
                Explore
              </a>

              <Link
                to="/about"
                className="transition-colors duration-200 hover:text-indigo-500"
              >
                About
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="col-span-2 space-y-4 sm:col-span-1">
            <h3 className="text-foreground text-xs font-bold tracking-widest uppercase sm:text-sm">
              Connect
            </h3>

            <div className="space-y-4">
              <a
                href="mailto:syednasirhussain1439@gmail.com"
                className="text-muted-foreground inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-indigo-500"
              >
                <Mail size={16} />
                Contact Us
                <ArrowUpRight size={13} />
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/nasir1439"
                  aria-label="GitHub"
                  className="border-border/70 text-muted-foreground flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500 hover:text-indigo-500"
                >
                  <Github size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/in/syed-nasir-hussain-b23422257/"
                  aria-label="LinkedIn"
                  className="border-border/70 text-muted-foreground flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500 hover:text-indigo-500"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-border/50 text-muted-foreground mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-center text-xs sm:mt-12 sm:flex-row sm:gap-4 sm:text-sm">
          <p>© {new Date().getFullYear()} Cognito. All rights reserved.</p>

          <p>
            Built with <span className="text-red-500">❤️</span> by Syed Nasir
            Hussain
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
