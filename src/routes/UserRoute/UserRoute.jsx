import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Route, Routes, useNavigate } from 'react-router-dom';
import IndexPage from '../../pages/IndexPage/IndexPage';
import AuthRoute from '../AuthRoute/AuthRoute';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';

function UserRoute(props) {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const isLogin = !!queryClient.getQueryData(["userQuery"]);

    useEffect(() => { // 리턴 이후 마운틴 될 때 실행
        if (!isLogin) {
            alert("잘못된 접근입니다.")
            navigate("/auth/signin");

        }
      }, []);

    return (
        <>
            {
                isLoading &&
                <Routes>
                    <Route path="/profile" element={<ProfilePage />} />
                    
                </Routes>
            }

        </>
    );
}

export default UserRoute;