import "./Footer.css";

const Footer = () => {
   
   
    return (
    <div className="footer-container">
        <div>Project
                <a href='https://github.com/caseytuer/ezpickup'>
                    <i className='fab fa-github dev-link'></i>
                </a>
        </div>
        <div className="copyright">© 2021 ezpickup, Inc. No rights reserved.</div>
        <div className="developer-links">{`Developer `}
            <a href='https://github.com/caseytuer'>
                <i className='fab fa-github dev-link'></i>
            </a>
            <a href='https://www.linkedin.com/in/caseytuer/'>
                <i className='fab fa-linkedin dev-link'></i>
            </a>
                <a href='https://angel.co/u/caseytuer'>
                <i className='fab fa-angellist dev-link'></i>
            </a>
        </div>
    </div>
    )
}

export default Footer;