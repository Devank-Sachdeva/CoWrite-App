export const NavBarItem = ({label}: {label: string}) => {
    return (
        <div className="flex text-lg text-white/80">
            <div className="pr-2">
                Q
            </div>
            <div>
                {label}
            </div>
        </div>
        
    )
}