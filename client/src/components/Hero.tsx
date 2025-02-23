import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { getBusinessData } from "@/lib/utils";
import { ArrowRight, Phone } from "lucide-react";
import { useEffect, useState } from "react";

// Function to get full URL with base path
const getAssetUrl = (path: string) => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/electrician2/${cleanPath}`;
};

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=2000",
      title: "Residential Electrical Services",
      subtitle: `${business?.basic_info.name || 'Professional'} residential electrical solutions for your home`,
      link: "/residential"
    },
    {
      image: "https://images.unsplash.com/photo-1590959651373-a3db0f38c961?auto=format&fit=crop&q=80&w=2000",
      title: "Commercial Electrical Services",
      subtitle: `Powering businesses with ${business?.basic_info.name || 'expert'} commercial solutions`,
      link: "/commercial"
    },
    {
      image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&q=80&w=2000",
      title: "Industrial Electrical Services",
      subtitle: `Industrial-grade electrical solutions by ${business?.basic_info.name || 'professionals'}`,
      link: "/industrial"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Get current URL search params to maintain them across navigation
  const searchParams = window.location.search;

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {slides[currentSlide].subtitle}
              {business?.basic_info.city && ` in ${business.basic_info.city}`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                <Link href={getAssetUrl(slides[currentSlide].link + searchParams)}>
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                className="bg-black/30 backdrop-blur-sm text-white border-white hover:bg-white hover:text-black transition-colors"
                onClick={() => window.location.href = `tel:${business?.basic_info.phone}`}
              >
                <Phone className="mr-2 h-5 w-5" />
                {business?.basic_info.phone || 'Contact Us'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}