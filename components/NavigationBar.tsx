import { NavBarItem } from "./NavBar-item";

export const NavigationBar = () => {
    return (
        <div className="bg-neutral-800 h-screen ">
            <div className="flex flex-col px-5 pt-5">
                <div className="text-3xl font-semibold pb-2">CoWrite</div>
                <NavBarItem label="Home" />
                <NavBarItem label="Home" />
                <NavBarItem label="Home" />
            </div>
        </div>
    );
}