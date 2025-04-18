import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

const DUMMY_REVIEWS: Review[] = [
  { user: "Alice", rating: 5, comment: "Super eco-friendly and high quality!" },
  { user: "Bob", rating: 4, comment: "Loved the sustainable packaging." }
];

const ProductReviews: React.FC = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(DUMMY_REVIEWS);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please login to leave a review.");
    setSubmitting(true);
    setTimeout(() => {
      setReviews(prev => [...prev, { user: user.email || "Anonymous", rating, comment }]);
      setComment("");
      setRating(5);
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Product Reviews</CardTitle>
          <CardDescription>Share your experience and help others make eco-friendly choices!</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="mb-6">
            {reviews.map((r, i) => (
              <li key={i} className="mb-2 border-b pb-2">
                <b>{r.user}</b> - {"★".repeat(r.rating)}<br />
                <span>{r.comment}</span>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label>
              Rating:
              <select value={rating} onChange={e => setRating(Number(e.target.value))} className="ml-2">
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
            <Textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write your review..."
              required
            />
            <Button type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Review"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductReviews;
