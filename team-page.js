const team = window.location.href
  .substring(window.location.href.indexOf("?") + 1)
  .toLowerCase();

const upperCaseTeam = window.location.href.substring(
  window.location.href.indexOf("?") + 1
);

document.getElementById("team-img").setAttribute("src", `images/${team}.jpg`);
document.getElementById("team-img").setAttribute("alt", team);
const scheduleContainer = document.getElementById("schedule-container");

const putGamesOnPage = (gamesArr) => {
  scheduleContainer.innerHTML = "";
  let day;
  let newDayDiv;
  let dayArr;
  gamesArr.map((game) => {
    if (game.day !== day) {
      newDayDiv = document.createElement("div");
      dayArr = convertUTCDateToLocalDate(game.dateDate).toString().split(" ");
      if (dayArr[2][0] === "0") {
        dayArr[2] = dayArr[2][1];
      }
      day = `${dayArr[0]} ${dayArr[1]}. ${dayArr[2]}`;
      const newDayH2 = document.createElement("h2");
      newDayH2.textContent = day;
      newDayH2.setAttribute("data-time", game.dateDate);
      newDayH2.setAttribute("class", "game-date");
      newDayDiv.append(newDayH2);
      scheduleContainer.append(newDayDiv);
    }
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time-div");
    let time = convertUTCDateToLocalDate(game.dateDate)
      .toString()
      .split(" ")[4];
    time =
      time.charAt(3) === "0"
        ? time.substring(0, 2)
        : (time = `${time.substring(0, 2)}:${time.substring(3, 5)}`);
    if (parseInt(time.split(":")[0]) > 12) {
      let timeArr = time.split(":");
      timeArr[0] = parseInt(time.split(" ")[0]) - 12;
      time = timeArr.join(":");
      time += " PM";
    } else {
      time = time + (time.substring(0, 2) === "12" ? " PM" : " AM");
    }

    timeDiv.innerText = time;
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
  let dayToScrollTo;
  let useNext = false;
  document.querySelectorAll(".game-date").forEach((gameDate) => {
    if (
      new Date(gameDate.getAttribute("data-time")).getTime() <
      new Date().getTime()
    ) {
      dayToScrollTo = gameDate;
      if (
        new Date(gameDate.getAttribute("data-time")).getTime() + 50000000 <
        new Date().getTime()
      ) {
        useNext = true;
      }
    }
    if (
      useNext &&
      new Date(gameDate.getAttribute("data-time")).getTime() >
        new Date().getTime()
    ) {
      useNext = false;
      dayToScrollTo = gameDate;
    }
  });
  // dayToScrollTo.scrollIntoView(true);
};

putGamesOnPage(Spring23.filter((game) => game.teams.includes(upperCaseTeam)));
function convertUTCDateToLocalDate(date) {
  var dateLocal = new Date(date);
  var newDate = dateLocal.toString();
  return newDate;
}
