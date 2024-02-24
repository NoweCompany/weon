import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import sty from '../../styles/style-components/navbar.module.css';
import { User, ArrowLeft, AlignJustify } from 'lucide-react';

interface NavProps {
    adminPages?: boolean;
    dataPages?: boolean;
}

const Nav: React.FC<NavProps> = ({ adminPages, dataPages }) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const router = useRouter();

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };

    const isActive = (pathname: string) => router.pathname === pathname ? sty.activeLink : '';

    return (
        <>
            <nav className={`${sty.navBody} ${showDrawer ? sty.open : ''}`}>
                <div className={sty.navItems}>
                    <Link href="/home">
                        <img className={sty.navImg} src="/Img/white.png" alt="Logo" />
                    </Link>
                    <div className={sty.navItenContainer}>
                        <div className={sty.navItem}>
                            <Link href="/dado">
                                <div className={dataPages ? sty.activeLink : ''}>Dados</div>
                            </Link>
                        </div>
                        <div className={sty.navItem}>
                            <Link href="/dash">
                                <div className={isActive('/dash')}>Dashboard</div>
                            </Link>
                        </div>
                        <div className={sty.navItem}>
                            <Link href="/admin">
                                <div className={adminPages ? sty.activeLink : ''}>Gestão</div>
                            </Link>
                        </div>
                        <div className={sty.navUser}>
                            <Link href="/user">
                                <div className={isActive('/user')}>
                                    <div>
                                        <User />
                                    </div>
                                </div>
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
                            <Link href="/dado">
                                <div className={dataPages ? sty.activeLink : ''}>Dados</div>
                            </Link>
                        </div>
                        <div className={sty.drawerItem}>
                            <Link href="/dash">
                                <div className={isActive('/dash')}>Dashboard</div>
                            </Link>
                        </div>
                        <div className={sty.drawerItem}>
                            <Link href="/admin" as="/admin/tables">
                                <div className={adminPages ? sty.activeLink : ''}>Gestão</div>
                            </Link>
                        </div>
                        <div className={sty.drawerItem}>
                            <Link href="/user">
                                <div className={isActive('/user')}>Usuário</div>
                            </Link>
                        </div>
                    </div>
                    <div className={sty.menuIcon} onClick={toggleDrawer}>
                        <div><ArrowLeft /></div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;
