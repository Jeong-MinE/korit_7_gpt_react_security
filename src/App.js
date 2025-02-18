import { healthCheckApi } from "./api/apis/healthCheckApi";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import { userApi } from "./api/apis/userApi";
import { jwtDecode } from "jwt-decode";
import AuthRoute from "./routes/AuthRoute/AuthRoute";
import { useQuery } from "@tanstack/react-query";
import MainHeader from "./components/MainHeader";

function App() {
	const navigate = useNavigate();
	const healthCheckQuery = useQuery({
		queryKey: ["healthCheckQuery"], 
		queryFn:	healthCheckApi, 
		cacheTime: 1000 * 60 * 10, //캐시 유지 시간(언마운트 이후),
			staleTime: 1000 * 60 * 10, //10분마다 최신의 캐시 상태 유지(refetch
	});


	if(!healthCheckQuery.isLoading) {
		console.log(healthCheckQuery.data.data.status);
	}

	const userQuery = useQuery({
		queryKey: ["userQuery"],
		queryFn: async () => {
			const accessToken = localStorage.getItem("AccessToken");
			if (!accessToken) {
				return null;
			}

			const decodedJwt = jwtDecode(accessToken);
			return await userApi(decodedJwt.userId);
		},
	});

	

  	return (
    	<Container maxWidth="lg">
			
			{

				(!userQuery.isLoading && !userQuery.isRefetchError) &&
				<>
				<MainHeader />
				<Routes> 
					<Route path="/" element={<IndexPage />} />
					<Route path="/user/profile" element={<ProfilePage />} />
					<Route path="/auth/*" element={userQuery.isLoading ? <></> : <AuthRoute />} /> 
				</Routes>
			</>
			}
    	</Container>
  	);
}

export default App;