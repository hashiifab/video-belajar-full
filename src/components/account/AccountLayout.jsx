import AccountSidebar from './AccountSidebar';

export default function AccountLayout({
  activeTab,
  onSelectTab,
  title,
  subtitle,
  children
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-10 w-full">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
        {/* Left Sidebar */}
        <div className="w-full md:w-64 lg:w-72 shrink-0">
          <AccountSidebar
            activeTab={activeTab}
            onSelectTab={onSelectTab}
            title={title}
            subtitle={subtitle}
          />
        </div>

        {/* Right Main Content */}
        <div className="flex-1 min-w-0 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
