export const getImageFromId = id => {
	// const response = await fetch('https://picsum.photos/list')
	// // const { author, post_url } = await response.json();
	// const jsonResponse = await response.json();
	// const imgUrl = jsonResponse[0].post_url;

	// console.log(imgUrl)
	// // return imgUrl;
	return `https://picsum.photos/300/300?image=${id}`;
};