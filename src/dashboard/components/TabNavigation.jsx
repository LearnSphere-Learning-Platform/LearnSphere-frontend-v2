const TabNavigation = ({ activeTab, setActiveTab, renderTabContent }) => (
  <div className="mt-6 bg-white rounded-lg shadow-md">
    <div className="border-b overflow-x-auto">
      <nav className="flex space-x-8 px-6 min-w-max sm:min-w-0" style={{ WebkitOverflowScrolling: 'touch' }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'qa', label: 'Q&A' },
          { id: 'notes', label: 'My Notes' },
          { id: 'discussion', label: 'Discussion' },
          { id: 'announcements', label: 'Announcements' },
          { id: 'reviews', label: 'Reviews' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-2 text-sm font-medium whitespace-nowrap ${activeTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
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