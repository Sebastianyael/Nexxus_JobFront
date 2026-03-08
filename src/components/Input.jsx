export function Input({name , placeholder , onChange , type}){
    return (
        <>
            <input name={name} onChange={onChange} placeholder={placeholder} type={type} required/>
        </>
    )
}