import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

export function Testimonials() {
  const { t } = useTranslation();

  const testimonials = [
    {
      quote: t("testimonial1_quote"),
      name: t("testimonial1_name"),
      position: t("testimonial1_position"),
      image: "/testimonial1.jpg",
    },
    {
      quote: t("testimonial2_quote"),
      name: t("testimonial2_name"),
      position: t("testimonial2_position"),
      image: "/testimonial2.jpg",
    },
    {
      quote: t("testimonial3_quote"),
      name: t("testimonial3_name"),
      position: t("testimonial3_position"),
      image: "/testimonial3.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-green-500 font-mono mb-2">success_stories.js</p>
          <h2 className="text-4xl font-bold text-white">
            {t("testimonials_title")}
          </h2>
          <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
            {t("testimonials_subtitle")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="card p-0 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-gray-800 p-6 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-gray-500 text-6xl">
                  {testimonials[activeIndex].name.charAt(0)}
                </div>
              </div>

              <div className="md:w-2/3 p-8 bg-gray-900">
                <div className="mb-6">
                  <svg
                    className="w-8 h-8 text-green-500 mb-4 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 8c-2.209 0-4 1.791-4 4v10c0 2.209 1.791 4 4 4h10c2.209 0 4-1.791 4-4v-10c0-2.209-1.791-4-4-4h-10zM2 2v10c0 2.209 1.791 4 4 4h2v-4c0-2.209-1.791-4-4-4h-2zM20 2v10c0 2.209 1.791 4 4 4h2v-4c0-2.209-1.791-4-4-4h-2z" />
                  </svg>
                  <p className="text-gray-300 mb-6">
                    {testimonials[activeIndex].quote}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold">
                    {testimonials[activeIndex].name}
                  </h4>
                  <p className="text-green-400">
                    {testimonials[activeIndex].position}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-500 transition"
              aria-label={t("previous")}
            >
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
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    index === activeIndex
                      ? "bg-green-500"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-500 transition"
              aria-label={t("next")}
            >
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
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
