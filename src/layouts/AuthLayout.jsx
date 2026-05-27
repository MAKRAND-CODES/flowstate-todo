import { motion } from "framer-motion";

export default function AuthLayout({
  children,
  title,
  subtitle,
}) {

  return (

    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-6">

      {/* BACKGROUND */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[140px]" />

      </div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.05]">

        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

      </div>

      {/* CARD */}
      <motion.div

        initial={{
          opacity: 0,
          scale: 0.95,
          y: 40,
        }}

        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}

        transition={{
          duration: 1,
        }}

        className="
          relative z-10
          w-full
          max-w-md
          bg-white/5
          border border-white/10
          backdrop-blur-2xl
          rounded-[32px]
          p-8
          shadow-[0_0_80px_rgba(0,255,255,0.12)]
        "
      >

        {/* LOGO */}
        <div className="text-center mb-8">

          <h1 className="text-5xl font-black text-white tracking-tight">

            FlowState

          </h1>

          <p className="text-gray-400 mt-3">

            {subtitle}

          </p>

        </div>

        {children}

      </motion.div>

    </div>
  );
}