import { useEffect, useState } from "react"
import Image from "next/image";
import Logo from "../assets/logo.png"
import Link from "next/link";


const Header = () => {

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(JSON.parse(storedTheme));
      }
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
    document.documentElement.removeAttribute("class");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <header>
      <div className="logo">
        <Image className="w-md mx-auto item h-auto" src={Logo} alt="/" />
        <span>TODO APP</span>
      </div>
      <div className="themeSelector">
        <span onClick={() => handleThemeChange("light")}  className={theme === "light" ? "light activeTheme" : "light"}></span>
        <span onClick={() => handleThemeChange("medium")} className={theme === "medium" ? "medium activeTheme" : "medium"}></span>
        <span onClick={() => handleThemeChange("dark")} className={theme === "dark" ? "dark activeTheme" : "dark"}></span>
        <span onClick={() => handleThemeChange("gradientOne")} className={theme === "gradientOne" ? "gradientOne activeTheme" : "gradietOne"}></span>      </div>
      <Link href="/">
                  <button className="bg-peach  text-sm font-bold rounded-full px-8 py-2" onClick={() => localStorage.removeItem("token")}>
                    Logout
                  </button>
                </Link>
    </header>
  )
}

export default Header;
