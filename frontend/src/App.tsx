import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/app.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
	/*
	const { globalTheme } = useAppSelector((state) => ({
		globalTheme: state.theme.theme,
	}));
	*/
	return (
		<BrowserRouter>
			<title>CargoLens</title>
			<Routes>
				<Route index element={<Home />}></Route>
				{/*Missed routes*/}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
