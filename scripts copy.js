// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const blogList = document.getElementById('blog-list');
    const searchInput = document.getElementById('search-input');

    let blogsData = []; // Array to store all blogs data

    // Function to render blog cards
    function renderBlogCards(blogs) {
        blogList.innerHTML = ''; // Clear existing blog cards

        blogs.forEach(blog => {
            const blogCard = createBlogCard(blog);
            blogList.appendChild(blogCard);
        });
    }

    // Function to create a blog card element
    function createBlogCard(blog) {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card');

        const title = document.createElement('h2');
        title.textContent = blog.title;
        blogCard.appendChild(title);

        if (blog.image) {
            const image = document.createElement('img');
            image.src = blog.image;
            image.alt = 'Blog Image';
            blogCard.appendChild(image);
        }

        const subtitle = document.createElement('p');
        subtitle.textContent = blog.subtitle;
        blogCard.appendChild(subtitle);

        const body = document.createElement('p');
        body.textContent = blog.body;
        blogCard.appendChild(body);

        const link = document.createElement('a');
        link.href = `blogs/${blog.html_filename}`;
        link.textContent = 'Read More';
        link.target = '_blank';
        blogCard.appendChild(link);

        // Add pinned indicator if the blog is pinned
        if (blog.pinned) {
            const pinnedIndicator = document.createElement('span');
            pinnedIndicator.textContent = 'Pinned';
            pinnedIndicator.classList.add('pinned-indicator');
            blogCard.appendChild(pinnedIndicator);
        }

        return blogCard;
    }

    // Function to filter and display blogs based on search query
    function filterAndDisplayBlogs() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBlogs = blogsData.filter(blog => {
            // Combine title, subtitle, and body into a single string for searching
            const combinedContent = blog.title.toLowerCase() + ' ' + blog.subtitle.toLowerCase() + ' ' + blog.body.toLowerCase();
            return combinedContent.includes(searchTerm);
        });

        renderBlogCards(filteredBlogs);
    }

    // Fetch blogs data from JSON file
    fetch('blogs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            blogsData = data; // Store all blogs data

            // Render all blogs initially
            renderBlogCards(blogsData);
        })
        .catch(error => {
            console.error('Error fetching or parsing blogs:', error);
        });

    // Event listener for search input
    searchInput.addEventListener('input', filterAndDisplayBlogs);
});
