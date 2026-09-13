"use client";

import ProfileList from '@/components/profile/ProfileList';
import BreadCrumb from '@/components/shared/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import { useTranslations } from "next-intl";

const ProfilePage = () => {
    const t = useTranslations("Admin");

    return (
        <Wrapper>
            <main>
                <BreadCrumb title={t("profileTitle")} subTitleOne='User' subTitleTwo={t("profileSubtitle")} />
                <ProfileList />
            </main>
        </Wrapper>
    );
};

export default ProfilePage;
