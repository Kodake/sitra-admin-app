import * as Yup from "yup";

//blog comment schema
export const blogCommentSchema = Yup.object().shape({
    name: Yup.string().required().label("FirstName"),
    comment: Yup.string().required().min(20).label("Comment"),
});
