"use client";

import AdminUsersTable from "@/components/users/AdminUsersTable";
import BreadCrumb from "@/components/shared/BreadCrumb";
import Wrapper from "@/layout/DefaultWrapper";
import { useTranslations } from "next-intl";

const UsersPage = () => {
  const t = useTranslations("Admin");

  return (
    <Wrapper>
      <main>
        <BreadCrumb
          title={t("usersTitle")}
          subTitleOne="SuperAdmin"
          subTitleTwo={t("usersSubtitle")}
        />
        <div className="mt-6 px-4 sm:px-6 lg:px-8 mb-10">
          <AdminUsersTable />
        </div>
      </main>
    </Wrapper>
  );
};

export default UsersPage;
