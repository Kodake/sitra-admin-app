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
          title={t("usersSubtitle")}
          subTitleOne="SuperAdmin"
          subTitleTwo={t("usersSubtitle")}
        />
        <AdminUsersTable />
      </main>
    </Wrapper>
  );
};

export default UsersPage;
