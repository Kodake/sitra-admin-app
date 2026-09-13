import Link from 'next/link';

const QuickMenuDropdown = () => {
    return (
        <ul>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/users">Usuarios y Membresías</Link></li>
            <li><Link href="/profile">Mi Perfil</Link></li>
        </ul>
    );
};

export default QuickMenuDropdown;
