/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/Store/DashboardStore";
import { Mail, Percent, Send, Users } from "lucide-react";

const statCards = [
  {
    title: "Total Contacts",
    icon: Users,
    iconClass: "text-violet-500",
    borderClass: "border-violet-500",
    gradientClass: "from-violet-500/10 via-transparent",
    getValue: (stats: any) => stats.totalContacts,
    getSubtext: (stats: any) => `${stats.activeContacts} active`,
    trend: "+12.5%",
  },
  {
    title: "Total Campaigns",
    icon: Mail,
    iconClass: "text-pink-500",
    borderClass: "border-pink-500",
    gradientClass: "from-pink-500/10 via-transparent",
    getValue: (stats: any) => stats.totalCampaigns,
    getSubtext: () => "+20.1% from last month",
    trend: "+8.2%",
  },
  {
    title: "Average Open Rate",
    icon: Percent,
    iconClass: "text-emerald-500",
    borderClass: "border-emerald-500",
    gradientClass: "from-emerald-500/10 via-transparent",
    getValue: (stats: any) => `${stats.averageOpenRate.toFixed(1)}%`,
    getSubtext: () => "+4.5% from last month",
    trend: "+4.5%",
  },
  {
    title: "Emails Sent",
    icon: Send,
    iconClass: "text-blue-500",
    borderClass: "border-blue-500",
    gradientClass: "from-blue-500/10 via-transparent",
    getValue: () => "12,234",
    getSubtext: () => "+12.3% from last month",
    trend: "+12.3%",
  },
];

export function StatsCards() {
  const { stats } = useDashboardStore();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 my-8">
      {statCards.map((card, index) => (
        <Card
          key={index}
          className={cn(
            "relative overflow-hidden transition-all duration-500",
            "hover:shadow-lg hover:translate-y-[-2px]",
            "dark:bg-slate-950/5 backdrop-blur-sm dark:hover:backdrop-blur-lg",
            "rounded-2xl border-2",
            card.borderClass,
            "group"
          )}
        >
          <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-gray-800/10 dark:to-gray-900/10" />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-r opacity-0 dark:opacity-100",
              card.gradientClass,
              "animate-shimmer"
            )}
          />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-base font-semibold tracking-tight">
              {card.title}
            </CardTitle>
            <card.icon
              className={cn(
                "size-8 transition-transform duration-300",
                card.iconClass,
                "group-hover:scale-110"
              )}
            />
          </CardHeader>
          <CardContent className="relative">
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-bold tracking-tight">
                {card.getValue(stats)}
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {card.getSubtext(stats)}
                </p>
                <span
                  className={cn(
                    "text-xs font-medium",
                    card.trend.startsWith("+")
                      ? "text-emerald-500"
                      : "text-red-500"
                  )}
                >
                  {card.trend}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
