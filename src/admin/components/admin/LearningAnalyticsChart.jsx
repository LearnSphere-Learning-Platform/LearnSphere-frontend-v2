import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Dummy data so charts render (replace with your actual data or props)
const weeklyProgressData = [
  { week: "Week 1", completions: 20, enrollments: 50, activeUsers: 30 },
  { week: "Week 2", completions: 30, enrollments: 40, activeUsers: 35 },
  { week: "Week 3", completions: 45, enrollments: 60, activeUsers: 40 },
  { week: "Week 4", completions: 60, enrollments: 70, activeUsers: 50 },
  { week: "Week 5", completions: 80, enrollments: 90, activeUsers: 70 },
  { week: "Week 6", completions: 95, enrollments: 100, activeUsers: 85 }
];

const coursePerformanceData = [
  { name: "React Basics", completion: 85, students: 120 },
  { name: "JavaScript Advanced", completion: 78, students: 95 },
  { name: "UI/UX Design", completion: 67, students: 80 },
  { name: "Data Science", completion: 72, students: 60 },
  { name: "Mobile Dev", completion: 88, students: 50 }
];

const learningMethodsData = [
  { name: "Video Lessons", value: 45, color: "#333A2F" },
  { name: "Interactive Quizzes", value: 25, color: "#C8CBB8" },
  { name: "Practice Projects", value: 20, color: "#EBEDDF" },
  { name: "Discussion Forums", value: 10, color: "#B0B3A1" }
];

export const LearningAnalyticsChart = () => {
  return (
    <Card className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-[#333A2F] text-2xl font-bold">
          <TrendingUp className="w-6 h-6 text-[#333A2F]" />
          Learning Analytics Dashboard
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Weekly Progress */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#333A2F]">Weekly Learning Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EBEDDF" />
                <XAxis 
                  dataKey="week" 
                  stroke="#B0B3A1"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#B0B3A1"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #EBEDDF",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completions" 
                  stroke="#333A2F" 
                  strokeWidth={2}
                  name="Course Completions"
                />
                <Line 
                  type="monotone" 
                  dataKey="enrollments" 
                  stroke="#C8CBB8" 
                  strokeWidth={2}
                  name="New Enrollments"
                />
                <Line 
                  type="monotone" 
                  dataKey="activeUsers" 
                  stroke="#B0B3A1" 
                  strokeWidth={2}
                  name="Active Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Performance */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#333A2F]">Course Completion Rates</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={coursePerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EBEDDF" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#B0B3A1"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    stroke="#B0B3A1"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #EBEDDF",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar 
                    dataKey="completion" 
                    fill="#333A2F"
                    radius={[4, 4, 0, 0]}
                    name="Completion %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Learning Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#333A2F]">Learning Methods Usage</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={learningMethodsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {learningMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #EBEDDF",
                      borderRadius: "8px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="bg-[#EBEDDF] border-0 rounded-xl">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#333A2F]">87%</div>
                <div className="text-sm text-gray-600">Avg. Completion Rate</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#C8CBB8] border-0 rounded-xl">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#333A2F]">142</div>
                <div className="text-sm text-gray-600">Active Students</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#B0B3A1] border-0 rounded-xl">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.8</div>
                <div className="text-sm text-white/90">Avg. Course Rating</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};
