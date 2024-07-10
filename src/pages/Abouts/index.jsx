import { TextLessMore } from "@components";

import { useNavigate } from "react-router-dom";

const Abouts = () => {
	const navigate = useNavigate();
	const aboutSplitText = [
		{
			firstHeadingText:
				"Dan brings a wealth of experience to SplitMart as a tech executive, US Army officer, and life-long athlete. Dan's passion for health and fitness began as a high school student, where he earned letters in 4 varsity sports and a championship ring in baseball. While attending the United States Military Academy at West Point, he earned the prestigious Master of the Sword award for graduating at the top of his class in physical education and athletic excellence. Serving within the elite Special Operations Command, he learned the top techniques for human performance optimization and applied them as an officer in charge of Soldier training. As a current US Army Reserve battalion commander, Dan is responsible for the training and fitness of the 100+ Soldiers under his command. Recreationally, Dan is an expert skier and snowboarder, a Boston Marathon finisher, a Spartan Beast finisher, and has completed multiple century-ride cycling events including riding from Seattle to Portland and Seattle to Vancouver. During the week you can find Dan at his local gym or providing his consulting services to group fitness instructors.",
		},
		{
			secondHeadingText:
				"Growing up, Allen experienced and saw firsthand how health and fitness can elevate a person’s quality of life and unlock everyone's best who participates. Allen’s purpose is to be a bridge connecting people to flourishing pathways. Health and Fitness has been a foundational element in his life, helping unlock tremendous opportunities for him and his community. Allen played baseball, tennis, and soccer from the age of 4 in community leagues. While attending Georgia Institute of Technology, he walked on the number 1 Varsity Baseball and Track and Field teams.  With the grit, teamwork and mental agility developed on the field, Allen transitioned to serve as an Officer in the US Marine Corps. He was the lead physical fitness instructor for over 300 servicemen and women, helping ensure combat fitness for deployment. Additionally, Allen has taken these learnings and now helps young kids develop core physical fitness through youth sports. He is an advocate for how health and fitness can improve a person’s optimism, perseverance and outlook, and he is equally passionate about SplitMart’s mission to unlock access to enriched health and fitness resources for people and communities everywhere.",
		},
	];

	return (
		<div>
			{/* abouts */}
			<div className="container px-3 px-lg-0 mt-2">
				<h1 className="fs-50 fw-700">About Us</h1>
				<div className="straight-line straight-w straight-ones d-block d-lg-none"></div>

				<div className="row align-items-center mt-3">
					{/* <div className="col-lg-4 order-1 order-lg-0">
						<div className="reload-img">
							<img src="/assets/images/Reload.png" alt="reload" />
						</div>
					</div> */}
					<div className="col-lg-12">
						<div className="fs-18 purpose-color">
							SplitMart makes it easy to list, manage and join 1:1 or group fitness/wellness/and sports training
							sessions, leading to greater connections, better value, and more success for all. SplitMart Inc., is a
							Delaware registered US company with headquarters in Orange County, California.
						</div>
						<div className="d-block d-md-none">
							<div className="purpose-color-1">
								SplitMart makes it easy to list, manage, and join personal or group fitness, wellness, and sports
								training sessions. SplitMart leads to greater connections, better value, and more success for all.
								SplitMart Inc., is a Delaware registered US company with headquarters in Orange County, California.
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Advisory Team */}
			<div>
				<div className="straight-line"></div>
				<div className="container px-3 px-lg-0">
					<h2 className="fs-approach fw-700 light-blues-text">Our Advisors</h2>

					<div className="row mt-5">
						<div className="col-lg-3">
							<div className="d-flex flex-column align-items-center">
								<div className="ad-team-img">
									<img src="/assets/images/ad-team1.png" alt="ad-team" />
								</div>
								<div className="mors-font fw-700 light-blues-text mt-3">Dan Morse</div>
							</div>
						</div>
						<div className="col-lg-9 mt-2 mt-lg-0">
							<div className="fs-18 purpose-color">
								<span className="fw-700"> Dan</span> brings a wealth of experience to SplitMart as a tech executive, US
								Army officer, and life-long athlete. Dan's passion for health and fitness began as a high school
								student, where he earned letters in 4 varsity sports and a championship ring in baseball.
							</div>
							<div className="fs-18 purpose-color my-4">
								While attending the United States Military Academy at West Point, he earned the prestigious Master of
								the Sword award for graduating at the top of his class in physical education and athletic excellence.
								Serving within the elite Special Operations Command, he learned the top techniques for human performance
								optimization and applied them as an officer in charge of Soldier training. As a current US Army Reserve
								battalion commander, Dan is responsible for the training and fitness of the 100+ Soldiers under his
								command.
							</div>
							<div className="fs-18 purpose-color">
								Recreationally, Dan is an expert skier and snowboarder, a Boston Marathon finisher, a Spartan Beast
								finisher, and has completed multiple century-ride cycling events including riding from Seattle to
								Portland and Seattle to Vancouver. During the week you can find Dan at his local gym or providing his
								consulting services to group fitness instructors.
							</div>
							<div className="d-block d-md-none">
								<div className="mt-3 purpose-color-1 mt-3 bio-handle">
									<TextLessMore text={aboutSplitText[0].firstHeadingText} maxCharacters={310} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* allen */}
			<div className="straight-line d-block d-lg-none"></div>

			<div className="container px-4 px-lg-0">
				<div className="straight-line d-none d-lg-block"></div>
				<div className="row mt-4">
					<div className="col-lg-3">
						<div className="d-flex flex-column align-items-center">
							<div className="ad-team-img">
								<img src="/assets/images/ad-team22.png" alt="ad-team2" />
							</div>
							<div className="mors-font fw-700 light-blues-text mt-3">Allen McClinton</div>
						</div>
					</div>
					<div className="col-lg-9 mt-2 mt-lg-0">
						<div className="fs-18 purpose-color">
							Growing up, <span className="fw-700">Allen</span> experienced and saw firsthand how health and fitness can
							elevate a person’s quality of life and unlock everyone's best who participates. Allen’s purpose is to be a
							bridge connecting people to flourishing pathways. Health and Fitness has been a foundational element in
							his life, helping unlock tremendous opportunities for him and his community.
						</div>
						<div className="fs-18 purpose-color my-4">
							Allen played baseball, tennis, and soccer from the age of 4 in community leagues. While attending Georgia
							Institute of Technology, he walked on the number 1 Varsity Baseball and Track and Field teams.  With the
							grit, teamwork and mental agility developed on the field, Allen transitioned to serve as an Officer in the
							US Marine Corps. He was the lead physical fitness instructor for over 300 servicemen and women, helping
							ensure combat fitness for deployment.
						</div>
						<div className="fs-18 purpose-color">
							Additionally, Allen has taken these learnings and now helps young kids develop core physical fitness
							through youth sports. He is an advocate for how health and fitness can improve a person’s optimism,
							perseverance and outlook, and he is equally passionate about SplitMart’s mission to unlock access to
							enriched health and fitness resources for people and communities everywhere.
						</div>
						<div className="d-block d-md-none">
							<div className="mt-3 purpose-color-1 mt-3 bio-handle">
								<TextLessMore text={aboutSplitText[1].secondHeadingText} maxCharacters={190} />
							</div>
						</div>
						<div className="about-btns">
							<button className="primary-btn" onClick={() => navigate("/")}>
								Book/List
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Approach */}
			{/* <div className="straight-line"></div>

			<div className="container">
				<div className="row mb-5 pb-3">
					<div className="col-md-12">
						<h2 className="fs-approach fw-700 light-blues-text">Approach</h2>
						<div className="fs-18 purpose-color mt-3">
							Our focus is to enable people to seamlessly list, manage and join group or 1:1 fitness, wellness and
							sports training sessions per their preference.
						</div>
						<div className="straight-line d-block d-lg-none"></div>

						<div className="mt-3 d-block d-lg-none">
							<button className="primary-btn w-100">Book/List</button>
						</div>
						<div className="mt-3 d-none d-lg-block">
							<button className="primary-btn w-200">Book/List</button>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default Abouts;
