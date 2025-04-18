import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { db } from "@/services/firestore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import EcoBadge from "@/components/EcoBadge";

interface LeaderboardUser {
  uid: string;
  email: string;
  ecoScore: number;
  badges: string[];
}

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      // Assume ecoScore is stored in each user profile in Firestore
      const q = query(collection(db, "users"), orderBy("ecoScore", "desc"));
      const snap = await getDocs(q);
      const users: LeaderboardUser[] = [];
      snap.forEach(doc => {
        const data = doc.data();
        users.push({
          uid: doc.id,
          email: data.email || "(no email)",
          ecoScore: data.ecoScore || 0,
          badges: data.badges || [],
        });
      });
      setUsers(users);
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>🌍 Worldwide Eco Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-gray-500">Loading leaderboard...</div>
          ) : users.length === 0 ? (
            <div className="text-gray-500">No users found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-2">Rank</th>
                  <th className="py-2 px-2">User</th>
                  <th className="py-2 px-2">Eco Score</th>
                  <th className="py-2 px-2">Badges</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user.uid} className="border-b hover:bg-green-50">
                    <td className="py-2 px-2 font-bold">{i + 1}</td>
                    <td className="py-2 px-2">{user.email}</td>
                    <td className="py-2 px-2">{user.ecoScore}</td>
                    <td className="py-2 px-2">
                      <div className="flex flex-wrap gap-1">
                        {user.badges.length ? user.badges.map(badge => (
                          <EcoBadge key={badge} type={badge} />
                        )) : <span className="text-xs text-gray-400">No badges</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
