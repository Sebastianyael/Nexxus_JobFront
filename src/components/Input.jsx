export function Input({name , placeholder , onChange , type , className}){
    return (
        <>
            <input name={name} onChange={onChange} className={className} placeholder={placeholder} type={type} required/>
        </>
    )
}