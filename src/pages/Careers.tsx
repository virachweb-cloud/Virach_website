import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/BentoCard";
import { BentoGrid } from "@/components/BentoGrid";
import { Users, TrendingUp, Award, Brain, BookOpen, Heart, Shield, Smile } from "lucide-react";
import { FresherApplicationDialog } from "@/components/forms/FresherApplicationDialog";
import { ExperiencedApplicationDialog } from "@/components/forms/ExperiencedApplicationDialog";
import { Footer } from "@/components/Footer";

const Careers = () => {
  const [fresherDialogOpen, setFresherDialogOpen] = useState(false);
  const [experiencedDialogOpen, setExperiencedDialogOpen] = useState(false);

  return (
    <div
      className="min-h-screen min-h-[100dvh] bg-fixed bg-cover bg-center bg-no-repeat relative mt-16"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542323228-002ac256e7b8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Page Content */}
      <div className="relative z-10 min-h-screen pt-20">
        {/* Page Header */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-orange-500 mb-6">
                Careers
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white max-w-3xl mx-auto">
                Innovate, Build, and Transform with Us
              </p>
              <p className="text-lg max-w-4xl mx-auto text-white">
                At Virach IT & Software Solutions, we are not just building
                technology, we are shaping the future. If you're passionate
                about innovation and growth, Virach is the place for you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Working with Virach */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BentoGrid className="max-w-7xl mx-auto">
              <BentoCard size="2x1" className="p-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl font-bold mb-6 text-center text-midnight">
                    Working with Virach
                  </h2>
                  <p className="text-lg text-primary mb-8 text-center">
                    At Virach, we believe people are our greatest strength. We
                    encourage creativity, collaboration, and continuous learning
                    to help every individual reach their full potential.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Brain className="h-6 w-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-midnight">Innovation-Driven Culture</h3>
                      <p className="text-muted-foreground text-primary">Be part of a workplace that thrives on fresh ideas and forward-thinking solutions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Users className="h-6 w-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-midnight">Team Collaboration</h3>
                      <p className="text-muted-foreground text-primary">Work alongside a supportive and talented team that values mutual growth.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <BookOpen className="h-6 w-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-midnight">Continuous Learning</h3>
                      <p className="text-muted-foreground text-primary">Access opportunities for skill development, mentorship, and career advancement.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Award className="h-6 w-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-midnight">Impactful Projects</h3>
                      <p className="text-muted-foreground text-primary">Contribute to meaningful projects that create real-world value.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-midnight">Flexibility & Inclusion</h3>
                      <p className="text-muted-foreground text-primary">Experience a modern workplace that embraces diversity and supports work-life balance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <TrendingUp className="h-6 w-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-midnight">Career Growth</h3>
                      <p className="text-muted-foreground text-primary">Build your future with long-term opportunities and structured growth paths.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Shield className="h-6 w-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-midnight">Ownership & Responsibility</h3>
                      <p className="text-muted-foreground text-primary">Take charge of your ideas and make meaningful contributions.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Smile className="h-6 w-6 text-midnight" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-midnight">Positive Environment</h3>
                      <p className="text-muted-foreground text-primary">Celebrate successes and thrive in a motivating, people-first culture.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </BentoCard>
          </BentoGrid>
        </div>
        </section>

        {/* Apply Now Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BentoGrid className="max-w-7xl mx-auto">
              <BentoCard size="2x1" className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl font-bold mb-6 text-midnight">
                    Apply Now
                  </h2>
                  <p className="text-lg text-primary max-w-3xl mx-auto mb-8">
                    We are always excited to welcome fresh talent and experienced
                    professionals to our team.</p>
                  
                </motion.div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                  {/* Fresher Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <BentoCard className="p-6 h-full">
                      <div className="text-center">
                        <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <Users className="h-8 w-8 text-midnight" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-midnight">
                          Career Starters
                        </h3>
                        <p className="text-primary mb-6">
                          Perfect for fresh graduates and those beginning their
                          professional journey in tech.
                        </p>
                        <Button
                          onClick={() => setFresherDialogOpen(true)}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          Apply as Fresher
                        </Button>
                      </div>
                    </BentoCard>
                  </motion.div>

                  {/* Experienced Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <BentoCard className="p-6 h-full">
                      <div className="text-center">
                        <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <TrendingUp className="h-8 w-8 text-midnight" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-midnight">
                          Career Growth
                        </h3>
                        <p className="text-primary mb-6">
                          For experienced professionals looking to advance their
                          career and take on new challenges.
                        </p>
                        <Button
                          onClick={() => setExperiencedDialogOpen(true)}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          Apply as Experienced
                        </Button>
                      </div>
                    </BentoCard>
                  </motion.div>
                </div>

                <p className="text-lg text-primary max-w-3xl mx-auto mt-8">
                      Whether you're starting your career or looking for your next big challenge, Virach offers an
                    environment where you can learn, grow, and make an impact.
                  </p>
              </BentoCard>
            </BentoGrid>
          </div>
        </section>

        {/* Application Dialogs */}
        <FresherApplicationDialog
          open={fresherDialogOpen}
          onOpenChange={setFresherDialogOpen}
        />
        <ExperiencedApplicationDialog
          open={experiencedDialogOpen}
          onOpenChange={setExperiencedDialogOpen}
        />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Careers;
