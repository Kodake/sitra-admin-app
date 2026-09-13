"use client"
import ProfileList from '@/components/profile/ProfileList';
import BreadCrumb from '@/components/shared/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';

const ProfilePage = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Profile' subTitleOne='User' subTitleTwo='Profile' />
                    <ProfileList />
                </main>
            </Wrapper>
        </>
    );
};

export default ProfilePage;
