import { Link } from 'react-router-dom';

const HeaderItem = ({title, linkTo, isButton}) => {
    return(
        <div className={isButton? "navbarItem" : "navbarItem grow text-start"}>
            <Link to={linkTo} className={isButton? 'text-sm p-2 rounded-md ring-1 ring-current self-end block' : 'block'}>{title}</Link>
        </div>
    )
}

export default HeaderItem;