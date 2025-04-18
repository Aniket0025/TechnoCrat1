import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";

interface Post {
  user: string;
  content: string;
}

const DUMMY_POSTS: Post[] = [
  { user: "Charlie", content: "What are the best eco-friendly detergents?" },
  { user: "Dana", content: "Tip: Use bamboo toothbrushes instead of plastic!" }
];

const CommunityForum: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(DUMMY_POSTS);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please login to post.");
    setSubmitting(true);
    setTimeout(() => {
      setPosts(prev => [...prev, { user: user.email || "Anonymous", content }]);
      setContent("");
      setSubmitting(false);
    }, 500);
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Community Forum</CardTitle>
          <CardDescription>Ask questions, share tips, and connect with other eco-shoppers!</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="mb-6">
            {posts.map((p, i) => (
              <li key={i} className="mb-2 border-b pb-2">
                <b>{p.user}</b><br />
                <span>{p.content}</span>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Share a tip or ask a question..."
              required
            />
            <Button type="submit" disabled={submitting}>{submitting ? "Posting..." : "Post"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityForum;
