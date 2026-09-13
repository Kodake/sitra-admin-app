"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';

const QuickMenuDropdown = () => {
    const t = useTranslations("Menu");

    return (
        <ul>
            <li><Link href="/dashboard">{t("dashboard")}</Link></li>
            <li><Link href="/users">{t("usersAndMemberships")}</Link></li>
            <li><Link href="/profile">{t("myProfile")}</Link></li>
        </ul>
    );
};

export default QuickMenuDropdown;
