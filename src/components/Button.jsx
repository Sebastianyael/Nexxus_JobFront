export function Button({text,className , children , onClick}){
    return (
        <>
            <button type="submit" onClick={onClick} className={className}>
                {text}
                {children}
            </button>
        </>
    )
}