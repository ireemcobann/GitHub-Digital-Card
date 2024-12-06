const lightthemeBtn = document.querySelector('.lightthemeBtn');
const darkthemeBtn = document.querySelector('.darkthemeBtn');

darkthemeBtn.addEventListener("click", () => {
  document.body.classList.add("dark-mode"); 
  darkthemeBtn.style.display = 'none'; 
  lightthemeBtn.style.display = 'block'; 
});

lightthemeBtn.addEventListener("click", () => {
  document.body.classList.remove("dark-mode"); 
  lightthemeBtn.style.display = 'none';
  darkthemeBtn.style.display = 'block';
});


const inputText = document.querySelector('.input');
const searchBtn = document.querySelector('.searchBtn');
const githubProfileHeader = document.querySelector('.github-content-header');
const githubProfileReactions = document.querySelector('.github-content-reactions .view-reactions');
const githubFooter = document.querySelector('.github-footer');

searchBtn.addEventListener("click", () => {
  const username = inputText.value.trim().toLowerCase();

  if (!username) {
    githubProfileHeader.innerHTML = `<p style="color: red;">Lütfen bir kullanıcı adı girin!</p>`;
    return;
  }


  // bu kısımı chatgpt ye sordum
  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        githubProfileHeader.innerHTML = `<p style="color: red;">Kullanıcı bulunamadı!</p>`;
        return null;
      }
      return response.json();
    })
    .then(user => {
      if (user) {
        updateProfile(user);
      }
    });
});
  // bu kısımı chatgpt ye sordum


function updateProfile(user) {
  githubProfileHeader.innerHTML = `
    <img src="${user.avatar_url}" width = 150px>
    <div class="github-profile-text">
      <h3>${user.name || "İsim Belirtilmemiş"}</h3>
      <span>@${user.login}</span>
    </div>`;

  // Reaksiyonlar
  githubProfileReactions.innerHTML = `
    <div class="reaction">
      <p>Repos</p>
      <span>${user.public_repos}</span>
    </div>
    <div class="reaction">
      <p>Followers</p>
      <span>${user.followers}</span>
    </div>
    <div class="reaction">
      <p>Following</p>
      <span>${user.following}</span>
    </div>`;

  // Footer Bilgileri
  githubFooter.innerHTML = `
    <div class="footer-left">
      <div class="footer-info">
        <i class="fa-solid fa-location-dot"></i>
        <p>${user.location || "Not Available"}</p>
      </div>
      <div class="footer-info">
        <i class="fa-solid fa-link"></i>
        <p>${user.blog || "Not Available"}</p>
      </div>
    </div>
    <div class="footer-right">
      <div class="footer-info">
        <i class="fa-brands fa-twitter"></i>
        <p>${user.twitter_username || "Not Available"}</p>
      </div>
      <div class="footer-info">
        <i class="fa-solid fa-building"></i>
        <p>${user.company || "Not Available"}</p>
      </div>
    </div>`;
}
