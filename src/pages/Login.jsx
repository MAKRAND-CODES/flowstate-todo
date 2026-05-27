/*import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

export default function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    console.log({
      email,
      password,
    });

    navigate("/dashboard");
  };

  return (

    <AuthLayout
      title="Login"
      subtitle="Enter your productivity universe"
    >

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }

          className="
            w-full
            bg-black/30
            border border-white/10
            rounded-2xl
            px-5 py-4
            text-white
            outline-none
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }

          className="
            w-full
            bg-black/30
            border border-white/10
            rounded-2xl
            px-5 py-4
            text-white
            outline-none
          "
        />

        <button
          type="submit"

          className="
            w-full
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-500
            text-white
            font-semibold
            hover:scale-[1.02]
            transition
          "
        >

          Enter FlowState

        </button>

      </form>

      <p className="text-gray-400 text-center mt-6">

        Don't have an account?

        <Link
          to="/signup"
          className="text-cyan-400 ml-2"
        >
          Signup
        </Link>

      </p>

    </AuthLayout>
  );
}*/
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import AuthScene from "../components/AuthScene";
import WalkingBot from "../components/WalkingBot";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/login",
        formData
      );

      login(
        res.data.user,
        res.data.token
      );

      navigate("/");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-black
      relative
      overflow-hidden
      px-4
    ">

      {/* BACKGROUND */}
      <AuthScene />

      {/* WALKING BOT */}
      <div className="
        hidden lg:flex
        absolute
        left-[12%]
        bottom-[8%]
        z-20
      ">
        <WalkingBot />
      </div>

      {/* LOGIN CARD */}
      <motion.form

        onSubmit={handleSubmit}

        initial={{
          opacity: 0,
          y: 40,
          scale: 0.96,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        transition={{
          duration: 1,
          ease: "easeOut",
        }}

        className="
          relative
          z-30

          w-full
          max-w-[430px]

          bg-white/5
          border
          border-white/10

          backdrop-blur-3xl

          rounded-[32px]

          p-8
          md:p-10

          shadow-[0_0_80px_rgba(0,255,255,0.08)]
        "
      >

        {/* TITLE */}
        <div className="text-center mb-8">

          <h1 className="
            text-5xl
            md:text-6xl
            font-black
            text-white
          ">
            FlowState
          </h1>

          <p className="
            text-gray-400
            mt-3
          ">
            Login to continue
          </p>

        </div>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"

          value={formData.email}

          onChange={handleChange}

          className="
            w-full

            bg-black/30

            border
            border-white/10

            rounded-2xl

            px-5
            py-4

            text-white

            mb-4

            outline-none

            focus:border-cyan-400

            transition
          "
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"

          value={formData.password}

          onChange={handleChange}

          className="
            w-full

            bg-black/30

            border
            border-white/10

            rounded-2xl

            px-5
            py-4

            text-white

            mb-6

            outline-none

            focus:border-cyan-400

            transition
          "
        />

        {/* BUTTON */}
        <motion.button

          whileHover={{
            scale: 1.02,
          }}

          whileTap={{
            scale: 0.98,
          }}

          disabled={loading}

          className="
            w-full

            py-4

            rounded-2xl

            bg-gradient-to-r
            from-blue-500
            via-cyan-500
            to-purple-500

            text-white
            font-semibold

            shadow-lg
            shadow-cyan-500/20
          "
        >

          {
            loading
              ? "Entering..."
              : "Login"
          }

        </motion.button>

        {/* SIGNUP */}
        <p className="
          text-center
          text-gray-400
          mt-6
          text-sm
        ">

          New here?

          <Link
            to="/signup"
            className="
              text-cyan-400
              ml-2
              hover:text-cyan-300
              transition
            "
          >

            Create Account

          </Link>

        </p>

      </motion.form>

    </div>
  );
}