import React, { Suspense, useEffect} from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MenuItem } from "./menu-item";
import LoadingHoverComponent from "../component/loading-hover-component";
import axios from 'axios';

export interface RouteProps {
  displayName: string;
  name: string;
  showmenu: boolean; 
  exact: boolean; 
  component: React.FC<any>; 
  route: string;
  routes?: RouteProps[];
}

type BodyType  = {
   grant_type: string;
   client_id: string;
   client_secret: string
   redirect_uri: string
   code: string
}
function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  const body: BodyType = {
    grant_type: "authorization_code",
    client_id: `${process.env.REACT_APP_CLIENT_ID}`,
    client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
    // redirect_uri: `http://localhost:3000/list`,
    redirect_uri: `${process.env.REACT_APP_REDIRECT_URL}`,
    code: `${code}`
  }

  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache()
  })

  const apiUrl = `${process.env.REACT_APP_ANIME_LIST_OAUTH_TOKEN}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${process.env.REACT_APP_REDIRECT_URL}`,
    },
    body: body
    ,
  };

  useEffect(() => {
    axios.post(apiUrl, options)
    .then(response => {
      console.log('.access_token', response);
    })
    .catch(error => {});  
  },[options])


  return (
    <div>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </ApolloProvider>
    </div>
  );
}

function Content() {
  const location = useLocation()

  return (
    <Suspense fallback={
      <div style={{display: 'flex', alignItems:'center', justifyContent: 'center', height: '64px'}}>
        <div>
          <LoadingHoverComponent  />
        </div>
      </div>
    }>
      <Routes location={location}>
        {MenuItem.map((item: RouteProps)   => {
          const component = []; 
          if (item.route && item.component) {
            const routeProps = {
              exact: item.exact,
              path: item.route,
              element: <item.component route={item.route} displayName={item.displayName} />,
            };
            component.push(<Route {...routeProps} />);
          }
          if (item.routes &&  item.routes.length > 0) {
            item.routes.forEach(route => {
              const routeProps = {
                exact: route.exact,
                path: route.route,
                element: <route.component route={route.route} displayName={route.displayName} />
              }
              component.push(<Route {...routeProps} /> )
              if (route.routes && route.routes.length > 0) {
                route.routes.forEach(childRoute => {
                  const grandChildRoute = {
                    exact: childRoute.exact,
                    path: childRoute.route,
                    element: <childRoute.component route={childRoute.route} displayName={childRoute.displayName} />    
                  }
                  component.push(<Route {...grandChildRoute} />)
                })
              }
            })
          }
          return component
      
        })}
      </Routes>
    </Suspense>
  )
}
export default App;