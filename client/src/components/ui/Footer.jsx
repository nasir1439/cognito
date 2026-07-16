import { GraduationCap, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl mt-10">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg">
                <GraduationCap size={22} />
              </div>

              <div>
                <h1 className="text-xl font-extrabold tracking-tight">
                  Cognito
                </h1>
                <p className="text-xs text-muted-foreground">
                  Learn Beyond Limits
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              A modern learning platform designed to help students learn, grow,
              and achieve their goals through high-quality courses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-indigo-500">
                Home
              </Link>

              <Link
                to="/my-learning"
                className="transition-colors hover:text-indigo-500"
              >
                My Learning
              </Link>

              <Link
                to="/profile"
                className="transition-colors hover:text-indigo-500"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Platform
            </h3>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span className="cursor-pointer transition-colors hover:text-indigo-500">
                Courses
              </span>

              <span className="cursor-pointer transition-colors hover:text-indigo-500">
                Explore
              </span>

              <span className="cursor-pointer transition-colors hover:text-indigo-500">
                About
              </span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Connect
            </h3>

            <div className="space-y-4">
              <a
                href="mailto:yourmail@example.com"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-indigo-500"
              >
                <Mail size={16} />
                Contact Us
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="rounded-xl border p-2 transition-all hover:border-indigo-500 hover:text-indigo-500"
                >
                  <Github size={18} />
                </a>

                <a
                  href="#"
                  className="rounded-xl border p-2 transition-all hover:border-indigo-500 hover:text-indigo-500"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Cognito. All rights reserved.</p>

          <p>Built with ❤️ by Syed Nasir Hussain</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
