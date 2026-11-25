import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none"
        >
          {/* Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-3xl max-h-[85vh] rounded-[28px] sm:rounded-[36px] bg-[#0c0d10]/95 border border-white/20 p-5 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-10"
          >
            {/* Top Bar with Title and Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-[0.2em] text-[#D4962A] uppercase font-mono">
                  PRIVACY POLICY & TERMS
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-lg"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Plain-Language Legal Content */}
            <div
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain pr-4 space-y-7 text-sm text-white/75 leading-relaxed font-normal select-text custom-modal-scrollbar"
              tabIndex={0}
            >
              
              {/* 1. Business Identity & Contact Info */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#D4962A]">1.</span> Business Identity & Contact Information
                </h3>
                <p>
                  This Privacy Policy applies to all services and communications provided by <strong className="text-white">GROWMENT Advertising Studio</strong> (“GROWMENT”, “we”, “our”, or “us”), operating in Kerala, India and servicing clients globally.
                </p>
                <div className="mt-2.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white/80 space-y-1">
                  <p>• <strong>Studio Inquiries:</strong> growmentads@gmail.com</p>
                  <p>• <strong>Direct Phone & WhatsApp:</strong> +91 790 743 0743</p>
                  <p>• <strong>Instagram:</strong> @growment_ads</p>
                </div>
              </div>

              {/* 2. Data Collected */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#D4962A]">2.</span> Data We Collect (Direct & Automatic)
                </h3>
                <p className="mb-2">
                  We believe in minimal data footprint. We collect only what is essential to provide creative direction:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-white/80">
                  <li><strong>Directly Provided Data:</strong> Name, business or brand name, service requirements, project budget, and creative brief details submitted via our inquiry form, WhatsApp messaging, or email.</li>
                  <li><strong>Automatically Collected Data:</strong> Essential anonymous server logs and technical telemetry (browser type, device viewport dimensions, and rendering capabilities) strictly utilized to calibrate fluid 90fps animations and responsive UI layouts. We do not use third-party tracking pixels or invasive advertising cookies.</li>
                </ul>
              </div>

              {/* 3. Purpose & Legal Basis */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#D4962A]">3.</span> Purpose of Processing & Legal Basis
                </h3>
                <p>
                  Your information is processed strictly to:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-white/80 mt-1.5">
                  <li>Formulate detailed project proposals, creative roadmaps, and commercial quotes.</li>
                  <li>Execute client contracts for video production, poster design, and brand identity development.</li>
                  <li>Maintain professional client communication throughout active campaign milestones.</li>
                </ul>
                <p className="mt-2 text-xs text-white/60">
                  Legal Basis: Performance of a contract, preparation for entering into a contract upon your request, and legitimate interests in operating a high-craft creative studio.
                </p>
              </div>

              {/* 4. Third Parties & Data Transfers */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#D4962A]">4.</span> Third Parties & Data Transfers
                </h3>
                <p>
                  We never sell, rent, monetize, or trade your personal or brand data with third-party marketers or data aggregators. Data transfers occur strictly with verified service providers necessary to fulfill business operations (e.g., secure hosting infrastructure and Meta/WhatsApp for direct messaging upon user dispatch).
                </p>
              </div>

              {/* 5. Retention & Security */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#D4962A]">5.</span> Data Retention & Studio Security
                </h3>
                <p>
                  All project briefs, client footage, and confidential strategy decks are stored within encrypted cloud environments with restricted senior leadership access. Strict Non-Disclosure Agreements (NDAs) are enforced across our entire creative roster. Information is retained only as long as necessary to support ongoing brand engagements and fulfill legal and tax compliance obligations.
                </p>
              </div>

              {/* 6. User Rights & Choices */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#D4962A]">6.</span> Your Rights & Choices
                </h3>
                <p>
                  Under international privacy frameworks (including GDPR and DPDP principles), you maintain full control over your data. You may at any time request:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-white/80 mt-1.5">
                  <li>Access to the personal details and creative briefs we hold on file.</li>
                  <li>Correction or updating of inaccurate records.</li>
                  <li>Complete erasure (“Right to be Forgotten”) of your contact details and inquiry records from our studio database.</li>
                </ul>
                <p className="mt-2 text-xs text-white/60">
                  To exercise any of these rights, email us directly at <span className="text-[#D4962A]">growmentads@gmail.com</span>. Requests are acknowledged within 48 hours.
                </p>
              </div>

              {/* 7. Policy Updates & Generator Framework */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#D4962A]">7.</span> Policy Updates & Governance
                </h3>
                <p>
                  This policy is formulated following plain-language transparency frameworks established by leading Privacy Policy Generator guidelines and international compliance principles. Any revisions will be reflected immediately on this page with an updated timestamp.
                </p>
                <p className="mt-2 text-xs text-white/50">
                  <strong>Last Updated:</strong> November 2026 • Version 2.4
                </p>
              </div>

            </div>

            {/* Modal Bottom Footer */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center shrink-0 text-xs text-white/40">
              <span>GROWMENT Legal Compliance</span>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all shadow-md"
              >
                Close & Return
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
