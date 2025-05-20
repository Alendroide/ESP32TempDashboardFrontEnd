import Navbar from "@/components/organisms/Navbar"

export default function DefaultLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="min-h-screen">
            <Navbar/>
            <div className="box-border p-6 bg-green-50 min-h-full">
                {children}
            </div>
        </div>
    )
}