interface propsType {
  title?: string;
  subTitleOne?: string;
  subTitleTwo?: string;
  subTitleThree?: string;
  subTitleFour?: string;
}
const BreadCrumb = ({ title, subTitleOne, subTitleTwo, subTitleThree, subTitleFour }: propsType) => {
  return (
    <>
      <div className="inventual-breadcrumb-area px-4 py-4 bg-white">
        <div className="inventual-breadcrumb-area-inner px-0.5">
          <div className="inventual-breadcrumb-area-inner-wrap">
            <span className="text-[15px] text-heading font-bold me-2">{subTitleOne}</span>
            {subTitleTwo &&
              <>
                <span className="text-[15px] text-heading font-bold me-2"><i className="fa-regular fa-chevron-right"></i></span>
                <span className="text-[15px] text-heading font-bold me-2">{subTitleTwo}</span>
              </>
            }
            {subTitleThree &&
              <>
                <span className="text-[15px] text-heading font-bold me-2"><i className="fa-regular fa-chevron-right"></i></span>
                <span className="text-[15px] text-heading font-bold me-2">{subTitleThree}</span>
              </>
            }
            {subTitleFour &&
              <>
                <span className="text-[15px] text-heading font-bold me-2"><i className="fa-regular fa-chevron-right"></i></span>
                <span className="text-[15px] text-heading font-bold me-2">{subTitleFour}</span>
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default BreadCrumb;
