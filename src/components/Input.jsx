export function Input({name , placeholder , onChange , type , className , value , defaultValue}){
    return (
        <>
            <input name={name} onChange={onChange} className={className} placeholder={placeholder} defaultValue={defaultValue} type={type} value={value} required/>
        </>
    )
}