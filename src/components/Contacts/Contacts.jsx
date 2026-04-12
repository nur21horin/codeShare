import { useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // Toast config
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

  const isDark = document.documentElement.classList.contains("dark");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (!form.name || !form.email || !form.message) {
      Toast.fire({
        icon: "warning",
        title: "All fields are required",
      });
      return;
    }

    setLoading(true);

    // loading popup
    Swal.fire({
      title: "Sending message...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
      background: isDark ? "#1f2937" : "#fff",
      color: isDark ? "#fff" : "#000",
    });

    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(() => {
        Swal.close();

        Toast.fire({
          icon: "success",
          title: "Message sent successfully 🚀",
        });

        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        Swal.close();

        Toast.fire({
          icon: "error",
          title: "Failed to send message",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="w-full max-w-lg bg-base-100 shadow-xl rounded-2xl p-6">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Contact Us
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="input input-bordered w-full"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="input input-bordered w-full"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="textarea textarea-bordered w-full h-32"
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="btn btn-primary w-full transition-all duration-300 hover:scale-105"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Contact;