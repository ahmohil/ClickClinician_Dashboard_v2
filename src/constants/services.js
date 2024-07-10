export const SubCategories = [
	{
		category: "personal-training",
		// icon: "icon-park-outline:dribble",
		img: "/assets/category/personal-training.png",

		subCategories: [
			{ name: "body-building" },
			{ name: "developmental" },
			{ name: "holistic" },
			{ name: "nutrition" },
			{ name: "prenatal" },
			{ name: "post-natal" },
			{ name: "general" },
		],
	},
	{
		category: "pilates",
		// icon: "guidance:pilates",
		img: "/assets/category/pilates.png",

		subCategories: [
			{ name: "contemporary-pilates" },
			{ name: "equipment" },
			{ name: "lagree" },
			{ name: "mat" },
			{ name: "piyo" },
			{ name: "prenatal" },
			{ name: "post-natal" },
			{ name: "reformer" },
			{ name: "yogalates" },
			{ name: "general" },
		],
	},
	{
		category: "sports",
		// icon: "ic:baseline-sports-tennis",
		img: "/assets/category/sports.png",

		subCategories: [
			{ name: "baseball" },
			{ name: "basketball" },
			{ name: "bike-riding" },
			{ name: "cycling" },
			{ name: "dodgeball" },
			{ name: "golf" },
			{ name: "lacrosse" },
			{ name: "pickleball" },
			{ name: "running" },
			{ name: "soccer" },
			{ name: "swimming" },
			{ name: "tennis" },
			{ name: "volleyball" },
			{ name: "water-sports" },
			{ name: "football" },
			{ name: "boxing" },
			{ name: "surfing" },
			{ name: "other" },
		],
	},
	{
		category: "weight-training",
		icon: "emojione-monotone:person-lifting-weights",
		subCategories: [
			{ name: "arms" },
			{ name: "bodybuilding" },
			{ name: "butt-legs" },
			{ name: "chest-back-shoulders" },
			{ name: "competition" },
			{ name: "core" },
			{ name: "full-body" },
			{ name: "prenatal" },
			{ name: "post-natal" },
			{ name: "reformer" },
			{ name: "power-lifting" },
			{ name: "general" },
		],
	},
	{
		category: "yoga",
		// icon: "grommet-icons:yoga",
		img: "/assets/category/yoga.png",

		subCategories: [
			{ name: "anusara" },
			{ name: "ashtanga" },
			{ name: "bikram" },
			{ name: "buti" },
			{ name: "chair" },
			{ name: "gentle" },
			{ name: "hatha" },
			{ name: "heated" },
			{ name: "iyengar" },
			{ name: "jivamukti" },
			{ name: "kids" },
			{ name: "kundalini" },
			{ name: "piyo" },
			{ name: "prenatal" },
			{ name: "post-natal" },
			{ name: "power-vinyasa" },
			{ name: "restorative" },
			{ name: "triyoga" },
			{ name: "yin-yang" },
			{ name: "yoga-sculpt" },
			{ name: "general" },
		],
	},
	{
		category: "martial-arts",
		// img: "/assets/category/yoga.png",

		icon: "guidance:boxing",
		subCategories: [
			{ name: "grappling" },
			{ name: "jiu-jitsu" },
			{ name: "judo" },
			{ name: "karate" },
			{ name: "krav-maga" },
			{ name: "kung-fu" },
			{ name: "mma-mixed-martial-arts" },
			{ name: "self-defense" },
			{ name: "tricking" },
			{ name: "wrestling" },
			{ name: "general" },
			{ name: "kickboxing" },
		],
	},
	{
		category: "dance",
		img: "/assets/category/dancing.png",

		subCategories: [
			{ name: "ballet" },
			{ name: "ballroom" },
			{ name: "belly dance" },
			{ name: "contemporary" },
			{ name: "drumming" },
			{ name: "hip hop" },
			{ name: "hooping" },
			{ name: "hula" },
			{ name: "jazzercise" },
			{ name: "line dancing" },
			{ name: "pole fitness" },
			{ name: "salsa" },
			{ name: "swing" },
			{ name: "tango" },
			{ name: "zumba" },
			{ name: "general" },
			{ name: "latin" },
			{ name: "clogging" },
			{ name: "irish" },
		],
	},
];

export const Categories = SubCategories.map((item) => ({ name: item.category, icon: item.icon, img: item.img }));

export const categories1 = [
	{
		name: "Pilates",
		value: "pilates",
		img: "/assets/images/listing1.png",
	},
	// {
	// 	name: "Swimming",
	// 	value: "swimming",

	// 	img: "/assets/images/listing2.png",
	// },

	{
		name: "Dance",
		value: "dance",

		img: "/assets/images/dance.png",
	},

	{
		name: "Sports",
		value: "sports",

		img: "/assets/images/listing3.png",
	},
	{
		name: "Yoga",
		value: "yoga",

		img: "/assets/images/listing4.png",
	},
	{
		name: "Personal Training",
		value: "personal-training",
		img: "/assets/images/listing5.png",
	},
	{
		name: "Weight Training",
		value: "weight-training",
		img: "/assets/images/listing6.png",
	},
];

export const listing = [
	{
		img: "/assets/images/dance.png",
		title: "Dance Class",
		distance: "4 Miles away",
		price: "$35",
		rating: "4.5",
	},
	{
		img: "/assets/images/basket-ball.png",
		title: "Basketball Training",
		distance: "4 Miles away",
		price: "$45",
		rating: "4.5",
	},
	{
		img: "/assets/images/soccer.png",
		title: "Coaching for Soccer",
		distance: "4 Miles away",
		price: "$30",
		rating: "4.5",
	},
];

export const reviewCard = [
	{
		review: "It is so easy to join group or 1:1 sessions with SplitMart",
		name: "Chris",
		designation: "Customer",
	},
	{
		review: "SplitMart enables trainers to attract more customers",
		name: "Dean",
		designation: "Trainer/Coach",
	},
	{
		review: "It provides significant payment protections",
		name: "Bella",
		designation: "Customer",
	},
];

export const SessionPreferenceOptions = [
	{ label: `Group`, value: `group` },
	{ label: `1:1`, value: `private` },
];

export const AgeCategories = [
	{ label: "Children & Adolescence (Ages 6 -17)", value: "children" },
	{ label: "Adults (Ages 18 - 64)", value: "adult" },
	{ label: "Seniors (Ages 65+)", value: "seniors" },
	{ label: "Disabled and Chronically", value: "disabled" },
];

export const DeliveryModeOptions = [
	{ label: `Online`, value: `online` },
	{ label: `In person`, value: `in-person` },
	{ label: `Online & In person`, value: `both` },
];

export const ParticipantLevelOptions = [
	{ label: `Beginner`, value: `beginner` },
	{ label: `Intermediate`, value: `intermediate` },
	{ label: `Advanced`, value: `advanced` },
	{ label: `Elite`, value: `elite` },
];

export const CenterTypeOptions = [
	{ label: `Gym/Court/Space (Private)`, value: `none-home` },
	{ label: `Gym/Court/Space (Public)`, value: `home` },
];

export const EnvironmentTypeOptions = [
	{ label: `Indoor`, value: `indoor` },
	{ label: `Outdoor`, value: `outdoor` },
	{ label: `Indoor and Outdoor`, value: `both` },
];

export const DefaultRadioOptions = [
	{ label: `Yes`, value: `yes` },
	{ label: `No`, value: `no` },
];

export const DeliveryTypeOption = [
	{ label: `online`, value: `online` },
	{ label: `in-person`, value: `in-person` },
	{ label: `both`, value: `both` },
];

export const RestRoomAccessOptions = [
	{ label: `Residence bathroom (Bathroom located inside residence or facility)`, value: `public` },
	{
		label: `Private restroom (Detached restroom)`,
		value: `private`,
	},
	{
		label: `No restroom`,
		value: `none`,
	},
];

export const ExperienceOptions = [
	{
		label: `1-2 years`,
		value: `1-2`,
	},
	{ label: `3-5 years`, value: `3-5` },
	{ label: `5-9+ years`, value: `5-9` },
];

export const LanguagesOptions = [
	{ label: "American Sign Language", value: "american-sign-language" },
	{ label: "Arabic", value: "arabic" },
	{ label: "Chinese (Mandarin)", value: "chinese-mandarin" },
	{ label: "English", value: "english" },
	{ label: "French", value: "french" },
	{ label: "German", value: "german" },
	{ label: "Hindi", value: "hindi" },
	{ label: "Japanese", value: "japanese" },
	{ label: "Korean", value: "korean" },
	{ label: "Portuguese", value: "portuguese" },
	{ label: "Russian", value: "russian" },
	{ label: "Spanish", value: "spanish" },
	{ label: "Tagalog", value: "tagalog" },
];

export const TimeZoneOptions = [
	{ label: "Hawaii", value: "Pacific/Honolulu", offset: -600 },
	{ label: "Alaska", value: "America/Anchorage", offset: -540 },
	{ label: "Pacific Time", value: "America/Los_Angeles", offset: -480 },
	{ label: "Mountain Time", value: "America/Denver", offset: -420 },
	{ label: "Arizona", value: "America/Phoenix", offset: -420 },
	{ label: "Central Time", value: "America/Chicago", offset: -360 },
	{ label: "Indiana (East)", value: "America/Indiana/Indianapolis", offset: -300 },
	{ label: "Eastern Time", value: "America/New_York", offset: -300 },
	{ label: "Pakistan Standard Time", value: "Asia/Karachi", offset: 300 },
	{ label: "Bangladesh Standard Time", value: "Asia/Dhaka", offset: 360 },
];

export const CertificationsOptions = [
	{ label: "Certified trainer", value: "certified-trainer" },
	{ label: "Registered trainer", value: "registered-trainer" },
	{ label: "CPR trained", value: "cpr-trained" },
	{ label: "First aid trained", value: "first-aid-trained" },
	{ label: "Special needs training experience", value: "special-needs-training-experience" },
	{ label: "None", value: "none" },
	{ label: "Other", value: "other" },
];

export const BufferTimeOptions = [
	{ label: "No buffer time needed", value: "none" },
	{ label: "15 Minutes of Buffer Time", value: "quarter-hour" },
	{ label: "30 Minutes of Buffer Time", value: "half-hour" },
	{ label: "60 Minutes of Buffer Time", value: "one-hour" },
];

export const BookingTimeOptions = [
	{ label: "30 mins", value: "half-hour" },
	{ label: "1 hour", value: "one-hour" },
	{ label: "90 mins", value: "ninety-minutes" },
	{ label: "2 hours", value: "two-hours" },
];

export const InstaBookingOptions = [
	{ label: "Enable instabook", value: "yes" },
	{ label: "Disable instabook", value: "no" },
];

export const CancellationOptions = [
	{
		label: "Moderate: Customers can request a full refund up to 48 hours before session start time",
		value: "moderate",
	},
	{
		label: "Flexible: Customers can request a full refund up to 24 hours before session start time",
		value: "flexible",
	},
];

export const RefrenceOptions = [
	{ label: "Search engine (Google, Yahoo etc.)", value: "search-engine" },
	{ label: "Recommended by friend or colleague", value: "recommended" },
	{ label: "Social media (Facebook, Instagram, etc.)", value: "social-media" },
	{ label: "Blog or publication", value: "blog-or-publication" },
	{ label: "Others", value: "other" },
];

export const DefaultOption = {
	label: "All",
	value: "all",
};
