let selectedTeams = [];

document
  .querySelector(".filters .lcs-holder img")
  .addEventListener("click", () => {
    selectedTeams = [];
    document
      .querySelectorAll(".active")
      .forEach((img) => img.classList.remove("active"));
    putGamesOnPage(LockIn22);
  });

document.querySelectorAll(".filters .team-holder img").forEach((img) => {
  img.addEventListener("click", () => {
    if (img.classList.contains("active")) {
      img.classList.remove("active");
      selectedTeams = selectedTeams.filter(
        (team) => team !== img.getAttribute("data-tri")
      );
    } else {
      img.classList.add("active");
      selectedTeams.push(img.getAttribute("data-tri"));
    }

    if (selectedTeams.length) {
      console.log(selectedTeams);
      console.log(LockIn22);
      console.log(
        LockIn22.filter(
          (game) =>
            selectedTeams.includes(game.teams[0]) ||
            selectedTeams.includes(game.teams[1])
        )
      );
      putGamesOnPage(
        LockIn22.filter(
          (game) =>
            selectedTeams.includes(game.teams[0]) ||
            selectedTeams.includes(game.teams[1])
        )
      );
    } else putGamesOnPage(LockIn22);
  });
});

const scheduleContainer = document.getElementById("schedule-container");

const putGamesOnPage = (gamesArr) => {
  scheduleContainer.innerHTML = "";
  let day;
  let newDayDiv;
  gamesArr.map((game) => {
    if (game.day !== day) {
      newDayDiv = document.createElement("div");
      day = game.day;
      const newDayH2 = document.createElement("h2");
      newDayH2.textContent = day;
      newDayDiv.append(newDayH2);
      scheduleContainer.append(newDayDiv);
    }
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time-div");
    timeDiv.innerText = game.time;
    gameCard.append(timeDiv);
    const vsDiv = document.createElement("div");
    vsDiv.classList.add("vs-div");
    vsDiv.innerHTML = `<a class='vs-team-div' href='team-page.html?${
      game.teams[0]
    }'><img src='images/logos/${game.teams[0].toLowerCase()}.png'></a><div class='vs-logo-div'><img src='images/logos/vs.png'></div><a class='vs-team-div' href='team-page.html?${
      game.teams[1]
    }'><img src='images/logos/${game.teams[1].toLowerCase()}.png'></a>`;
    gameCard.append(vsDiv);
    newDayDiv.append(gameCard);
  });
};

putGamesOnPage(LockIn22);
