import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import sty from '../styles/style-components/navbar.module.css';

export default function Nav() {
    const router = useRouter()
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };

    const isActive = (pathname) => router.pathname === pathname ? sty.activeLink : '';

    return (
        <>
            <nav className={`${sty.navBody} ${showDrawer ? sty.open : ''}`}>
                <div className={sty.navItems}>
                    <Link className={sty.navImg} href="/home"> <img src="/Img/white.png" alt="Logo" /></Link>
                    <div className={sty.navItenContainer}>
                        <div className={sty.navItem}>
                            <Link href="/docs">
                                <div className={isActive('/docs')}>docs</div>
                            </Link>
                        </div>

                        <div className={sty.navItem}>
                            <Link href="/dash">
                                <div className={isActive('/dash')}>dash</div>
                            </Link>
                        </div>

                        <div className={sty.navItem}>
                            <Link href="/admin">
                                <div className={isActive('/admin')}>admin</div>
                            </Link>
                        </div>

                        <div className={sty.navUser}>
                            <Link href="/user">
                                <div className={isActive('/user')}>user</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>


           <nav className={`${sty.drawer} ${showDrawer ? sty.open : ''}`}>
                <div className={sty.navItems}>
                    <Link className={sty.navImg} href="/home"> <img src="/Img/white.png" alt="Logo" /></Link>
                    <div className={sty.navItenContainer}>
                        <div className={sty.navItem}>
                            <Link href="/docs">
                                <div className={isActive('/docs')}>docs</div>
                            </Link>
                        </div>

                        <div className={sty.navItem}>
                            <Link href="/dash">
                                <div className={isActive('/dash')}>dash</div>
                            </Link>
                        </div>

                        <div className={sty.navItem}>
                            <Link href="/admin">
                                <div className={isActive('/admin')}>admin</div>
                            </Link>
                        </div>

                        <div className={sty.navUser}>
                            <Link href="/user">
                                <div className={isActive('/user')}>user</div>
                            </Link>
                            <div className={sty.menuIcon} onClick={toggleDrawer}>
                                <ion-icon size="large" name="arrow-back-outline"></ion-icon>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>


        </>
    );
}
