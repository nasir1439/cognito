import React from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
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
    text: "Cognito helped me learn practical skills...",
  },
  {
    name: "Riya Patel",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    text: "The courses are structured and easy to follow.",
  },
  {
    name: "Rohit Verma",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    text: "Amazing learning experience.",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen mt-16 bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-100/30 to-background dark:via-indigo-950/30" />

        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 relative">
          <div className="max-w-4xl text-center mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-2 text-indigo-500">
              <GraduationCap size={18} />
              Learn Beyond Limits
            </div>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight">
              Empowering The Next Generation of Learners
            </h1>

            <p className="mt-6 text-lg text-muted-foreground">
              Cognito is a modern learning platform designed to help students
              gain practical skills, build real-world projects, and accelerate
              their careers.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500">
                Explore Courses
              </Button>

              <Button variant="outline" className="rounded-2xl">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                className="rounded-3xl border-border/50 backdrop-blur"
              >
                <CardContent className="p-8 text-center">
                  <Icon className="mx-auto mb-4 text-indigo-500" />
                  <h2 className="text-4xl font-bold">{item.value}</h2>
                  <p className="mt-2 text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <Card className="rounded-3xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="mt-4 text-muted-foreground">
                To make quality education accessible, practical, and
                career-focused for learners around the world.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold">Our Vision</h2>
              <p className="mt-4 text-muted-foreground">
                To become a trusted platform where students learn, build, and
                grow into successful professionals.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <h2 className="text-center text-4xl font-bold">Why Choose Cognito?</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            "Project Based Learning",
            "Expert Instructors",
            "Modern Curriculum",
            "Progress Tracking",
            "Lifetime Access",
            "Career Focused Content",
          ].map((item, index) => (
            <Card key={index} className="rounded-3xl">
              <CardContent className="flex items-center gap-3 p-6">
                <CheckCircle className="text-green-500" />
                <span>{item}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Learning Journey */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <h2 className="text-center text-4xl font-bold">
          Your Learning Journey
        </h2>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {[
            "Choose Course",
            "Learn Concepts",
            "Build Projects",
            "Practice Skills",
            "Launch Career",
          ].map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl border px-6 py-4"
            >
              <span className="font-semibold">{step}</span>
              {index !== 4 && <ArrowRight size={18} />}
            </div>
          ))}
        </div>
      </section>

      {/* Instructors */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <h2 className="text-center text-4xl font-bold">Meet Our Instructors</h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {instructors.map((instructor, index) => (
            <Card key={index} className="rounded-3xl">
              <CardContent className="p-8 text-center">
                <div />
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-indigo-500/20"
                />
                <h3 className="mt-4 text-xl font-semibold">
                  {instructor.name}
                </h3>

                <p className="text-muted-foreground">{instructor.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <h2 className="text-center text-4xl font-bold">
          Student Success Stories
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Card key={index} className="rounded-3xl ">
              <CardContent>
                <div className="flex items-center gap-3 mt-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      Cognito Student
                    </p>
                  </div>
                </div>
                <div className="mb-4 mt-5 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground">"{item.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="rounded-[32px] bg-gradient-to-r from-indigo-500 to-violet-500 p-12 text-center text-white">
          <h2 className="text-4xl font-bold">Ready To Start Learning?</h2>

          <p className="mt-4 text-white/80">
            Join thousands of learners already building their future.
          </p>

          <Button variant="secondary" className="mt-6 rounded-2xl">
            Explore Courses
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
