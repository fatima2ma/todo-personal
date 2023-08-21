import spinner from '../assets/svg/spinner.svg';
function Spinner(){
    return(
        // <div  flex items-center justify-center fixed lef-0 right-0 top-0 bottom-0 z-50">
            <div className="opacity-80">
                <img src={spinner} alt='loading...' className="h-24"/>
            </div>
        // </div>
    )
}

export default Spinner;