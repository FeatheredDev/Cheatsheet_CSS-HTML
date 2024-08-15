// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to highlight the matched search terms
function highlight(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, `<span class="highlight">$1</span>`);
}

// Function to perform the search and highlighting
function performSearch(query) {
    // Reset all highlights
    document.querySelectorAll('.cheat-sheet').forEach(section => {
        section.innerHTML = section.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
    });

    // Filter and highlight sections
    document.querySelectorAll('.cheat-sheet').forEach(section => {
        if (section.textContent.toLowerCase().includes(query)) {
            section.style.display = ''; // Show matching section
            section.innerHTML = highlight(section.innerHTML, query);
        } else {
            section.style.display = 'none'; // Hide non-matching sections
        }
    });
}

// Event listener for input and "Enter" key in search bar
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function () {
    performSearch(searchInput.value.toLowerCase());
});

searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission (if within a form)
        performSearch(searchInput.value.toLowerCase());
    }
});
