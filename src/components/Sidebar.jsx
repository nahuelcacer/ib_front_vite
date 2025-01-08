import { ChevronFirst, ChevronLast, MoreVertical, Menu, LogOut, Power } from "lucide-react"
import { createContext, useContext, useState } from "react"
import { ProfileContext } from "../context/ProfileContext"
import { Link } from "react-router-dom"


const SidebarContext = createContext()
const logout = () => {
    localStorage.clear()
    window.location.href = '/auth/login'
}

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true)
    const [showSidebar, setShowSidebar] = useState(false)
    const { username, role } = useContext(ProfileContext)

    return (
        <>
            <button
                onClick={() => setShowSidebar(true)}
                className="p-3 md:hidden fixed top-4 left-4 z-20 bg-white rounded-lg shadow-md"
            >
                <Menu size={18} />
            </button>

            <aside className="h-screen">
                <nav className={`h-full flex bg-black flex-col border-r shadow-sm fixed md:relative w-72 z-40 transition-all duration-300 ${showSidebar ? "left-0" : "-left-72"
                    } md:left-0 ${expanded ? "md:w-72" : "md:w-16"
                    }`}>
                    <div className="p-4 pb-2 flex justify-between items-center">
                        {/* <h1 className={`text-white p-1.5 overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}>constGenius</h1> */}
                        <button
                            onClick={() => setShowSidebar(false)}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 md:hidden"
                        >
                            <ChevronFirst />
                        </button>
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1.5 rounded-lg text-white hover:bg-gray-500 hidden md:block"
                        >
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    {showSidebar && (
                        <div
                            className="fixed inset-0 bg-black/50 md:hidden z-30"
                            onClick={() => setShowSidebar(false)}
                        />
                    )}

                    <SidebarContext.Provider value={{ expanded }}>

                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t flex px-2.5 py-3">
                        {/* <img src={profile} className="w-10 h-10 rounded-md" /> */}
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
                            <div className="leading-4">
                                <h4 className="font-semibold text-white">{username.toUpperCase()}</h4>
                                <span className="text-xs text-gray-600">{role}</span>
                            </div>
                            {/* <MoreVertical size={20} /> */}
                        </div>

                        <li onClick={logout} className="flex items-center justify-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group text-white hover:bg-gray-600 text-gray-600">
                            <Power size={20} color="white" />
                        </li>
                    </div>
                </nav>
            </aside>
        </>
    )
}

export function SidebarItem({ icon, text, active, alert, to }) {
    const { expanded } = useContext(SidebarContext)
    return (
        <Link to={to || '#'}>
            <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group text-white ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-gray-600 text-gray-600"}`}>
                {icon}
                <span className={`overflow-hidden transition-all text-white ${expanded ? "w-52 ml-3" : "w-0"}`} >{text}</span>
                {alert && (
                    <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}>

                    </div>
                )}

                {!expanded && (
                    <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-black text-white text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                        {text}
                    </div>
                )}
            </li>
        </Link>
    )
}