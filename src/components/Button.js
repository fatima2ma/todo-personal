const Button = ({title, type, className}) => {
    return(
        <button type={type} className={className}>{title}</button>
    )
}

export default Button;