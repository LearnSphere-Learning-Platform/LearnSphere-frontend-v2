import { useState } from "react";
import { DashboardLayout } from "../components/admin/DashboardLayout";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Bell,
  Check,
  X,
  UserPlus,
  AlertCircle,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IndianRupee } from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "transaction",
    title: "New Payment Received",
    message: "Payment of $199 received for React Fundamentals",
    time: "2 hours ago",
    unread: true,
    icon: IndianRupee,
  },
  {
    id: 2,
    type: "transaction",
    title: "Pending Transaction",
    message: "Payment of $129 for UI/UX Design is pending",
    time: "5 hours ago",
    unread: true,
    icon: IndianRupee,
  },
  {
    id: 3,
    type: "instructor",
    title: "Instructor Join Request",
    message: "John Doe has requested to join as an instructor",
    time: "1 day ago",
    unread: true,
    icon: UserPlus,
  },
  {
    id: 4,
    type: "instructor",
    title: "Instructor Join Request",
    message: "Emily Smith wants to join the platform",
    time: "2 days ago",
    unread: false,
    icon: UserPlus,
  },
  {
    id: 5,
    type: "alert",
    title: "Flagged Content",
    message: "A report has been flagged in the Python Basics course.",
    time: "2 hours ago",
    unread: false,
    icon: AlertCircle,
  },
  {
    id: 6,
    type: "course",
    title: "New Course Created",
    message: "Advanced Node.js course was added.",
    time: "3 hours ago",
    unread: true,
    icon: BookOpen,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, unread: false }));
    setNotifications(updated);
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, unread: false } : n
    );
    setNotifications(updated);
  };

 const handleNavigate = (type) => {
  if (type === "transaction" || type === "payment") navigate("/admin/payments");
  else if (type === "alert" || type === "flagged") navigate("/admin/flagged");
  else if (type === "instructor") navigate("/admin/instructors");
  else if (type === "course") navigate("/admin/courses");
};

  const sortedNotifications = [...notifications].sort((a, b) =>
    a.unread === b.unread ? 0 : a.unread ? -1 : 1
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#333A2F] flex items-center gap-3">
              <Bell className="w-8 h-8 text-[#333A2F]" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 bg-[#C8CBB8] text-[#333A2F] border-[#C8CBB8]">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-gray-600">
              Stay updated with payment activities and instructor requests
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-[#333A2F] text-white hover:bg-[#2a3028] font-bold rounded-lg"
              onClick={handleMarkAllRead}
            >
              <Check className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold rounded-lg"
              onClick={handleClearAll}
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {sortedNotifications.map((notification) => {
            const IconComponent = notification.icon;

            return (
              <Card
                key={notification.id}
                onClick={() => handleNavigate(notification.type)}
                className={`bg-white rounded-xl shadow-xl border border-gray-200 transition-all duration-200 cursor-pointer hover:bg-[#EBEDDF] ${
                  notification.unread
                    ? "border-[#C8CBB8] bg-[#EBEDDF]"
                    : "bg-white"
                }`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        notification.unread
                          ? "bg-[#333A2F] text-white"
                          : "bg-[#EBEDDF] text-[#333A2F]"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-bold text-[#333A2F]`}
                        >
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-400">
                          {notification.time}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <Badge
                          variant={
                            notification.type === "transaction"
                              ? "default"
                              : notification.type === "instructor"
                              ? "secondary"
                              : notification.type === "alert"
                              ? "destructive"
                              : "outline"
                          }
                          className="text-xs capitalize bg-[#C8CBB8] text-[#333A2F] border-[#C8CBB8]"
                        >
                          {notification.type}
                        </Badge>

                        {notification.unread && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs bg-[#333A2F] text-white hover:bg-[#2a3028] font-bold rounded-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkRead(notification.id);
                            }}
                          >
                            Mark
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <Card className="bg-[#EBEDDF] border-0 shadow-lg rounded-xl">
            <CardContent className="p-12 text-center">
              <Bell className="w-16 h-16 text-[#333A2F] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#333A2F] mb-2">
                No notifications yet
              </h3>
              <p className="text-gray-600">
                You'll see notifications about transactions and instructor
                requests here.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
