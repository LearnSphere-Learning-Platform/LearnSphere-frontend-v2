import { Card, CardContent } from "../ui/card";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

export function StatsCard({ title, value, change, changeType, icon: Icon }) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-400";
    }
  };

  const getChangeIcon = () => {
    if (changeType === "positive") return <TrendingUp className="inline w-4 h-4 text-green-600" />;
    if (changeType === "negative") return <TrendingDown className="inline w-4 h-4 text-red-600" />;
    return <ArrowRight className="inline w-4 h-4 text-gray-400" />;
  };

  return (
    <Card className="bg-white rounded-xl shadow-xl border border-gray-200 transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-3xl font-bold text-[#333A2F]">{value}</p>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${getChangeColor()}`}>{getChangeIcon()} {change}</span>
              <span className="text-xs text-gray-400">vs last month</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-[#EBEDDF] rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-[#333A2F]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
