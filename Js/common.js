// Function to handle logout
function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    alert('You have been logged out!');
    updateNavLinks();
    updateAuthButton(); 
    window.location.href = "../Html/home.html";
}

// Function to update the auth button based on login status
function updateAuthButton() {
    const authButton = document.getElementById('auth-button');
    if (!authButton) {
        console.error('Auth button not found');
        return;
    }
    
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn) {
        authButton.innerHTML = '<i class="fas fa-sign-out-alt icon-space"></i>Logout';
        authButton.onclick = logoutUser;
        authButton.classList.remove('login-btn');
        authButton.classList.add('logout-btn'); 
    } else {
        authButton.innerHTML = '<i class="fas fa-sign-in-alt icon-space"></i>Login';
        authButton.onclick = redirectToLogin;
        authButton.classList.remove('logout-btn');
        authButton.classList.add('login-btn');
    }
}

// Function to update the navigation links based on user role
function updateNavLinks() {
    const myCoursesLink = document.getElementById('my-courses-link');
    const addCoursesLink = document.getElementById('add-courses-link');
    const userRole = localStorage.getItem('userRole');

    if (myCoursesLink && addCoursesLink) {
        if (userRole === 'tutor') {
            myCoursesLink.style.display = 'inline-block';
            addCoursesLink.style.display = 'inline-block';
        } else {
            myCoursesLink.style.display = 'none';
            addCoursesLink.style.display = 'none';
        }
    } else {
        console.error('Navigation links not found');
    }
}

// Function to redirect to the login page
function redirectToLogin() {
    window.location.href = "../Html/login.html";
}
function registerUser() {
    window.location.href = "../Html/signup.html";
}

// Update the nav links and auth button on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavLinks();
    updateAuthButton();
});

// Active Page underline
document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize the hamburger menu
    function initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navbarContainer = document.querySelector('.navbar-container');
        
        if (hamburger && navbarContainer) {
            // Add click event to toggle the menu
            hamburger.addEventListener('click', () => {
                navbarContainer.classList.toggle('nav-active');
            });
        }
    }

    // Initialize the hamburger menu
    initHamburgerMenu();
});

// Redirect to Course Page with Course Detail
function openCourseDetail(courseName) {
    localStorage.setItem('selectedCourse', courseName);
    window.location.href = "../Html/course.html";
}

// Load Course Details on Course Page
// document.addEventListener('DOMContentLoaded', () => {
//     const courseTitle = document.getElementById('course-title');
//     const courseDescription = document.getElementById('course-description');
    
//     if (courseTitle && courseDescription) {
//         const selectedCourse = localStorage.getItem('selectedCourse');
//         if (selectedCourse) {
//             courseTitle.textContent = selectedCourse;
//             courseDescription.textContent = `${selectedCourse} Description: This course covers everything you need to know about ${selectedCourse}.`;
//         }
//     } else {
//         console.error("Course title or description element not found");
//     }
// });


// People Says - Testimonial Carousel
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const testimonials = document.querySelectorAll('.testimonial-item');

    if (prevBtn && nextBtn && testimonials.length > 0) {
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.remove('active');
                testimonial.style.display = 'none';
                if (i === index) {
                    testimonial.classList.add('active');
                    testimonial.style.display = 'block';
                }
            });
        }

        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial > 0) ? currentTestimonial - 1 : testimonials.length - 1;
            showTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial < testimonials.length - 1) ? currentTestimonial + 1 : 0;
            showTestimonial(currentTestimonial);
        });

        showTestimonial(currentTestimonial);
    }
});

// Tutor and student pages
document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole') || 'user';
    const navLinks = document.querySelector('.nav-links');

    if (navLinks) {
        let linksHtml = `
            <li><a href="../Html/home.html">Home</a></li>
            <li><a href="../Html/course.html">Courses</a></li>
            <li><a href="../Html/contact.html">Contact</a></li>
        `;
    
        if (userRole === 'tutor') {
            linksHtml += `
                <li><a href="../Html/mycourse.html">My Courses</a></li>
                <li><a href="..//Html/addcourse.html">Add Courses</a></li>
            `;
        }
    
        navLinks.innerHTML = linksHtml;
    }
});

// Active Page underline
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links li a');

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    
        navLinks.forEach(link => {
            if (link.getAttribute('href').includes(currentPath)) {
                link.classList.add('active');
            }
        });
    }
});

// Course Page JS
function openCourseDetails(courseId) {
    const cardContainer = document.querySelector('.card-container');
    const courseDetails = document.getElementById(courseId);
    const headerTitle = document.querySelector('h1');

    if (cardContainer && courseDetails && headerTitle) {
       
        cardContainer.style.display = 'none';
        courseDetails.classList.add('active');
    
        const courseTitle = courseDetails.querySelector('.course-title').innerHTML;
        headerTitle.innerHTML = courseTitle;
    
        let backButton = document.querySelector('.back-button');
        if (!backButton) {
            backButton = document.createElement('button');
            backButton.className = 'back-button';
            backButton.textContent = 'Back to Courses';
            backButton.onclick = closeCourseDetails;
            document.querySelector('.course-container').prepend(backButton);
        }
    
        backButton.style.display = 'block';
    }
}

function closeCourseDetails() {
    const activeCourseDetails = document.querySelector('.course-details.active');
    const cardContainer = document.querySelector('.card-container');
    const backButton = document.querySelector('.back-button');
    const headerTitle = document.querySelector('h1');

    if (activeCourseDetails && cardContainer && backButton && headerTitle) {
        activeCourseDetails.classList.remove('active');
        cardContainer.style.display = 'flex';
        backButton.style.display = 'none';
        headerTitle.innerHTML = "Course Overview";
    }
}

// Register User Form
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const role = document.getElementById('role').value;
    
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
    
            const user = {
                email: email,
                password: password,
                role: role
            };
    
            localStorage.setItem(username, JSON.stringify(user));
            alert('Registration successful!');
            window.location.href = "../Html/login.html";
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split("/").pop(); // Get the last part of the URL (e.g., 'mycourse.html')
    const navLinks = document.querySelectorAll('.nav-links li a');

    // Remove 'active' class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add 'active' class to the link that matches the current page
    navLinks.forEach(link => {
        const hrefPath = link.getAttribute('href').split("/").pop(); // Get the last part of the href (e.g., 'mycourse.html')
        if (hrefPath === currentPath) {
            link.classList.add('active');
        }
    });
});






document.addEventListener("DOMContentLoaded", function() {
    var accordions = document.querySelectorAll(".accordion");

    if (accordions.length > 0) {  // Check if there are any accordions
        accordions.forEach(function(accordion) {
            accordion.addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        });
    }
});






// Function to delete a course
function deleteCourse(index) {
    event.stopPropagation(); 
    const card = event.target.closest('.course-card');
    card.remove();
    displayPopup();

    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.splice(index, 1); // Remove the course from the array
    localStorage.setItem('courses', JSON.stringify(courses)); // Update localStorage

    // Remove the course card from the DOM
    const courseCard = document.querySelector(`.course-card[data-index='${index}']`);
    if (courseCard) courseCard.remove();

    displayPopup('Course Deleted Successfully');
}

// Function to render courses
function renderCourses() {
    const courseContainer = document.querySelector(".course-card-container");
    // courseContainer.innerHTML = ''; // Clear the current courses
    const courses = JSON.parse(localStorage.getItem('courses')) || [];

    courses.forEach((course, index) => {
        const courseCard = 
            `<div class="course-card" data-index="${index}">
                <img id="img1" src="${course.image}" alt="Course Image">
                <div class="course-date">
                    <h1>21</h1>
                    <p>December</p>
                </div>
                <div class="course-card-content">
                    <div class="course-first-row">
                        <div class="course-title-left">
                            <h2 class="course-title">${course.heading}</h2>
                            <p>${"★".repeat(course.rating)}</p>
                        </div>
                        <div class="course-actions-right">
                            <img class="course-icon" src="../images/Vector (2).png">
                            <button class="course-delete-btn" onclick="deleteCourse(${index})">
                                <img src="../images/mdi_delete.png" alt="Delete">
                            </button>
                        </div>
                    </div>
                    <div class="course-card-details">
                        <div id="course-description">
                            <p>${course.overview}</p>
                        </div>
                        <div class="course-enrollment-info">
                            <img src="../images/user-graduate-solid 2.png" alt="Students">
                            <p>Student Enroll: ${course.enroll}</p>
                        </div>
                        <div class="course-lessons-info">
                            <img src="../images/ic_outline-comment.png" alt="Lessons">
                            <p>5 Lessons</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        courseContainer.insertAdjacentHTML('beforeend', courseCard);
    });
}

// Function to show the delete popup
function displayPopup(message) {
    const popup = document.getElementById('delete-popup');
    const messageElement = document.getElementById('popup-message');
    messageElement.textContent = message;
    popup.style.display = 'flex'; 

    setTimeout(() => {
        popup.style.display = 'none'; // Hide the popup after 2 seconds
    }, 2000); // Adjust this delay as needed
}

function closePopup() {
    const popup = document.getElementById('delete-popup');
    popup.style.display = 'none';
}

window.onload = function() {
    let isFormSubmissionListenerSet = false;
    let isPhotoPreviewListenerSet = false;

    // Function to preview photo
    function previewPhoto(event) {
        const reader = new FileReader();
        reader.onload = function() {
            const output = document.getElementById('photoPreview');
            output.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    // Add event listener for photo preview
    const coursePhotoElement = document.getElementById("coursePhoto");
    if (coursePhotoElement && !isPhotoPreviewListenerSet) {
        coursePhotoElement.addEventListener("change", previewPhoto);
        isPhotoPreviewListenerSet = true;
    }

    // Add event listener for course form submission
    const addCourseFormElement = document.getElementById("addCourseForm");
    if (addCourseFormElement) {
        addCourseFormElement.addEventListener("submit", function(event) {
            event.preventDefault();

            // Get form values
            const coursePhoto = document.getElementById("coursePhoto").files[0];
            const courseHeading = document.getElementById("courseHeading").value;
            const courseOverview = document.getElementById("courseTitle").value;
            const coursePrice = document.getElementById("coursePrice").value;
            const studentEnroll = document.getElementById("studentEnroll").value;
            const courseRating = document.getElementById("courseRating").value;
            const lessonName = document.getElementById("lessonName").value;
            const lessonDescription = document.getElementById("lessonDescription").value;

            // Use FileReader to load course image
            const reader = new FileReader();
            reader.onload = function(event) {
                const imageSrc = event.target.result;

                const newCourse = {
                    image: imageSrc,
                    heading: courseHeading,
                    overview: courseOverview,
                    price: coursePrice,
                    enroll: studentEnroll,
                    rating: courseRating,
                    lesson: lessonName,
                    lessonDesc: lessonDescription
                };

                let courses = JSON.parse(localStorage.getItem('courses')) || [];
                courses.push(newCourse);
                localStorage.setItem('courses', JSON.stringify(courses));
                alert("Course added successfully!");
                document.getElementById("addCourseForm").reset();

                // Clear courseContainer innerHTML before re-rendering courses
                const courseContainer = document.querySelector(".course-card-container");
                courseContainer.innerHTML = '';

                renderCourses(); // Re-render courses after adding new one
            };

            if (coursePhoto) {
                reader.readAsDataURL(coursePhoto);
            } else {
                alert("Please upload a course photo.");
            }
        });
        isFormSubmissionListenerSet = true;
    }

    renderCourses(); // Load courses on page load
};



















