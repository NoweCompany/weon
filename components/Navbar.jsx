import { useState } from "react";
import Link from "next/link";
import sty from "../styles/style-components/navbar.module.css";

export default function NavBar() {
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };

    return (
        <>
            <nav className={`${sty.navBody} ${showDrawer ? sty.open : ''}`}>
                <img className={sty.navImg} src="/img/white.png" alt="" />
                <Link className={sty.navItem} href="./home"></Link>
                <Link className={sty.navItem} href="./docs">docs</Link>
                <Link className={sty.navItem} href="./dash">dashboard</Link>
                <Link className={sty.navItem} href="./admin">admin</Link>
                <Link className={sty.navUser} href="./user">user</Link>
                <div className={sty.menuIcon} onClick={toggleDrawer}>
                <ion-icon name="menu-outline"></ion-icon>
                </div>
            </nav>

            <div className={`${sty.drawer} ${showDrawer ? sty.open : ''}`}>
                <a className={sty.drawerItem} href="">docs</a>
                <a className={sty.drawerItem} href="">dashboard</a>
                <a className={sty.drawerItem} href="">admin</a>
                <a className={sty.drawerItem} href="">user</a>
                <div className={sty.menuIcon} onClick={toggleDrawer}>
                <ion-icon size="large" name="arrow-back-outline"></ion-icon>
                </div>
            </div>
        </>
    );
}