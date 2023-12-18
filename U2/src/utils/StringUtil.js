export function getByteLength(s, b, i, c) {
	for (b = i = 0; (c = s.charCodeAt(i++)); b += c >> 11 ? 2 : 1);
	return b;
}
