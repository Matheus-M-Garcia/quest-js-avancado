const screen = {
  userProfile: document.querySelector('.profile-data'),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class= "info">
                             <img src="${user.avatarUrl}" alt = "Foto de perfil do usuario"/>
                             <div class= "data">
                                <h1> ${user.name ?? 'Não possue nome cadastrado'}</h1>
                                <p> ${user.bio ?? 'Não possue bio cadastrado'}<p>
                                <p>👥 ${user.followers} seguidores  👥${user.following} seguindo <p>
                            </div>
                             </div> `

    let repositoriesItens = ''
    user.repositories.forEach(repo => repositoriesItens += `
      <li>
        <a href="${repo.html_url}" target="_blank">${repo.name}
        <div class="repos-data">
          <p class="repo-info">🍴${repo.forks}</p>
          <p class="repo-info">⭐${repo.stargazers_count}</p>
          <p class="repo-info">👨‍💻${repo.language??'?' }</p>
          <p class="repo-info">👀${repo.watchers}</p>
        </div></a>
        
      </li>`)

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
          <h2> Repositórios</h2>
          <ul>${repositoriesItens}</ul>
          </div>`
    }

    let eventsItems = '';

    user.events.forEach(event => {
      if ((event.type === 'CreateEvent' || event.type === 'PushEvent') && event.payload?.commits?.length > 0) {
        const repoName = event.repo.name;

        event.payload.commits.forEach(commit => {
          const message = commit.message;
          eventsItems += `<li>${repoName} - ${message}</li>`;
        });
      }
    });

    if (eventsItems) {
      this.userProfile.innerHTML += `
            <div class="events ">
              <h2>Eventos</h2> <br>
              <ul>${eventsItems}</ul>
            </div>`;
    }



  },


  renderNotFound() {
    this.userProfile.innerHTML = "<h3> Usuário não encontrado </h3>"
  }
}

export { screen }


