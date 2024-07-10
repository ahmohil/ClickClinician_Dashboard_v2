import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

export default function Footer() {
	return (
		<>
			<footer>
				<div className="container">
					<div className="pb-lg-5 pb-4">
						<Link to="/" className="footer-logo">
							<img src="/assets/images/logo.svg" alt="" />
						</Link>
					</div>

					<div className="row">
						<div className="col-md-9">
							<div className="row ">
								<div className="col-md-4 col-6 mb-4">
									<h6 className="fw-600 gray-text mb-4 fs-14">About us</h6>
									<ul>
										<li>
											<Link to="/about" className="pointer footer-link">
												About SplitMart
											</Link>
										</li>
										<li>
											<Link to="/contact-us" className="pointer footer-link">
												Contact Us
											</Link>
										</li>{" "}
										{/* <li>
											<Link to="/purpose" className="pointer footer-link">
												Purpose
											</Link>
										</li>{" "} */}
										{/* <li>
											<Link to="/about" className="pointer footer-link">
												About splitmart
											</Link>
										</li>{" "} */}
									</ul>
								</div>
								<div className="col-md-4 col-6 mb-4">
									<h6 className="fw-600 gray-text mb-4 fs-14">How to</h6>
									<ul>
										<li>
											<Link className="pointer footer-link" to={"/provider"}>
												List
											</Link>
										</li>
										<li>
											<Link
												className="pointer footer-link"
												to="/"
												onClick={() => localStorage.setItem("waitList", JSON.stringify({ type: "customer" }))}>
												Book
											</Link>
										</li>
									</ul>
								</div>
								<div className="col-md-4 col-6 mb-4 border-end">
									<h6 className="fw-600 gray-text mb-4 fs-14">More Links</h6>
									<ul>
										<li>
											<Link to="/terms-of-services" className="pointer footer-link">
												Terms of service
											</Link>
										</li>
										<li>
											<Link to="/privacy-policy" className="pointer footer-link">
												Privacy policy
											</Link>
											<a className="pointer footer-link"></a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-3 ps-lg-5">
							<h6 className="fw-700 gray-text mb-4 fs-14">SplitMart</h6>
							<p className="fw-500 gray-text mb-4 fs-14"> Save, earn, and connect with people near you</p>
							<div className="d-flex align-items-center justify-content-between">
								<div className="d-flex gap-4">
									<a
										className="pointer footer-ic"
										target="_blank"
										rel="noreferrer"
										href="https://www.facebook.com/thesplitmart/">
										<img src="/assets/images/fb.svg" />
									</a>
									<a
										className="pointer footer-ic fs-24"
										target="_blank"
										rel="noreferrer"
										href="https://twitter.com/thesplitmart/">
										<iconify-icon icon="pajamas:twitter"></iconify-icon>
									</a>
									<a
										className="pointer footer-ic"
										target="_blank"
										rel="noreferrer"
										href="https://www.instagram.com/thesplitmart/">
										<img src="/assets/images/insta.svg" />
									</a>
								</div>
								<Dropdown className="language-dropdown d-block d-md-none">
									<Dropdown.Toggle variant="success" id="dropdown-basic">
										USA (English)
									</Dropdown.Toggle>

									{/* <Dropdown.Menu>
										<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
										<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
										<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
									</Dropdown.Menu> */}
								</Dropdown>
							</div>
						</div>
					</div>
					<div className="sub-footer pt-4 pt-lg-5 mb-md-5 pb-md-5">
						<div className="d-flex justify-content-between">
							<div className="d-flex align-items-center gap-4">
								<p className="mb-0">©2023 SplitMart, Inc. All rights reserved.</p>
							</div>
							<Dropdown className="language-dropdown d-none d-md-block">
								<Dropdown.Toggle variant="success" id="dropdown-basic">
									USA (English)
								</Dropdown.Toggle>

								{/* <Dropdown.Menu>
									<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
									<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
									<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
								</Dropdown.Menu> */}
							</Dropdown>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
