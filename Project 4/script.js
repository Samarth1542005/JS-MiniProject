const usernameInput = document.getElementById("username-input");
const searchBtn = document.getElementById("search-btn");
const profileCard = document.getElementById("profile-card");
const errorMsg = document.getElementById("error-msg");

const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");
const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const profileLink = document.getElementById("profile-link");

async function fetchProfile(user) {
    try {
        const response = await fetch(`https://api.github.com/users/${user}`);

        if (!response.ok) {
            throw new Error("User not found");
        }

        const data = await response.json();

        avatar.src = data.avatar_url;
        name.textContent = data.name || data.login;
        username.textContent = `@${data.login}`;
        bio.textContent = data.bio || "No bio available.";
        repos.textContent = data.public_repos;
        followers.textContent = data.followers;
        following.textContent = data.following;
        profileLink.href = data.html_url;

        profileCard.classList.remove("hidden");
        errorMsg.classList.add("hidden");
    } catch (error) {
        profileCard.classList.add("hidden");
        errorMsg.classList.remove("hidden");
    }
}

searchBtn.addEventListener("click", () => {
    const user = usernameInput.value.trim();
    if (user) {
        fetchProfile(user);
    }
});

usernameInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const user = usernameInput.value.trim();
        if (user) {
            fetchProfile(user);
        }
    }
});
