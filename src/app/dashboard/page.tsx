"use client";

import AdminDashboardMain from "@/components/dashboard/AdminDashboardMain";
import BreadCrumb from "@/components/shared/BreadCrumb";
import Wrapper from "@/layout/DefaultWrapper";
import { useTranslations } from "next-intl";

const DashboardPage = () => {
  const t = useTranslations("Admin");

  return (
    <Wrapper>
      <main>
        <BreadCrumb title={t("dashboardTitle")} subTitleOne="SISTRA SRL" subTitleTwo={t("dashboardSubtitle")} />
        <AdminDashboardMain />
      </main>
    </Wrapper>
  );
};

export default DashboardPage;
