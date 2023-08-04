import { Link } from "react-router-dom";

export default function () {
    return (
        <div style={{justifyContent: 'center', alignItems: 'center'}}>
            <div>Welcome to Anime List</div>  
            <Link to={'/list'}>Go to List</Link>
        </div>
    )
}