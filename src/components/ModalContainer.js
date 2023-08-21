const ModalContainer = ({children, title}) => {
    return(
        <div className="auth-modal w-1/2 bg-slate-300 p-3 shadow">
            <h2 className="modal-header p-1 mb-2 text-xl font-medium">{title}</h2>
            {children}
        </div>
    )
}

export default ModalContainer;