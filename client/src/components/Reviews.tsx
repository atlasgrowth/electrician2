import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { Star } from "lucide-react";

export function Reviews() {
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const mockReviews = [
    {
      name: "John D.",
      text: "Outstanding service! The team was professional, punctual, and did an excellent job with our electrical installation.",
      rating: 5
    },
    {
      name: "Sarah M.",
      text: "Very impressed with their work ethic and attention to detail. Would definitely recommend to anyone needing electrical work.",
      rating: 5
    },
    {
      name: "Michael R.",
      text: "Fast response time and great communication throughout the entire process. Quality work at a fair price.",
      rating: 5
    }
  ];

  return (
    <section 
      className="py-20 relative"
      style={{
        backgroundImage: 'url(https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/65147cb9c9753e3d02a73bf9.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/75" />
      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our electrical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {mockReviews.map((review, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-100 mb-4">"{review.text}"</p>
              <p className="text-gray-300 font-semibold">{review.name}</p>
            </div>
          ))}
        </div>

        {business?.five_star_reviews?.[0]?.text && business.reviews_link && (
          <div className="text-center">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => window.open(business.reviews_link, '_blank')}
            >
              Read More Reviews on Google
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
