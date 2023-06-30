import GuardRoute from "@/components/GuardRoute";
import Sidebar from "@/components/Sidebar";

export default function HomeLayout({ children }) {
  return (
      <>
      {/* <GuardRoute> */}
        <Sidebar/>
        {children}
      {/* </GuardRoute> */}
      </>
  )
}
