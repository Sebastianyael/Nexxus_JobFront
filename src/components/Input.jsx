export function Input({name , placeholder , type}){
    return (
        <>
            <input name={name} placeholder={placeholder} type={type} required/>
        </>
    )
}