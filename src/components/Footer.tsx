import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

export const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass mt-16 mx-6 mb-6 p-8 rounded-2xl border border-glass-border/50"
      >
        <div className="text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            © 2025 <strong>Virach IT & Software Solutions Pvt Ltd</strong>. All rights reserved.
          </div>

          <div className="flex justify-center space-x-6 text-sm">
            {/* Privacy Policy */}
            <motion.button
              onClick={() => setShowPrivacy(true)}
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.button>

            {/* Terms of Service */}
            <motion.button
              onClick={() => setShowTerms(true)}
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.button>

            
          </div>
        </div>
      </motion.footer>

      {/* -------------------- TERMS MODAL -------------------- */}
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 mt-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 rounded-2xl relative"
          >
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-primary"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
            <p className="text-sm text-gray-500 mb-4">Last Updated: 28/02/2025</p>

            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <p>
                Welcome to <strong>Virach IT & Software Solutions Pvt Ltd</strong>. By accessing or
                using our services, websites, applications, or solutions (collectively, the
                “Services”), you agree to be bound by these Terms of Service (“Terms”). If you do
                not agree, please do not use our Services.
              </p>

              <h3 className="font-semibold">1. Eligibility</h3>
              <p>You must be legally capable of entering into binding contracts to use our Services.</p>

              <h3 className="font-semibold">2. Services Provided</h3>
              <ul className="list-disc list-inside">
                <li>IT consulting and support services</li>
                <li>Software development, integration, and maintenance</li>
                <li>Web and mobile application development</li>
                <li>Cloud solutions and data services</li>
                <li>Custom enterprise solutions</li>
              </ul>
              <p>The scope of services may vary depending on the agreement signed with the client.</p>

              <h3 className="font-semibold">3. User Responsibilities</h3>
              <ul className="list-disc list-inside">
                <li>Provide accurate and complete information when required.</li>
                <li>Use our Services only for lawful purposes.</li>
                <li>Not attempt to disrupt, hack, or misuse our systems.</li>
                <li>Maintain the confidentiality of your account credentials.</li>
              </ul>

              <h3 className="font-semibold">4. Fees and Payments</h3>
              <p>
                Fees for services are communicated through written agreements, proposals, or
                invoices. Payments must be made within the agreed timeline. Late payments may
                attract penalties or suspension of services.
              </p>

              <h3 className="font-semibold">5. Intellectual Property</h3>
              <p>
                All software, code, designs, and content created by Virach IT & Software Solutions
                remain the property of the company unless otherwise stated in a written contract.
                Clients are granted a limited license to use deliverables for their business
                purposes.
              </p>

              <h3 className="font-semibold">6. Confidentiality</h3>
              <p>
                Both parties agree to keep confidential information (such as business data, source
                code, strategies) secure and not disclose it to third parties without consent.
              </p>

              <h3 className="font-semibold">7. Limitation of Liability</h3>
              <p>
                Virach IT & Software Solutions will not be liable for indirect, incidental, or
                consequential damages. Our total liability for any claim shall not exceed the fees
                paid for the service giving rise to the claim.
              </p>

              <h3 className="font-semibold">8. Termination</h3>
              <p>
                We may suspend or terminate your access to Services if you breach these Terms, fail
                to make payments, or misuse our Services. Clients may terminate the service
                agreement by giving written notice as per the contract terms.
              </p>

              <h3 className="font-semibold">9. Governing Law</h3>
              <p>
                These Terms are governed by the laws of India, and any disputes shall be subject to
                the jurisdiction of the courts in Andhra Pradesh.
              </p>

              <h3 className="font-semibold">10. Changes to Terms</h3>
              <p>
                We reserve the right to update or modify these Terms at any time. Updated Terms will
                be posted on our website with a revised effective date.
              </p>

              <h3 className="font-semibold">11. Contact Us</h3>
              <p>
                📧 Email:{" "}
                <a href="mailto:support@virach.in" className="text-primary">
                  support@virach.in
                </a>
              </p>
            </div>

            {/* OK Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowTerms(false)}
                className="px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/80 transition"
              >
                OK
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* -------------------- PRIVACY MODAL -------------------- */}
      {showPrivacy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 mt-20">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6 rounded-2xl relative"
          >
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-primary"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p className="text-sm text-gray-500 mb-4">Effective Date: 28/02/2025</p>

            <div className="space-y-4 text-sm leading-relaxed text-gray-700">
              <p>
                At <strong>Virach IT & Software Solutions Pvt. Ltd.</strong> (“Company,” “we,”
                “our,” or “us”), we respect your privacy and are committed to protecting the
                personal information you share with us. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our websites,
                applications, and services (collectively, the “Services”).
              </p>

              <h3 className="font-semibold">1. Information We Collect</h3>
              <ul className="list-disc list-inside">
                <li>
                  <strong>Personal Information:</strong> Name, email address, phone number, company
                  name, billing details, and any information you provide when contacting us or using
                  our Services.
                </li>
                <li>
                  <strong>Technical Information:</strong> IP address, browser type, device
                  information, operating system, and usage data when you interact with our Services.
                </li>
                <li>
                  <strong>Project/Service Data:</strong> Files, code, or business data shared with
                  us while providing IT or software solutions.
                </li>
              </ul>

              <h3 className="font-semibold">2. How We Use Your Information</h3>
              <ul className="list-disc list-inside">
                <li>Provide, maintain, and improve our Services.</li>
                <li>Communicate with you regarding projects, updates, and support.</li>
                <li>Process payments and manage billing.</li>
                <li>Ensure security and prevent misuse of our systems.</li>
                <li>Comply with legal and regulatory requirements.</li>
              </ul>

              <h3 className="font-semibold">3. Sharing of Information</h3>
              <ul className="list-disc list-inside">
                <li>
                  With trusted third-party service providers (e.g., cloud hosting, payment gateways)
                  strictly for business purposes.
                </li>
                <li>When required by law, regulation, or legal process.</li>
                <li>
                  To protect the rights, property, or safety of our Company, clients, or the public.
                </li>
              </ul>

              <h3 className="font-semibold">4. Data Security</h3>
              <p>
                We use reasonable technical and organizational measures to safeguard your
                information against unauthorized access, alteration, or disclosure. However, no
                method of transmission over the internet is 100% secure.
              </p>

              <h3 className="font-semibold">5. Data Retention</h3>
              <p>
                We retain personal and project-related data only as long as necessary for business,
                contractual, or legal purposes.
              </p>

              <h3 className="font-semibold">6. Your Rights</h3>
              <ul className="list-disc list-inside">
                <li>Access, update, or correct your personal information.</li>
                <li>
                  Request deletion of your personal data (subject to legal and contractual
                  obligations).
                </li>
                <li>Opt-out of marketing communications.</li>
              </ul>

              <h3 className="font-semibold">7. Cookies & Tracking</h3>
              <p>
                Our website may use cookies and similar technologies to improve user experience and
                analyse site performance. You may manage cookie preferences through your browser
                settings.
              </p>

              <h3 className="font-semibold">8. Third-Party Links</h3>
              <p>
                Our Services may contain links to third-party websites. We are not responsible for
                their privacy practices and encourage you to review their policies.
              </p>

              <h3 className="font-semibold">9. Governing Law</h3>
              <p>
                This Privacy Policy is governed by the laws of India, and any disputes shall be
                subject to the jurisdiction of the courts in Andhra Pradesh.
              </p>

              <h3 className="font-semibold">10. Changes to Privacy Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. Any updates will be posted on
                our website with a revised effective date.
              </p>

              <h3 className="font-semibold">11. Contact Us</h3>
              <p>
                📧 Email:{" "}
                <a href="mailto:support@virach.in" className="text-primary">
                  support@virach.in
                </a>
              </p>
            </div>

            {/* OK Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowPrivacy(false)}
                className="px-6 py-2 rounded-xl bg-primary text-white hover:bg-primary/80 transition"
              >
                OK
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
