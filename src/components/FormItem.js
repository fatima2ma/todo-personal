import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const FormItem = ({id, type, title, placeHolder, label, onChange}) => {
    const [passVisible, setPassVisible] = useState(false);
    return(
        <div className="form-item m-4 gap-2 flex flex-col lg:flex-row items-center justify-center relative">
            <label to={id} className="font-medium text-start w-1/4">{label}</label>
            <input
                className="px-4 py-2 w-full border-0 outline-0 "
                type={type && !passVisible? type : 'text'} 
                id={id} 
                placeholder={placeHolder} 
                value={title}
                onChange={onChange}/>
            {id == 'password'? passVisible? 
                <AiFillEyeInvisible className='absolute end-2 bottom-2.5' onClick={() => setPassVisible((prevState) => !prevState )}/> 
                : 
                <AiFillEye className='absolute end-2 bottom-2.5' onClick={() => setPassVisible(!passVisible)}/> : ''}
        </div>
    )
}

export default FormItem;