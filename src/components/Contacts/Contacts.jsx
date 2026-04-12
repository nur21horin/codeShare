import { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("All fields are required");
      return;
    }

    setLoading(true);
    setSuccess("");

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
        setSuccess("Message sent successfully 🚀");
        setForm({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.log(err);
        setSuccess("Failed to send message ❌");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-3">

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
          className="textarea textarea-bordered w-full"
        />

        <button
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="text-center mt-2 text-green-600">
            {success}
          </p>
        )}

      </form>
    </div>
  );
};

export default Contact;