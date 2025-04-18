import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserBadges, EcoBadgeType } from "@/services/userBadges";
import EcoBadge from "@/components/EcoBadge";

const UserProfile: React.FC = () => {
  const [darkMode, handleDarkModeToggle] = useDarkMode();
  const { user, logout } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const [badges, setBadges] = useState<EcoBadgeType[]>([]);
  const [loadingBadges, setLoadingBadges] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    // Fetch user badges
    setLoadingBadges(true);
    getUserBadges(user.uid)
      .then(res => setBadges(res.badges))
      .finally(() => setLoadingBadges(false));
  }, [user, navigate]);

  const handleDownload = async () => {
    setDownloading(true);
    // Simulate download (replace with real data export)
    const data = {
      email: user?.email,
      uid: user?.uid,
      // Add more user data here
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ecocart-profile-${user?.uid}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloading(false);
  };

  const handleDelete = async () => {
    setDeleting(true);
    // TODO: Add backend deletion logic
    alert("Your data deletion request has been received. (Implement backend logic for real deletion.)");
    setDeleting(false);
    logout();
  };

  if (!user) return <div className="p-8">Please log in to view your profile.</div>;

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>User Profile</CardTitle>
            <Button
  variant="outline"
  size="icon"
  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
  title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
  onClick={handleDarkModeToggle}
>
  {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-800" />}
</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4"><b>Email:</b> {user.email}</div>
          <div className="mb-4"><b>UID:</b> {user.uid}</div>

          <div className="mb-4">
            <b>Eco-Badges:</b>
            {loadingBadges ? (
              <div className="text-gray-500 mt-2">Loading badges...</div>
            ) : badges.length === 0 ? (
              <div className="text-gray-500 mt-2">No eco-badges earned yet. Start shopping eco-friendly to earn badges!</div>
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {badges.map(badge => (
                  <EcoBadge key={badge} type={badge} />
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-4">
          <Button onClick={handleDownload} disabled={downloading}>
            {downloading ? "Downloading..." : "Download My Data"}
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete My Account"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
