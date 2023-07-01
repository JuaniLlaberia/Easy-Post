import Sidebar from "@/components/Sidebar";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

export default function HomeLayout({ children }) {
  return (
      <>
        <Sidebar/>
        {children}
      </>
  )
}
