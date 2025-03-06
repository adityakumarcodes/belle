'use client'
import * as Tabs from '@radix-ui/react-tabs'
import { UserIcon, Settings2Icon, VenetianMask, CloudUpload, Feather } from 'lucide-react'

const SETTINGS_TABS = [
    {
        value: 'profile',
        label: 'Profile',
        icon: UserIcon,
        content: {
            title: 'Profile',
            component: () => (
                /* Add profile settings form here */
                <div>{/* Profile form content */}</div>
            ),
        },
    },
    {
        value: 'preferences',
        label: 'Preferences',
        icon: Settings2Icon,
        content: {
            title: 'Preferences',
            component: () => <div>{/* Preferences form content */}</div>,
        },
    },
    {
        value: 'backup',
        label: 'Backup',
        icon: CloudUpload,
        content: {
            title: 'Backup',
            component: () => <div>{/* Preferences form content */}</div>,
        },
    },
    {
        value: 'secrets',
        label: 'Secrets',
        icon: VenetianMask,
        content: {
            title: 'Secrets',
            component: () => <div>{/* Preferences form content */}</div>,
        },
    },
    {
        value: 'blogs',
        label: 'Blogs',
        icon: Feather,
        content: {
            title: 'Blogs',
            component: () => <div>{/* Preferences form content */}</div>,
        },
    },
] as const

export default function SettingsPage() {
    return (
        <div className="container mx-auto p-3">
            <Tabs.Root defaultValue="profile" className="flex flex-col">
                <Tabs.List className="flex border-b border-gray-200 mb-4" aria-label="Settings tabs">
                    {SETTINGS_TABS.map((tab) => (
                        <Tabs.Trigger
                            key={tab.value}
                            value={tab.value}
                            className="px-4 py-2 flex items-center gap-2 data-[state=active]:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                        >
                            <tab.icon strokeWidth={1.25} />
                            {tab.label}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                {SETTINGS_TABS.map((tab) => (
                    <Tabs.Content key={tab.value} value={tab.value} className="p-4">
                        <h4>{tab.content.title}</h4>
                        <tab.content.component />
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </div>
    )
}
