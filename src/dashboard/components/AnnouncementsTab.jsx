import { Bell } from 'lucide-react';

export default function AnnouncementsTab() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4" style={{ color: '#333A2F' }}>Announcements</h3>
      <div className="text-center text-gray-500 py-8">
        <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No announcements yet.</p>
      </div>
    </div>
  );
} 