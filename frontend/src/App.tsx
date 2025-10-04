import "./assets/styles/app.css";
import "./assets/styles/index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import LogIn from "./pages/LogIn";
import MentorMatch from "./pages/MentorMatch";

const App = () => {
	/*
	const { globalTheme } = useAppSelector((state) => ({
		globalTheme: state.theme.theme,
	}));
	*/
	return (
		<BrowserRouter>
			<title>PSA Horizon</title>
			<Routes>
				<Route path="/log-in" element={<LogIn />} />

				<Route element={<MainLayout />}>
					<Route index element={<Home />}></Route>
					<Route path="/mentor" element={<MentorMatch />} />
					{/*Missed routes*/}
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
