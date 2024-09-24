import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStats } from '../utils/statistics';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Activity = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['appStats'],
    queryFn: getStats,
  });

  if (isLoading) return <div className="container mx-auto p-6">Loading statistics...</div>;
  if (error) return <div className="container mx-auto p-6">Error loading statistics: {error.message}</div>;

  const chartData = stats ? [
    { name: 'Prompts Created', value: stats.promptsCreated },
    { name: 'Prompts Shared', value: stats.promptsShared },
    { name: 'Chat Messages Sent', value: stats.chatMessagesSent },
    { name: 'Prompts Used', value: stats.promptsUsed },
  ] : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Activity Statistics</h1>
      {stats ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {chartData.map((item) => (
              <Card key={item.name}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      ) : (
        <div>No statistics available</div>
      )}
    </div>
  );
};

export default Activity;
