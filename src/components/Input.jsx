export function Input({name , placeholder , onChange , type , className , value , defaultValue , onInput , min , max , onKeyDown}){
    return (
        <>
            <input name={name} onChange={onChange} onInput={onInput} min={min} onKeyDown={onKeyDown} max={max} className={className} placeholder={placeholder} defaultValue={defaultValue} type={type} value={value} required/>
        </>
    )
}