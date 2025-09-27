import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/app.css";
import Home from "./pages/Home";

const App = () => {
	/*
	const { globalTheme } = useAppSelector((state) => ({
		globalTheme: state.theme.theme,
	}));
	*/
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />}></Route>
				{/*Missed routes*/}
				<Route path="*" />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
