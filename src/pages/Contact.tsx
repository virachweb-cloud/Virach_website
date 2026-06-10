import { motion } from "framer-motion";
import { BentoGrid } from "@/components/BentoGrid";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

const Contact = () => {
  return (
    <div
      className="min-h-screen min-h-[100dvh] bg-fixed bg-cover bg-center bg-no-repeat relative mt-16"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1661290245627-a48de1658652?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

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
              <h1 className="text-5xl md:text-7xl font-bold text-darkorange
               mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-white">
                Ready to transform your business with innovative technology solutions? 
                Let's start the conversation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              <ContactSection />
            </motion.div>
          </div>
        </section>
         {/* Footer with background image */}
         <Footer />
      </div>
    </div>
  );
};

export default Contact;