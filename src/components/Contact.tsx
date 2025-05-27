import { useState, useRef } from "react";
import { useTranslation } from "../hooks/useTranslation";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface RateLimitData {
  count: number;
  timestamp: number;
  lastEmailTime: number;
}

export function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "warning" | null;
    message: string;
  }>({ type: null, message: "" });

  const RATE_LIMIT_CONFIG = {
    maxEmails: 3,
    timeWindow: 60 * 60 * 1000,
    cooldownPeriod: 5 * 60 * 1000,
  };

  const getRateLimitData = (): RateLimitData => {
    const stored = localStorage.getItem("contact_rate_limit");
    if (!stored) {
      return { count: 0, timestamp: Date.now(), lastEmailTime: 0 };
    }
    return JSON.parse(stored);
  };

  const setRateLimitData = (data: RateLimitData) => {
    localStorage.setItem("contact_rate_limit", JSON.stringify(data));
  };

  const checkRateLimit = (): {
    allowed: boolean;
    message?: string;
    timeLeft?: number;
  } => {
    const now = Date.now();
    const rateLimitData = getRateLimitData();

    if (now - rateLimitData.timestamp > RATE_LIMIT_CONFIG.timeWindow) {
      setRateLimitData({ count: 0, timestamp: now, lastEmailTime: 0 });
      return { allowed: true };
    }

    if (rateLimitData.count >= RATE_LIMIT_CONFIG.maxEmails) {
      const timeLeft = Math.ceil(
        (RATE_LIMIT_CONFIG.timeWindow - (now - rateLimitData.timestamp)) /
          (1000 * 60)
      );
      return {
        allowed: false,
        message: `Rate limit exceeded. You can send ${RATE_LIMIT_CONFIG.maxEmails} emails per hour. Try again in ${timeLeft} minutes.`,
        timeLeft,
      };
    }

    if (
      rateLimitData.lastEmailTime &&
      now - rateLimitData.lastEmailTime < RATE_LIMIT_CONFIG.cooldownPeriod
    ) {
      const timeLeft = Math.ceil(
        (RATE_LIMIT_CONFIG.cooldownPeriod -
          (now - rateLimitData.lastEmailTime)) /
          (1000 * 60)
      );
      return {
        allowed: false,
        message: `Please wait ${timeLeft} minutes before sending another email.`,
        timeLeft,
      };
    }

    return { allowed: true };
  };

  const updateRateLimit = () => {
    const now = Date.now();
    const rateLimitData = getRateLimitData();

    if (now - rateLimitData.timestamp > RATE_LIMIT_CONFIG.timeWindow) {
      setRateLimitData({ count: 1, timestamp: now, lastEmailTime: now });
    } else {
      setRateLimitData({
        count: rateLimitData.count + 1,
        timestamp: rateLimitData.timestamp,
        lastEmailTime: now,
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName =
      name === "from_name" ? "name" : name === "from_email" ? "email" : name;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setSubmitStatus({
        type: "error",
        message:
          t("contact_error_required_fields") ||
          "Please fill in all required fields.",
      });
      return;
    }

    if (formData.name.trim().length < 2) {
      setSubmitStatus({
        type: "error",
        message: "Name must be at least 2 characters long.",
      });
      return;
    }

    if (formData.message.trim().length < 10) {
      setSubmitStatus({
        type: "error",
        message: "Message must be at least 10 characters long.",
      });
      return;
    }

    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setSubmitStatus({
        type: "warning",
        message: rateLimitCheck.message || "Rate limit exceeded.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await emailjs.sendForm(
        "service_x63nj8d",
        "template_2dlhx9o",
        formRef.current,
        {
          publicKey: "P7SERrBOTbuVz_6lh",
        }
      );

      console.log("Email sent successfully:", result.text);

      updateRateLimit();

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      const rateLimitData = getRateLimitData();
      const remainingEmails = RATE_LIMIT_CONFIG.maxEmails - rateLimitData.count;

      setSubmitStatus({
        type: "success",
        message: `${
          t("contact_success_message") ||
          "Thank you! Your message has been sent successfully."
        } ${
          remainingEmails > 0
            ? `You can send ${remainingEmails} more email${
                remainingEmails !== 1 ? "s" : ""
              } in the next hour.`
            : "You've reached the hourly email limit."
        }`,
      });

      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 8000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus({
        type: "error",
        message:
          t("contact_error_message") ||
          "Sorry, there was an error sending your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-green-500 font-mono mb-2">connect.js</p>
          <h2 className="text-4xl font-bold text-white">
            {t("contact_title")}
          </h2>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
            {t("contact_description")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="card p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {t("contact_get_in_touch")}
                </h3>

                {/* Status Messages */}
                {submitStatus.type && (
                  <div
                    className={`mb-6 p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : submitStatus.type === "warning"
                        ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    <div className="flex items-center">
                      {submitStatus.type === "success" ? (
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : submitStatus.type === "warning" ? (
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      {submitStatus.message}
                    </div>
                  </div>
                )}

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-300 mb-2 font-medium"
                    >
                      {t("contact_subject")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-gray-200 transition-colors duration-200"
                      placeholder={t("contact_subject_placeholder")}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-300 mb-2 font-medium"
                    >
                      {t("contact_name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="from_name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-gray-200 transition-colors duration-200"
                      placeholder={t("contact_name_placeholder")}
                      required
                      disabled={isSubmitting}
                      minLength={2}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-gray-300 mb-2 font-medium"
                    >
                      {t("contact_email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="from_email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-gray-200 transition-colors duration-200"
                      placeholder={t("contact_email_placeholder")}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-300 mb-2 font-medium"
                    >
                      {t("contact_message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-gray-200 resize-none transition-colors duration-200"
                      placeholder={t("contact_message_placeholder")}
                      required
                      disabled={isSubmitting}
                      minLength={10}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 font-medium rounded-lg transition-all transform ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 hover:-translate-y-1"
                    } text-gray-950 relative overflow-hidden`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-gray-950 border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t("contact_sending") || "Sending..."}
                      </div>
                    ) : (
                      t("contact_submit")
                    )}
                  </button>
                </form>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    {t("contact_information")}
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="text-green-500 mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400">
                          {t("contact_email_label")}
                        </p>
                        <a
                          href="mailto:haeussler.business@gmail.com"
                          className="text-white hover:text-green-400 transition"
                        >
                          haeussler.business@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="text-green-500 mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400">
                          {t("contact_location_label")}
                        </p>
                        <p className="text-white">
                          {t("contact_location_value")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="text-green-500 mr-3 mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-400">
                          {t("contact_availability_label")}
                        </p>
                        <p className="text-white">
                          {t("contact_availability_value")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t("contact_social_media")}
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/niklastech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition"
                      aria-label="GitHub"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/niklas-h-tech/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
