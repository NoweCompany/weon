import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import sty from '../styles/style-components/navbar.module.css';

import { User } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { AlignJustify } from 'lucide-react';


export default function Nav() {
    const [showDrawer, setShowDrawer] = useState(false);
    const router = useRouter()

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
                                <div className={isActive('/user')}> <div> <User /> </div> </div>
                            </Link>
                        </div>

                        <div className={sty.menuIcon} onClick={toggleDrawer}>
                                <div><AlignJustify /></div>
                            </div>
                    </div>
                </div>
            </nav>


           <nav className={`${sty.drawer} ${showDrawer ? sty.open : ''}`}>
                <div className={sty.drawerItem}>
                    <div className={sty.drawerItem}>

                    <div className={sty.drawerItem}>
                            <Link href="/home">
                                <div className={isActive('/home')}>Home</div>
                            </Link>
                        </div>

                        <div className={sty.drawerItem}>
                            <Link href="/docs">
                                <div className={isActive('/docs')}>docs</div>
                            </Link>
                        </div>

                        <div className={sty.drawerItem}>
                            <Link href="/dash">
                                <div className={isActive('/dash')}>dash</div>
                            </Link>
                        </div>

                        <div className={sty.drawerItem}>
                            <Link href="/admin">
                                <div className={isActive('/admin')}>admin</div>
                            </Link>
                        </div>

                        <div className={sty.drawerItem}>
                            <Link href="/user">
                                <div className={isActive('/user')}>user</div>
                            </Link>
                        </div>


                        </div>
                            <div className={sty.menuIcon} onClick={toggleDrawer}>
                                <div> <ArrowLeft /> </div>
                            </div>
                    </div>
               
            </nav>

        </>
    );
}
