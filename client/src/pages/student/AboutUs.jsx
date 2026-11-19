import React from "react";
import { useNavigate } from "react-router-dom";

import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Eye,
  Code2,
  Sparkles,
  Rocket,
  Lightbulb,
  BriefcaseBusiness,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, value: "10K+", label: "Students" },
  { icon: BookOpen, value: "50+", label: "Courses" },
  { icon: Award, value: "100+", label: "Hours Content" },
  { icon: Star, value: "95%", label: "Satisfaction" },
];

const instructors = [
  {
    name: "Dr. Sarah Johnson",
    role: "Full Stack Development",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Brown",
    role: "Data Science & AI",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Davis",
    role: "Cloud Computing",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const testimonials = [
  {
    name: "Aman Sharma",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    text: "Cognito helped me learn practical skills and understand concepts through structured learning.",
  },
  {
    name: "Riya Patel",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    text: "The courses are structured and easy to follow. I really enjoy learning at my own pace.",
  },
  {
    name: "Rohit Verma",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "An amazing learning experience that makes exploring new technologies easier.",
  },
];

const features = [
  {
    title: "Project Based Learning",
    description: "Build practical projects while learning new concepts.",
    icon: Code2,
  },
  {
    title: "Expert Instructors",
    description: "Learn from structured and guided course content.",
    icon: GraduationCap,
  },
  {
    title: "Modern Curriculum",
    description:
      "Explore technologies and skills relevant to today's industry.",
    icon: Lightbulb,
  },
  {
    title: "Progress Tracking",
    description: "Track your learning progress and completed lectures.",
    icon: TrendingUp,
  },
  {
    title: "Learn at Your Pace",
    description: "Access your purchased learning content whenever you want.",
    icon: BookOpen,
  },
  {
    title: "Career Focused Content",
    description:
      "Develop skills that help you prepare for real-world opportunities.",
    icon: BriefcaseBusiness,
  },
];

const journeySteps = [
  "Choose Course",
  "Learn Concepts",
  "Build Projects",
  "Practice Skills",
  "Launch Career",
];

const SectionHeading = ({ eyebrow, title, description }) => (
  <div className="mx-auto max-w-2xl text-center">
    {eyebrow && (
      <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
    )}

    <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
      {title}
    </h2>

    {description && (
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
        {description}
      </p>
    )}
  </div>
);

const AboutUs = () => {
  const navigate = useNavigate();

  const exploreCourses = () => {
    navigate("/course/search?query=");
  };

  return (
    <main className="bg-background relative min-h-screen overflow-hidden pt-16 sm:pt-16">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="absolute top-[35%] right-0 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />

        <div className="absolute bottom-[15%] left-0 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="border-border/50 relative overflow-hidden border-b">
        <div className="from-background to-background absolute inset-0 bg-gradient-to-br via-indigo-100/30 dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              <GraduationCap className="h-5 w-5" />
              Learn Beyond Limits
            </div>

            <h1 className="text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Empowering the Next Generation of{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Learners
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-sm leading-relaxed sm:text-base lg:text-lg">
              Cognito is a modern learning platform designed to help students
              gain practical skills, build real-world projects, and accelerate
              their careers.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                onClick={exploreCourses}
                size="lg"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 text-white shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/categories")}
                className="rounded-xl px-7 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/5"
              >
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <Card
                key={item.label}
                className="group border-border/60 bg-card/70 rounded-2xl shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 sm:rounded-3xl"
              >
                <CardContent className="flex flex-col items-center p-5 text-center sm:p-7">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 transition-transform duration-300 group-hover:scale-110 sm:h-13 sm:w-13">
                    <Icon className="h-5 w-5 text-indigo-600 sm:h-6 sm:w-6 dark:text-indigo-400" />
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    {item.value}
                  </h3>

                  <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <SectionHeading
          eyebrow="Our Purpose"
          title="What Drives Cognito"
          description="Our mission and vision shape the way we make learning more accessible and meaningful."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card className="group border-border/60 bg-card/70 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg sm:rounded-3xl">
            <CardContent className="p-6 sm:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10">
                <Target className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>

              <h3 className="text-xl font-bold sm:text-2xl">Our Mission</h3>

              <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
                To make quality education accessible, practical, and
                career-focused for learners around the world.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border/60 bg-card/70 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg sm:rounded-3xl">
            <CardContent className="p-6 sm:p-9">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">
                <Eye className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>

              <h3 className="text-xl font-bold sm:text-2xl">Our Vision</h3>

              <p className="text-muted-foreground mt-4 text-sm leading-relaxed sm:text-base">
                To become a trusted platform where students learn, build, and
                grow into successful professionals.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Cognito */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Why Cognito"
          title="A Better Way to Learn"
          description="Everything you need to make your learning journey more structured, practical, and engaging."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group border-border/60 bg-card/70 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 sm:rounded-3xl"
              >
                <CardContent className="flex items-start gap-4 p-5 sm:p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 transition-colors duration-300 group-hover:bg-indigo-500/15">
                    <Icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold tracking-tight">
                      {feature.title}
                    </h3>

                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Learning Journey */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Your Path Forward"
          title="Your Learning Journey"
          description="A simple path from discovering new concepts to building skills for your future."
        />

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {journeySteps.map((step, index) => (
            <div
              key={step}
              className="border-border/60 bg-card/70 flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/[0.03] sm:flex-col sm:items-start sm:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                0{index + 1}
              </div>

              <div className="flex flex-1 items-center justify-between gap-3 sm:w-full">
                <span className="text-sm font-semibold sm:text-base">
                  {step}
                </span>

                {index !== journeySteps.length - 1 && (
                  <ArrowRight className="text-muted-foreground h-4 w-4 shrink-0 sm:hidden" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instructors */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Learn Together"
          title="Meet Our Instructors"
          description="Discover guidance and knowledge across different technology domains."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <Card
              key={instructor.name}
              className="group border-border/60 bg-card/70 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg sm:rounded-3xl"
            >
              <CardContent className="flex flex-col items-center p-7 text-center sm:p-9">
                <div className="rounded-full border-4 border-indigo-500/15 p-1 transition-colors duration-300 group-hover:border-indigo-500/40">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="bg-muted h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold">{instructor.name}</h3>

                <p className="text-muted-foreground mt-1 text-sm">
                  {instructor.role}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <SectionHeading
          eyebrow="Student Experiences"
          title="Student Success Stories"
          description="Hear how learners describe their experience with Cognito."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <Card
              key={item.name}
              className="border-border/60 bg-card/70 rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:shadow-lg sm:rounded-3xl"
            >
              <CardContent className="p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="bg-muted h-12 w-12 shrink-0 rounded-full border-2 border-indigo-500/20 object-cover sm:h-14 sm:w-14"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold">{item.name}</h3>

                    <p className="text-muted-foreground text-xs">
                      Cognito Student
                    </p>
                  </div>
                </div>

                <div
                  className="mt-5 mb-4 flex gap-1"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  "{item.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 px-6 py-12 text-center text-white shadow-xl shadow-indigo-500/10 sm:px-10 sm:py-16 lg:px-16">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full border-[40px] border-white/5" />

          <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full border-[45px] border-white/5" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <Rocket className="h-7 w-7" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
              Ready to Start Learning?
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
              Take the next step in your learning journey. Discover courses,
              build new skills, and keep growing.
            </p>

            <Button
              onClick={exploreCourses}
              variant="secondary"
              size="lg"
              className="mt-7 rounded-xl px-7 font-semibold shadow-md transition-all hover:-translate-y-0.5"
            >
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
