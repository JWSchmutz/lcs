const team = window.location.href
  .substring(window.location.href.indexOf("?") + 1)
  .toLowerCase();

const upperCaseTeam = window.location.href.substring(
  window.location.href.indexOf("?") + 1
);

document.getElementById("team-img").setAttribute("src", `images/${team}.jpg`);
document.getElementById("team-img").setAttribute("alt", team);
const scheduleContainer = document.getElementById("schedule-container");
console.log(LockIn22);

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
    vsDiv.innerHTML = `<div class='vs-team-div'><img src='images/logos/${game.teams[0].toLowerCase()}.png'></div><div class='vs-logo-div'><img src='images/logos/vs.png'></div><div class='vs-team-div'><img src='images/logos/${game.teams[1].toLowerCase()}.png'></div>`;
    gameCard.append(vsDiv);
    newDayDiv.append(gameCard);
  });
};

putGamesOnPage(LockIn22.filter((game) => game.teams.includes(upperCaseTeam)));
