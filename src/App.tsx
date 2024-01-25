import { Outlet } from "react-router-dom";
import { Header } from "./components/common";
import { ScrollToTop } from "./hooks/useScrollToTop";

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
    </div>
  );
}
