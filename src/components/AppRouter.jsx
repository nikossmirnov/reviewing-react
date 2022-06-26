import React, {useContext} from 'react';
import { Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";


const AppRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    return (
        isAuth
            ?
            <Routes>
                {
                    privateRoutes.map(r => {
                        const Component = r.component;
                        return (
                            <Route
                                element={<Component/>}
                                exact={r.exact}
                                path={r.path}
                            />
                        )
                    })
                }
            </Routes>
            :
            <Routes>
                {
                    publicRoutes.map(r => {
                        const Component = r.component;
                        return (
                            <Route
                                element={<Component/>}
                                exact={r.exact}
                                path={r.path}
                            />
                        )
                    })
                }

            </Routes>
    );
};

export default AppRouter;