export function Input({name , placeholder , onChange , type , className , value}){
    return (
        <>
            <input name={name} onChange={onChange} className={className} placeholder={placeholder} type={type} value={value} required/>
        </>
    )
}