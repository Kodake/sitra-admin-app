import { useTranslations } from "next-intl";
import Link from "next/link";

const NoPermission = () => {
  const g = useTranslations("General");

  return (
    <div className="content-error-area py-[120px] px-7">
      <div className="grid grid-cols-12">
        <div className="col-span-12">
          <div className="content-error-item text-center">
            <svg
              width="150"
              height="150"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-2 drop-shadow-sm"
            >
              <path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                fill="#ffe5e5"
                stroke="#ff4d4f"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="9"
                y="11"
                width="6"
                height="5"
                rx="1"
                fill="#ff4d4f"
                stroke="#ff4d4f"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 11V9a2 2 0 1 1 4 0v2"
                stroke="#ff4d4f"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="section-title text-center">
              <h2 className="mb-5">{g("noPermissionTitle")}</h2>
              <p>{g("noPermission")}</p>
            </div>
            <div className="error-btn text-center mt-7">
              <Link href="/dashboard" className="inventual-btn primary-btn">
                {g("dashboard")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoPermission;
