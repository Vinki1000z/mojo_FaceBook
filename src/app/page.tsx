'use client';
import { useState, useEffect } from 'react';
import FacebookLogin from '@/components/FacebookLogin';
import PageSelector from '@/components/PageSelector';
import InsightCard from '@/components/InsightCard';
import DateRangePicker from '@/components/DateRangePicker';
import type { FacebookUser, FacebookPage, InsightData, DateRange } from '@/types/facebook';

export default function Home() {
  const [user, setUser] = useState<FacebookUser | null>(null);
  const [pages, setPages] = useState<FacebookPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<FacebookPage | null>(null);
  const [insights, setInsights] = useState<InsightData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    since: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    until: new Date()
  });

  const handleLogin = async (userData: FacebookUser) => {
    console.log(userData);
    setUser(userData);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/me/accounts?access_token=${userData.accessToken}`
      );

      if (!response.ok) {
        const errorText = await response.text(); // Read error details
        throw new Error(`Failed to fetch pages: ${errorText}`);
      }

      const data = await response.json();
      console.log(data);
      setPages(data.data);
      console.log(pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pages');
    } finally {
      setLoading(false);
    }
  };

  const fetchInsights = async () => {
    if (!selectedPage) return;
  
    try {
      setLoading(true);
      setError(null);
  
      const metrics = [
        "page_fans",
        // "page_engaged_users",
        "page_impressions",
        "page_total_actions" // Changed from page_reactions_total
      ];
  
      // Convert date to UNIX timestamp
      const since = Math.floor(new Date(dateRange.since).getTime() / 1000);
      const until = Math.floor(new Date(dateRange.until).getTime() / 1000);
  
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${selectedPage.id}/insights?` +
        `metric=${metrics.join(",")}&period=day` + // Use 'day' or 'lifetime' instead
        `&since=${since}&until=${until}&access_token=${selectedPage.access_token}`
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Facebook API Error:", errorData);
        throw new Error(errorData.error.message || "Failed to fetch insights");
      }
  
      const data = await response.json();
      console.log(data);
      setInsights(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch insights");
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    if (selectedPage?.id && selectedPage?.access_token) {
      fetchInsights();
    }
  }, [selectedPage, selectedPage?.access_token, dateRange]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold text-gray-800">Facebook Insights Dashboard</h1>

          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.picture?.data?.url}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">{user.name}</span>
            </div>
          ) : (
            <FacebookLogin onLogin={handleLogin} />
          )}
        </div>

        {/* Main Content */}
        {user && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="bg-white p-4 rounded-lg shadow space-y-4">
              <PageSelector
                pages={pages}
                selectedPage={selectedPage}
                onSelect={setSelectedPage}
              />

              <DateRangePicker
                since={dateRange.since}
                until={dateRange.until}
                onChange={setDateRange}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              </div>
            )}

            {/* Insights Grid */}
            {insights && !loading && (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
   <InsightCard title="Total Followers" value={insights[0]?.values[0]?.value || 0} icon="Users" />
   <InsightCard title="Total Engagement" value={insights[1]?.values[0]?.value || 0} icon="Activity" />
   <InsightCard title="Total Impressions" value={insights[2]?.values[0]?.value || 0} icon="Eye" />
   <InsightCard title="Total Reactions" value={insights[3]?.values[0]?.value || 0} icon="Heart" />
 </div>
 
            )}
          </div>
        )}
      </div>
    </main>
  );
}
