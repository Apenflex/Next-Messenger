import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import getCurrentUser from "@/utils/actions/getCurrentUser";

import MobileFooter from "./MobileFooter";


export default async function Sidebar({ children }: { children: React.ReactNode }) {
    
    return (
        <div className="h-full">
            <DesktopSidebar />
            <MobileFooter />
            <main className="lg:pl-20 h-full">{children}</main>
        </div>
    )
}
