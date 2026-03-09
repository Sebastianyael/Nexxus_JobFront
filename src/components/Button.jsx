export function Button({text,className , children}){
    return (
        <>
            <button type="submit" className={className}>
                {children}
                {text}
            </button>
        </>
    )
}