import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, DollarSign, CheckCircle, XCircle, Clock, User, Play, Download, Receipt , IndianRupee } from 'lucide-react';
import { enrollmentApi } from '../services/api';

const CoursePaymentHistory = () => {
  // real payment records loaded from the backend
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const records = await enrollmentApi.get(`/api/payments/user/${userId}`);
        setPayments(
          (records || []).map((p) => ({
            id: p.paymentId,
            date: (p.paidAt || p.createdAt || '').split('T')[0],
            courseName: `Course ${p.courseId}`,
            instructor: '',
            amount: p.amount,
            status: p.status === 'PAID' ? 'completed' : (p.status || '').toLowerCase(),
            method: 'Razorpay',
            category: '',
            reference: p.razorpayOrderId,
            receiptId: p.razorpayPaymentId || p.razorpayOrderId,
            duration: '',
            lessons: 0,
            level: ''
          }))
        );
      } catch (e) {
        console.warn('Could not load payment history:', e.message);
      }
      setLoading(false);
    };
    load();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'failed':
        return 'text-red-700 bg-red-100 border-red-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'text-blue-700 bg-blue-100';
      case 'Intermediate':
        return 'text-purple-700 bg-purple-100';
      case 'Advanced':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Programming':
        return 'text-emerald-700 bg-emerald-100';
      case 'Design':
        return 'text-pink-700 bg-pink-100';
      case 'AI/ML':
        return 'text-indigo-700 bg-indigo-100';
      case 'Marketing':
        return 'text-orange-700 bg-orange-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const completedCourses = payments.filter(p => p.status === 'completed');
  const totalSpent = completedCourses.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-[#EBEDDF] pt-24">
      {/* Header Section */}
      <div className="w-full py-2 mt-15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-darkTone">Course Payment History</h1>
            <p className="text-darkTone/80 mt-2">Track your course purchases and manage your learning journey</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-lightTone px-4 py-2 rounded-lg border border-darkTone/10">
              <p className="text-sm text-darkTone font-medium">Total Courses</p>
              <p className="text-2xl font-bold text-darkTone">{completedCourses.length}</p>
            </div>
            <div className="bg-[#e4ffe5] px-4 py-2 rounded-lg border border-[#04af2f]/20">
              <p className="text-sm text-[#04af2f] font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-[#04af2f]">{formatAmount(totalSpent)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="">
          <div className="p-6 ">
            <h2 className="text-xl font-semibold text-darkTone">Payment Transactions</h2>
          </div>

          <div className="overflow-x-auto bg-white  shadow">
            <table className="w-full">
              <thead className="bg-lightTone  shadow border-b border-t border-lightTone">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ">
                    Course Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount & Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-lightTone transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-3">
                        {/* <div className="w-12 h-12 bg-gradient-to-br from-[#04af2f] to-darkTone rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-lightTone" />
                        </div> */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-darkTone truncate">
                            {payment.courseName}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(payment.category)}`}>
                              {payment.category}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(payment.level)}`}>
                              {payment.level}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {payment.duration}
                            </span>
                            <span className="flex items-center">
                              <Play className="w-3 h-3 mr-1" />
                              {payment.lessons} lessons
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-darkTone">{payment.instructor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm font-semibold text-darkTone">
                          <IndianRupee  className="w-4 h-4 text-[#04af2f] mr-1" />
                          {formatAmount(payment.amount)}
                        </div>
                        <div className="flex items-center text-xs text-darkTone/60">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(payment.date)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-darkTone/80">{payment.method}</span>
                      <div className="text-xs text-darkTone/40 mt-1">
                        Ref: {payment.reference}
                      </div>
                      <div className="text-xs text-[#04af2f] mt-1 font-mono">
                        Receipt: {payment.receiptId}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {getStatusIcon(payment.status)}
                        <span className={`ml-2 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(payment.status)}`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {payment.status === 'completed' && (
                          <>
                            <button className="text-[#04af2f] hover:text-darkTone text-sm font-medium cursor-pointer">
                              Access Course
                            </button>
                            <button className="text-darkTone/60 hover:text-darkTone cursor-pointer" title="Download Receipt">
                              <Receipt className="w-4 h-4" />
                            </button>
                            <button className="text-darkTone/60 hover:text-darkTone cursor-pointer" title="Download Certificate">
                              <Download className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {payment.status === 'failed' && (
                          <button className="text-red-600 hover:text-darkTone text-sm font-medium cursor-pointer">
                            Retry Payment
                          </button>
                        )}
                        {payment.status === 'pending' && (
                          <button className="text-yellow-600 hover:text-darkTone text-sm font-medium cursor-pointer">
                            Check Status
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loading && <p className="text-center py-6 text-gray-500">Loading payments...</p>}
            {!loading && payments.length === 0 && (
              <p className="text-center py-6 text-gray-500">No payments yet.</p>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-lightTone bg-lightTone">
            <div className="flex items-center justify-between">
              <div className="text-sm text-darkTone/60">
                Showing {payments.length} transactions
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-white bg-[#333A2F] border border-darkTone/10 rounded-lg hover:bg-lightTone  transition-colors cursor-pointer">
                  Previous
                </button>
                <button className="px-4 py-2 text-sm font-medium text-darkTone bg-white border border-darkTone/10 rounded-lg hover:bg-lightTone focus:outline-none focus:ring-2 focus:ring-[#333A2F] transition-colors cursor-pointer">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePaymentHistory; 