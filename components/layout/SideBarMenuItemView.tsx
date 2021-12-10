import { SideBarMenuItem } from "../../types/types";
import { classNames } from "../../util/classes";
import useAuth from '../../hooks/useAuth';
import { useRouter } from "next/router";

interface SideBarMenuItemViewProps {
    item: SideBarMenuItem;
    isOpen: boolean;
}

export default function SideBarMenuItemView({item, isOpen,}: SideBarMenuItemViewProps){
    const {user, logout, reLogin}= useAuth();
    const Router = useRouter();

    const handleLogout= async (e: any)=> {
        await logout();
        Router.push("/");
    }

    const handleChange = async(e: any)=> {
        Router.push(item.url);
    }

    if(item.rol.includes(user.rol)){
        if(item.type == "link"){
            return (
                <div className="SideBarMenuItemView">
                    <a onClick={handleChange}>
                        <div className={classNames('ItemContent', isOpen? '': 'collapsed')}>
                            <div className="icon">
                                <item.icon size="26" />
                            </div>
                            <span className="label">{item.label}</span>
                            <div style={{width: 5}}></div>
                            <div className="icon" title={item.texto}>
                                <item.icon2 size="20" />
                            </div>
                        </div>
                    </a>
                    {!isOpen? <div className="tooltip">{item.label}</div> : ""}
                </div>
            );
        } else {
            return (
                <div className="SideBarMenuItemView">
                    <a onClick={handleLogout} id="button_cursor">
                        <div className={classNames('ItemContent', isOpen? '': 'collapsed')}>
                            <div className="icon">
                                <item.icon size="26" />
                            </div>
                            <span className="label">{item.label}</span>
                            <div style={{width: 5}}></div>
                            <div className="icon" title={item.texto}>
                                <item.icon2 size="20" />
                            </div>
                        </div>
                    </a>
                    {!isOpen? <div className="tooltip">{item.label}</div> : ""}
                </div>
            );
        }
    } else {
        return null;
    }
}