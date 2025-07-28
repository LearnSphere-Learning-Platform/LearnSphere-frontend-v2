import React from "react";
import { DashboardLayout } from "../components/admin/DashboardLayout";
import { StatsCard } from "../components/admin/StatsCard";
import { RecentActivity } from "../components/admin/RecentActivity";
import {
  Users,
  BookOpen,
  TrendingUp,
  Search,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header with Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening at LearnSphere today.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Students"
            value="12"
            change="+12.5%"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Active Courses"
            value="20"
            change="+3.2%"
            changeType="positive"
            icon={BookOpen}
          />
          <StatsCard
            title="Total Instructors"
            value="16"
            change="+8.2%"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Revenue This Month"
            value="₹24,847"
            change="+15.3%"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <RecentActivity />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
