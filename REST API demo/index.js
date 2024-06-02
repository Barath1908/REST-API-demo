document.getElementById("fetch-posts").addEventListener("click", fetchContents);

function fetchContents() {
  const loadingIndicator = document.getElementById("loader");
  const postsContainer = document.getElementById("posts-container");
  const usersContainer = document.getElementById("users-container");
  const commentsContainer = document.getElementById("comments-container");

  loadingIndicator.style.display = "block";
  postsContainer.innerHTML = "";
  usersContainer.innerHTML = "";
  commentsContainer.innerHTML = "";

  const urls = [
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/comments",
  ];

  const fetchPromises = urls.map((url) =>
    fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error("Error in Network response :" + response.statusText);
      }
      return response.json();
    })
  );

  Promise.all(fetchPromises)
    .then((data) => {
      const [posts, users, comments] = data;

      loadingIndicator.style.display = "none";

      // Display posts
      posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                        `;
        postsContainer.appendChild(postElement);
      });

      // Display users
      users.forEach((user) => {
        const userElement = document.createElement("div");
        userElement.classList.add("user");
        userElement.innerHTML = `
                            <h3>${user.name}</h3>
                            <p><span style="font-weight: bold;">Email:</span> ${user.email}</p>
                            <hr>
                        `;
        usersContainer.appendChild(userElement);
      });

      // Display comments
      comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
                            
                            <p><span style="font-weight: bold;">PostId:</span> ${comment.postId}</p>
                            <p><span style="font-weight: bold;">Id:</span> ${comment.id}</p>
                            <p><span style="font-weight: bold;">Name:</span> ${comment.name}</p>
                            <p><span style="font-weight: bold;">Email:</span> ${comment.email}</p>
                            <p><span style="font-weight: bold;">Comment:</span> ${comment.body}</p>
                            <hr>
                        `;
        commentsContainer.appendChild(commentElement);
      });
    })

    .catch((error) => {
      loadingIndicator.style.display = "none";
      console.error("Error fetching data:", error);
      postsContainer.innerHTML = `<p>Error occured when fetching posts: ${error.message}</p>`;
      usersContainer.innerHTML = `<p>Error occured when fetching users: ${error.message}</p>`;
      commentsContainer.innerHTML = `<p>Error occured when fetching comments: ${error.message}</p>`;
    });
}
