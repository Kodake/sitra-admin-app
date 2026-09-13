const FooterCopyright = () => {
    return (
        <div className="inventual-copyright text-center h-20 leading-[80px] mt-20 rounded-tr-lg rounded-tl-lg bg-[#007aff]">
            <span className="text-[15px] text-white font-normal">© Copyright by SITRA {new Date().getFullYear()}</span>
        </div>
    );
};

export default FooterCopyright;
