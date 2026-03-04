const projectSection = document.getElementById("project-section");
const blogSection = document.getElementById("blog-section");
const musicSection = document.getElementById("music-section");

const navs = document.querySelectorAll("#nav-bar>h1");

navs.forEach((nav) => {
    nav.addEventListener("click", () => {
        projectSection.classList.add("deactive-section");
        blogSection.classList.add("deactive-section");
        musicSection.classList.add("deactive-section");
        if (nav.textContent == "Projects") {
            projectSection.classList.remove("deactive-section");
        }
        else if (nav.textContent == "Blog") {
            blogSection.classList.remove("deactive-section");
        }
        else if (nav.textContent == "Music") {
            musicSection.classList.remove("deactive-section");
        }
        navs.forEach((nav) => {
            nav.classList.remove("active-nav");
        })
        nav.classList.add("active-nav");

    })
})