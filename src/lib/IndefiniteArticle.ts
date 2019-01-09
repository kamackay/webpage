export function getArticleFor(phrase: string): "a" | "an" {
	// Getting the first word
	const match = /\w+/.exec(phrase);

	let word;
	if (match) {
		word = match[0];
	} else {
		return "an";
	}

	const lWord = word.toLowerCase();
	// Specific start of words that should be preceeded by 'an'
	const altCases = ["honest", "hour", "hono"];
	for (const i in altCases) {
		if (lWord.indexOf(altCases[i]) === 0) {
			return "an";
		}
	}

	// Single letter word which should be preceeded by 'an'
	if (lWord.length === 1) {
		if ("aedhilmnorsx".indexOf(lWord) >= 0) {
			return "an";
		} else {
			return "a";
		}
	}

	// Capital words which should likely be preceeded by 'an'
	if (
		word.match(
			/(?!FJO|[HLMNS]Y.|RY[EO]|SQU|(F[LR]?|[HL]|MN?|N|RH?|S[CHKLMNPTVW]?|X(YL)?)[AEIOU])[FHLMNRSX][A-Z]/
		)
	) {
		return "an";
	}

	// Special cases where a word that begins with a vowel should be preceeded by 'a'
	const regexes = [
		/^e[uw]/,
		/^onc?e\b/,
		/^uni([^nmd]|mo)/,
		/^u[bcfhjkqrst][aeiou]/
	];
	for (const i in regexes) {
		if (lWord.match(regexes[i])) {
			return "a";
		}
	}

	// Special capital words (UK, UN)
	if (word.match(/^U[NK][AIEO]/)) {
		return "a";
	} else if (word === word.toUpperCase()) {
		if ("aedhilmnorsx".indexOf(lWord[0]) >= 0) {
			return "an";
		} else {
			return "a";
		}
	}

	// Basic method of words that begin with a vowel being preceeded by 'an'
	if ("aeiou".indexOf(lWord[0]) >= 0) {
		return "an";
	}

	// Instances where y follwed by specific letters is preceeded by 'an'
	if (lWord.match(/^y(b[lor]|cl[ea]|fere|gg|p[ios]|rou|tt)/)) {
		return "an";
	}

	return "a";
}
