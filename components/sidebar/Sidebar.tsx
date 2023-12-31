import DesktopSidebar from '@/components/sidebar/DesktopSidebar'
import getCurrentUser from '@/utils/actions/getCurrentUser'

import MobileFooter from './MobileFooter'

export default async function Sidebar({ children }: { children: React.ReactNode }) {
    const currentUser = await getCurrentUser()

    return (
        <div className="h-full">
            <DesktopSidebar currentUser={currentUser!} />
            <MobileFooter />
            <main className="h-full lg:pl-20">{children}</main>
        </div>
    )
}
