import "./assets/styles/app.css";
import "./assets/styles/index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import LogIn from "./pages/LogIn";
import MentorMatch from "./pages/MentorMatch";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { useWebsocket } from "utilities/hooks";
const App = () => {
	/*
	const { globalTheme } = useAppSelector((state) => ({
		globalTheme: state.theme.theme,
	}));
	*/
	dayjs.extend(duration);
	dayjs.extend(relativeTime);
	useWebsocket();
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
