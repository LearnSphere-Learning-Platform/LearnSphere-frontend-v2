import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

const activities = [
  {
    id: "1",
    user: { name: "Sarah Johnson", initials: "SJ" },
    action: "completed",
    target: "JavaScript Fundamentals",
    time: "2 minutes ago",
    type: "completion"
  },
  {
    id: "2",
    user: { name: "Michael Chen", initials: "MC" },
    action: "enrolled in",
    target: "React Advanced Patterns",
    time: "15 minutes ago",
    type: "enrollment"
  },
  {
    id: "3",
    user: { name: "Dr. Emily Davis", initials: "ED" },
    action: "created course",
    target: "Machine Learning Basics",
    time: "1 hour ago",
    type: "course_created"
  },
  {
    id: "4",
    user: { name: "Alex Kumar", initials: "AK" },
    action: "submitted assignment",
    target: "Final Project - Web App",
    time: "2 hours ago",
    type: "assignment"
  },
  {
    id: "5",
    user: { name: "Lisa Rodriguez", initials: "LR" },
    action: "completed",
    target: "Python Data Analysis",
    time: "3 hours ago",
    type: "completion"
  }
];

const getActivityBadge = (type) => {
  switch (type) {
    case "completion":
      return (
        <Badge variant="secondary" className="bg-[#C8CBB8] text-[#333A2F] border-[#C8CBB8]">Completed</Badge>
      );
    case "enrollment":
      return (
        <Badge variant="secondary" className="bg-[#EBEDDF] text-[#333A2F] border-[#EBEDDF]">Enrolled</Badge>
      );
    case "course_created":
      return (
        <Badge variant="secondary" className="bg-[#B0B3A1] text-white border-[#B0B3A1]">Course</Badge>
      );
    case "assignment":
      return (
        <Badge variant="secondary" className="bg-[#333A2F] text-white border-[#333A2F]">Assignment</Badge>
      );
    default:
      return <Badge variant="secondary">Activity</Badge>;
  }
};

export function RecentActivity() {
  return (
    <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-[#333A2F]">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#EBEDDF] transition-colors"
          >
            <Avatar className="w-9 h-9">
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback className="bg-[#C8CBB8] text-[#333A2F] text-sm font-bold">
                {activity.user.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm text-[#333A2F]">{activity.user.name}</span>
                <span className="text-sm text-gray-600">{activity.action}</span>
                <span className="font-medium text-sm text-[#333A2F]">{activity.target}</span>
                {getActivityBadge(activity.type)}
              </div>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
