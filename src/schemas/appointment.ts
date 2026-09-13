import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import * as Yup from "yup";

export const useAppointmentValidationSchema = () => {
    const t = useTranslations("Appointments.Appointment.validation");

    return Yup.object({
        description: Yup.string()
            .trim()
            .required(t("required"))
            .min(3, t("min", { min: 3 }))
            .max(250, t("max", { max: 250 })),

        contactId: Yup.string().required(t("required")).nullable(),

        scheduledAt: Yup.date()
            .required(t("required"))
            .typeError(t("invalidDate"))
            .test("not-in-past", t("futureOrToday"), (value) => {
                if (!value) return false;
                return dayjs(value).isAfter(dayjs().startOf("day"));
            }),

        appointmentItemIds: Yup.array()
            .of(
                Yup.string()
                    .required(t("required"))
            )
            .min(1, t("minItems", { min: 1 }))
            .required(t("required")),
    });
};
