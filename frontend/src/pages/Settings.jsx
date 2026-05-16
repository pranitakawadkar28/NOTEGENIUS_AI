import { useState } from 'react'
import ProfileSection from '@/components/settings/ProfileSection'
import ThemeSettings from '@/components/settings/ThemeSettings'
import SecuritySettings from '@/components/settings/SecuritySettings'
import { LogoutSection, DangerZone } from '@/components/settings/SecuritySections'
import { cn } from '@/lib/utils'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'security', label: 'Security' },
  ]

  return (
    <div className="flex flex-col h-full animate-fade-in pb-20 px-4 sm:px-6 lg:px-8 mt-8">
      {/* Ultra Minimal Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-medium text-[var(--text-primary)] tracking-tight">Settings</h1>
      </div>

      {/* Minimal Horizontal Navigation */}
      <div className="flex items-center gap-8 border-b border-[var(--border-primary)] mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-4 text-sm font-medium transition-all relative",
              activeTab === tab.id
                ? "text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--text-primary)] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area - No Backgrounds, No Borders */}
      <main className="w-full max-w-2xl">
        {activeTab === 'profile' && (
          <div className="space-y-16 animate-in fade-in duration-500">
             <section>
               <h2 className="text-lg font-medium text-[var(--text-primary)] mb-6">Personal Information</h2>
               <ProfileSection />
             </section>
             <section className="pt-10 border-t border-[var(--border-primary)]/50">
               <LogoutSection />
             </section>
          </div>
        )}
        
        {activeTab === 'appearance' && (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-lg font-medium text-[var(--text-primary)] mb-6">Interface Theme</h2>
            <ThemeSettings />
          </div>
        )}
        
        {activeTab === 'security' && (
          <div className="space-y-16 animate-in fade-in duration-500">
            <section>
              <h2 className="text-lg font-medium text-[var(--text-primary)] mb-6">Password Management</h2>
              <SecuritySettings />
            </section>
            <section className="pt-10 border-t border-[var(--border-primary)]/50">
              <DangerZone />
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
