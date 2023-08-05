import { H1Bold } from "../../constant/component-styles/components";
import { COLORS } from "../../constant/theme";

export default function () {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <H1Bold>Welcome to Anime List</H1Bold>  
            <a 
              style={{ 
                backgroundColor: COLORS.primary, color: COLORS.white, textDecoration: 'none', fontFamily: 'Roboto',
                padding: '10px', borderRadius: '5px'}}
                href={`https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL || 'http://localhost:3000'}&response_type=code`}>
                Login
            </a>
        </div>
    )
}