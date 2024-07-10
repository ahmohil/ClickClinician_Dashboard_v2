import { Fragment } from "react";
import {
	Navigate,
	Outlet,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

import { Layout, SideLayout, AdminLayout, Loader } from "@components";
import {
	Login,
	// AdminDashboard,
	AllAgencies,
	AllClinicians,
	AllServiceRequests,
	CreateUser,
	AgencyDetails,
	CreateServiceRequest,
	ServiceRequestDetails,
	
} from "@pages";

import "./App.css";

import { useAuth } from "./hooks/useAuth";

function App() {
	const { isPageLoading, loggedInUser } = useAuth();

	const isAdmin = (user) => !!user && isDataExists(user) && user.role === "admin";

	const isUser = (user) => !!user && isDataExists(user) && user.role === "user";

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route exact path="/">
				{/* <Route path="auth" errorElement={<ErrorPage />}> */}
					
				<Route index element={<Login />} />
					{!!!loggedInUser && (
						<Fragment>
							{/* <Route path="forget-password" element={<Forget />} /> */}
							{/* <Route path="signup" element={<Signup />} /> */}
							{/* <Route path="otp" element={<Verify />} /> */}
							{/* <Route path="set-password" element={<SetPassword />} /> */}
						</Fragment>
					)}
				<Route path="admin" element={<AdminLayout />}>
					{/* <Route index element={<AdminDashboard />} /> */}
					<Route exact path="agencies" element={<AllAgencies />} />
					<Route path = "agency/requests/add/:agencyId" element={<CreateServiceRequest/>}/>
					<Route path="agency/users/add/:agencyId" element={<CreateUser />} />
					
					<Route path="details/:agency_id" element={<AgencyDetails />} />
					<Route path="clinicians" element={<AllClinicians />} />
					<Route exact path="service-requests" element={<AllServiceRequests />} />
					<Route path="service-requests/details/:requestId" element={<ServiceRequestDetails />} />
				</Route>

				
				<Route path="*" element={<Navigate to={"/"} />} />
			</Route>
		)
	);

	return <Fragment>{isPageLoading ? <Loader /> : <RouterProvider router={router} />}</Fragment>;
}

export default App;
