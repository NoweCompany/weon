import { useState } from "react";
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
                <a className={sty.navItem} href="">docs</a>
                <a className={sty.navItem} href="">dashboard</a>
                <a className={sty.navItem} href="">admin</a>
                <a className={sty.navUser} href="">user</a>
                <div className={sty.menuIcon} onClick={toggleDrawer}>
                <ion-icon name="menu-outline"></ion-icon>
                </div>
            </nav>

            <div className={`${sty.drawer} ${showDrawer ? sty.open : ''}`}>
                <a className={sty.drawerItem} href="">docs</a>
                <a className={sty.drawerItem} href="">dashboard</a>
                <a className={sty.drawerItem} href="">admin</a>
                <a className={sty.drawerItem} href="">user</a>
            </div>
        </>
    );
}