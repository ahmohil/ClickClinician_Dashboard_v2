import { useNavigate } from "react-router-dom";

const AllRequests = () => {
	const navigate = useNavigate();

	return (
		<div className="container profile py-4">
			<div className="row mb-lg-4">
				<div className="col-md-4 mb-4">
					<div className="mb-md-4 mb-3">
						<h3 className="fs-24 fw-700">My Requests</h3>
						<p className="mb-0 fs-12 light-text fw-500">
							Here are your existing or completed requests; you can open new request via
							<a className="default-text fw-500 underline pointer"> New Support Ticket</a>
						</p>
					</div>
				</div>
			</div>

			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Ticket No.</th>
							<th scope="col">Order Number</th>
							<th scope="col">Subject</th>
							<th scope="col">Contact</th>
							<th scope="col">Status</th>
						</tr>
					</thead>
					<tbody>
						<tr onClick={() => navigate("/request-detail")}>
							<td>234243</td>
							<td>5w453424</td>
							<td>He never came</td>
							<td>@johndoe</td>
							<td>
								<span className="default-text">New</span>
							</td>
						</tr>
						<tr onClick={() => navigate("/request-detail")}>
							<td>234243</td>
							<td>5w453424</td>
							<td>He never came</td>
							<td>@johndoe</td>
							<td>
								<span className="purpal-text">Pending</span>
							</td>
						</tr>
						<tr onClick={() => navigate("/request-detail")}>
							<td>234243</td>
							<td>5w453424</td>
							<td>He never came</td>
							<td>@johndoe</td>
							<td>
								<span className="success-text">Completed</span>
							</td>
						</tr>
						<tr onClick={() => navigate("/request-detail")}>
							<td>234243</td>
							<td>5w453424</td>
							<td>He never came</td>
							<td>@johndoe</td>
							<td>
								<span className="success-text">Completed</span>
							</td>
						</tr>
						<tr onClick={() => navigate("/request-detail")}>
							<td>234243</td>
							<td>5w453424</td>
							<td>He never came</td>
							<td>@johndoe</td>
							<td>
								<span className="success-text">Completed</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllRequests;
