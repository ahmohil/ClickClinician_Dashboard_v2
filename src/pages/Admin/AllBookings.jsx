import { useEffect, useState } from "react";

import { failureToaster, isDataExists } from "../../utils";
import { Loader, NoData } from "../../components";
import { formatTimeWithTimeZone } from "../../utils";
import { capitalizeFirstLetter } from "../../transformers/TextFormation";
import Pagination from "react-bootstrap/Pagination";

import { useNavigate } from "react-router-dom";
import { GetAllBookings } from "../../services";

const AllBookings = () => {
	const navigate = useNavigate();

	const [bookings, setBookings] = useState([]);
	const [isRendering, setIsRendering] = useState(false);
	const [text, setText] = useState("");
	const [page, setPage] = useState(1);

	const items = () => {
		let arr = [];
		for (let i = 1; i <= bookings?.totalPages; i++) {
			arr.push(
				<Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
					{i}
				</Pagination.Item>
			);
		}
		return arr;
	};

	const getAllBookings = async () => {
		setIsRendering(true);
		try {
			const queryParams = {};

			queryParams.page = page;
			queryParams.limit = 10;
			queryParams.skip = page - 1;
			const result = await GetAllBookings(queryParams);
			setBookings(result);
		} catch (error) {
			failureToaster(error.message);
		}
		setIsRendering(false);
	};

	const ViewDescription = (item) => {
		navigate(`/services/details/${item?.service?.slug}`, {
			state: { booking: item?.slug, admin: true },
		});
	};

	const filteredBookings = bookings?.docs?.filter((item) => {
		if (text.trim() === "") {
			return true;
		}

		return item.slug?.toLowerCase().includes(text.toLowerCase());
	});

	useEffect(() => {
		getAllBookings();
	}, [page]);

	return (
		<div>
			<div className="card-box mb-md-4">
				<h3 className="fs-md-24 fw-700 mb-0">All Bookings</h3>
			</div>
			<div className="search-key-input gap-md-3 gap-1 my-4 mx-auto d-flex align-items-center flex-wrap">
				<input
					type="text"
					placeholder="Search booking by id"
					required
					value={text}
					onChange={(e) => setText(e.target.value.toLowerCase())}
					className="add-location"
				/>
			</div>
			{isRendering && <Loader />}
			{!isRendering && (
				<>
					<div className="table-responsive">
						<table className="table customs-wid">
							<thead>
								<tr>
									<th scope="col">Id</th>
									<th scope="col">Seller</th>
									<th scope="col">Buyer</th>
									<th scope="col">Date</th>
									<th scope="col">Status</th>
									<th scope="col">View</th>
								</tr>
							</thead>
							<tbody>
								{isDataExists(filteredBookings) &&
									filteredBookings.map((item, i) => (
										<tr key={item._id}>
											<td>{item?.slug}</td>
											<td>{capitalizeFirstLetter(item.seller?.username)}</td>
											<td>{capitalizeFirstLetter(item.buyer?.username)}</td>
											<td>{formatTimeWithTimeZone(item?.date, item.buyer?.timeZone?.value)}</td>
											<td>
												<span className={`text-capitalize ${item.status == "completed" ? "success-text" : "text"}`}>
													{item?.status}
												</span>
											</td>
											<td>
												<div className="fs-22 pointer" onClick={() => ViewDescription(item)}>
													<iconify-icon icon="ph:eye"></iconify-icon>
												</div>
											</td>
										</tr>
									))}
								{!isDataExists(filteredBookings) && (
									<tr>
										<td colSpan="5" className="fs-14">
											<NoData message="No bookings yet!" extraClasses="fs-18  text-center mt-4" />
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</>
			)}

			{bookings?.docs?.length > 0 && (
				<div className="d-flex justify-content-center">
					<Pagination className="custom-pagination">
						<Pagination.First disabled={bookings?.page == 1 || isRendering} onClick={() => setPage(1)} />
						<Pagination.Prev
							disabled={!bookings?.hasPrevPage || isRendering}
							onClick={() => setPage((prev) => prev - 1)}
						/>
						{items()}
						<Pagination.Next
							disabled={!bookings?.hasNextPage || isRendering}
							onClick={() => setPage((prev) => prev + 1)}
						/>
						<Pagination.Last
							disabled={page == bookings?.totalPages || isRendering}
							onClick={() => setPage(bookings?.totalPages)}
						/>
					</Pagination>
				</div>
			)}
		</div>
	);
};

export default AllBookings;
