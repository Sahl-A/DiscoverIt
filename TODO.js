// 1 //
// Add event listener to alert the user when closing the page if there is ajax request in progress

// 2 //
// When post a post, it gets added to the state without id.
// so, if we try to delete this post without refresh, it will show an error
// Solve this error by either fetch all the posts again after adding a new post,
// or, find something to reload the page when deleting on the delete icon