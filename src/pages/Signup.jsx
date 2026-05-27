/*import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

export default function Signup() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = (e) => {

    e.preventDefault();

    console.log({
      name,
      email,
      password,
    });

    navigate("/dashboard");
  };

  return (

    <AuthLayout
      title="Signup"
      subtitle="Create your futuristic workspace"
    >

      <form
        onSubmit={handleSignup}
        className="space-y-5"
      >

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
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
            from-purple-500
            to-cyan-500
            text-white
            font-semibold
            hover:scale-[1.02]
            transition
          "
        >

          Create FlowState

        </button>

      </form>

      <p className="text-gray-400 text-center mt-6">

        Already have an account?

        <Link
          to="/login"
          className="text-cyan-400 ml-2"
        >
          Login
        </Link>

      </p>

    </AuthLayout>
  );
}*/
import { useState } from "react";
import API from "../services/api";

import {
  useNavigate,
} from "react-router-dom";

export default function Signup() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup =
    async () => {

      try {

        await API.post(
          "/auth/signup",
          {
            name,
            email,
            password,
          }
        );

        alert(
          "Account Created"
        );

        navigate("/");

      } catch (err) {

        alert(
          "Signup Failed"
        );

      }
    };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">

        <h1 className="text-4xl font-bold text-white text-center mb-8">

          Create Account

        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full mb-4 p-4 rounded-2xl bg-black/30 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full mb-4 p-4 rounded-2xl bg-black/30 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full mb-6 p-4 rounded-2xl bg-black/30 text-white"
        />

        <button
          onClick={handleSignup}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold"
        >

          Signup

        </button>

      </div>

    </div>
  );
}