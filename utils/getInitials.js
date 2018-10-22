export default function getInitials(fullname) {
	const match = fullname.match(/(\w)?\w*\s*(\w)?/);
	// return "KT"
	return match ? match.slice(1).join('') : '';
}