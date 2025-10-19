import openai from "../utilities/openai.js";

function getLeadershipScore(review) {
	const ratings = review.ratings;
	const values = Object.values(ratings).filter((v) => typeof v === "number");
	const sum = values.reduce((acc, val) => acc + val, 0);

	return sum / values.length;
}

export async function encodeUser(user) {
	const menteeCount = user.mentees?.length || 0;
	const leadershipReviewScore =
		user.leadershipReviews.length > 0
			? user.leadershipReviews.reduce(
					(acc, review) => acc + getLeadershipScore(review),
					0
			  ) / user.leadershipReviews.length
			: 0;
	const eduMap = {
		"high school": 0.2,
		polytechnic: 0.3,
		diploma: 0.4,
		bachelor: 0.6,
		undergraduate: 0.6,
		master: 0.8,
		postgraduate: 0.8,
		doctor: 1.0,
		phd: 1.0,
	};

	let educationScore = 0;
	for (const edu of user.education || []) {
		const degree = edu.degree?.toLowerCase() || "";
		for (const [key, value] of Object.entries(eduMap)) {
			if (degree.includes(key) && value > educationScore) {
				educationScore = value;
			}
		}
	}

	const departmentEmb = await openai.getEmbedding(user.department);
	const unitEmb = await openai.getEmbedding(user.unit);

	const skillsText = user.skills.map((s) => s.name).join(", ");
	const skillEmb = await openai.getEmbedding(skillsText);

	const outcomesText = user.projects.flatMap((p) => p.outcomes).join(", ");
	const outcomesEmb = await openai.getEmbedding(outcomesText);

	let numericFeatures = [menteeCount, leadershipReviewScore, educationScore];

	numericFeatures = numericFeatures.concat(
		departmentEmb,
		unitEmb,
		skillEmb,
		outcomesEmb
	);

	return numericFeatures;
}
