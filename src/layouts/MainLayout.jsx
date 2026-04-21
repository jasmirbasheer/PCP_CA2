import NavBar from "../components/NavBar";

function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="app-main">{children}</main>
    </div>
  );
}

export default MainLayout;
