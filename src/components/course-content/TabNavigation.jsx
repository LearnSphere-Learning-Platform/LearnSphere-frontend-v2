// Shared between the student dashboard (dashboard/DashBoard.jsx) and the admin course
// preview (admin/pages/CourseDashboard.jsx). Admin's copy had a genuinely broken tab list
// ([{ id: 'overview', ... }, {}] - a stray empty object that rendered a blank, unclickable
// tab button), not an intentionally trimmed one. Rather than carry that bug forward, this
// version takes an optional `tabs` prop so each consumer can say which tabs it actually
// supports; it defaults to the full 6-tab list so DashBoard.jsx needs zero changes, and
// CourseDashboard.jsx (whose renderTabContent only handles 'overview') passes just that.
const DEFAULT_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'qa', label: 'Q&A' },
  { id: 'notes', label: 'My Notes' },
  { id: 'discussion', label: 'Discussion' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'reviews', label: 'Reviews' }
];

const TabNavigation = ({ activeTab, setActiveTab, renderTabContent, tabs = DEFAULT_TABS }) => (
  <div className="mt-6 bg-white rounded-lg shadow-md">
    <div className="border-b overflow-x-auto">
      <nav className="flex space-x-8 px-6 min-w-max sm:min-w-0" style={{ WebkitOverflowScrolling: 'touch' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-2 text-sm font-medium whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-b-2 border-[#333A2F] text-[#333A2F] bg-[#EBEDDF]'
                : 'border-b-2 border-transparent text-gray-500 hover:text-[#333A2F] hover:border-gray-300'
            }`}
            style={{ minWidth: 80 }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
    <div className="p-4 sm:p-6">
      {renderTabContent()}
    </div>
  </div>
);

export default TabNavigation;
