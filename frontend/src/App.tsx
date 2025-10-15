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
import WellnessBuddy from "pages/WellnessBuddy";
import Events from "pages/Events";
import NewEvent from "pages/NewEvent";
import EventDetails from "pages/EventDetails";
import SignUp from "pages/SignUp";

const App = () => {
	dayjs.extend(duration);
	dayjs.extend(relativeTime);
	useWebsocket();

	return (
		<BrowserRouter>
			<title>PSA Horizon</title>
			<Routes>
				<Route path="/log-in" element={<LogIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route element={<MainLayout />}>
					<Route index element={<Home />}></Route>
					<Route path="/mentor" element={<MentorMatch />} />
					<Route path="/wellness-buddy" element={<WellnessBuddy />} />
					<Route path="/events-hub">
						<Route index element={<Events />} />
						<Route path="/events-hub/new" element={<NewEvent />} />
						<Route
							path="/events-hub/:id"
							element={<EventDetails />}
						/>
					</Route>

					{/*Missed routes*/}
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
