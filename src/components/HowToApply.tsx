"use client";
import { motion } from "framer-motion";

const HowToApply = () => {
  const steps = [
    // TODO: Replace all steps with your actual registration/application process
    {
      number: 1,
      title: "Step 1 Title",
      description: "Describe what the participant needs to do in step 1.",
      icon: "🌐",
    },
    {
      number: 2,
      title: "Step 2 Title",
      description: "Describe what the participant needs to do in step 2.",
      icon: "👤",
    },
    {
      number: 3,
      title: "Step 3 Title",
      description: "Describe what the participant needs to do in step 3.",
      icon: "📝",
    },
    {
      number: 4,
      title: "Step 4 Title",
      description: "Describe what the participant needs to do in step 4.",
      icon: "🚀",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-8 w-full relative overflow-hidden">
      <div className="relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* TODO: Replace heading if needed */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#CF2A44] to-[#1E8C7A] bg-clip-text text-transparent">
            How to Apply
          </h2>
          {/* TODO: Replace subtext */}
          <p className="text-lg text-[#5A6070] max-w-2xl mx-auto">
            Follow these simple steps to register and participate in the event.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 my-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative bg-[#161B24] border border-[#CF2A44/20] rounded-2xl p-4 text-center transition-all duration-300 hover:border-[#CF2A44]/50 hover:shadow-lg hover:shadow-[#CF2A44]/10 hover:-translate-y-2">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-[#CF2A44] to-[#1E8C7A] rounded-full flex items-center justify-center text-black font-bold text-xl shadow-lg">
                    {step.number}
                  </div>
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#1E8C7A] transition-colors">{step.title}</h3>
                <p className="text-[#DAD9D5] leading-relaxed">{step.description}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-[#CF2A44]/5 to-[#1E8C7A]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToApply;
