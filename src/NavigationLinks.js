const navigationList = [
    {name:"Home",link:"#Home"},
    {name:"About",link:"#About"},
    {name:"Projects",link:"#Projects"},

]

export default function NavigationLinks (){
    const linkItems = navigationList.map(item => 
        <li>
            <a href={item.link}>
                {item.name}
            </a>
        </li>
        
    );
    return (
        <ul>
            {linkItems}
        </ul>
    )
}