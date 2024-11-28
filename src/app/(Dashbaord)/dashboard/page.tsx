"use client";

import { StatsCards } from "@/components/Dashbaord/States";
import { ContactsTable } from "@/components/EmailComponets/ContactsTable";
import EmailCampaignChart from "@/components/EmailComponets/EmailCampaignChart";
import EmailStatChart from "@/components/EmailComponets/EmailStartChart";

import EngagementRateChart from "@/components/EmailComponets/EngagementRateChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardStore } from "@/Store/DashboardStore";
import { useEffect } from "react";

const Dashboard = () => {
  const { fetchDashboardData } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);
  return (
    <div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <StatsCards />

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <EmailStatChart />
          <EngagementRateChart />
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactsTable />
            </CardContent>
          </Card>
          <div>
            <EmailCampaignChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
