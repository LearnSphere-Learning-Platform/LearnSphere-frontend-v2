import React from "react";
import { DashboardLayout } from "../components/admin/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  CreditCard,
  TrendingUp,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";

const revenueData = [
  { course: "React Fundamentals", revenue: 10000, enrollments: 75 },
  { course: "Advanced Node.js", revenue: 12000, enrollments: 100 },
  { course: "UI/UX Design Masterclass", revenue: 10000, enrollments: 90 },
  { course: "Machine Learning Basics", revenue: 15000, enrollments: 110 },
  { course: "Data Science with Python", revenue: 18000, enrollments: 130 },
  { course: "Cloud Computing Essentials", revenue: 13000, enrollments: 80 },
];

const recentTransactions = [
  {
    id: "TXN001",
    instructor: "John Carter",
    course: "React Fundamentals",
    amount: 199,
    status: "completed",
    date: "2024-12-15",
    method: "Credit Card",
  },
  {
    id: "TXN002",
    instructor: "Lisa Wang",
    course: "Data Science with Python",
    amount: 149,
    status: "completed",
    date: "2024-12-15",
    method: "PayPal",
  },
  {
    id: "TXN003",
    instructor: "Alex Kim",
    course: "UI/UX Design Masterclass",
    amount: 129,
    status: "pending",
    date: "2024-12-14",
    method: "Credit Card",
  },
  {
    id: "TXN004",
    instructor: "John Carter",
    course: "Machine Learning Basics",
    amount: 179,
    status: "completed",
    date: "2024-12-14",
    method: "Bank Transfer",
  },
];

const Payments = () => {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalEnrollments = revenueData.reduce((sum, item) => sum + item.enrollments, 0);
  const avgRevenuePer = totalRevenue / totalEnrollments;
  const instructorRevenue = totalRevenue * 0.3;

  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payment Analysis Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Total Revenue: $${totalRevenue.toLocaleString()}`, 20, 35);
    doc.text(`Paid Enrollments: ${totalEnrollments}`, 20, 45);
    doc.text(`Instructor Revenue: $${instructorRevenue.toLocaleString()}`, 20, 55);

    doc.setFontSize(14);
    doc.text("Course Breakdown:", 20, 70);

    let y = 80;
    revenueData.forEach((course) => {
      doc.setFontSize(12);
      doc.text(`- ${course.course}: $${course.revenue.toLocaleString()} | Enrollments: ${course.enrollments}`, 20, y);
      y += 10;
    });

    doc.save("payment-analysis.pdf");
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-[#333A2F] flex items-center gap-3">
              <CreditCard className="w-8 h-8 text-[#333A2F]" /> Payments & Revenue
            </h1>
            <p className="text-gray-600">
              Track earnings, transactions, and financial performance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
            <CardContent className="p-8">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-[#333A2F]">${totalRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
            <CardContent className="p-8">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-[#333A2F]">$24,800</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
            <CardContent className="p-8">
              <p className="text-sm font-medium text-gray-600">Paid Enrollments</p>
              <p className="text-2xl font-bold text-[#333A2F]">{totalEnrollments}</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
            <CardContent className="p-8">
              <p className="text-sm font-medium text-gray-600">Avg per Student</p>
              <p className="text-2xl font-bold text-[#333A2F]">${Math.round(avgRevenuePer)}</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
            <CardContent className="p-8">
              <p className="text-sm font-medium text-gray-600">Instructor Revenue</p>
              <p className="text-2xl font-bold text-[#333A2F]">${instructorRevenue.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#333A2F]">
              <TrendingUp className="w-5 h-5 text-[#333A2F]" /> Revenue Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-[#333A2F]">{data.course}</span>
                    <span className="text-gray-600">${data.revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-3 bg-[#EBEDDF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#333A2F] transition-all duration-500"
                      style={{
                        width: `${(data.revenue / Math.max(...revenueData.map(d => d.revenue))) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    {data.enrollments} enrollments
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="completed" className="space-y-4">
          <TabsList className="flex gap-4">
            <TabsTrigger value="completed">Completed Transactions to Instructors</TabsTrigger>
            <TabsTrigger value="pending">Pending Transactions to Instructors</TabsTrigger>
          </TabsList>

          <TabsContent value="completed">
            <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
              <CardContent className="p-0">
                {recentTransactions
                  .filter((t) => t.status === "completed")
                  .map((transaction, index, arr) => (
                    <div
                      key={transaction.id}
                      className={`p-8 ${index !== arr.length - 1 ? "border-b border-[#EBEDDF]" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-[#333A2F]">{transaction.instructor}</h3>
                            <Badge variant="default" className="bg-[#C8CBB8] text-[#333A2F]">{transaction.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{transaction.course}</p>
                          <p className="text-xs text-gray-400">
                            ID: {transaction.id} | {transaction.method} |{" "}
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#333A2F]">${transaction.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card className="bg-white rounded-xl shadow-xl border border-gray-200">
              <CardContent className="p-0">
                {recentTransactions
                  .filter((t) => t.status === "pending")
                  .map((transaction, index, arr) => (
                    <div
                      key={transaction.id}
                      className={`p-8 ${index !== arr.length - 1 ? "border-b border-[#EBEDDF]" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-[#333A2F]">{transaction.instructor}</h3>
                            <Badge variant="secondary" className="bg-[#EBEDDF] text-[#333A2F]">{transaction.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{transaction.course}</p>
                          <p className="text-xs text-gray-400">
                            ID: {transaction.id} | {transaction.method} |{" "}
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#333A2F]">${transaction.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Payments;
