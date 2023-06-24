import Sidebar from "@/components/Sidebar";

export default function HomeLayout({ children }) {
  return (
      <>
        <Sidebar/>
        {children}
      </>
  )
}
