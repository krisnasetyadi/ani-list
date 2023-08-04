import React, {ReactElement, Suspense} from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, useMutation } from "@apollo/client";
import List from '../screens/list-screen/index'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { MenuItem } from "./menu-item";
import LoadingHoverComponent from "../component/loading-hover-component";

export interface RouteProps {
  displayName: string;
  name: string;
  showmenu: boolean; 
  exact: boolean; 
  component: React.FC<any>; 
  route: string;
  routes?: RouteProps[];
}

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache()
  })
  
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

console.log('MenuItem', MenuItem)

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